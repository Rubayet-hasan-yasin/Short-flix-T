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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const tags = searchParams.get('tags');
    
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (tags) params.append('tags', tags);
    
    const queryString = params.toString() ? `?${params.toString()}` : '';
    const response = await api.get(`/shorts${queryString}`);
    
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('GET /api/shorts error:', error);
    
    // Handle axios errors
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response: { data?: { message?: string }; status?: number } };
      return NextResponse.json(
        { error: axiosError.response.data?.message || 'Failed to fetch videos' },
        { status: axiosError.response.status || 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const response = await api.post('/shorts', body);
    
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('POST /api/shorts error:', error);
    
    // Handle axios errors
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response: { data?: { message?: string }; status?: number } };
      return NextResponse.json(
        { error: axiosError.response.data?.message || 'Failed to create video' },
        { status: axiosError.response.status || 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create video' },
      { status: 500 }
    );
  }
}