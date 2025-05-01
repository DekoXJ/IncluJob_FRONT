// src/components/Navbar.tsx
import React, { useState } from 'react'
import {
  MenuIcon,
  XIcon,
  Home as HomeIcon,
  Users as UsersIcon,
  Briefcase as JobsIcon,
  BookOpen as CoursesIcon,
  LayoutDashboard as DashboardIcon,
  User as UserIcon,
  LogOut as LogOutIcon
} from 'lucide-react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const initials = user
    ? user.name
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : ''

  return (
    <header className="bg-white shadow-md fixed w-full z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-8 h-16">
        {/* Logo */}
        <Link to="/" className="text-xl font-semibold text-indigo-700">
          DreamAgency
        </Link>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 rounded text-indigo-700 hover:bg-gray-100 transition"
          onClick={() => setIsOpen(open => !open)}
          aria-label="Toggle menu"
        >
          {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>

        {/* Nav links */}
        <nav
          className={`
            ${isOpen ? 'block' : 'hidden'}
            absolute top-full left-0 w-full bg-white shadow-md
            md:static md:block md:shadow-none md:w-auto
          `}
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 p-4 md:p-0 items-center">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center space-x-1 py-2 md:py-0 ${
                    isActive
                      ? 'text-indigo-700 font-semibold'
                      : 'text-gray-700 hover:text-indigo-700'
                  } transition`
                }
              >
                <HomeIcon size={18} /> <span>Inicio</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/jobs"
                className={({ isActive }) =>
                  `flex items-center space-x-1 py-2 md:py-0 ${
                    isActive
                      ? 'text-indigo-700 font-semibold'
                      : 'text-gray-700 hover:text-indigo-700'
                  } transition`
                }
              >
                <JobsIcon size={18} /> <span>Trabajos</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/courses"
                className={({ isActive }) =>
                  `flex items-center space-x-1 py-2 md:py-0 ${
                    isActive
                      ? 'text-indigo-700 font-semibold'
                      : 'text-gray-700 hover:text-indigo-700'
                  } transition`
                }
              >
                <CoursesIcon size={18} /> <span>Cursos</span>
              </NavLink>
            </li>

            {/* Auth buttons or user dropdown */}
            {!user ? (
              <li className="mt-4 md:mt-0 md:ml-4 flex space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 border border-indigo-700 text-indigo-700 rounded hover:bg-indigo-700 hover:text-white transition"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-indigo-700 text-white rounded hover:bg-indigo-600 transition"
                >
                  Registrarse
                </Link>
              </li>
            ) : (
              <li className="relative mt-4 md:mt-0 md:ml-4">
                <button
                  onClick={() => setDropdownOpen(d => !d)}
                  className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 transition"
                >
                  <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center">
                    {initials}
                  </div>
                  <span className="text-gray-800 font-medium">{user.name}</span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg overflow-hidden">
                    <Link
                      to="/app"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <DashboardIcon size={16} className="mr-2" /> Dashboard
                    </Link>
                    <Link
                      to="/app/users/me"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <UserIcon size={16} className="mr-2" /> Perfil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <LogOutIcon size={16} className="mr-2" /> Cerrar Sesión
                    </button>
                  </div>
                )}
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
