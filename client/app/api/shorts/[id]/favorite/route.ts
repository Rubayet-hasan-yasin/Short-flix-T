import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_BASE_URL = process.env.API_URL || 'http://localhost:8000/api';

// Create axios instance for API calls
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    
    // Validate the ID
    const videoId = parseInt(id);
    if (isNaN(videoId)) {
      return NextResponse.json(
        { error: 'Invalid video ID' },
        { status: 400 }
      );
    }
    
    const response = await api.post(`/shorts/${videoId}/favorite`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(`POST /api/shorts/${params.id}/favorite error:`, error);
    
    // Handle axios errors
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response: { data?: { message?: string }; status?: number } };
      return NextResponse.json(
        { error: axiosError.response.data?.message || 'Failed to toggle favorite' },
        { status: axiosError.response.status || 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to toggle favorite' },
      { status: 500 }
    );
  }
}