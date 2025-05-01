// src/pages/CompanyFormPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import { Company } from '../types/models';

export default function CompanyFormPage() {
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);

  // Si es edición, cargar datos
  useEffect(() => {
    if (!isEdit) return;
    api.get<Company>(`/companies/${id}`)
      .then(res => {
        setName(res.data.name);
        setDescription(res.data.description || '');
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (isEdit) {
        await api.put<Company>(`/companies/${id}`, { name, description });
      } else {
        await api.post<Company>('/companies', { name, description });
      }
      navigate('/app/companies');
    } catch (err) {
      console.error(err);
      alert('Error al guardar la empresa');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Cargando datos...</p>;

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {isEdit ? 'Editar Empresa' : 'Nueva Empresa'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Descripción</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            rows={4}
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition"
          >
            {submitting ? 'Guardando...' : isEdit ? 'Actualizar' : 'Crear'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/app/companies')}
            className="px-4 py-2 border rounded hover:bg-gray-100 transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
