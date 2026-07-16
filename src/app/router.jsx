import { createBrowserRouter, Navigate } from 'react-router-dom'
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage'
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import AddAnimalPage from '../pages/farmer/AddAnimalPage'
import AnimalProfilePage from '../pages/farmer/AnimalProfilePage'
import FarmerAcademyPage from '../pages/farmer/FarmerAcademyPage'
import FarmerHomeRoute from '../pages/farmer/FarmerHomeRoute'
import VetProfilePage from '../pages/farmer/VetProfilePage'
import LandingPage from '../pages/LandingPage'
import NotFoundPage from '../pages/NotFoundPage'

// Your UI Components
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
        index: true,
        element: <Navigate replace to="/peternak/dashboard" />,
      },
      {
        path: 'beranda',
        element: <Navigate replace to="/peternak/dashboard" />,
      },
      {
        path: 'dashboard',
        element: <FarmerHomeRoute />,
      },
      {
        path: 'ternak',
        element: <AnimalList />,
      },
      {
        path: 'ternak/tambah',
        element: <AddAnimalPage />,
      },
      {
        path: 'ternak/:animalId',
        element: <AnimalProfilePage />,
      },
      {
        path: 'konsultasi',
        element: <CaseStatus />,
      },
      {
        path: 'konsultasi/dokter/:vetId',
        element: <VetProfilePage />,
      },
      {
        path: 'lapor',
        element: <ScreeningForm />,
      },
      {
        path: 'laporan/baru',
        element: <Navigate replace to="/peternak/lapor" />,
      },
      {
        path: 'akademi',
        element: <FarmerAcademyPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
