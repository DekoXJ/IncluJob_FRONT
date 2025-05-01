// src/pages/CompanyDetailPage.tsx
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'
import { Company } from '../types/models'

const CompanyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [company, setCompany] = useState<Company | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!id) {
      setError('ID de empresa inválido')
      setLoading(false)
      return
    }
    setLoading(true)
    api
      .get<Company>(`/companies/${id}`)
      .then(res => setCompany(res.data))
      .catch(err => {
        console.error(err)
        setError('No se pudo cargar la empresa.')
      })
      .finally(() => setLoading(false))
  }, [id])

  const handleDelete = async () => {
    if (!company) return
    if (!window.confirm('¿Eliminar esta empresa?')) return
    try {
      await api.delete(`/companies/${company.id}`)
      navigate('/app/companies')
    } catch (err) {
      console.error(err)
      alert('Error al eliminar la empresa.')
    }
  }

  if (loading) return <p className="p-4">Cargando empresa...</p>
  if (error) return <p className="p-4 text-red-600">{error}</p>
  if (!company) return <p className="p-4">Empresa no encontrada.</p>

  return (
    <div className="pt-24 max-w-2xl mx-auto px-4">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">{company.name}</h1>
        <p className="text-gray-700 mb-4">
          {company.description || 'Sin descripción disponible.'}
        </p>
        <p className="text-sm text-gray-500 mb-2">ID: {company.id}</p>
        <p className="text-sm text-gray-500 mb-6">
          Fecha de creación: {new Date(company.created_at).toLocaleDateString()}
        </p>
        <div className="flex space-x-4">
          <Link
            to={`/app/companies/${company.id}/edit`}
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
            onClick={() => navigate('/app/companies')}
            className="px-4 py-2 border rounded hover:bg-gray-100 transition"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  )
}

export default CompanyDetailPage