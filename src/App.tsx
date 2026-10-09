import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { Footer, LoadingScreen, Navbar } from './components/Shell'
import { AboutPage, AnalysisPage, ArticlePage, ClubPage, ClubsPage, HomePage, MatchesPage, NewsPage, PlayerPage, PlayersPage, TransfersPage } from './pages'
import { clubs, news, players } from './data'

function NotFound() {
  return <main className="not-found wrap"><span className="eyebrow">OFFSIDE</span><h1>That page has left the pitch.</h1><p>The link might have moved. The game is still on.</p><Link className="button button-primary" to="/">Back to the homepage</Link></main>
}

const pageMeta: Record<string, { title: string; description: string }> = {
  '/': { title: 'Football Pulse — Feel the game. Follow the pulse.', description: 'Football news, transfers, matchday and stories from every corner of the game.' },
  '/news': { title: 'Latest Football News — Football Pulse', description: 'Breaking football stories, sharp perspectives and the details that make the game matter.' },
  '/transfers': { title: 'Transfer Centre — Football Pulse', description: 'The latest football transfer news, rumours, confirmed deals and market analysis.' },
  '/matches': { title: 'Live Scores & Fixtures — Football Pulse', description: 'Follow live football scores, fixtures and results from leagues around the world.' },
  '/clubs': { title: 'Football Clubs — Football Pulse', description: 'Explore clubs, grounds and stories from across world football.' },
  '/players': { title: 'Football Players — Football Pulse', description: 'Player profiles, statistics and stories from the people shaping football.' },
  '/analysis': { title: 'Football Analysis — Football Pulse', description: 'Tactics, culture and thoughtful perspectives beyond the football scoreline.' },
  '/about': { title: 'About Football Pulse', description: 'Independent football journalism for people who feel the game everywhere.' },
}

export default function App() {
  const location = useLocation()
  const [theme, setTheme] = useState(() => window.localStorage.getItem('football-pulse-theme') || 'dark')
  const [loading, setLoading] = useState(true)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 420)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('football-pulse-theme', theme)
  }, [theme])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
    const article = location.pathname.startsWith('/article/') ? news.find((item) => item.id === location.pathname.split('/').pop()) : undefined
    const player = location.pathname.startsWith('/players/') ? players.find((item) => item.id === location.pathname.split('/').pop()) : undefined
    const club = location.pathname.startsWith('/clubs/') ? clubs.find((item) => item.id === location.pathname.split('/').pop()) : undefined
    const meta = article ? { title: `${article.title} — Football Pulse`, description: article.summary } : player ? { title: `${player.name} — Football Pulse`, description: `${player.position} at ${player.club}. Player profile, stats and latest stories.` } : club ? { title: `${club.name} — Football Pulse`, description: `${club.name} stories, club profile and latest news from ${club.league}.` } : pageMeta[location.pathname] || { title: 'Football Pulse — Stories from the game', description: 'The stories that move football. News, transfers and matchday from every corner of the game.' }
    document.title = meta.title
    const description = document.querySelector('meta[name="description"]')
    description?.setAttribute('content', meta.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', meta.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', meta.description)
  }, [location.pathname])

  return <div className="app-shell">{loading && <LoadingScreen />}<a href="#main-content" className="skip-link">Skip to content</a><Navbar theme={theme} onThemeToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')} /><div id="main-content"><AnimatePresence mode="wait"><motion.div key={location.pathname} initial={reduceMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -5 }} transition={{ duration: reduceMotion ? 0 : 0.18 }}><Routes location={location}><Route path="/" element={<HomePage />} /><Route path="/news" element={<NewsPage />} /><Route path="/article/:id" element={<ArticlePage />} /><Route path="/transfers" element={<TransfersPage />} /><Route path="/matches" element={<MatchesPage />} /><Route path="/clubs" element={<ClubsPage />} /><Route path="/clubs/:id" element={<ClubPage />} /><Route path="/players" element={<PlayersPage />} /><Route path="/players/:id" element={<PlayerPage />} /><Route path="/analysis" element={<AnalysisPage />} /><Route path="/about" element={<AboutPage />} /><Route path="*" element={<NotFound />} /></Routes></motion.div></AnimatePresence></div><Footer /></div>
}