// src/pages/JobViewPage.tsx
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import useAuth from '../hooks/useAuth'
import { Job, Company, Application } from '../types/models'
import Navbar from '../components/Navbar'

const JobViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [job, setJob] = useState<Job | null>(null)
  const [company, setCompany] = useState<Company | null>(null)
  const [appsCount, setAppsCount] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setError('ID de vacante inválido.')
      setLoading(false)
      return
    }

    const fetchJobAndCompany = async () => {
      try {
        // 1. Vacante
        const jobRes = await api.get<Job>(`/jobs/${id}`)
        setJob(jobRes.data)

        // 2. Empresa
        const compRes = await api.get<Company>(`/companies/${jobRes.data.company_id}`)
        setCompany(compRes.data)
      } catch (err) {
        console.error(err)
        setError('No se pudo cargar la vacante o la empresa.')
      } finally {
        setLoading(false)
      }
    }

    fetchJobAndCompany()
  }, [id])

  useEffect(() => {
    // Sólo intentar contar postulaciones si ya tenemos la vacante
    if (!job) return

    const fetchAppsCount = async () => {
      try {
        // Si tu backend soporta /applications?job_id=ID
        const appsRes = await api.get<Application[]>('/applications', {
          params: { job_id: job.id }
        })
        setAppsCount(appsRes.data.length)
      } catch (err) {
        console.warn('No se pudo contar las postulaciones, se mostrará 0', err)
        setAppsCount(0)
      }
    }

    fetchAppsCount()
  }, [job])

  const handleApply = async () => {
    if (!user) {
      navigate('/register')
      return
    }
    try {
      await api.post('/applications', { job_id: Number(id) })
      setAppsCount(c => c + 1)
      alert('¡Solicitud enviada!')
    } catch {
      alert('Error al enviar la solicitud.')
    }
  }

  if (loading) return <p className="p-4">Cargando...</p>
  if (error)   return <p className="p-4 text-red-600">{error}</p>
  if (!job || !company) return <p className="p-4">Vacante no encontrada.</p>

  return (
    <>
      <Navbar />
      <div className="pt-24 max-w-3xl mx-auto px-4 py-6">
        {/* Título y Empresa */}
        <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
        <p className="text-sm text-gray-600 mb-4">
          Empresa:{' '}
          <span className="font-medium">{company.name}</span>
        </p>

        {/* Sobre la empresa */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-1">Sobre la Empresa</h2>
          <p className="text-gray-700">
            {company.description || 'Sin descripción disponible.'}
          </p>
        </section>

        {/* Descripción del puesto */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-1">Descripción del Puesto</h2>
          <p className="text-gray-700 whitespace-pre-line">
            {job.description}
          </p>
        </section>

        {/* Requisitos */}
        {job.requirements && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-1">Requisitos</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {job.requirements}
            </p>
          </section>
        )}

        {/* Conteo y botón */}
        <section className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
          <span className="text-gray-600">
            {appsCount} {appsCount === 1 ? 'persona ha' : 'personas han'} solicitado este empleo
          </span>
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition"
          >
            {user ? 'Enviar Solicitud' : 'Regístrate para Postular'}
          </button>
        </section>
      </div>
    </>
  )
}

export default JobViewPage
