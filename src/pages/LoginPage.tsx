// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { XIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate('/app');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error de autenticación');
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gradient-to-br from-teal-400 to-indigo-600 flex items-center justify-center p-4"
    >
      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-8">
        {/* Close button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-700"
          aria-label="Cerrar"
        >
          <XIcon size={20} />
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-4">
          {/* Reemplaza con tu logo */}
          <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">DA</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-center text-2xl font-semibold text-gray-800 mb-6">
          Inicio de Sesión
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
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

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-teal-600 hover:underline"
            >
              ¿Olvidó su contraseña?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition mt-2"
          >
            Iniciar
          </button>
        </form>

        {/* Register link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          ¿No tiene cuenta?{' '}
          <Link to="/register" className="text-teal-500 hover:underline">
            Crear cuenta
          </Link>
        </p>
      </div>
    </div>
  );
}