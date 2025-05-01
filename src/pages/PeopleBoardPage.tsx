// src/pages/PeopleBoardPage.tsx
import React, { useEffect, useState, useMemo } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'
import { User } from '../types/models'
import Navbar from '../components/Navbar'

const PeopleBoardPage: React.FC = () => {
  const [people, setPeople] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filterDisability, setFilterDisability] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPeople = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await api.get<User[]>('/users') // asegúrate de tener este endpoint
        setPeople(res.data)
      } catch (err) {
        console.error(err)
        setError('No se pudieron cargar las personas.')
      } finally {
        setLoading(false)
      }
    }
    fetchPeople()
  }, [])

  // extract unique disabilities
  const disabilities = useMemo(() => {
    const set = new Set<string>()
    people.forEach(p => set.add(p.disability))
    return Array.from(set)
  }, [people])

  const filtered = useMemo(() => {
    return people.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesDisability = filterDisability
        ? p.disability === filterDisability
        : true
      return matchesSearch && matchesDisability
    })
  }, [people, searchTerm, filterDisability])

  if (loading) return <p className="p-4">Cargando personas...</p>
  if (error) return <p className="p-4 text-red-600">{error}</p>

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6 pt-24">
        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar personas..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Filter by disability */}
        <nav className="mb-6 overflow-x-auto">
          <ul className="flex space-x-4">
            <li>
              <button
                onClick={() => setFilterDisability(null)}
                className={`px-4 py-2 rounded-full border ${
                  filterDisability === null
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } transition`}
              >
                Todas
              </button>
            </li>
            {disabilities.map(d => (
              <li key={d}>
                <button
                  onClick={() => setFilterDisability(d)}
                  className={`px-4 py-2 rounded-full border ${
                    filterDisability === d
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  } transition whitespace-nowrap`}
                >
                  {d}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* People grid */}
        {filtered.length === 0 ? (
          <p>No se encontraron personas.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(p => (
              <div
                key={p.id}
                className="border rounded-lg shadow-sm hover:shadow-md transition p-4 flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                  {p.name
                    .split(' ')
                    .map(n => n[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase()}
                </div>
                <h3 className="text-lg font-semibold mb-1">{p.name}</h3>
                <p className="text-sm text-gray-600 mb-2 capitalize">{p.disability}</p>
                <button
                  onClick={() => navigate('/register')}
                  className="mt-auto px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition"
                >
                  Registrarse para conectar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default PeopleBoardPage