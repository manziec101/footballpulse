import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, ChevronRight, Clock3, Radio, Trophy } from 'lucide-react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import type { FootballClub, FootballPlayer, Match, NewsStory, Transfer } from '../data'

export function SectionHeading({ eyebrow, title, action, to = '/news' }: { eyebrow?: string; title: string; action?: string; to?: string }) {
  return <div className="section-heading"><div>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2>{title}</h2></div>{action && <Link className="text-link" to={to}>{action}<ArrowRight size={16} /></Link>}</div>
}

export function BreakingTicker() {
  return <div className="ticker"><div className="wrap ticker-inner"><span className="ticker-label"><span className="ticker-dot" /> JUST IN</span><div className="ticker-track"><span>TRANSFER WATCH <i>◆</i> The summer window is already moving. Follow every deal as it happens.</span><span>TRANSFER WATCH <i>◆</i> The summer window is already moving. Follow every deal as it happens.</span></div><Link to="/transfers" aria-label="Go to transfer center"><ArrowUpRight size={17} /></Link></div></div>
}

export function NewsCard({ story, featured = false, compact = false }: { story: NewsStory; featured?: boolean; compact?: boolean }) {
  return (
    <motion.article className={`news-card ${featured ? 'news-featured' : ''} ${compact ? 'news-compact' : ''}`} whileHover={{ y: -4 }} transition={{ duration: 0.25, ease: 'easeOut' }}>
      <Link to={`/article/${story.id}`} className="news-image-link" aria-label={`Read ${story.title}`}>
        <img src={story.image} alt="" loading="lazy" />
        <span className="image-shade" />
        <span className="category-tag">{story.category}</span>
        {featured && <span className="feature-index">01 <span>/ THE LEAD</span></span>}
      </Link>
      <div className="news-copy">
        <span className="news-meta"><Clock3 size={13} /> {story.published} <span className="meta-divider">·</span> {story.readTime}</span>
        <h3><Link to={`/article/${story.id}`}>{story.title}</Link></h3>
        {!compact && <p>{story.summary}</p>}
        <Link className="card-read" to={`/article/${story.id}`}>Read story <ArrowUpRight size={15} /></Link>
      </div>
    </motion.article>
  )
}

export function MatchCard({ match }: { match: Match }) {
  return (
    <motion.article className="match-card" whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
      <div className="match-card-top"><span className="competition"><Trophy size={13} />{match.competition}</span><span className={`match-status ${match.status.toLowerCase()}`}>{match.status === 'LIVE' && <span className="status-pulse" />}{match.status === 'UPCOMING' ? match.time : match.status}</span></div>
      <div className="match-teams"><div className="match-team"><ClubBadge name={match.home} /><span>{match.home}</span></div><div className="score">{match.status === 'UPCOMING' ? <span className="versus">VS</span> : <><b>{match.homeScore}</b><i>:</i><b>{match.awayScore}</b></>}</div><div className="match-team away"><ClubBadge name={match.away} /><span>{match.away}</span></div></div>
      <div className="match-card-bottom"><span>{match.status === 'LIVE' ? <><Radio size={13} /> Live now · {match.time}</> : match.status === 'FT' ? 'Full time' : 'Kick-off'} </span><Link to="/matches" aria-label={`Match details: ${match.home} versus ${match.away}`}><ChevronRight size={16} /></Link></div>
    </motion.article>
  )
}

const teamColors: Record<string, string> = { Arsenal: '#ef4444', 'Man City': '#79bfe8', 'Manchester City': '#79bfe8', Liverpool: '#d5283b', 'Real Madrid': '#eee9df', Barcelona: '#a50e4d', Chelsea: '#1459bb', 'Inter Milan': '#1263a4', 'AC Milan': '#d91c33', 'Bayern Munich': '#d31835', Dortmund: '#f4dc19', 'Paris Saint-Germain': '#114378' }

export function ClubBadge({ name, size = 'normal' }: { name: string; size?: 'normal' | 'small' }) {
  const color = teamColors[name] || '#5e695f'
  const initials = name.split(' ').map((part) => part[0]).join('').slice(0, 3).toUpperCase()
  return <span className={`club-badge ${size === 'small' ? 'small' : ''}`} style={{ '--club-color': color } as CSSProperties}>{initials}</span>
}

export function TransferRow({ transfer }: { transfer: Transfer }) {
  return (
    <motion.article className="transfer-row" whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
      <div className="transfer-player"><span className="player-monogram">{transfer.player.split(' ').map((part) => part[0]).join('')}</span><span><strong>{transfer.player}</strong><small>{transfer.league}</small></span></div>
      <div className="transfer-route"><span>{transfer.from}</span><ArrowRight size={18} /><strong>{transfer.to}</strong></div>
      <span className="transfer-fee">{transfer.fee}</span><span className={`transfer-status ${transfer.status.toLowerCase()}`}>{transfer.status}</span>
    </motion.article>
  )
}

export function ClubCard({ club }: { club: FootballClub }) {
  return <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}><Link className="club-card" to={`/clubs/${club.id}`}><span className="club-emblem" style={{ '--club-color': club.color } as CSSProperties}>{club.short.slice(0, 3)}</span><strong>{club.name}</strong><small>{club.league}</small><ArrowUpRight className="club-arrow" size={15} /></Link></motion.div>
}

export function PlayerCard({ player }: { player: FootballPlayer }) {
  return <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}><Link className="player-card" to={`/players/${player.id}`}><div className="player-card-image"><img src={player.image} alt={`${player.name} on the pitch`} loading="lazy" /><span className="player-number">{player.number}</span></div><div className="player-card-copy"><span className="eyebrow">{player.position} · {player.nationality}</span><strong>{player.name}</strong><small>{player.club}</small></div><ArrowUpRight className="player-arrow" size={16} /></Link></motion.div>
}

export function LeagueTabs({ active, onChange, items }: { active: string; onChange: (value: string) => void; items: string[] }) {
  return <div className="league-tabs" role="tablist" aria-label="Filter by league">{items.map((item) => <button key={item} role="tab" aria-selected={active === item} className={active === item ? 'selected' : ''} onClick={() => onChange(item)}>{item}</button>)}</div>
}

export function PlayerSpotlight({ player }: { player: FootballPlayer }) {
  return (
    <section className="player-spotlight">
      <img className="spotlight-photo" src={player.image} alt={`${player.name}, ${player.club} ${player.position}`} loading="lazy" />
      <div className="spotlight-grain" />
      <div className="spotlight-content"><span className="eyebrow">THE PULSE · PLAYER SPOTLIGHT</span><span className="spotlight-number">{player.number}</span><h2>{player.name.split(' ').map((part) => <span key={part}>{part}</span>)}</h2><div className="spotlight-details"><span>{player.position}</span><span>{player.club}</span><span>{player.nationality}</span></div><div className="spotlight-stats"><div><strong>{player.goals}</strong><small>GOALS</small></div><div><strong>{player.assists}</strong><small>ASSISTS</small></div><div><strong>{player.appearances}</strong><small>APPS</small></div></div><Link className="button button-outline" to={`/players/${player.id}`}>Explore player <ArrowUpRight size={16} /></Link></div>
    </section>
  )
}
