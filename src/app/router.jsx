import { createBrowserRouter, Navigate } from 'react-router-dom'
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage'
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import FarmerDashboardPage from '../pages/farmer/FarmerDashboardPage'
import NewReportPlaceholderPage from '../pages/farmer/NewReportPlaceholderPage'
import LandingPage from '../pages/LandingPage'
import NotFoundPage from '../pages/NotFoundPage'

// Your UI Components
import FarmerHome from '../components/FarmerHome'
import AnimalList from '../components/AnimalList'
import CaseStatus from '../components/CaseStatus'
import ScreeningForm from '../components/ScreeningForm'
import DashboardShell from '../components/DashboardShell' // Import the shell we made!

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
    path: '/peternak',
    element: <DashboardShell />, // This wraps all the pages below
    children: [
      {
        path: 'dashboard',
        element: <FarmerHome />,
      },
      {
        path: 'ternak',
        element: <AnimalList />,
      },
      {
        path: 'konsultasi',
        element: <CaseStatus />,
      },
      {
        path: 'lapor',
        element: <ScreeningForm />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])