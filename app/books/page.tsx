'use client'

import { useEffect, useState } from 'react'
import { supabase, Book, CartItem } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { BookOpen, ShoppingCart, LogOut, Plus, Minus } from 'lucide-react'

export default function BooksPage() {
  const router = useRouter()
  const [books, setBooks] = useState<Book[]>([])
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string>('')
  const [userEmail, setUserEmail] = useState<string>('')
  const [showCart, setShowCart] = useState(false)

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/login')
      return
    }

    setUserId(session.user.id)
    setUserEmail(session.user.email || '')
    
    await Promise.all([fetchBooks(), fetchCart(session.user.id)])
    setLoading(false)
  }

  async function fetchBooks() {
    try {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .gt('stock', 0)
        .order('created_at', { ascending: false })

      if (error) throw error
      setBooks(data || [])
    } catch (error: any) {
      toast.error('Failed to fetch books')
    }
  }

  async function fetchCart(uid: string) {
    try {
      const { data, error } = await supabase
        .from('cart')
        .select(`
          *,
          book:books(*)
        `)
        .eq('user_id', uid)

      if (error) throw error
      setCartItems(data || [])
    } catch (error: any) {
      console.error('Failed to fetch cart:', error)
    }
  }

  async function addToCart(book: Book) {
    try {
      // Check if item already in cart
      const existingItem = cartItems.find(item => item.book_id === book.id)

      if (existingItem) {
        // Update quantity
        const { error } = await supabase
          .from('cart')
          .update({ quantity: existingItem.quantity + 1 })
          .eq('id', existingItem.id)

        if (error) throw error
      } else {
        // Add new item
        const { error } = await supabase
          .from('cart')
          .insert([
            {
              user_id: userId,
              book_id: book.id,
              quantity: 1,
            },
          ])

        if (error) throw error
      }

      // Send email notification to admin
      await fetch('/api/notify-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail,
          bookTitle: book.title,
          quantity: existingItem ? existingItem.quantity + 1 : 1,
        }),
      })

      toast.success('Added to cart!')
      fetchCart(userId)
    } catch (error: any) {
      toast.error('Failed to add to cart')
    }
  }

  async function updateCartQuantity(itemId: string, newQuantity: number) {
    if (newQuantity < 1) {
      removeFromCart(itemId)
      return
    }

    try {
      const { error } = await supabase
        .from('cart')
        .update({ quantity: newQuantity })
        .eq('id', itemId)

      if (error) throw error
      fetchCart(userId)
    } catch (error: any) {
      toast.error('Failed to update quantity')
    }
  }

  async function removeFromCart(itemId: string) {
    try {
      const { error } = await supabase
        .from('cart')
        .delete()
        .eq('id', itemId)

      if (error) throw error
      toast.success('Removed from cart')
      fetchCart(userId)
    } catch (error: any) {
      toast.error('Failed to remove item')
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  const cartTotal = cartItems.reduce((sum, item) => {
    const book = item.book as Book
    return sum + (book?.price || 0) * item.quantity
  }, 0)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <BookOpen className="w-8 h-8 text-primary-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">BookStore</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative flex items-center text-gray-600 hover:text-gray-900"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Books</h2>

        {/* Books Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            <div key={book.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
              {book.image_url && (
                <div className="mb-4 h-48 bg-gray-200 rounded flex items-center justify-center">
                  <img
                    src={book.image_url}
                    alt={book.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              )}
              <h3 className="text-lg font-bold mb-2">{book.title}</h3>
              <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
              <p className="text-gray-700 text-sm mb-4 line-clamp-3">{book.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-primary-600 font-bold text-xl">${book.price}</span>
                <span className="text-gray-600 text-sm">In stock: {book.stock}</span>
              </div>
              <button
                onClick={() => addToCart(book)}
                className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {books.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No books available at the moment.</p>
          </div>
        )}
      </main>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowCart(false)}>
          <div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Your Cart</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ✕
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => {
                      const book = item.book as Book
                      if (!book) return null
                      
                      return (
                        <div key={item.id} className="border rounded-lg p-4">
                          <h3 className="font-bold mb-1">{book.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-primary-600 font-bold">${book.price}</span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-bold">Total:</span>
                      <span className="text-2xl font-bold text-primary-600">
                        ${cartTotal.toFixed(2)}
                      </span>
                    </div>
                    <button className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold">
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

