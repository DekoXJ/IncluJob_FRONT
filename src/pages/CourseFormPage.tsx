import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import { Course } from '../types/models';
import { useAuth } from '../context/AuthContext'; // Para obtener el owner_id desde el contexto

export default function CourseFormPage() {
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { user } = useAuth(); // Obtener el owner_id desde el contexto

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'text' | 'video' | 'audio'>('text');
  const [resourceUrl, setResourceUrl] = useState('');
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Si es edición, cargar datos
  useEffect(() => {
    if (!isEdit) return;
    api.get<Course>(`/courses/${id}`)
      .then(res => {
        setTitle(res.data.title);
        setDescription(res.data.description || '');
        setType(res.data.type);
        setResourceUrl(res.data.resource_url);
      })
      .catch(err => {
        console.error(err);
        setError('No se pudo cargar el curso.');
      })
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!title.trim() || !resourceUrl.trim()) {
      setError('Título y URL de recurso son obligatorios.');
      return;
    }

    setSubmitting(true);
    try {
      if (!user) {
        alert('No se ha podido obtener el propietario.');
        return;
      }

      const courseData = {
        title,
        description,
        type,
        resource_url: resourceUrl,
        owner_id: user.id, // Asegúrate de que el owner_id esté presente
      };

      if (isEdit) {
        await api.put(`/courses/${id}`, courseData);
      } else {
        await api.post('/courses', courseData);
      }
      navigate('/app/courses');
    } catch (err) {
      console.error(err);
      alert('Error al guardar el curso');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Cargando datos...</p>;

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {isEdit ? 'Editar Curso' : 'Nuevo Curso'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Título</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
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
        <div>
          <label className="block font-semibold mb-1">Tipo de recurso</label>
          <select
            value={type}
            onChange={e => setType(e.target.value as 'text' | 'video' | 'audio')}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="text">Texto</option>
            <option value="video">Video</option>
            <option value="audio">Audio</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">URL del recurso</label>
          <input
            type="url"
            value={resourceUrl}
            onChange={e => setResourceUrl(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition"
          >
            {submitting ? 'Guardando...' : isEdit ? 'Actualizar' : 'Crear'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/app/courses')}
            className="px-4 py-2 border rounded hover:bg-gray-100 transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
