// src/pages/JobListPage.tsx
import React, { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { Job, Company } from '../types/models'

const JobListPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCompany, setSelectedCompany] = useState<number | ''>('')
  const navigate = useNavigate()

  // Carga vacantes y empresas
  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [jobsRes, compsRes] = await Promise.all([
        api.get<Job[]>('/jobs'),
        api.get<Company[]>('/companies'),
      ])
      setJobs(jobsRes.data)
      setCompanies(compsRes.data)
    } catch (err) {
      console.error(err)
      setError('No se pudieron cargar las vacantes o empresas.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Mapa de empresa_id → nombre
  const companyMap = useMemo(() => {
    const m: Record<number, string> = {}
    companies.forEach(c => { m[c.id] = c.name })
    return m
  }, [companies])

  // Vacantes filtradas por búsqueda y empresa
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCompany = selectedCompany === '' || job.company_id === selectedCompany
      return matchesSearch && matchesCompany
    })
  }, [jobs, searchTerm, selectedCompany])

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Eliminar esta vacante?')) return
    try {
      await api.delete(`/jobs/${id}`)
      fetchData()
    } catch {
      alert('Error al eliminar la vacante.')
    }
  }

  if (loading) return <p className="p-4">Cargando vacantes...</p>
  if (error)   return <p className="p-4 text-red-600">{error}</p>

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
        <h2 className="text-3xl font-bold text-gray-800">Vacantes</h2>
        <Link
          to="new"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition"
        >
          + Nueva Vacante
        </Link>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row md:space-x-4 mb-6 space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Buscar por título..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          value={selectedCompany}
          onChange={e =>
            setSelectedCompany(e.target.value ? Number(e.target.value) : '')
          }
          className="w-full md:w-1/4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Todas las empresas</option>
          {companies.map(c => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tabla de vacantes */}
      <div className="overflow-x-auto shadow border rounded-lg">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Empresa</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredJobs.map(job => (
              <tr key={job.id} className="bg-white odd:bg-gray-50">
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{job.id}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                  {companyMap[job.company_id] || `ID ${job.company_id}`}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{job.title}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {new Date(job.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <Link
                    to={`${job.id}`}
                    className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
                  >
                    Ver
                  </Link>
                  <Link
                    to={`${job.id}/edit`}
                    className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-300 transition"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-400 transition"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {filteredJobs.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-2 text-center text-sm text-gray-500">
                  No se encontraron vacantes.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default JobListPage