// src/pages/RegisterPage.tsx
import React, { useState } from 'react';
import { XIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const educationOptions = [
  'Primaria completa',
  'Secundaria completa',
  'Técnico',
  'Universitario',
  'Postgrado',
];

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [carnet, setCarnet] = useState('');
  const [education, setEducation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!carnet) {
      setError('El número de carnet es obligatorio');
      return;
    }
    if (!education) {
      setError('Selecciona tu nivel de educación');
      return;
    }
    if (password !== confirm) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setSubmitting(true);
    try {
      // Ajusta register para aceptar estos campos en tu AuthContext
      await register(carnet, education, email, password);
      navigate('/app');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear la cuenta');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gradient-to-br from-teal-400 to-indigo-600 flex items-center justify-center p-4"
    >
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-8">
        {/* Close */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-700"
          aria-label="Cerrar"
        >
          <XIcon size={20} />
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">DA</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-center text-2xl font-semibold text-gray-800 mb-6">
          Crear Nueva cuenta
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Carnet CONADIS */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Nº Carnet CONADIS
            </label>
            <input
              type="text"
              value={carnet}
              onChange={e => setCarnet(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <Link
              to="https://www.gob.pe/conadis"
              target="_blank"
              className="text-xs text-teal-600 hover:underline mt-1 block"
            >
              ¿No tienes Carnet? Inscríbete a CONADIS
            </Link>
          </div>

          {/* Nivel de Educación */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Nivel de Educación
            </label>
            <select
              value={education}
              onChange={e => setEducation(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            >
              <option value="" disabled>
                Seleccione una opción
              </option>
              {educationOptions.map(opt => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Repita su contraseña
            </label>
            <input
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition mt-2"
          >
            {submitting ? 'Creando...' : 'Iniciar'}
          </button>
        </form>

        {/* Login link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-teal-500 hover:underline">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}