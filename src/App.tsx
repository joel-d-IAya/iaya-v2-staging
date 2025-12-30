import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ServicesGrid from './components/ServicesGrid'
import PulseGrid from './components/PulseGrid'
import RecreoSection from './components/RecreoSection'
import PortfolioGrid from './components/PortfolioGrid'
import { initApp } from './services/api'
import logo from './assets/topnav_IAya.png'

function App() {
  const [activeLang, setActiveLang] = useState('ES')

  useEffect(() => {
    initApp();
  }, []);

  return (
    <div className="min-h-screen bg-iaya-bg text-white selection:bg-iaya-orange selection:text-white">
      <Navbar activeLang={activeLang} setActiveLang={setActiveLang} />

      <main className="relative">
        <Hero locale={activeLang} />


        <ServicesGrid locale={activeLang} />

        <PulseGrid locale={activeLang} />

        <RecreoSection locale={activeLang} />


        <PortfolioGrid locale={activeLang} />

        {/* Footer Signature */}
        <footer className="py-12 bg-iaya-bg border-t border-white/5">
          <div className="max-w-7xl mx-auto px-8 flex flex-col items-center justify-center gap-6">
            <p className="text-white/30 text-sm font-inter tracking-wider">
              {activeLang === 'ES' && "Hecho con amor y cariño por"}
              {activeLang === 'EN' && "Made with love and care by"}
              {activeLang === 'FR' && "Fait avec amour et passion par"}
            </p>
            <a
              href="https://iaya.cloud"
              className="group transition-all duration-500 hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={logo}
                alt="IAya Agency"
                className="h-8 w-auto grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              />
            </a>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App
