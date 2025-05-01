import React, { useState } from 'react'

const Register = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Nombre:</label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} required />

      <label>Email:</label>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />

      <label>Contraseña:</label>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />

      <button type="submit">Registrarse</button>
    </form>
  )
}

export default Register