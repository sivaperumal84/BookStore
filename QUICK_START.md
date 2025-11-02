# ⚡ Quick Start - Get Running in 10 Minutes!

## 🎯 What You Have

A complete **BookStore** web application with:
- ✅ Admin dashboard to manage books
- ✅ User interface to browse and shop
- ✅ Shopping cart functionality
- ✅ Email notifications to admin
- ✅ Secure authentication
- ✅ Beautiful, responsive UI

## 🚀 Get Started NOW

### 1️⃣ Set Up Supabase (3 minutes)

1. Go to **https://supabase.com** → Sign up
2. Create new project → Wait 2 minutes
3. Go to **Settings** → **API** → Copy:
   - Project URL
   - anon/public key
4. Go to **SQL Editor** → Paste contents of `supabase-setup.sql` → Run

### 2️⃣ Set Up Resend (2 minutes)

1. Go to **https://resend.com** → Sign up
2. Verify your email
3. Go to **API Keys** → Create key → Copy it

### 3️⃣ Configure App (1 minute)

Create `.env.local` file:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your keys:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
RESEND_API_KEY=re_xxxxx
ADMIN_EMAIL=your-email@example.com
```

### 4️⃣ Run the App (1 minute)

```bash
npm install  # If not already done
npm run dev
```

Open **http://localhost:3000** 🎉

### 5️⃣ Create Admin Account (2 minutes)

1. Click **Sign Up** on the homepage
2. Create your account
3. Go to Supabase → **SQL Editor** → Run:
   ```sql
   UPDATE profiles SET is_admin = true WHERE email = 'your-email@example.com';
   ```
4. Log out and log back in → You're now admin! 👑

### 6️⃣ Test Everything (1 minute)

**As Admin:**
- Add a book
- Edit it
- Delete it

**As User:**
- Sign up with another email (or use incognito)
- Browse books
- Add to cart
- Check your admin email! 📧

## 📚 Documentation

- **SETUP_GUIDE.md** - Detailed setup instructions
- **README.md** - Full documentation
- **PROJECT_OVERVIEW.md** - Architecture and features
- **DEPLOYMENT.md** - Deploy to production (free!)

## 🆘 Need Help?

### "Failed to fetch books"
→ Check your Supabase credentials in `.env.local`

### "Access denied"
→ Run the SQL to make yourself admin, then log out/in

### Email not working
→ Verify Resend API key is correct

## 🚀 Deploy to Production (5 minutes)

1. Push to GitHub
2. Go to **https://vercel.com**
3. Import your repo
4. Add environment variables
5. Deploy!

See **DEPLOYMENT.md** for details.

## 🎨 Customize

- **Colors**: Edit `tailwind.config.js`
- **Features**: See PROJECT_OVERVIEW.md for ideas
- **Styling**: Edit files in `app/` directory

## 📁 Key Files

```
app/
├── page.tsx          → Home page
├── login/page.tsx    → Login
├── signup/page.tsx   → Sign up
├── admin/page.tsx    → Admin dashboard
└── books/page.tsx    → User books & cart

lib/
├── supabase.ts       → Database client
└── email.ts          → Email service
```

## ✨ Features

### Admin Can:
- ➕ Add books
- ✏️ Edit books
- 🗑️ Delete books
- 📊 View all inventory
- 📧 Get email notifications

### Users Can:
- 📖 Browse books
- 🛒 Add to cart
- ➕➖ Adjust quantities
- 💰 See total price
- 🔐 Secure login

## 🎯 Next Steps

1. ✅ Get it running locally (you're here!)
2. 📝 Add some books as admin
3. 🧪 Test as a user
4. 🚀 Deploy to Vercel
5. 🌟 Share with friends!

## 💡 Pro Tips

- Use **incognito mode** to test as different users
- Check **browser console** if something doesn't work
- **Supabase dashboard** shows all your data
- **Resend dashboard** shows email delivery status

---

**You're all set! Start building your bookstore empire! 📚🚀**

Questions? Check the other documentation files or open an issue on GitHub.

