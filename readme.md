# Intelligent Resume Parser

A modern web application that uses AI to parse and analyze resumes, extracting structured information and presenting it in a clean, organized format.

## Features

- Upload and parse resumes in various formats
- Extract key information including:
  - Personal Information (name, contact, location)
  - Professional Summary
  - Skills with proficiency levels
  - Work Experience with responsibilities and technologies
  - Education details
- Modern, responsive UI with Material Design
- Real-time parsing using AI/LLM
- Clean visualization of parsed data

## Tech Stack

### Frontend
- React.js with TypeScript
- Material-UI (MUI) for modern UI components
- Axios for API communication

### Backend
- Node.js with Express
- TypeScript for type safety
- Together AI API for LLM integration

### Development Tools
- Concurrent development workflow
- VS Code workspace configuration
- TypeScript configuration for both client and server
- npm workspaces for monorepo management

## Quick Start

1. Clone and install dependencies:
   ```bash
   git clone <repository-url>
   cd Recruitly
   npm run install:all
   ```

2. Set up environment variables:
   Create a `.env` file in the server directory:
   ```env
   PORT=3001
   TOGETHER_API_KEY=your_together_ai_key_here
   ```

3. Start the development servers:
   ```bash
   npm start
   ```
   This will start both frontend and backend concurrently.

4. Open http://localhost:3000 in your browser

## Project Structure

```
.
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── ParsedResumeView.tsx
│   │   │   └── ResumeParser.tsx
│   │   └── types/        # TypeScript interfaces
│   │       └── Resume.ts
│   └── package.json
└── server/                # Backend Node.js application
    ├── src/
    │   ├── controllers/   # Request handlers
    │   ├── models/       # Data models
    │   ├── routes/       # API routes
    │   ├── services/     # Business logic
    │   └── utils/        # Utility functions
    └── package.json
```

## Implementation Details

### AI Integration
- Uses Together AI's Mistral-7B-Instruct model for parsing
- Structured validation of extracted data
- Robust JSON response handling
- Consistent formatting of dates and data

### Data Processing
- Comprehensive resume structure parsing
- Personal information extraction
- Skills categorization with proficiency levels
- Work experience analysis with responsibilities and tech stack
- Education details formatting

### Validation & Error Handling
- TypeScript interfaces for type safety
- Server-side validation of required fields
- Robust error handling for API responses
- Standardization of data formats
- Rate limit and API error management

### UI/UX Features
- Modern Material Design implementation
- Responsive layout for all screen sizes
- Interactive elements with hover effects
- Clear visual hierarchy
- Loading states and error feedback

## Future Enhancements
- PDF and document file upload support
- Advanced skills analysis and categorization
- Export functionality (PDF, Word, JSON)
- Batch processing capabilities
- AI-powered job role matching
- Resume scoring and suggestions
- Custom parsing templates
- Integration with job platforms
