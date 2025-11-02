import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(
  supabaseUrl || 'https://afqlrqpsvvfzkdacqwfx.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmcWxycXBzdnZmemtkYWNxd2Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwOTQyNzksImV4cCI6MjA3NzY3MDI3OX0.vCAdP630uwvaeK6ZNISMo3LZC72ea-AmlKbDPL8asH4'
)

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

