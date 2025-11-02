# 🚀 Deployment Guide

This guide will help you deploy your BookStore app to production for **FREE** using Vercel.

## Prerequisites

- ✅ Your app is working locally
- ✅ You have a GitHub account
- ✅ Your Supabase project is set up
- ✅ Your Resend account is configured

## Option 1: Deploy to Vercel (Recommended)

### Step 1: Push to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - BookStore app"
   ```

2. **Create a GitHub Repository**:
   - Go to https://github.com/new
   - Name: `bookstore`
   - Make it Public or Private
   - Don't initialize with README (we already have one)
   - Click "Create repository"

3. **Push Your Code**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/bookstore.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Go to Vercel**:
   - Visit https://vercel.com
   - Click "Sign Up" or "Log In"
   - Sign in with GitHub

2. **Import Your Project**:
   - Click "Add New..." → "Project"
   - Select your `bookstore` repository
   - Click "Import"

3. **Configure Project**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)

4. **Add Environment Variables**:
   Click "Environment Variables" and add these:

   ```
   NEXT_PUBLIC_SUPABASE_URL = your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your_supabase_anon_key
   RESEND_API_KEY = your_resend_api_key
   ADMIN_EMAIL = your-email@example.com
   ```

   **Important**: Copy these from your `.env.local` file!

5. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - 🎉 Your app is live!

### Step 3: Get Your URL

After deployment:
- Your app will be at: `https://your-project-name.vercel.app`
- Vercel will show you the URL
- Click "Visit" to see your live app!

### Step 4: Configure Custom Domain (Optional)

1. Go to your project in Vercel
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions
5. Wait for DNS propagation (5-60 minutes)

## Option 2: Deploy to Netlify

### Step 1: Push to GitHub
(Same as Vercel Step 1 above)

### Step 2: Deploy to Netlify

1. **Go to Netlify**:
   - Visit https://netlify.com
   - Sign up/login with GitHub

2. **Import Project**:
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub"
   - Select your `bookstore` repository

3. **Configure Build Settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Base directory**: (leave empty)

4. **Add Environment Variables**:
   - Click "Show advanced"
   - Click "New variable" for each:
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   RESEND_API_KEY
   ADMIN_EMAIL
   ```

5. **Deploy**:
   - Click "Deploy site"
   - Wait for build to complete
   - Your app is live at `https://random-name.netlify.app`

## Option 3: Deploy to Railway

### Step 1: Push to GitHub
(Same as above)

### Step 2: Deploy to Railway

1. **Go to Railway**:
   - Visit https://railway.app
   - Sign up with GitHub

2. **Create New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `bookstore` repository

3. **Add Environment Variables**:
   - Click on your service
   - Go to "Variables" tab
   - Add all environment variables

4. **Deploy**:
   - Railway will auto-deploy
   - Get your URL from the "Settings" tab

## Post-Deployment Checklist

After deploying to any platform:

### 1. Test Your App
- [ ] Visit your live URL
- [ ] Sign up for a new account
- [ ] Make yourself admin (see below)
- [ ] Test admin features
- [ ] Test user features
- [ ] Test email notifications

### 2. Make Yourself Admin

Since you're using a new production database:

1. Sign up on your live site
2. Go to Supabase SQL Editor
3. Run:
   ```sql
   UPDATE profiles SET is_admin = true WHERE email = 'your-email@example.com';
   ```
4. Log out and log back in

### 3. Add Sample Books

As admin, add some books to populate your store!

### 4. Configure Resend for Production

For production email:

1. Go to Resend dashboard
2. Add and verify your domain
3. Update the `from` field in `lib/email.ts`:
   ```typescript
   from: 'BookStore <noreply@yourdomain.com>',
   ```
4. Redeploy

## Continuous Deployment

Once set up, any push to your GitHub repository will automatically deploy!

```bash
# Make changes
git add .
git commit -m "Add new feature"
git push

# Vercel/Netlify/Railway will auto-deploy!
```

## Environment Variables Management

### Adding New Variables

**Vercel**:
1. Go to Project Settings → Environment Variables
2. Add new variable
3. Redeploy (or it will auto-deploy on next push)

**Netlify**:
1. Site Settings → Environment Variables
2. Add new variable
3. Trigger new deploy

**Railway**:
1. Service → Variables
2. Add new variable
3. Auto-redeploys

## Monitoring & Logs

### Vercel
- Go to your project
- Click "Deployments"
- Click on a deployment
- View "Build Logs" or "Function Logs"

### Netlify
- Go to "Deploys"
- Click on a deploy
- View "Deploy log"

### Railway
- Click on your service
- Go to "Deployments"
- View logs

## Performance Optimization

### 1. Enable Analytics (Vercel)
- Go to Project Settings → Analytics
- Enable Vercel Analytics (free)
- Track page views and performance

### 2. Enable Caching
Already configured in Next.js!

### 3. Optimize Images
If you add images, use Next.js Image component:
```tsx
import Image from 'next/image'

<Image src={book.image_url} alt={book.title} width={200} height={300} />
```

## Security Best Practices

### 1. Environment Variables
- ✅ Never commit `.env.local` to git
- ✅ Use different Supabase projects for dev/prod
- ✅ Rotate API keys periodically

### 2. Supabase Security
- ✅ Row Level Security is enabled
- ✅ Use anon key (not service key) in frontend
- ✅ Keep service role key secret

### 3. Email Security
- ✅ Verify your domain in Resend
- ✅ Monitor email usage
- ✅ Set up SPF/DKIM records

## Troubleshooting Deployment

### Build Fails
1. Check build logs
2. Ensure all dependencies are in `package.json`
3. Test build locally: `npm run build`
4. Check environment variables are set

### App Loads but Features Don't Work
1. Check environment variables are set correctly
2. Check browser console for errors
3. Verify Supabase URL is accessible
4. Test API routes manually

### Email Not Sending
1. Verify Resend API key is set
2. Check Resend dashboard for errors
3. Verify admin email is correct
4. Check function logs for errors

### Database Errors
1. Verify Supabase credentials
2. Check if SQL setup was run
3. Verify RLS policies are correct
4. Check Supabase logs

## Costs

All these services have generous free tiers:

### Vercel Free Tier
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Custom domains

### Supabase Free Tier
- ✅ 500MB database
- ✅ 50,000 monthly active users
- ✅ 2GB file storage
- ✅ 50,000 monthly email sends

### Resend Free Tier
- ✅ 100 emails/day
- ✅ 3,000 emails/month
- ✅ 1 verified domain

### When to Upgrade?
- More than 100 emails/day
- More than 500MB database
- Need more bandwidth
- Want advanced features

## Next Steps

1. **Share Your App**: Send the URL to friends!
2. **Monitor Usage**: Check analytics
3. **Add Features**: See PROJECT_OVERVIEW.md for ideas
4. **Get Feedback**: Improve based on user feedback
5. **Scale**: Upgrade plans as needed

## Support

- **Vercel**: https://vercel.com/docs
- **Netlify**: https://docs.netlify.com
- **Railway**: https://docs.railway.app
- **Supabase**: https://supabase.com/docs
- **Resend**: https://resend.com/docs

---

🎉 **Congratulations on deploying your BookStore app!**

