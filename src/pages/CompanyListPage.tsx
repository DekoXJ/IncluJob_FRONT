// src/pages/CompanyListPage.tsx
import React, { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { Company } from '../types/models'

const CompanyListPage: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const navigate = useNavigate()

  const fetchCompanies = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.get<Company[]>('/companies')
      setCompanies(res.data)
    } catch (err) {
      console.error(err)
      setError('No se pudieron cargar las empresas.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCompanies()
  }, [])

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Eliminar esta empresa?')) return
    try {
      await api.delete(`/companies/${id}`)
      fetchCompanies()
    } catch (err) {
      console.error(err)
      alert('Error al eliminar la empresa')
    }
  }

  const filteredCompanies = useMemo(() =>
    companies.filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  , [companies, searchTerm])

  if (loading) return <p className="p-4">Cargando empresas...</p>
  if (error)   return <p className="p-4 text-red-600">{error}</p>

  return (
    <div>
      {/* Header with title and create button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
        <h2 className="text-3xl font-bold text-gray-800">Empresas</h2>
        <Link
          to="new"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition"
        >
          + Nueva Empresa
        </Link>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Responsive table */}
      <div className="overflow-x-auto shadow border rounded-lg">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredCompanies.map(c => (
              <tr key={c.id} className="bg-white odd:bg-gray-50">
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{c.id}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{c.name}</td>
                <td className="px-4 py-2 whitespace-normal text-sm text-gray-600">
                  {c.description || '-'}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {new Date(c.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button
                    onClick={() => navigate(`${c.id}`)}
                    className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
                  >
                    Ver
                  </button>
                  <button
                    onClick={() => navigate(`${c.id}/edit`)}
                    className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-300 transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-400 transition"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {filteredCompanies.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-2 text-center text-sm text-gray-500">
                  No se encontraron empresas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CompanyListPage
