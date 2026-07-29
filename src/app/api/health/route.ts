// Health check endpoint
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Healthy Choices API is running',
    timestamp: new Date().toISOString(),
  })
}
