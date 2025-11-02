# 📚 BookStore - Project Overview

## 🎯 What You've Built

A complete, production-ready online bookstore application with:
- **Admin Dashboard** - Manage books (add, edit, delete)
- **User Interface** - Browse books and shopping cart
- **Authentication** - Secure login/signup system
- **Email Notifications** - Admin gets notified when users add items to cart
- **Database** - PostgreSQL via Supabase
- **Responsive Design** - Works on desktop, tablet, and mobile

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Home Page   │  │ Admin Panel  │  │  User Books  │      │
│  │  Login/Signup│  │ (CRUD Books) │  │  (Shopping)  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    API Routes (Next.js)                      │
│                  /api/notify-admin (Email)                   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   Backend Services                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Supabase   │  │   Supabase   │  │    Resend    │      │
│  │  (Database)  │  │    (Auth)    │  │   (Email)    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## 📂 Project Structure

```
BookStore/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Home/Landing page
│   ├── layout.tsx                # Root layout with Toaster
│   ├── globals.css               # Global styles + Tailwind
│   ├── login/page.tsx            # Login page
│   ├── signup/page.tsx           # Sign up page
│   ├── admin/page.tsx            # Admin dashboard (protected)
│   ├── books/page.tsx            # User books & cart page (protected)
│   └── api/
│       └── notify-admin/route.ts # Email notification API
│
├── lib/                          # Utility libraries
│   ├── supabase.ts               # Supabase client & TypeScript types
│   └── email.ts                  # Email service (Resend)
│
├── supabase-setup.sql            # Database schema & policies
├── .env.local.example            # Environment variables template
├── README.md                     # Main documentation
├── SETUP_GUIDE.md                # Step-by-step setup instructions
└── PROJECT_OVERVIEW.md           # This file
```

## 🗄️ Database Schema

### Tables

1. **profiles**
   - `id` (UUID, references auth.users)
   - `email` (TEXT)
   - `is_admin` (BOOLEAN)
   - `created_at` (TIMESTAMP)

2. **books**
   - `id` (UUID, primary key)
   - `title` (TEXT)
   - `author` (TEXT)
   - `description` (TEXT)
   - `price` (DECIMAL)
   - `stock` (INTEGER)
   - `image_url` (TEXT, optional)
   - `created_at` (TIMESTAMP)

3. **cart**
   - `id` (UUID, primary key)
   - `user_id` (UUID, references auth.users)
   - `book_id` (UUID, references books)
   - `quantity` (INTEGER)
   - `created_at` (TIMESTAMP)

### Security (Row Level Security)

- **Profiles**: Users can only view/update their own profile
- **Books**: 
  - Anyone (authenticated) can view
  - Only admins can add/edit/delete
- **Cart**: 
  - Users can only access their own cart items

## 🔐 Authentication Flow

```
User Signs Up
    ↓
Account Created in Supabase Auth
    ↓
Profile Created (is_admin = false by default)
    ↓
User Logs In
    ↓
Check if Admin?
    ├─ Yes → Redirect to /admin
    └─ No  → Redirect to /books
```

## 🛒 Shopping Cart Flow

```
User Browses Books (/books)
    ↓
Clicks "Add to Cart"
    ↓
Item Added to Database (cart table)
    ↓
Email Sent to Admin (via Resend API)
    ↓
Cart Updated in UI
    ↓
User Can Adjust Quantities or Remove Items
```

## 👨‍💼 Admin Features

### Dashboard (/admin)
- View all books in grid layout
- Add new books with form modal
- Edit existing books
- Delete books with confirmation
- Real-time updates

### Book Management
- Title, Author, Description
- Price (decimal)
- Stock quantity
- Optional image URL

## 👤 User Features

### Books Page (/books)
- Browse all available books (stock > 0)
- View book details (title, author, description, price)
- Add books to cart
- View cart in sidebar
- Adjust quantities (+/-)
- Remove items from cart
- See cart total

## 📧 Email Notifications

When a user adds an item to cart:
1. API route `/api/notify-admin` is called
2. Email sent via Resend to admin
3. Email contains:
   - User's email
   - Book title
   - Quantity added

## 🎨 UI/UX Features

- **Responsive Design**: Works on all screen sizes
- **Loading States**: Spinners while fetching data
- **Toast Notifications**: Success/error messages
- **Modal Dialogs**: For adding/editing books
- **Icons**: Lucide React icons throughout
- **Color Scheme**: Primary blue theme (customizable)
- **Smooth Transitions**: Hover effects and animations

## 🔧 Tech Stack Details

### Frontend
- **Next.js 16**: React framework with App Router
- **TypeScript**: Type-safe code
- **Tailwind CSS**: Utility-first styling
- **React Hot Toast**: Toast notifications
- **Lucide React**: Icon library

### Backend
- **Supabase**: 
  - PostgreSQL database
  - Authentication
  - Row Level Security
  - Real-time capabilities (not used yet, but available)
- **Resend**: Email delivery service

### Deployment
- **Vercel**: Recommended (free tier)
- **Netlify**: Alternative option
- **Railway/Render**: Other alternatives

## 🚀 Performance Features

- **Static Generation**: Pages pre-rendered where possible
- **Server Components**: Reduced JavaScript bundle
- **Optimized Images**: Next.js Image component ready
- **Database Indexing**: Indexes on frequently queried columns
- **Efficient Queries**: Only fetch necessary data

## 🔒 Security Features

- **Environment Variables**: Sensitive data not in code
- **Row Level Security**: Database-level access control
- **Authentication Required**: Protected routes
- **Admin Verification**: Server-side admin checks
- **SQL Injection Protection**: Supabase client handles escaping
- **XSS Protection**: React escapes by default

## 📊 Future Enhancement Ideas

### Short Term
- [ ] Search functionality
- [ ] Filter by author/price
- [ ] Sort options (price, title, date)
- [ ] Book categories/genres
- [ ] Pagination for large book lists

### Medium Term
- [ ] Order checkout and payment (Stripe)
- [ ] Order history for users
- [ ] Book reviews and ratings
- [ ] Wishlist feature
- [ ] User profile management

### Long Term
- [ ] Inventory management
- [ ] Sales analytics dashboard
- [ ] Multiple admin roles
- [ ] Book recommendations
- [ ] Advanced search with filters

## 🧪 Testing Checklist

### As Admin
- [ ] Can log in
- [ ] Can add a book
- [ ] Can edit a book
- [ ] Can delete a book
- [ ] Can see all books
- [ ] Receives email when user adds to cart

### As User
- [ ] Can sign up
- [ ] Can log in
- [ ] Can see available books
- [ ] Can add book to cart
- [ ] Can adjust cart quantities
- [ ] Can remove from cart
- [ ] Can see cart total

### General
- [ ] Responsive on mobile
- [ ] Toast notifications work
- [ ] Loading states show
- [ ] Error handling works
- [ ] Can log out

## 📝 Environment Variables Required

```env
NEXT_PUBLIC_SUPABASE_URL=        # Your Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=   # Your Supabase anon key
RESEND_API_KEY=                  # Your Resend API key
ADMIN_EMAIL=                     # Email to receive notifications
```

## 🎓 Learning Resources

- **Next.js**: https://nextjs.org/docs
- **Supabase**: https://supabase.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs
- **Resend**: https://resend.com/docs

## 💡 Tips

1. **Development**: Always use `.env.local` for local development
2. **Production**: Set environment variables in Vercel/hosting platform
3. **Database**: Backup your Supabase database regularly
4. **Email**: Verify your domain in Resend for production use
5. **Security**: Never commit `.env.local` to git (it's in .gitignore)

## 🐛 Common Issues & Solutions

See SETUP_GUIDE.md for troubleshooting section.

---

**Built with ❤️ using 100% open-source technologies**

