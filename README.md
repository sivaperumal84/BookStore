# 📚 BookStore - Full-Stack Book Shopping Application

A modern, full-featured online bookstore built with Next.js, Supabase, and TypeScript. Features separate admin and user interfaces with real-time cart management and email notifications.

## ✨ Features

### For Users
- 🔐 Secure authentication (sign up/login)
- 📖 Browse available books
- 🛒 Add books to cart
- ➕➖ Adjust quantities in cart
- 💰 View cart total
- 📧 Automatic email notifications to admin when items are added to cart

### For Admins
- 🔑 Admin-only dashboard access
- ➕ Add new books
- ✏️ Edit existing books
- 🗑️ Delete books
- 📊 View all books inventory
- 📧 Receive email notifications for cart activities

## 🛠️ Tech Stack (100% Open Source & Free)

- **Frontend**: Next.js 14 (React) with TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Email**: Resend (free tier)
- **Icons**: Lucide React
- **Hosting**: Vercel (free tier)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account (free at [supabase.com](https://supabase.com))
- A Resend account (free at [resend.com](https://resend.com))

### 1. Clone and Install

```bash
cd BookStore
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be ready
3. Go to **Project Settings** → **API**
4. Copy your `Project URL` and `anon/public` key
5. Go to **SQL Editor** and run the SQL from `supabase-setup.sql`

### 3. Set Up Resend (Email Service)

1. Go to [resend.com](https://resend.com) and sign up
2. Verify your email
3. Go to **API Keys** and create a new API key
4. Copy the API key

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Resend Email Configuration
RESEND_API_KEY=your_resend_api_key
ADMIN_EMAIL=your-admin-email@example.com
```

### 5. Create Admin User

1. Start the development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000)
3. Sign up with your email
4. Go to your Supabase project → **SQL Editor**
5. Run this SQL (replace with your email):
```sql
UPDATE profiles SET is_admin = true WHERE email = 'your-email@example.com';
```

6. Log out and log back in - you'll now have admin access!

## 📖 Usage

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### User Flow

1. **Sign Up** → Create a new account
2. **Browse Books** → View all available books
3. **Add to Cart** → Click "Add to Cart" on any book
4. **View Cart** → Click the cart icon in the header
5. **Manage Cart** → Adjust quantities or remove items

### Admin Flow

1. **Sign In** as admin → Redirected to admin dashboard
2. **Add Books** → Click "Add Book" button
3. **Edit Books** → Click "Edit" on any book card
4. **Delete Books** → Click "Delete" on any book card
5. **Receive Notifications** → Get emails when users add items to cart

## 🌐 Deployment

### Deploy to Vercel (Free)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Add environment variables from `.env.local`
6. Click "Deploy"

Your app will be live at `https://your-app.vercel.app`!

### Alternative Free Hosting Options

- **Netlify**: [netlify.com](https://netlify.com)
- **Railway**: [railway.app](https://railway.app)
- **Render**: [render.com](https://render.com)

## 📁 Project Structure

```
BookStore/
├── app/
│   ├── admin/          # Admin dashboard
│   ├── books/          # User books page
│   ├── login/          # Login page
│   ├── signup/         # Sign up page
│   ├── api/            # API routes
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── lib/
│   ├── supabase.ts     # Supabase client & types
│   └── email.ts        # Email service
├── supabase-setup.sql  # Database schema
├── .env.local.example  # Environment variables template
└── README.md           # This file
```

## 🔒 Security Features

- Row Level Security (RLS) enabled on all tables
- Admin-only access to book management
- Users can only access their own cart
- Secure authentication with Supabase Auth
- Environment variables for sensitive data

## 🎨 Customization

### Change Colors

Edit `tailwind.config.ts` to customize the primary color scheme.

### Add More Features

Some ideas:
- Order history
- Payment integration (Stripe)
- Book reviews and ratings
- Search and filter functionality
- Wishlist feature
- Book categories

## 📧 Email Notifications

The app sends email notifications to the admin when:
- A user adds an item to their cart

**Note**: Resend's free tier allows:
- 100 emails/day
- 3,000 emails/month
- From `onboarding@resend.dev` domain

For production, verify your own domain in Resend.

## 🐛 Troubleshooting

### "Failed to fetch books"
- Check your Supabase URL and anon key in `.env.local`
- Ensure the SQL schema was run successfully

### "Failed to send email"
- Verify your Resend API key
- Check that ADMIN_EMAIL is set correctly
- Ensure you haven't exceeded Resend's free tier limits

### "Access denied. Admin only."
- Make sure you ran the SQL to set `is_admin = true` for your user
- Log out and log back in after making the change

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes!

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📞 Support

If you have questions or need help, please open an issue on GitHub.

---

Built with ❤️ using open-source technologies

