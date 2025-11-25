# Short-flix Backend

A simple TypeScript Express.js backend API for the Short-flix application.

## Features

- TypeScript setup with Express.js
- Health check endpoint
- CORS and Helmet middleware for security
- Hot reload with Node.js built-in --watch flag
- Environment variables with dotenv

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:8000`

### Production

Build the project:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## API Endpoints

- `GET /health` - Health check endpoint

### Health Check Response
```json
{
  "status": "OK",
  "message": "Server is running successfully",
  "timestamp": "2025-11-25T10:00:00.000Z",
  "uptime": 123.456
}
```

## Scripts

- `npm run dev` - Start development server with Node.js --watch flag
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run clean` - Clean build directory