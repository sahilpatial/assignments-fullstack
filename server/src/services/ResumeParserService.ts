import axios from 'axios';
import { Resume } from '../models/Resume';

class ResumeParserService {
    private togetherApiKey: string;
    private baseUrl: string;

    constructor() {
        this.togetherApiKey = process.env.TOGETHER_API_KEY || '';
        this.baseUrl = 'https://api.together.xyz/inference';
    }

    async parseResume(rawText: string): Promise<Resume> {
        try {            const prompt = `Parse this resume and return a JSON object with the following structure:
            {
                "personalInfo": {
                    "name": "full name",
                    "title": "job title",
                    "email": "email address if available",
                    "phone": "phone number if available",
                    "location": "location if available",
                    "summary": "professional summary"
                },
                "skills": [{"name": "skill name", "proficiency": "level"}],
                "workExperience": [{
                    "company": "company name",
                    "title": "job title",
                    "startDate": "start date",
                    "endDate": "end date",
                    "responsibilities": ["responsibility 1", "responsibility 2"],
                    "technologies": ["tech1", "tech2"]
                }],
                "education": [{
                    "institution": "school name",
                    "degree": "degree type",
                    "field": "field of study",
                    "graduationYear": "year",
                    "gpa": "gpa if available"
                }]
            }

            Resume text:
            ${rawText}`;            const response = await axios.post(
                this.baseUrl,                {
                    model: 'mistralai/Mistral-7B-Instruct-v0.2',
                    prompt: `<s>[INST] ${prompt} [/INST]`,
                    temperature: 0.3,
                    top_p: 0.7,
                    max_tokens: 2000,
                    repetition_penalty: 1.1,
                    stop: ['</s>']
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.togetherApiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );            console.log('API Response:', response.data); // Debug log
              // Parse the API response safely
            const responseData = response.data as any;
            let output: string;
            
            // Handle the nested structure from Together AI
            if (responseData.output?.choices?.[0]?.text) {
                output = responseData.output.choices[0].text;
            } else if (typeof responseData === 'string') {
                output = responseData;
            } else if (responseData.text) {
                output = responseData.text;
            } else {
                console.log('Invalid output format:', responseData);
                throw new Error('No valid output received from API');
            }

            // Extract JSON from markdown code block if present
            const jsonMatch = output.match(/```json\n([\s\S]*?)\n```/) || output.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                console.log('Full output:', output);
                throw new Error('Failed to parse resume: Invalid response format');
            }

            let jsonString = jsonMatch[1] || jsonMatch[0];
            // Clean up any potential markdown artifacts
            jsonString = jsonString.replace(/^```json\s*/, '').replace(/\s*```$/, '');

            let parsedData;
            try {
                parsedData = JSON.parse(jsonString);
            } catch (parseError) {
                console.error('JSON Parse error:', parseError);
                console.error('Attempted to parse:', jsonString);
                throw new Error('Failed to parse resume: Invalid JSON format');
            }

            // Validate required fields
            if (!parsedData || typeof parsedData !== 'object') {
                throw new Error('Invalid resume data format');
            }

            const requiredFields = ['personalInfo', 'workExperience', 'education', 'skills'];
            const missingFields = requiredFields.filter(field => !parsedData[field]);
            
            if (missingFields.length > 0) {
                throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
            }

            // Validate and standardize personal info
            if (typeof parsedData.personalInfo !== 'object' || !parsedData.personalInfo.name) {
                throw new Error('Invalid or missing personal information');
            }

            // Validate work experience
            if (!Array.isArray(parsedData.workExperience)) {
                throw new Error('Work experience must be an array');
            }

            // Validate education
            if (!Array.isArray(parsedData.education)) {
                throw new Error('Education must be an array');
            }

            // Validate skills
            if (!Array.isArray(parsedData.skills)) {
                parsedData.skills = Array.isArray(parsedData.skills.split)                    ? parsedData.skills.split(',').map((s: string) => s.trim())
                    : [parsedData.skills];
            }

            // Standardize dates in work experience
            parsedData.workExperience = parsedData.workExperience.map((exp: any) => ({
                ...exp,
                startDate: this.standardizeDate(exp.startDate),
                endDate: this.standardizeDate(exp.endDate)
            }));            const resume: Resume = {
                personalInfo: this.validatePersonalInfo(parsedData.personalInfo || {}),
                skills: this.validateSkills(parsedData.skills || []),
                workExperience: this.validateWorkExperience(parsedData.workExperience || []),
                education: this.validateEducation(parsedData.education || []),
                rawText
            };

            return resume;
        } catch (error: any) {
            console.error('Error parsing resume:', error);
            if (error.name === 'SyntaxError') {
                throw new Error('Failed to parse resume: Invalid response format');
            } else if (error.message.includes('rate limit')) {
                throw new Error('Rate limit exceeded. Please try again in a few minutes.');
            } else if (error.message.includes('model')) {
                throw new Error('Model temporarily unavailable. Please try again later.');
            } else {
                throw new Error('Failed to parse resume. Please try again.');
            }
        }
    }

    private validatePersonalInfo(info: any): Resume['personalInfo'] {
        return {
            name: info.name || '',
            title: info.title || '',
            email: info.email || '',
            phone: info.phone || '',
            location: info.location || '',
            summary: info.summary || ''
        };
    }

    private validateSkills(skills: any[]): Resume['skills'] {
        return skills.map(skill => ({
            name: skill.name || '',
            proficiency: skill.proficiency,
            yearsOfExperience: skill.yearsOfExperience
        }));
    }

    private validateWorkExperience(experience: any[]): Resume['workExperience'] {
        return experience.map(exp => ({
            company: exp.company || '',
            title: exp.title || '',
            startDate: exp.startDate || '',
            endDate: exp.endDate || '',
            responsibilities: exp.responsibilities || [],
            technologies: exp.technologies || []
        }));
    }

    private validateEducation(education: any[]): Resume['education'] {
        return education.map(edu => ({
            institution: edu.institution || '',
            degree: edu.degree || '',
            field: edu.field || '',
            graduationYear: edu.graduationYear || '',
            gpa: edu.gpa
        }));
    }

    private standardizeDate(dateStr: string): string {
        if (!dateStr) return '';
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return dateStr;
            return date.toISOString().split('T')[0];
        } catch {
            return dateStr;
        }
    }
}

export default new ResumeParserService();
