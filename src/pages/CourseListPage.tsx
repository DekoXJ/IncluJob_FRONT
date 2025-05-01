// src/pages/CourseListPage.tsx
import React, { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { Course } from '../types/models'

const CourseListPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedType, setSelectedType] = useState<'text' | 'video' | 'audio' | ''>('')
  const navigate = useNavigate()

  const fetchCourses = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.get<Course[]>('/courses')
      setCourses(res.data)
    } catch {
      setError('No se pudieron cargar los cursos.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  const types: Array<'text' | 'video' | 'audio'> = ['text', 'video', 'audio']

  const filtered = useMemo(() => {
    return courses.filter(c => {
      const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = selectedType === '' || c.type === selectedType
      return matchesSearch && matchesType
    })
  }, [courses, searchTerm, selectedType])

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Eliminar este curso?')) return
    try {
      await api.delete(`/courses/${id}`)
      fetchCourses()
    } catch {
      alert('Error al eliminar el curso.')
    }
  }

  if (loading) return <p className="p-4">Cargando cursos...</p>
  if (error)   return <p className="p-4 text-red-600">{error}</p>

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
        <h2 className="text-3xl font-bold text-gray-800">Cursos</h2>
        <Link
          to="new"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition"
        >
          + Nuevo Curso
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:space-x-4 mb-6 space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Buscar por título..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          value={selectedType}
          onChange={e => setSelectedType(e.target.value as any)}
          className="w-full md:w-1/4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Todos los tipos</option>
          {types.map(t => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow border rounded-lg">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Publicado</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(c => (
              <tr key={c.id} className="bg-white odd:bg-gray-50">
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{c.id}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{c.title}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 capitalize">{c.type}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {new Date(c.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <Link
                    to={`${c.id}`}
                    className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
                  >
                    Ver
                  </Link>
                  <Link
                    to={`${c.id}/edit`}
                    className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-300 transition"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-400 transition"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-2 text-center text-sm text-gray-500">
                  No se encontraron cursos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CourseListPage