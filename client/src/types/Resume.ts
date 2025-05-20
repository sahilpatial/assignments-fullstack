export interface Skill {
    name: string;
    proficiency?: 'beginner' | 'intermediate' | 'expert';
    yearsOfExperience?: number;
}

export interface WorkExperience {
    company: string;
    title: string;
    startDate: string;
    endDate: string;
    responsibilities: string[];
    technologies: string[];
}

export interface Education {
    institution: string;
    degree: string;
    field: string;
    graduationYear: string;
    gpa?: number;
}

export interface PersonalInfo {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
}

export interface Resume {
    personalInfo: PersonalInfo;
    skills: Skill[];
    workExperience: WorkExperience[];
    education: Education[];
    rawText: string;
}
