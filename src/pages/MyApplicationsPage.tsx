// src/pages/MyApplicationsPage.tsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import { Application } from '../types/models'

const MyApplicationsPage: React.FC = () => {
  const [apps, setApps] = useState<Application[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchApplications = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.get<Application[]>('/applications/me')
      setApps(res.data)
    } catch {
      setError('No se pudieron cargar tus postulaciones.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApplications()
  }, [])

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Eliminar esta postulación?')) return
    try {
      await api.delete(`/applications/${id}`)
      fetchApplications()
    } catch {
      alert('Error al eliminar la postulación.')
    }
  }

  if (loading) return <p className="p-4">Cargando tus postulaciones...</p>
  if (error)   return <p className="p-4 text-red-600">{error}</p>

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Mis Postulaciones</h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow border rounded-lg">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Vacante
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Estado
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Fecha
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {apps.map(app => (
              <tr key={app.id} className="bg-white odd:bg-gray-50">
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                  {app.id}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                  <Link
                    to={`/app/jobs/${app.job_id}`}
                    className="text-indigo-600 hover:underline"
                  >
                    Ver Vacante #{app.job_id}
                  </Link>
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 capitalize">
                  {app.status}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {new Date(app.applied_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button
                    onClick={() => handleDelete(app.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-400 transition"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {apps.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-2 text-center text-sm text-gray-500">
                  No tienes postulaciones.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyApplicationsPage