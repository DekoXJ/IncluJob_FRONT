import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

interface Role {
  id: number
  name: string
}

const RegisterPage = () => {
  const navigate = useNavigate()

  const [roles, setRoles] = useState<Role[]>([])
  const [roleId, setRoleId] = useState<number | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  // Fetch roles from the API
  useEffect(() => {
    console.log('Solicitando roles desde el backend...')
    axios
      .get('http://localhost:4000/api/roles')
      .then((res) => {
        console.log('Respuesta recibida:', res.data)

        if (Array.isArray(res.data)) {
          setRoles(res.data)
        } else {
          setError('Los datos de roles no son válidos.')
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error al obtener roles:', err.response?.data || err.message)
        setError('Error al obtener roles. Intente nuevamente.')
        setLoading(false)
      })
  }, [])

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!roleId || !name || !email || !password || !confirm) {
      setError('Por favor, complete todos los campos.')
      return
    }

    if (password !== confirm) {
      setError('Las contraseñas no coinciden.')
      return
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailPattern.test(email)) {
      setError('Por favor, ingrese un correo electrónico válido.')
      return
    }

    const formData = { roleId, name, email, password }
    localStorage.setItem('registerStep1', JSON.stringify(formData))
    navigate('/register-step2')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 to-indigo-600 p-4">
        <p className="text-white">Cargando roles...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 to-indigo-600 p-4">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 to-indigo-600 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Crear Cuenta - Paso 1
        </h1>

        <form onSubmit={handleNext} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Rol</label>
            <select
              value={roleId || ''}
              onChange={(e) => setRoleId(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
              required
            >
              <option value="" disabled>Selecciona un rol</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Confirmar Contraseña</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {error && <p className="text-red-600 text-center text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition"
          >
            Siguiente
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
