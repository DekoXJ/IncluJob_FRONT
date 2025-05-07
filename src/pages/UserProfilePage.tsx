// src/pages/UserProfilePage.tsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import useAuth from '../hooks/useAuth'
import Navbar from '../components/Navbar'

interface ProfileData {
  id: number
  name: string
  email: string
  disability: string
  created_at: string
}

const UserProfilePage: React.FC = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [disability, setDisability] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        const res = await api.get<ProfileData>('/users/me')
        setProfile(res.data)
        setName(res.data.name)
        setEmail(res.data.email)
        setDisability(res.data.disability)
      } catch (err) {
        console.error(err)
        setError('No se pudo cargar tu perfil.')
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!name.trim() || !email.trim()) {
      setError('Nombre y correo son obligatorios.')
      return
    }
    setSubmitting(true)
    try {
      const payload = { name, email, disability }
      await api.put<ProfileData>('/users/me', payload)
      // después de actualizar, recargar perfil
      const res = await api.get<ProfileData>('/users/me')
      setProfile(res.data)
      alert('Perfil actualizado.')
    } catch (err: any) {
      console.error(err)
      setError(err.response?.data?.message || 'Error al actualizar perfil.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!window.confirm('¿Eliminar tu cuenta? Esta acción es irreversible.')) return
    try {
      await api.delete('/users/me')
      logout()
      navigate('/')
    } catch (err) {
      console.error(err)
      alert('Error al eliminar la cuenta.')
    }
  }

  if (loading) return <p className="p-4">Cargando perfil...</p>
  if (error)   return <p className="p-4 text-red-600">{error}</p>
  if (!profile) return null

  return (
    <>
      <div className="pt-24 max-w-md mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow rounded-lg p-6">
          <div>
            <label className="block font-medium mb-1">Nombre</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Correo</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Discapacidad</label>
            <input
              type="text"
              value={disability}
              onChange={e => setDisability(e.target.value)}
              placeholder="p.ej. física, psicosocial"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Fecha de registro</label>
            <p className="text-gray-600">{new Date(profile.created_at).toLocaleDateString()}</p>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={handleDeleteAccount}
              className="px-4 py-2 text-red-600 border border-red-600 rounded hover:bg-red-50 transition"
            >
              Eliminar Cuenta
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition"
            >
              {submitting ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default UserProfilePage