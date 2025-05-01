// src/pages/CourseBoardPage.tsx
import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import useAuth from '../hooks/useAuth'
import { Course } from '../types/models'
import Navbar from '../components/Navbar'

const CourseBoardPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedType, setSelectedType] = useState<'text' | 'video' | 'audio' | null>(null)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await api.get<Course[]>('/courses')
        setCourses(res.data)
      } catch (err) {
        console.error(err)
        setError('No se pudieron cargar los cursos.')
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  const types: Array<'text' | 'video' | 'audio'> = ['text', 'video', 'audio']

  const filtered = useMemo(() => {
    return courses.filter(c => {
      const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = selectedType ? c.type === selectedType : true
      return matchesSearch && matchesType
    })
  }, [courses, searchTerm, selectedType])

  if (loading) return <p className="p-4">Cargando cursos...</p>
  if (error) return <p className="p-4 text-red-600">{error}</p>

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6 pt-24">
        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar cursos..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Filter by type */}
        <nav className="mb-6 overflow-x-auto">
          <ul className="flex space-x-4">
            <li>
              <button
                onClick={() => setSelectedType(null)}
                className={`px-4 py-2 rounded-full border ${
                  selectedType === null
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } transition`}
              >
                Todos
              </button>
            </li>
            {types.map(type => (
              <li key={type}>
                <button
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedType === type
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  } transition capitalize`}
                >
                  {type}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Courses grid */}
        {filtered.length === 0 ? (
          <p>No se encontraron cursos.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(c => (
              <div
                key={c.id}
                className="border rounded-lg shadow-sm hover:shadow-md transition p-4 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold text-indigo-700 mb-1">
                    {c.title}
                  </h3>
                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                    {c.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-500 capitalize">
                    {c.type}
                  </span>
                  <a
                    href={c.resource_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition text-sm"
                  >
                    Ver recurso
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default CourseBoardPage
