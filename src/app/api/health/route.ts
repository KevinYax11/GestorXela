import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET() {
  try {
    const payload = await getPayload({ config })
    await payload.find({ collection: 'users', limit: 1 })
    return NextResponse.json({ status: 'ok', timestamp: new Date().toISOString() })
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    )
  }
}
