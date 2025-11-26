# Short-flix 🎬

A modern Netflix-style video platform built with Next.js and Express.js, featuring video browsing, search, filtering, and favorites functionality.

🔗 **Live Demo**: [https://short-flix-t-frontend.vercel.app/](https://short-flix-t-frontend.vercel.app/)

## 🚀 Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Headless UI** - Accessible UI components
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe backend development
- **Serverless-http** - Serverless function compatibility

## 📁 Project Structure

```
Short-flix/
├── client/                 # Next.js frontend
│   ├── app/
│   │   ├── api/           # Next.js API routes
│   │   ├── components/    # React components
│   │   └── lib/          # Utility functions
├── backend/               # Express.js backend
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── routes/       # API routes
│   │   └── services/     # Business logic
└── api/                  # Vercel serverless functions
```

## 🎯 Features

- ✅ Video grid with responsive design
- ✅ Video player with modal interface
- ✅ Search and tag-based filtering
- ✅ Favorites system with heart buttons
- ✅ Real-time video management
- ✅ Serverless deployment ready

## 🛠 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rubayet-hasan-yasin/Short-flix-T.git
   cd Short-flix-T
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd client && npm install
   
   # Install backend dependencies
   cd ../backend && npm install
   ```

3. **Environment Configuration**
   
   Create `.env.local` in `client/`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   API_URL=http://localhost:8000/api
   ```
   
   Create `.env` in `backend/`:
   ```env
   PORT=8000
   NODE_ENV=development
   ```

4. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend  
   cd client
   npm run dev
   ```

5. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/

## 📡 API Documentation

Base URL: `/`

### Videos

#### Get All Videos
```http
GET /api/shorts?search=title&tags=tag1,tag2
```
**Query Parameters:**
- `search` (optional): Search by title
- `tags` (optional): Filter by comma-separated tags

**Response:**
```json
[
  {
    "id": 1,
    "videoUrl": "https://example.com/video.mp4",
    "title": "Sample Video",
    "tags": ["demo", "sample"]
  }
]
```

#### Create Video
```http
POST /api/shorts
```
**Request Body:**
```json
{
  "videoUrl": "https://example.com/video.mp4",
  "title": "New Video Title",
  "tags": ["tag1", "tag2"]
}
```

**Response:**
```json
{
  "id": 9,
  "videoUrl": "https://example.com/video.mp4",
  "title": "New Video Title", 
  "tags": ["tag1", "tag2"]
}
```

### Favorites

#### Toggle Favorite
```http
POST /api/shorts/{id}/favorite
```
**Path Parameters:**
- `id`: Video ID (number)

**Response:**
```json
{
  "videoId": 1,
  "isFavorite": true
}
```

#### Get Favorites
```http
GET /api/favorites
```
**Response:**
```json
[
  {
    "id": 1,
    "videoUrl": "https://example.com/video.mp4",
    "title": "Favorite Video",
    "tags": ["favorite"]
  }
]
```

#### Get Favorite IDs
```http
GET /api/favorite-ids
```
**Response:**
```json
{
  "favoriteIds": [1, 3, 5]
}
```

### Health Check
```http
GET /health
```
**Response:**
```json
{
  "status": "OK",
  "message": "Server is running successfully",
  "timestamp": "2025-11-26T10:30:00.000Z",
  "uptime": 123.45
}
```

## 📄 Environment Variables

### Frontend (client/.env.local)
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api
API_URL=http://localhost:8000/api

# Production
NEXT_PUBLIC_API_URL=https://your-domain.vercel.app/api
```

### Backend (backend/.env)
```env
# Server Configuration
PORT=8000
NODE_ENV=development

# Production
NODE_ENV=production
```



⭐ Star this repo if you find it helpful!
