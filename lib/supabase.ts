import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
 

export type Book = {
  id: string
  title: string
  author: string
  description: string
  price: number
  image_url?: string
  stock: number
  created_at: string
}

export type CartItem = {
  id: string
  user_id: string
  book_id: string
  quantity: number
  created_at: string
  book?: Book
}

export type UserProfile = {
  id: string
  email: string
  is_admin: boolean
  created_at: string
}

