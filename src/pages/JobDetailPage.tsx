// src/pages/JobDetailPage.tsx
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'
import { Job } from '../types/models'
import Navbar from '../components/Navbar'

const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [job, setJob] = useState<Job | null>(null)
  const [companyName, setCompanyName] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setError('ID de vacante inválido')
      setLoading(false)
      return
    }
    const fetchData = async () => {
      try {
        setLoading(true)
        // Obtener vacante
        const res = await api.get<Job>(`/jobs/${id}`)
        setJob(res.data)
        // Obtener nombre de empresa
        const compRes = await api.get<{ name: string }>(`/companies/${res.data.company_id}`)
        setCompanyName(compRes.data.name)
      } catch (err) {
        console.error(err)
        setError('No se pudo cargar la vacante.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  const handleDelete = async () => {
    if (!job) return
    if (!window.confirm('¿Eliminar esta vacante?')) return
    try {
      await api.delete(`/jobs/${job.id}`)
      navigate('/app/jobs')
    } catch (err) {
      console.error(err)
      alert('Error al eliminar la vacante.')
    }
  }

  if (loading) return <p className="p-4">Cargando vacante...</p>
  if (error)   return <p className="p-4 text-red-600">{error}</p>
  if (!job)   return <p className="p-4">Vacante no encontrada.</p>

  return (
    <>
      <div className="pt-24 max-w-2xl mx-auto px-4">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
          <p className="text-sm text-gray-600 mb-4">Empresa: {companyName}</p>
          <p className="mb-4 whitespace-pre-line">{job.description}</p>
          {job.requirements && (
            <div className="mb-4">
              <h2 className="font-medium">Requisitos:</h2>
              <p className="whitespace-pre-line">{job.requirements}</p>
            </div>
          )}
          {job.disability_filter && (
            <p className="mb-4 text-sm text-gray-500">
              Filtro de discapacidad: {job.disability_filter}
            </p>
          )}
          <p className="text-xs text-gray-500 mb-6">
            Publicada: {new Date(job.created_at).toLocaleDateString()}
          </p>
          <div className="flex space-x-4">
            <Link
              to={`/app/jobs/${job.id}/edit`}
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
              onClick={() => navigate('/app/jobs')}
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

export default JobDetailPage
