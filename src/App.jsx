import { useState } from 'react'
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Features from "./components/Features"
import Academy from "./components/Academy"
import ScreeningForm from "./components/ScreeningForm"
import DashboardShell from "./components/DashboardShell"
import AnimalList from "./components/AnimalList"

function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'dashboard'
  const [activeTab, setActiveTab] = useState('beranda');

  // Logic to show the landing page
  if (currentView === 'landing') {
    return (
      <div className="min-h-screen">
        <Navbar onStart={() => setCurrentView('dashboard')} onHome={() => setCurrentView('landing')} />
        <main>
          <Hero onStart={() => setCurrentView('dashboard')} />
          <Features />
          <Academy />
        </main>
      </div>
    );
  }

  // Logic to show the Dashboard
  return (
    <DashboardShell activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'ternak' && <AnimalList />}
      {activeTab === 'beranda' && (
        <div className="text-center py-20">
          <h2 className="text-2xl font-serif text-primary-dark">Selamat Datang, Pak Masrukhi!</h2>
          <p className="text-gray-500">Pilih tab "Ternak" untuk melihat sapi Anda.</p>
        </div>
      )}
      {activeTab === 'lapor' && <ScreeningForm />}
    </DashboardShell>
  );
}

export default App