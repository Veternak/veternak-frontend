import { useState } from 'react'
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Features from "./components/Features"
import Academy from "./components/Academy"
import ScreeningForm from "./components/ScreeningForm"

function App() {
  // This state controls what we see: 'landing' or 'screening'
  const [currentView, setCurrentView] = useState('landing');

  return (
    <div className="min-h-screen bg-neutral-bg">
      {/* Passing the function to Navbar so the "Gabung" button can open the form */}
      <Navbar onStart={() => setCurrentView('screening')} onHome={() => setCurrentView('landing')} />
      
      <main>
        {currentView === 'landing' ? (
          <>
            <Hero onStart={() => setCurrentView('screening')} />
            <Features />
            <Academy />
          </>
        ) : (
          <div className="pt-20">
            {/* Added a back button inside the form view logic */}
            <ScreeningForm />
          </div>
        )}
      </main>
    </div>
  )
}

export default App