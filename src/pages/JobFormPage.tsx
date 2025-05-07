// src/pages/JobFormPage.tsx
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api/axios'
import { Company, Job } from '../types/models'

const JobFormPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [companies, setCompanies] = useState<Company[]>([])
  const [companyId, setCompanyId] = useState<number | ''>('')
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [requirements, setRequirements] = useState<string>('')
  const [disabilityFilter, setDisabilityFilter] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(isEdit)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Carga lista de empresas para el select
  useEffect(() => {
    api
      .get<Company[]>('/companies')
      .then(res => setCompanies(res.data))
      .catch(err => console.error(err))
  }, [])

  // Si es edición, carga datos de la vacante
  useEffect(() => {
    if (!isEdit) {
      setLoading(false)
      return
    }
    api
      .get<Job>(`/jobs/${id}`)
      .then(res => {
        const j = res.data
        setCompanyId(j.company_id)
        setTitle(j.title)
        setDescription(j.description)
        setRequirements(j.requirements || '')
        setDisabilityFilter(j.disability_filter || '')
      })
      .catch(err => {
        console.error(err)
        setError('No se pudo cargar la vacante.')
      })
      .finally(() => setLoading(false))
  }, [id, isEdit])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!companyId || !title.trim()) {
      setError('Empresa y título son obligatorios.')
      return
    }
    setSubmitting(true)
    try {
      const payload = {
        company_id: companyId,
        title,
        description,
        requirements,
        disability_filter: disabilityFilter
      }
      if (isEdit) {
        await api.put(`/jobs/${id}`, payload)
      } else {
        await api.post('/jobs', payload)
      }
      navigate('/app/jobs')
    } catch (err: any) {
      console.error(err)
      setError(err.response?.data?.message || 'Error guardando la vacante.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <p className="p-4">Cargando vacante...</p>
  if (error && !submitting) return <p className="p-4 text-red-600">{error}</p>

  return (
    <>
      <div className="pt-24 max-w-lg mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">
          {isEdit ? 'Editar Vacante' : 'Nueva Vacante'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow rounded-lg p-6">
          {/* Empresa */}
          <div>
            <label className="block mb-1 font-medium">Empresa</label>
            <select
              value={companyId}
              onChange={e => setCompanyId(Number(e.target.value))}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">-- Seleccionar empresa --</option>
              {companies.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Título */}
          <div>
            <label className="block mb-1 font-medium">Título</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block mb-1 font-medium">Descripción</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Requisitos */}
          <div>
            <label className="block mb-1 font-medium">Requisitos</label>
            <textarea
              value={requirements}
              onChange={e => setRequirements(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Filtro de discapacidad */}
          <div>
            <label className="block mb-1 font-medium">Filtro de Discapacidad</label>
            <input
              type="text"
              value={disabilityFilter}
              onChange={e => setDisabilityFilter(e.target.value)}
              placeholder="e.g. física, psicosocial"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          {/* Botones */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/app/jobs')}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition"
            >
              {submitting
                ? isEdit
                  ? 'Actualizando...'
                  : 'Creando...'
                : isEdit
                ? 'Actualizar'
                : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default JobFormPage