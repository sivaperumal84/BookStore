import { NextRequest, NextResponse } from 'next/server'
import { sendCartNotificationToAdmin } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { userEmail, bookTitle, quantity } = await request.json()

    const result = await sendCartNotificationToAdmin(userEmail, bookTitle, quantity)

    if (result.success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to send email' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error in notify-admin API:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

