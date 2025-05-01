// src/pages/JobBoardPage.tsx
import React, { useEffect, useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import useAuth from '../hooks/useAuth'
import { Job, Company } from '../types/models'
import Navbar from '../components/Navbar'

const JobBoardPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null)
  const { user } = useAuth()
  const navigate = useNavigate()

  // fetch jobs and companies
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true)
      setError(null)
      try {
        const [jobsRes, compsRes] = await Promise.all([
          api.get<Job[]>('/jobs'),
          api.get<Company[]>('/companies')
        ])
        setJobs(jobsRes.data)
        setCompanies(compsRes.data)
      } catch {
        setError('No se pudieron cargar las vacantes.')
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  // map company id to name
  const companyMap = useMemo(() => {
    const m: Record<number, string> = {}
    companies.forEach(c => { m[c.id] = c.name })
    return m
  }, [companies])

  // filtered by search and company
  const filteredJobs = useMemo(() => {
    return jobs.filter(j => {
      const matchesSearch =
        j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (companyMap[j.company_id] || '')
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      const matchesCompany = selectedCompany
        ? j.company_id === selectedCompany
        : true
      return matchesSearch && matchesCompany
    })
  }, [jobs, companyMap, searchTerm, selectedCompany])

  const handleApply = async (jobId: number) => {
    if (!user) {
      navigate('/register')
      return
    }
    try {
      await api.post('/applications', { job_id: jobId })
      alert('¡Postulación enviada!')
    } catch {
      alert('Error al postular. Intenta de nuevo.')
    }
  }

  if (loading) return <p className="p-4">Cargando vacantes...</p>
  if (error) return <p className="p-4 text-red-600">{error}</p>

  return (
    <>
      {/* Header */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6 pt-24">
        {/* Search bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar vacantes o empresas..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Filter nav */}
        <nav className="mb-6 overflow-x-auto">
          <ul className="flex space-x-4">
            <li>
              <button
                onClick={() => setSelectedCompany(null)}
                className={`px-4 py-2 rounded-full border ${
                  selectedCompany === null
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } transition`}
              >
                Todas
              </button>
            </li>
            {companies.map(c => (
              <li key={c.id}>
                <button
                  onClick={() => setSelectedCompany(c.id)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedCompany === c.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  } transition whitespace-nowrap`}
                >
                  {c.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Jobs grid */}
        {filteredJobs.length === 0 ? (
          <p>No se encontraron vacantes.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map(job => (
              <div
                key={job.id}
                className="border rounded-lg shadow-sm hover:shadow-md transition p-4 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold text-indigo-700 mb-1">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {companyMap[job.company_id] || `Empresa ${job.company_id}`}
                  </p>
                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                    {job.description}
                  </p>
                </div>
                <div className="mt-4 space-y-2">
                  <span className="block text-xs text-gray-500 mb-2">
                    {new Date(job.created_at).toLocaleDateString()}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleApply(job.id)}
                      className="flex-1 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition text-sm"
                    >
                      {user ? 'Postularme' : 'Regístrate para postular'}
                    </button>
                    <Link
                      to={`/jobs/${job.id}`}
                      className="flex-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 transition text-sm text-center"
                    >
                      Ver Trabajo
                    </Link>
                    <Link
                      to={`/app/companies/${job.company_id}`}
                      className="flex-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-500 transition text-sm text-center"
                    >
                      Ver Empresa
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default JobBoardPage