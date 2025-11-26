import { NextResponse } from 'next/server';
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

export async function GET() {
  try {
    const response = await api.get('/favorites');
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('GET /api/favorites error:', error);
    
    // Handle axios errors
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response: { data?: { message?: string }; status?: number } };
      return NextResponse.json(
        { error: axiosError.response.data?.message || 'Failed to fetch favorites' },
        { status: axiosError.response.status || 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch favorites' },
      { status: 500 }
    );
  }
}