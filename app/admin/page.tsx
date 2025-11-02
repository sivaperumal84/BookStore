'use client'

import { useEffect, useState } from 'react'
import { supabase, Book } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { BookOpen, Plus, Trash2, LogOut, Edit } from 'lucide-react'

export default function AdminDashboard() {
  const router = useRouter()
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
    stock: '',
    image_url: '',
  })

  useEffect(() => {
    checkAdmin()
    fetchBooks()
  }, [])

  async function checkAdmin() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/login')
      return
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', session.user.id)
      .single()

    if (!profile?.is_admin) {
      toast.error('Access denied. Admin only.')
      router.push('/books')
    }
  }

  async function fetchBooks() {
    try {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setBooks(data || [])
    } catch (error: any) {
      toast.error('Failed to fetch books')
    } finally {
      setLoading(false)
    }
  }

  async function handleAddBook(e: React.FormEvent) {
    e.preventDefault()
    
    try {
      const { error } = await supabase.from('books').insert([
        {
          title: formData.title,
          author: formData.author,
          description: formData.description,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          image_url: formData.image_url || null,
        },
      ])

      if (error) throw error

      toast.success('Book added successfully!')
      setShowAddModal(false)
      resetForm()
      fetchBooks()
    } catch (error: any) {
      toast.error(error.message || 'Failed to add book')
    }
  }

  async function handleUpdateBook(e: React.FormEvent) {
    e.preventDefault()
    if (!editingBook) return

    try {
      const { error } = await supabase
        .from('books')
        .update({
          title: formData.title,
          author: formData.author,
          description: formData.description,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          image_url: formData.image_url || null,
        })
        .eq('id', editingBook.id)

      if (error) throw error

      toast.success('Book updated successfully!')
      setEditingBook(null)
      resetForm()
      fetchBooks()
    } catch (error: any) {
      toast.error(error.message || 'Failed to update book')
    }
  }

  async function handleDeleteBook(id: string) {
    if (!confirm('Are you sure you want to delete this book?')) return

    try {
      const { error } = await supabase.from('books').delete().eq('id', id)

      if (error) throw error

      toast.success('Book deleted successfully!')
      fetchBooks()
    } catch (error: any) {
      toast.error('Failed to delete book')
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  function resetForm() {
    setFormData({
      title: '',
      author: '',
      description: '',
      price: '',
      stock: '',
      image_url: '',
    })
  }

  function openEditModal(book: Book) {
    setEditingBook(book)
    setFormData({
      title: book.title,
      author: book.author,
      description: book.description,
      price: book.price.toString(),
      stock: book.stock.toString(),
      image_url: book.image_url || '',
    })
  }

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
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <BookOpen className="w-8 h-8 text-primary-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Manage Books</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Book
          </button>
        </div>

        {/* Books Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div key={book.id} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-2">{book.title}</h3>
              <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
              <p className="text-gray-700 text-sm mb-4 line-clamp-2">{book.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-primary-600 font-bold text-lg">${book.price}</span>
                <span className="text-gray-600 text-sm">Stock: {book.stock}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(book)}
                  className="flex-1 flex items-center justify-center bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteBook(book.id)}
                  className="flex-1 flex items-center justify-center bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {books.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No books yet. Add your first book!</p>
          </div>
        )}
      </main>

      {/* Add/Edit Modal */}
      {(showAddModal || editingBook) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">
              {editingBook ? 'Edit Book' : 'Add New Book'}
            </h3>
            <form onSubmit={editingBook ? handleUpdateBook : handleAddBook} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  rows={3}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (optional)</label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingBook(null)
                    resetForm()
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  {editingBook ? 'Update' : 'Add'} Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

