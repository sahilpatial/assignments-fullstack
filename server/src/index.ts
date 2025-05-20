import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import resumeRoutes from './routes/resumeRoutes';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.use('/api/resume', resumeRoutes);

// Debug log to check if env variables are loaded
console.log('ENV Check - PORT:', process.env.PORT);
console.log('ENV Check - OPENAI_API_KEY exists:', !!process.env.OPENAI_API_KEY);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
