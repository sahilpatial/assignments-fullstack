import { Request, Response } from 'express';
import ResumeParserService from '../services/ResumeParserService';

class ResumeController {
    public static async parseResume(req: Request, res: Response) {
        try {
            const { resumeText } = req.body;

            if (!resumeText) {
                return res.status(400).json({ error: 'Resume text is required' });
            }

            const parsedResume = await ResumeParserService.parseResume(resumeText);
            return res.json(parsedResume);
        } catch (error) {
            console.error('Error in parseResume controller:', error);
            return res.status(500).json({ error: 'Failed to parse resume' });
        }    }
}

export default ResumeController;
