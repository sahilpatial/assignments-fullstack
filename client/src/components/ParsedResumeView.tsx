import React from 'react';
import {
    Box,
    Paper,
    Typography,
    Chip,
    List,
    ListItem,
    ListItemText,
    Divider,
    Avatar,
    useTheme
} from '@mui/material';
import {
    Email as EmailIcon,
    Phone as PhoneIcon,
    LocationOn as LocationIcon,
    Business as BusinessIcon,
    School as SchoolIcon,
    Work as WorkIcon,
    Today as DateIcon,
    Code as CodeIcon,
} from '@mui/icons-material';
import { Resume } from '../types/Resume';

interface ParsedResumeViewProps {
    resume: Resume;
}

const ParsedResumeView: React.FC<ParsedResumeViewProps> = ({ resume }) => {
    const theme = useTheme();

    return (
        <Box sx={{ mt: 4, mb: 4, maxWidth: '1200px', mx: 'auto' }}>
            {/* Header/Personal Info Section */}
            <Paper 
                elevation={3} 
                sx={{ 
                    p: 4, 
                    mb: 3, 
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    color: 'white',
                    borderRadius: 2
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, flexWrap: 'wrap' }}>
                    <Avatar 
                        sx={{ 
                            width: 100, 
                            height: 100, 
                            bgcolor: theme.palette.primary.light,
                            fontSize: '2.5rem',
                            border: '4px solid rgba(255,255,255,0.2)'
                        }}
                    >
                        {resume.personalInfo.name.charAt(0)}
                    </Avatar>
                    <Box sx={{ flex: 1, minWidth: 280 }}>
                        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                            {resume.personalInfo.name}
                        </Typography>
                        <Typography variant="h5" sx={{ opacity: 0.9, mb: 2, fontWeight: 500 }}>
                            {resume.personalInfo.title}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', opacity: 0.8 }}>
                            {resume.personalInfo.email && (
                                <Typography>{resume.personalInfo.email}</Typography>
                            )}
                            {resume.personalInfo.phone && (
                                <Typography>{resume.personalInfo.phone}</Typography>
                            )}
                            {resume.personalInfo.location && (
                                <Typography>{resume.personalInfo.location}</Typography>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Paper>

            {/* Professional Summary */}
            {resume.personalInfo.summary && (
                <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                    <Typography variant="h6" gutterBottom color="primary" fontWeight={600}>
                        Professional Summary
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
                        {resume.personalInfo.summary}
                    </Typography>
                </Paper>
            )}

            {/* Skills Section */}
            <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom color="primary" fontWeight={600}>
                    Skills
                </Typography>
                <Box sx={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: 1,
                }}>
                    {resume.skills.map((skill, index) => (
                        <Chip
                            key={index}
                            label={`${skill.name}${skill.proficiency ? ` (${skill.proficiency})` : ''}`}
                            color="primary"
                            sx={{
                                borderRadius: '8px',
                                fontWeight: 500,
                                transition: 'all 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                                }
                            }}
                        />
                    ))}
                </Box>
            </Paper>

            {/* Work Experience Section */}
            <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom color="primary" fontWeight={600}>
                    Work Experience
                </Typography>
                <List sx={{ pt: 2 }}>
                    {resume.workExperience.map((exp, index) => (
                        <React.Fragment key={index}>
                            <ListItem sx={{ px: 0, flexDirection: 'column', alignItems: 'flex-start' }}>
                                <Box sx={{ width: '100%', mb: 2 }}>
                                    <Typography variant="h6" gutterBottom>
                                        {exp.title}
                                    </Typography>
                                    <Typography variant="subtitle1" color="primary" gutterBottom>
                                        {exp.company}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        {exp.startDate} - {exp.endDate}
                                    </Typography>
                                </Box>

                                <Box component="ul" sx={{ 
                                    width: '100%',
                                    listStyle: 'none',
                                    pl: 0,
                                    '& li': {
                                        position: 'relative',
                                        pl: 3,
                                        mb: 1,
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            left: 0,
                                            top: '8px',
                                            width: '6px',
                                            height: '6px',
                                            borderRadius: '50%',
                                            backgroundColor: theme.palette.primary.main
                                        }
                                    }
                                }}>
                                    {exp.responsibilities.map((resp, idx) => (
                                        <li key={idx}>
                                            <Typography variant="body2" color="text.secondary">
                                                {resp}
                                            </Typography>
                                        </li>
                                    ))}
                                </Box>

                                <Box sx={{ mt: 2, width: '100%' }}>
                                    <Typography variant="subtitle2" gutterBottom>
                                        Technologies Used
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {exp.technologies.map((tech, idx) => (
                                            <Chip
                                                key={idx}
                                                label={tech}
                                                size="small"
                                                color="secondary"
                                                variant="outlined"
                                                sx={{ borderRadius: '6px' }}
                                            />
                                        ))}
                                    </Box>
                                </Box>
                            </ListItem>
                            {index < resume.workExperience.length - 1 && (
                                <Divider sx={{ my: 3 }} />
                            )}
                        </React.Fragment>
                    ))}
                </List>
            </Paper>

            {/* Education Section */}
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom color="primary" fontWeight={600}>
                    Education
                </Typography>
                <List>
                    {resume.education.map((edu, index) => (
                        <React.Fragment key={index}>
                            <ListItem sx={{ px: 0, flexDirection: 'column', alignItems: 'flex-start' }}>
                                <Typography variant="h6" gutterBottom>
                                    {edu.degree} in {edu.field}
                                </Typography>
                                <Typography variant="subtitle1" color="primary" gutterBottom>
                                    {edu.institution}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        {edu.graduationYear}
                                    </Typography>
                                    {edu.gpa && (
                                        <Typography variant="body2" color="text.secondary">
                                            GPA: {edu.gpa}
                                        </Typography>
                                    )}
                                </Box>
                            </ListItem>
                            {index < resume.education.length - 1 && (
                                <Divider sx={{ my: 3 }} />
                            )}
                        </React.Fragment>
                    ))}
                </List>
            </Paper>
        </Box>
    );
};

export default ParsedResumeView;
