// src/pages/CourseFormPage.tsx
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api/axios'
import Navbar from '../components/Navbar'
import { Course } from '../types/models'

const CourseFormPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [type, setType] = useState<'text' | 'video' | 'audio'>('text')
  const [resourceUrl, setResourceUrl] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(isEdit)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // If editing, load existing course
  useEffect(() => {
    if (!isEdit) {
      setLoading(false)
      return
    }
    api
      .get<Course>(`/courses/${id}`)
      .then(res => {
        const c = res.data
        setTitle(c.title)
        setDescription(c.description || '')
        setType(c.type)
        setResourceUrl(c.resource_url)
      })
      .catch(err => {
        console.error(err)
        setError('No se pudo cargar el curso.')
      })
      .finally(() => setLoading(false))
  }, [id, isEdit])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!title.trim() || !resourceUrl.trim()) {
      setError('Título y URL de recurso son obligatorios.')
      return
    }
    setSubmitting(true)
    try {
      const payload = { title, description, type, resource_url: resourceUrl }
      if (isEdit) {
        await api.put(`/courses/${id}`, payload)
      } else {
        await api.post('/courses', payload)
      }
      navigate('/app/courses')
    } catch (err: any) {
      console.error(err)
      setError(err.response?.data?.message || 'Error guardando el curso.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <p className="p-4">Cargando curso...</p>
  if (error && !submitting) return <p className="p-4 text-red-600">{error}</p>

  return (
    <>
      <Navbar />
      <div className="pt-24 max-w-lg mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">
          {isEdit ? 'Editar Curso' : 'Nuevo Curso'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow rounded-lg p-6">
          <div>
            <label className="block mb-1 font-medium">Título</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Descripción</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Tipo de recurso</label>
            <select
              value={type}
              onChange={e => setType(e.target.value as 'text' | 'video' | 'audio')}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="text">Texto</option>
              <option value="video">Video</option>
              <option value="audio">Audio</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">URL del Recurso</label>
            <input
              type="url"
              value={resourceUrl}
              onChange={e => setResourceUrl(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/app/courses')}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition"
            >
              {submitting
                ? isEdit
                  ? 'Actualizando...'
                  : 'Creando...'
                : isEdit
                ? 'Actualizar'
                : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default CourseFormPage