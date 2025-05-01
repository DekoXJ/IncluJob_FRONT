import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/login">Ingresar</Link>
        <Link to="/register">Registrarse</Link>
      </nav>
    </header>
  )
}

export default Header