// src/routes/AppRoutes.tsx
import React, { JSX } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import useAuth from '../hooks/useAuth'

import LandingPage from '../pages/LandingPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import JobBoardPage from '../pages/JobBoardPage'
import JobViewPage from '../pages/JobViewPage'
import CourseBoardPage from '../pages/CourseBoardPage'
import PeopleBoardPage from '../pages/PeopleBoardPage'

import Dashboard from '../pages/Dashboard'
import CompanyListPage from '../pages/CompanyListPage'
import CompanyFormPage from '../pages/CompanyFormPage'
import CompanyDetailPage from '../pages/CompanyDetailPage'
import JobListPage from '../pages/JobListPage'
import JobFormPage from '../pages/JobFormPage'
import JobDetailPage from '../pages/JobDetailPage'
import CourseListPage from '../pages/CourseListPage'
import CourseFormPage from '../pages/CourseFormPage'
import CourseDetailPage from '../pages/CourseDetailPage'
import MyApplicationsPage from '../pages/MyApplicationsPage'
import UserProfilePage from '../pages/UserProfilePage'

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth()
  if (loading) {
    return <div className="flex items-center justify-center h-full">Cargando...</div>
  }
  return user ? children : <Navigate to="/login" replace />
}

export default function AppRoutes() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Páginas públicas */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Bolsa de trabajo pública */}
          <Route path="/jobs" element={<JobBoardPage />} />
          <Route path="/jobs/:id" element={<JobViewPage />} />

          {/* Cursos y personas públicos */}
          <Route path="/courses" element={<CourseBoardPage />} />
          <Route path="/people" element={<PeopleBoardPage />} />

          {/* Rutas protegidas bajo /app */}
          <Route
            path="/app"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="companies" replace />} />

            {/* Empresas */}
            <Route path="companies" element={<CompanyListPage />} />
            <Route path="companies/new" element={<CompanyFormPage />} />
            <Route path="companies/:id" element={<CompanyDetailPage />} />
            <Route path="companies/:id/edit" element={<CompanyFormPage />} />

            {/* Vacantes (CRUD interno) */}
            <Route path="jobs" element={<JobListPage />} />
            <Route path="jobs/new" element={<JobFormPage />} />
            <Route path="jobs/:id" element={<JobDetailPage />} />
            <Route path="jobs/:id/edit" element={<JobFormPage />} />

            {/* Cursos */}
            <Route path="courses" element={<CourseListPage />} />
            <Route path="courses/new" element={<CourseFormPage />} />
            <Route path="courses/:id" element={<CourseDetailPage />} />
            <Route path="courses/:id/edit" element={<CourseFormPage />} />

            {/* Mis postulaciones */}
            <Route path="applications/me" element={<MyApplicationsPage />} />

            {/* Perfil de usuario */}
            <Route path="users/me" element={<UserProfilePage />} />
          </Route>

          {/* Ruta por defecto */}
          <Route path="*" element={<Navigate to="/jobs" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
