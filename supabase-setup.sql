-- BookStore Database Setup for Supabase
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create books table
CREATE TABLE IF NOT EXISTS books (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cart table
CREATE TABLE IF NOT EXISTS cart (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  book_id UUID REFERENCES books(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, book_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Books policies
CREATE POLICY "Anyone can view books"
  ON books FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can insert books"
  ON books FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

CREATE POLICY "Only admins can update books"
  ON books FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

CREATE POLICY "Only admins can delete books"
  ON books FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Cart policies
CREATE POLICY "Users can view their own cart"
  ON cart FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert into their own cart"
  ON cart FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cart"
  ON cart FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete from their own cart"
  ON cart FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cart_user_id ON cart(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_book_id ON cart(book_id);
CREATE INDEX IF NOT EXISTS idx_books_created_at ON books(created_at DESC);

-- Insert sample books (optional)
INSERT INTO books (title, author, description, price, stock) VALUES
  ('The Great Gatsby', 'F. Scott Fitzgerald', 'A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.', 12.99, 50),
  ('To Kill a Mockingbird', 'Harper Lee', 'A gripping tale of racial injustice and childhood innocence in the American South.', 14.99, 45),
  ('1984', 'George Orwell', 'A dystopian social science fiction novel and cautionary tale about totalitarianism.', 13.99, 60),
  ('Pride and Prejudice', 'Jane Austen', 'A romantic novel of manners that critiques the British landed gentry at the end of the 18th century.', 11.99, 40),
  ('The Catcher in the Rye', 'J.D. Salinger', 'A story about teenage rebellion and alienation narrated by Holden Caulfield.', 12.99, 35);

-- Function to create admin user (run this after creating your first user)
-- Replace 'your-email@example.com' with your actual email
-- UPDATE profiles SET is_admin = true WHERE email = 'your-email@example.com';

