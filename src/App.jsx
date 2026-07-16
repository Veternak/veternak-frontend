import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Features from "./components/Features" 

function App() {
  return (
    <div className="min-h-screen bg-neutral-bg">
      <Navbar />
      <main>
        <Hero />
        {/* You just needed to add this line below! */}
        <Features /> 
      </main>
    </div>
  )
}

export default App