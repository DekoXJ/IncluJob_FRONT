import React, { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: llamar API de autenticación
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Email:</label>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />

      <label>Contraseña:</label>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />

      <button type="submit">Ingresar</button>
    </form>
  )
}

export default Login