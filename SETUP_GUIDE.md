# 🚀 Quick Setup Guide

Follow these steps to get your BookStore app running in minutes!

## Step 1: Set Up Supabase (5 minutes)

1. **Create a Supabase Account**
   - Go to https://supabase.com
   - Click "Start your project"
   - Sign up with GitHub or email

2. **Create a New Project**
   - Click "New Project"
   - Choose an organization (or create one)
   - Enter project details:
     - Name: `bookstore`
     - Database Password: (create a strong password)
     - Region: (choose closest to you)
   - Click "Create new project"
   - Wait 2-3 minutes for setup

3. **Get Your API Credentials**
   - Go to **Project Settings** (gear icon in sidebar)
   - Click **API** in the left menu
   - Copy these values:
     - `Project URL` → This is your `NEXT_PUBLIC_SUPABASE_URL`
     - `anon/public` key → This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. **Set Up Database**
   - Click **SQL Editor** in the sidebar
   - Click "New query"
   - Copy the entire contents of `supabase-setup.sql` from this project
   - Paste it into the SQL editor
   - Click "Run" (or press Cmd/Ctrl + Enter)
   - You should see "Success. No rows returned"

## Step 2: Set Up Resend (3 minutes)

1. **Create a Resend Account**
   - Go to https://resend.com
   - Click "Get Started"
   - Sign up with email

2. **Verify Your Email**
   - Check your inbox for verification email
   - Click the verification link

3. **Get Your API Key**
   - After logging in, go to **API Keys**
   - Click "Create API Key"
   - Name it: `bookstore`
   - Click "Add"
   - **IMPORTANT**: Copy the API key immediately (you won't see it again!)

## Step 3: Configure Environment Variables (2 minutes)

1. **Create `.env.local` file**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Edit `.env.local`** with your credentials:
   ```env
   # Supabase Configuration (from Step 1)
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

   # Resend Email Configuration (from Step 2)
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ADMIN_EMAIL=your-email@example.com
   ```

   Replace:
   - `NEXT_PUBLIC_SUPABASE_URL` with your Supabase Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` with your Supabase anon key
   - `RESEND_API_KEY` with your Resend API key
   - `ADMIN_EMAIL` with your email address

## Step 4: Install Dependencies & Run (2 minutes)

```bash
# Install dependencies (if not already done)
npm install

# Start the development server
npm run dev
```

Open http://localhost:3000 in your browser!

## Step 5: Create Your Admin Account (1 minute)

1. **Sign Up**
   - Click "Sign Up" on the homepage
   - Enter your email and password
   - Click "Sign Up"

2. **Make Yourself Admin**
   - Go back to Supabase
   - Click **SQL Editor**
   - Run this query (replace with YOUR email):
   ```sql
   UPDATE profiles SET is_admin = true WHERE email = 'your-email@example.com';
   ```
   - Click "Run"

3. **Log Out and Log Back In**
   - Log out from the app
   - Log back in
   - You'll now be redirected to the Admin Dashboard! 🎉

## Step 6: Test the App

### As Admin:
1. Add a few books
2. Edit a book
3. Delete a book

### As User:
1. Create another account (use a different email or incognito mode)
2. Browse books
3. Add books to cart
4. Check your admin email for notifications!

## 🎉 You're Done!

Your BookStore app is now fully functional!

## Next Steps

- **Deploy to Vercel**: See README.md for deployment instructions
- **Customize**: Change colors in `tailwind.config.js`
- **Add Features**: See README.md for feature ideas

## Troubleshooting

### "Failed to fetch books"
- Check that your Supabase URL and key are correct in `.env.local`
- Make sure you ran the SQL setup script

### "Access denied. Admin only."
- Make sure you ran the SQL to set `is_admin = true`
- Log out and log back in

### Email notifications not working
- Check that your Resend API key is correct
- Verify your email in Resend dashboard
- Check the browser console for errors

### Build errors
- Make sure all dependencies are installed: `npm install`
- Delete `.next` folder and rebuild: `rm -rf .next && npm run build`

## Need Help?

Check the main README.md or open an issue on GitHub!

