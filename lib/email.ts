import { Resend } from 'resend'

export async function sendCartNotificationToAdmin(
  userEmail: string,
  bookTitle: string,
  quantity: number
) {
  try {
    const apiKey = process.env.RESEND_API_KEY

    if (!apiKey) {
      console.warn('RESEND_API_KEY not configured. Email notification skipped.')
      return { success: false, error: 'Email service not configured' }
    }

    const resend = new Resend(apiKey)
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com'

    await resend.emails.send({
      from: 'BookStore <onboarding@resend.dev>',
      to: adminEmail,
      subject: 'New Item Added to Cart',
      html: `
        <h2>Cart Activity Notification</h2>
        <p><strong>User:</strong> ${userEmail}</p>
        <p><strong>Book:</strong> ${bookTitle}</p>
        <p><strong>Quantity:</strong> ${quantity}</p>
        <p>A user has added an item to their cart.</p>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error('Failed to send email:', error)
    return { success: false, error }
  }
}

