import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Activity, ArrowUpRight, AtSign, Bell, Instagram, Menu, Moon, Search, Sun, X, Youtube } from 'lucide-react'
import type { FormEvent } from 'react'
import { clubs, matches, news, players } from '../data'

type SearchModalProps = { open: boolean; onClose: () => void }

function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])
  useEffect(() => { if (open) setQuery('') }, [open])

  const results = useMemo(() => {
    const term = query.toLowerCase().trim()
    if (!term) return []
    return [
      ...news.filter((item) => `${item.title} ${item.category}`.toLowerCase().includes(term)).map((item) => ({ title: item.title, meta: `News · ${item.category}`, to: `/article/${item.id}` })),
      ...players.filter((item) => `${item.name} ${item.club}`.toLowerCase().includes(term)).map((item) => ({ title: item.name, meta: `Player · ${item.club}`, to: `/players/${item.id}` })),
      ...clubs.filter((item) => `${item.name} ${item.league}`.toLowerCase().includes(term)).map((item) => ({ title: item.name, meta: `Club · ${item.league}`, to: `/clubs/${item.id}` })),
      ...matches.filter((item) => `${item.home} ${item.away} ${item.competition}`.toLowerCase().includes(term)).map((item) => ({ title: `${item.home} vs ${item.away}`, meta: `Match · ${item.competition}`, to: '/matches' })),
    ].slice(0, 7)
  }, [query])

  if (!open) return null
  return (
    <div className="search-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="search-dialog" role="dialog" aria-modal="true" aria-labelledby="search-heading">
        <div className="search-topline"><span id="search-heading">SEARCH FOOTBALL PULSE</span><button className="icon-button" aria-label="Close search" onClick={onClose}><X size={18} /></button></div>
        <label className="search-field"><Search size={20} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search news, clubs, players..." aria-label="Search news, clubs, players, and matches" /><kbd>ESC</kbd></label>
        <div className="search-results" aria-live="polite">
          {!query && <p className="search-hint">Try a player, club, competition or story.</p>}
          {query && results.length === 0 && <p className="search-hint">No results yet. Try another search.</p>}
          {results.map((item) => <Link key={`${item.to}-${item.title}`} to={item.to} onClick={onClose} className="search-result"><span><strong>{item.title}</strong><small>{item.meta}</small></span><ArrowUpRight size={17} /></Link>)}
        </div>
        <div className="search-shortcuts"><span>POPULAR</span>{['Arsenal', 'Transfers', 'Champions League'].map((term) => <button key={term} onClick={() => setQuery(term)}>{term}</button>)}</div>
      </section>
    </div>
  )
}

const navItems = [
  { label: 'Home', to: '/' }, { label: 'News', to: '/news' }, { label: 'Transfers', to: '/transfers' },
  { label: 'Matches', to: '/matches' }, { label: 'Clubs', to: '/clubs' }, { label: 'Players', to: '/players' },
  { label: 'Analysis', to: '/analysis' }, { label: 'About', to: '/about' },
]

type NavbarProps = { theme: string; onThemeToggle: () => void }

export function Navbar({ theme, onThemeToggle }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => { setMenuOpen(false) }, [location.pathname])
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setSearchOpen(true) }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="header-inner wrap">
          <Link className="brand" to="/" aria-label="Football Pulse home"><span className="brand-mark"><Activity size={19} strokeWidth={2.4} /></span><span>FOOTBALL<span className="brand-light">PULSE</span></span></Link>
          <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
            {navItems.map((item) => <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{item.label}</NavLink>)}
            <Link className="mobile-latest" to="/news">Latest News <ArrowUpRight size={15} /></Link>
          </nav>
          <div className="header-actions">
            <button className="icon-button header-icon" aria-label="Search" onClick={() => setSearchOpen(true)}><Search size={18} /></button>
            <Link className="icon-button header-icon notification-link" to="/news" aria-label="Latest football headlines"><Bell size={17} /></Link>
            <button className="icon-button header-icon theme-toggle" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} onClick={onThemeToggle}>{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
            <Link className="header-cta" to="/news"><span className="pulse-dot" /> Latest News <ArrowUpRight size={15} /></Link>
            <button className="icon-button menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
          </div>
        </div>
      </header>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}

export function LoadingScreen() {
  return <div className="loading-screen" aria-label="Loading Football Pulse"><div className="loading-mark"><Activity size={19} /></div><strong>FOOTBALL<span>PULSE</span></strong><div className="loading-ball"><i /></div><small>FEEL THE GAME. FOLLOW THE PULSE.</small></div>
}

export function Footer() {
  const [subscribed, setSubscribed] = useState(false)
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubscribed(true) }
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-main">
          <div className="footer-brand-block">
            <Link className="brand" to="/"><span className="brand-mark"><Activity size={19} strokeWidth={2.4} /></span><span>FOOTBALL<span className="brand-light">PULSE</span></span></Link>
            <p>Stories from every touchline.<br />For the love of the game.</p>
            <div className="social-links" aria-label="Social media"><a href="https://instagram.com" aria-label="Instagram"><Instagram size={17} /></a><a href="https://youtube.com" aria-label="YouTube"><Youtube size={18} /></a><a href="https://tiktok.com" aria-label="TikTok"><AtSign size={17} /></a><a href="https://x.com" aria-label="X"><span>𝕏</span></a></div>
          </div>
          <div className="footer-links"><h3>THE GAME</h3><Link to="/news">Latest news</Link><Link to="/transfers">Transfers</Link><Link to="/matches">Matches</Link><Link to="/clubs">Clubs & leagues</Link></div>
          <div className="footer-links"><h3>EXPLORE</h3><Link to="/players">Players</Link><Link to="/analysis">Analysis</Link><Link to="/about">About us</Link><a href="mailto:hello@footballpulse.news">Contact</a></div>
          <div className="newsletter-block"><h3>THE WEEKLY WHISTLE</h3><p>The stories worth staying up for, in your inbox every Friday.</p><form className="newsletter-form" onSubmit={submit}><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" type="email" placeholder="Your email address" required disabled={subscribed} /><button type="submit" aria-label="Subscribe to newsletter" disabled={subscribed}>{subscribed ? '✓' : <ArrowUpRight size={18} />}</button></form><small>{subscribed ? 'You’re on the list. See you Friday.' : 'No noise. Just the good stuff.'}</small></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Football Pulse. All rights reserved.</span><span>Independent voices. One beautiful game.</span><Link to="/about">Privacy & terms</Link></div>
      </div>
    </footer>
  )
}