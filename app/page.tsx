'use client'

import { useState } from 'react'
import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://mail.litsuite.app:8000'

export default function Home() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [mode, setMode] = useState<'landing' | 'login' | 'signup'>('landing')

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const email = `${username}@litmail.art`
      const params = new URLSearchParams({
        email,
        password,
      })
      const response = await fetch(`${API_URL}/api/v1/auth/signup?${params}`, {
        method: 'POST',
      })

      const data = await response.json()
      if (response.ok) {
        setMode('landing')
        setUsername('')
        setPassword('')
        alert(`✅ Welcome to LitMail! Your email: ${email}\n\nYou can now log in.`)
      } else {
        setError(data.detail || 'Signup failed')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const email = `${username}@litmail.art`
      const params = new URLSearchParams({
        email,
        password,
      })
      const response = await fetch(`${API_URL}/api/v1/auth/login?${params}`, {
        method: 'POST',
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('token', data.token)
        window.location.href = '/mail'
      } else {
        setError('Invalid credentials')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  // Landing Page
  if (mode === 'landing') {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* Header */}
        <header className="border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">LitMail</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setMode('login')}
                className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
              >
                Sign in
              </button>
              <button
                onClick={() => setMode('signup')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
              >
                Create account
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center px-6 py-20">
          <div className="max-w-2xl text-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
              LitMail is the <span className="text-blue-600">littest mail</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Fast, simple, private email. Get your free @litmail.art address today.
            </p>
            <button
              onClick={() => setMode('signup')}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition"
            >
              Create free account
            </button>
            <p className="text-sm text-gray-500 mt-4">
              Free forever. No credit card required.
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center text-sm text-gray-600">
            <p>© 2026 LitMail</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-gray-900">About</a>
              <a href="#" className="hover:text-gray-900">Privacy</a>
              <a href="#" className="hover:text-gray-900">Terms</a>
            </div>
          </div>
        </footer>
      </div>
    )
  }

  // Login Page
  if (mode === 'login') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h1>
            <p className="text-gray-600">to LitMail</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email or username
              </label>
              <div className="flex">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="you"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:border-blue-500"
                />
                <div className="px-4 py-3 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg flex items-center text-gray-600 font-medium">
                  @litmail.art
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            {error && (
              <div className="px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition"
            >
              {loading ? 'Signing in...' : 'Next'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => {
                  setMode('signup')
                  setError('')
                  setUsername('')
                  setPassword('')
                }}
                className="text-blue-600 font-semibold hover:underline"
              >
                Create one
              </button>
            </p>
          </div>

          <button
            onClick={() => {
              setMode('landing')
              setError('')
              setUsername('')
              setPassword('')
            }}
            className="w-full mt-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
          >
            ← Back
          </button>
        </div>
      </div>
    )
  }

  // Signup Page
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">L</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create your LitMail account</h1>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Choose your email
            </label>
            <div className="flex">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ''))}
                placeholder="yourname"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:border-blue-500"
              />
              <div className="px-4 py-3 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg flex items-center text-gray-600 font-medium">
                @litmail.art
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {username && `Your email: ${username}@litmail.art`}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              At least 8 characters
            </p>
          </div>

          {error && (
            <div className="px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !username || password.length < 8}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => {
                setMode('login')
                setError('')
                setUsername('')
                setPassword('')
              }}
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>

        <button
          onClick={() => {
            setMode('landing')
            setError('')
            setUsername('')
            setPassword('')
          }}
          className="w-full mt-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
        >
          ← Back
        </button>
      </div>
    </div>
  )
}
