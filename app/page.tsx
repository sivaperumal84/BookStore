'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { BookOpen, LogIn, UserPlus } from 'lucide-react'

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      // Check if user is admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', session.user.id)
        .single()
      
      if (profile?.is_admin) {
        router.push('/admin')
      } else {
        router.push('/books')
      }
    } else {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <BookOpen className="w-20 h-20 text-primary-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to BookStore
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your one-stop shop for all your favorite books
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
            <LogIn className="w-12 h-12 text-primary-600 mb-4" />
            <h2 className="text-2xl font-bold mb-4">Sign In</h2>
            <p className="text-gray-600 mb-6">
              Already have an account? Sign in to browse books and manage your cart.
            </p>
            <button
              onClick={() => router.push('/login')}
              className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
            >
              Sign In
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
            <UserPlus className="w-12 h-12 text-primary-600 mb-4" />
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <p className="text-gray-600 mb-6">
              New here? Create an account to start shopping for books.
            </p>
            <button
              onClick={() => router.push('/signup')}
              className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
            >
              Sign Up
            </button>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Features</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow">
              <h4 className="font-bold text-lg mb-2">Wide Selection</h4>
              <p className="text-gray-600">Browse through our extensive collection of books</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <h4 className="font-bold text-lg mb-2">Easy Shopping</h4>
              <p className="text-gray-600">Add books to your cart with just one click</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <h4 className="font-bold text-lg mb-2">Secure</h4>
              <p className="text-gray-600">Your data is safe with our secure authentication</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

