import { Router } from 'express';
import ResumeController from '../controllers/ResumeController';

const router = Router();

router.post('/parse', ResumeController.parseResume);

export default router;
