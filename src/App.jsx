import Navbar from "./components/Navbar"
import Hero from "./components/Hero"

function App() {
  return (
    <div className="min-h-screen bg-neutral-bg">
      <Navbar />
      <main>
        <Hero />
        {/* We will add "Kenapa Veternak" and "Akademi" sections next! */}
      </main>
    </div>
  )
}

export default App