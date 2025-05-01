// src/pages/Dashboard.tsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar fija arriba */}
      <Navbar />

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 p-4 space-y-4">
          <NavLink
            to="companies"
            className={({ isActive }) =>
              isActive
                ? 'block font-semibold text-indigo-600'
                : 'block text-gray-700 hover:text-indigo-600'
            }
          >
            Empresas
          </NavLink>
          <NavLink
            to="jobs"
            className={({ isActive }) =>
              isActive
                ? 'block font-semibold text-indigo-600'
                : 'block text-gray-700 hover:text-indigo-600'
            }
          >
            Vacantes
          </NavLink>
          <NavLink
            to="courses"
            className={({ isActive }) =>
              isActive
                ? 'block font-semibold text-indigo-600'
                : 'block text-gray-700 hover:text-indigo-600'
            }
          >
            Cursos
          </NavLink>
          <NavLink
            to="applications/me"
            className={({ isActive }) =>
              isActive
                ? 'block font-semibold text-indigo-600'
                : 'block text-gray-700 hover:text-indigo-600'
            }
          >
            Mis Postulaciones
          </NavLink>
        </aside>

        {/* Main content: aquí se renderizan las páginas hijas */}
        <main className="flex-1 p-6 bg-white overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
