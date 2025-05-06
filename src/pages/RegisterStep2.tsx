import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

interface RegisterStep1Data {
  roleId: number
  name: string
  email: string
  password: string
}

const RegisterStep2 = () => {
  const navigate = useNavigate()

  const [step1Data, setStep1Data] = useState<RegisterStep1Data | null>(null)
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const data = localStorage.getItem('registerStep1')
    if (data) {
      setStep1Data(JSON.parse(data))
    } else {
      // No hay datos del paso 1, regresamos al inicio de registro
      navigate('/register')
    }
  }, [navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!additionalInfo.trim()) {
      setError('Por favor, complete el campo adicional.')
      return
    }

    if (!step1Data) {
      setError('Datos incompletos. Por favor, regrese al paso anterior.')
      return
    }

    const formData = {
      ...step1Data,
      additionalInfo
    }

    setLoading(true)
    try {

      await axios.post('http://localhost:4000/api/auth/register', formData)
      await new Promise(resolve => setTimeout(resolve, 1000))

      localStorage.removeItem('registerStep1')
      navigate('/register-success') 
    } catch (err) {
      setError('Error al registrar el usuario. Intente nuevamente.')
      setLoading(false)
    }
  }

  if (!step1Data) {
    return null 
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 to-indigo-600 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Crear Cuenta - Paso 2
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Ejemplo campo adicional */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Información adicional</label>
            <input
              type="text"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
              required
              disabled={loading}
            />
          </div>

          {error && <p className="text-red-600 text-center text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition disabled:opacity-50"
          >
            {loading ? 'Registrando...' : 'Registrar'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegisterStep2