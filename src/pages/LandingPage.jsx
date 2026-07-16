import Academy from '../components/Academy'
import Features from '../components/Features'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-bg">
      <Navbar onHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />

      <main>
        <Hero />
        <div id="produk">
          <Features />
        </div>
        <div id="akademi">
          <Academy />
        </div>
      </main>
      <Footer />
    </div>
  )
}
