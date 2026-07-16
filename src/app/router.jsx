import { createBrowserRouter } from 'react-router-dom'
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage'
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import FarmerDashboardPage from '../pages/farmer/FarmerDashboardPage'
import NewReportPlaceholderPage from '../pages/farmer/NewReportPlaceholderPage'
import LandingPage from '../pages/LandingPage'
import NotFoundPage from '../pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/masuk',
    element: <LoginPage />,
  },
  {
    path: '/daftar',
    element: <RegisterPage />,
  },
  {
    path: '/lupa-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/peternak/beranda',
    element: <FarmerDashboardPage />,
  },
  {
    path: '/peternak/dashboard',
    element: <FarmerDashboardPage />,
  },
  {
    path: '/peternak/laporan/baru',
    element: <NewReportPlaceholderPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
