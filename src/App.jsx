import { useState } from 'react'
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Features from "./components/Features"
import Academy from "./components/Academy"
import ScreeningForm from "./components/ScreeningForm"
import DashboardShell from "./components/DashboardShell"
import AnimalList from "./components/AnimalList"
import CaseStatus from "./components/CaseStatus";
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
    {activeTab === 'beranda' && <div className="p-4"><h2 className="font-serif text-3xl">Ringkasan</h2></div>}
    {activeTab === 'ternak' && <AnimalList />}
    {activeTab === 'lapor' && <ScreeningForm />}
    
    {/* ADD THIS LINE */}
    {activeTab === 'konsultasi' && <CaseStatus />}
    
    {activeTab === 'akademi' && <div className="p-4"><h2 className="font-serif text-3xl">Akademi Ternak</h2></div>}
  </DashboardShell>
);
}

export default App