// src/routes/index.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from '../components/PublicLayout';
import PrivateLayout from '../components/PrivateLayout';
import LoginPage from '../pages/LoginPage';
// …

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route element={<PrivateLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/companies" element={<CompanyListPage />} />
          {/* …resto de rutas… */}s
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
