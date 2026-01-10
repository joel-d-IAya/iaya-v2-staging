import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ServicePage from './pages/ServicePage'
import ServicesIndexPage from './pages/ServicesIndexPage'
import NewsPage from './pages/NewsPage'
import NewsDetailPage from './pages/NewsDetailPage'
import PortfolioDetailPage from './pages/PortfolioDetailPage'
import PortfolioPage from './pages/PortfolioPage'
import RecreoPage from './pages/RecreoPage'
import OrigenPage from './pages/OrigenPage'
import { initApp } from './services/api'
import logo from './assets/topnav_IAya.png'

function App() {
  const [activeLang, setActiveLang] = useState('ES')
  const location = useLocation()

  useEffect(() => {
    initApp();
  }, []);

  // Handle hash scroll
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-iaya-bg text-white selection:bg-iaya-ocre selection:text-white">
      <Navbar activeLang={activeLang} setActiveLang={setActiveLang} />

      <main className="relative">
        <Routes>
          <Route path="/" element={<HomePage activeLang={activeLang} />} />
          <Route path="/servicios" element={<ServicesIndexPage activeLang={activeLang} />} />
          <Route path="/servicios/:serviceSlug" element={<ServicePage activeLang={activeLang} />} />
          <Route path="/servicios/:serviceSlug/:subServiceSlug" element={<ServicePage activeLang={activeLang} />} />
          <Route path="/noticias" element={<NewsPage activeLang={activeLang} />} />
          <Route path="/noticias/:slug" element={<NewsDetailPage activeLang={activeLang} />} />
          <Route path="/portafolio" element={<PortfolioPage activeLang={activeLang} />} />
          <Route path="/portafolio/:slug" element={<PortfolioDetailPage activeLang={activeLang} />} />
          <Route path="/recreo" element={<RecreoPage activeLang={activeLang} />} />
          <Route path="/origen" element={<OrigenPage activeLang={activeLang} />} />
          <Route path="/contacto" element={<OrigenPage activeLang={activeLang} />} />
        </Routes>

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
