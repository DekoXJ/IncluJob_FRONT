// src/pages/CourseDetailPage.tsx
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'
import { Course } from '../types/models'
import Navbar from '../components/Navbar'

const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setError('ID de curso inválido')
      setLoading(false)
      return
    }
    const fetchCourse = async () => {
      try {
        setLoading(true)
        const res = await api.get<Course>(`/courses/${id}`)
        setCourse(res.data)
      } catch (err) {
        console.error(err)
        setError('No se pudo cargar el curso.')
      } finally {
        setLoading(false)
      }
    }
    fetchCourse()
  }, [id])

  const handleDelete = async () => {
    if (!course) return
    if (!window.confirm('¿Eliminar este curso?')) return
    try {
      await api.delete(`/courses/${course.id}`)
      navigate('/app/courses')
    } catch (err) {
      console.error(err)
      alert('Error al eliminar el curso.')
    }
  }

  if (loading) return <p className="p-4">Cargando curso...</p>
  if (error)   return <p className="p-4 text-red-600">{error}</p>
  if (!course) return <p className="p-4">Curso no encontrado.</p>

  return (
    <>
      <div className="pt-24 max-w-2xl mx-auto px-4">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
          <p className="text-sm text-gray-600 mb-2">
            Tipo: {course.type.charAt(0).toUpperCase() + course.type.slice(1)}
          </p>
          <p className="text-xs text-gray-500 mb-2">
            Creado por: {course.creator_name || 'Desconocido'}
          </p>
          <p className="mb-4 whitespace-pre-line">{course.description || 'Sin descripción.'}</p>
          <a
            href={course.resource_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition"
          >
            Ver recurso
          </a>
          <p className="text-xs text-gray-500 mb-6">
            Publicado: {new Date(course.created_at).toLocaleDateString()}
          </p>
          <div className="flex space-x-4">
            <Link
              to={`/app/courses/${course.id}/edit`}
              className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-300 transition"
            >
              Editar
            </Link>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400 transition"
            >
              Eliminar
            </button>
            <button
              onClick={() => navigate('/app/courses')}
              className="px-4 py-2 border rounded hover:bg-gray-100 transition"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseDetailPage