import { createBrowserRouter, Navigate } from 'react-router-dom'
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage'
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import DoctorShell from '../components/doctor/DoctorShell'
import DoctorLoginPage from '../pages/doctor-auth/DoctorLoginPage'
import DoctorRegisterPage from '../pages/doctor-auth/DoctorRegisterPage'
import DoctorVerificationPendingPage from '../pages/doctor-auth/DoctorVerificationPendingPage'
import DoctorCaseDetailPage from '../pages/doctor/DoctorCaseDetailPage'
import DoctorCasesPage from '../pages/doctor/DoctorCasesPage'
import DoctorConsultationPage from '../pages/doctor/DoctorConsultationPage'
import DoctorDashboardPage from '../pages/doctor/DoctorDashboardPage'
import DoctorHistoryPage from '../pages/doctor/DoctorHistoryPage'
import DoctorNotificationsPage from '../pages/doctor/DoctorNotificationsPage'
import DoctorProfilePage from '../pages/doctor/DoctorProfilePage'
import DoctorVisitsPage from '../pages/doctor/DoctorVisitsPage'
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
    path: '/dokter/masuk',
    element: <DoctorLoginPage />,
  },
  {
    path: '/dokter/daftar',
    element: <DoctorRegisterPage />,
  },
  {
    path: '/dokter/verifikasi-pending',
    element: <DoctorVerificationPendingPage />,
  },
  {
    path: '/dokter-app',
    element: <DoctorShell />,
    children: [
      {
        index: true,
        element: <Navigate replace to="/dokter-app/dashboard" />,
      },
      {
        path: 'dashboard',
        element: <DoctorDashboardPage />,
      },
      {
        path: 'kasus',
        element: <DoctorCasesPage />,
      },
      {
        path: 'kasus/:id',
        element: <DoctorCaseDetailPage />,
      },
      {
        path: 'konsultasi/:id',
        element: <DoctorConsultationPage />,
      },
      {
        path: 'kunjungan',
        element: <DoctorVisitsPage />,
      },
      {
        path: 'riwayat',
        element: <DoctorHistoryPage />,
      },
      {
        path: 'notifikasi',
        element: <DoctorNotificationsPage />,
      },
      {
        path: 'profil',
        element: <DoctorProfilePage />,
      },
    ],
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
