import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography,
    CircularProgress,
} from '@mui/material';
import axios from 'axios';
import { Resume } from '../types/Resume';
import ParsedResumeView from './ParsedResumeView';

const ResumeParser: React.FC = () => {
    const [resumeText, setResumeText] = useState('');
    const [parsedResume, setParsedResume] = useState<Resume | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post<Resume>(
                'http://localhost:3001/api/resume/parse',
                { resumeText }
            );
            setParsedResume(response.data);
        } catch (err) {
            setError('Failed to parse resume. Please try again.');
            console.error('Error parsing resume:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Intelligent Resume Parser
                </Typography>
                <Paper sx={{ p: 3, mb: 3 }}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            multiline
                            rows={10}
                            variant="outlined"
                            placeholder="Paste resume text here..."
                            value={resumeText}
                            onChange={(e) => setResumeText(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading || !resumeText.trim()}
                            fullWidth
                        >
                            {loading ? <CircularProgress size={24} /> : 'Parse Resume'}
                        </Button>
                    </form>
                </Paper>

                {error && (
                    <Typography color="error" align="center">
                        {error}
                    </Typography>
                )}

                {parsedResume && <ParsedResumeView resume={parsedResume} />}
            </Box>
        </Container>
    );
};

export default ResumeParser;
