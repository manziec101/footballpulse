import { lazy, Suspense, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import type { CSSProperties } from 'react'
import { ArrowRight, ArrowUpRight, CalendarDays, Search, SlidersHorizontal, Trophy } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { categories, clubs, leagues, matches, news, players, transfers } from './data'
import { BreakingTicker, ClubCard, LeagueTabs, MatchCard, NewsCard, PlayerCard, PlayerSpotlight, SectionHeading, TransferRow } from './components/Editorial'

const FootballScene = lazy(() => import('./components/FootballScene'))
const reveal = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-grid wrap">
        <motion.div className="hero-copy" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.12 } } }}>
          <motion.div className="hero-kicker" variants={reveal}><span className="live-indicator" /> THE WORLD GAME, IN REAL TIME</motion.div>
          <motion.h1 variants={reveal}>FOOTBALL<br /><span>HAS A</span> <i>PULSE.</i></motion.h1>
          <motion.p variants={reveal}>The stories that move the game. News, transfers and matchday from every corner of football.</motion.p>
          <motion.div className="hero-actions" variants={reveal}><Link className="button button-primary" to="/news">Explore the news <ArrowUpRight size={17} /></Link><Link className="button button-quiet" to="/transfers"><span className="play-triangle">▶</span> Transfer centre</Link></motion.div>
          <motion.div className="hero-footnote" variants={reveal}><div className="avatar-stack"><span>MR</span><span>NO</span><span>KM</span></div><span><strong>Voices from every touchline.</strong><small>Independent. Everywhere. For the game.</small></span></motion.div>
        </motion.div>
        <div className="hero-visual"><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><div className="hero-visual-label label-top"><span>LIVE FROM</span><strong>EVERYWHERE</strong></div><Suspense fallback={<div className="ball-fallback" aria-hidden="true"><span /></div>}><FootballScene /></Suspense><div className="hero-visual-label label-bottom"><span>THE BEAUTIFUL GAME</span><strong>NO FILTERS. JUST FOOTBALL.</strong></div><div className="hero-coordinate">51°30′26.4″N&nbsp; 0°07′39.6″W</div></div>
        <div className="hero-scroll"><span>SCROLL TO FEEL IT</span><i /></div>
      </div>
      <div className="hero-bottom-line" />
    </section>
  )
}

function HomePage() {
  const [activeLeague, setActiveLeague] = useState('Premier League')
  const lead = news[0]
  return (
    <>
      <Hero />
      <BreakingTicker />
      <section className="section wrap top-stories-section">
        <SectionHeading eyebrow="THE FRONT PAGE" title="Stories with a pulse" action="All the latest" />
        <div className="top-stories-grid"><NewsCard story={lead} featured /><div className="side-stories">{news.slice(1, 4).map((story) => <NewsCard key={story.id} story={story} compact />)}<Link className="stories-all" to="/news">More stories from across the game <ArrowRight size={16} /></Link></div></div>
      </section>
      <section className="match-band"><div className="wrap section"><SectionHeading eyebrow="MATCHDAY, EVERY DAY" title="The match centre" action="View all matches" to="/matches" /><div className="match-grid">{matches.slice(0, 3).map((match) => <MatchCard key={match.id} match={match} />)}</div></div></section>
      <section className="section wrap transfer-home-section"><SectionHeading eyebrow="THE WINDOW NEVER CLOSES" title="Transfer radar" action="Enter transfer centre" to="/transfers" /><div className="transfer-table"><div className="transfer-table-head"><span>THE PLAYER</span><span>THE MOVE</span><span>FEE</span><span>STATUS</span></div>{transfers.slice(0, 4).map((transfer) => <TransferRow key={transfer.player} transfer={transfer} />)}</div></section>
      <section className="section leagues-section"><div className="wrap"><SectionHeading eyebrow="FOLLOW YOUR WORLD" title="Pick your pitch" action="Every competition" to="/matches" /><LeagueTabs active={activeLeague} onChange={setActiveLeague} items={leagues.slice(0, 6)} /><div className="league-content"><div className="league-feature"><span className="league-feature-mark"><Trophy size={23} /></span><div><span className="eyebrow">{activeLeague === 'All leagues' ? 'ACROSS THE GAME' : activeLeague.toUpperCase()}</span><h3>{activeLeague === 'All leagues' ? 'Every story. One place.' : `The latest from ${activeLeague}.`}</h3><p>Matchday moments, the voices behind the headlines and the details shaping the season.</p><Link className="text-link" to="/news">Explore coverage <ArrowRight size={16} /></Link></div></div><div className="league-news-list">{news.filter((story) => activeLeague === 'All leagues' || story.category === activeLeague || (activeLeague === 'Champions League' && story.category === 'Champions League')).slice(0, 2).map((story) => <Link key={story.id} to={`/article/${story.id}`}><span className="league-news-category">{story.category}</span><strong>{story.title}</strong><small>{story.published} · {story.readTime}</small></Link>)}{news.filter((story) => activeLeague === 'All leagues' || story.category === activeLeague).length === 0 && <p className="league-empty">Fresh {activeLeague} coverage is coming up. Catch the latest across the game in the meantime.</p>}</div></div></div></section>
      <section className="section wrap spotlight-section"><SectionHeading eyebrow="ONE TO WATCH" title="Player spotlight" action="Meet the players" to="/players" /><PlayerSpotlight player={players[0]} /></section>
      <section className="section wrap clubs-section"><SectionHeading eyebrow="THE BADGES WE KNOW BY HEART" title="Club stories" action="Explore all clubs" to="/clubs" /><div className="club-grid">{clubs.slice(0, 8).map((club) => <ClubCard key={club.id} club={club} />)}</div></section>
      <section className="section wrap latest-section"><SectionHeading eyebrow="FRESH OFF THE TOUCHLINE" title="The latest" action="All stories" to="/news" /><div className="news-grid">{news.slice(4, 10).map((story) => <NewsCard key={story.id} story={story} />)}</div></section>
    </>
  )
}

function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="page-intro wrap"><span className="eyebrow"><span className="live-indicator" /> {eyebrow}</span><h1>{title}</h1><p>{description}</p></div>
}

function NewsPage() {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [shown, setShown] = useState(6)
  const filtered = useMemo(() => news.filter((story) => (filter === 'All' || (filter === 'Breaking' ? story.published.includes('min') : story.category === filter)) && `${story.title} ${story.summary}`.toLowerCase().includes(search.toLowerCase())), [filter, search])
  return <><PageIntro eyebrow="THE NEWSROOM · 24/7" title="The game, as it happens." description="Breaking stories, sharp perspectives and the details that make football matter. From every league, every country, every touchline." /><main className="section wrap page-section">
    <div className="news-feature-banner"><div className="news-feature-image"><img src={news[0].image} alt="Floodlit football ground before a match" /></div><div className="news-feature-copy"><span className="eyebrow">EDITOR’S PICK · {news[0].category}</span><h2>{news[0].title}</h2><p>{news[0].summary}</p><Link className="button button-primary" to={`/article/${news[0].id}`}>Read the story <ArrowUpRight size={16} /></Link></div></div>
    <SectionHeading eyebrow="THE FULL-TIME READ" title="Latest stories" />
    <div className="filter-row"><div className="category-filters">{categories.map((category) => <button key={category} className={filter === category ? 'filter-active' : ''} onClick={() => { setFilter(category); setShown(6) }}>{category}</button>)}</div><label className="inline-search"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search stories" aria-label="Search news stories" /></label></div>
    {filtered.length > 0 ? <div className="news-grid">{filtered.slice(0, shown).map((story) => <NewsCard key={story.id} story={story} />)}</div> : <div className="empty-state">No stories match that combination. Try another category or search.</div>}
    {filtered.length > shown && <button className="button button-outline load-more" onClick={() => setShown(shown + 3)}>Load more stories <ArrowRight size={16} /></button>}
  </main></>
}

function ArticlePage() {
  const { id } = useParams()
  const story = news.find((item) => item.id === id) || news[0]
  const related = news.filter((item) => item.id !== story.id).slice(0, 3)
  return <main className="article-page wrap"><div className="article-breadcrumb"><Link to="/news">Newsroom</Link><span>/</span><span>{story.category}</span></div><header className="article-header"><span className="category-tag article-category">{story.category}</span><h1>{story.title}</h1><p className="article-deck">{story.summary}</p><div className="article-byline"><span className="author-avatar">{story.author.split(' ').map((part) => part[0]).join('')}</span><span><strong>{story.author}</strong><small>Football Pulse · {story.published}</small></span><span className="read-time">{story.readTime}</span></div></header><figure className="article-hero-image"><img src={story.image} alt={`Football scene for the story: ${story.title}`} /><figcaption>The stories that make the game more than a game. Photo: Football Pulse</figcaption></figure><div className="article-body-grid"><article className="article-body"><p className="article-lede">{story.summary}</p><p>Football seasons are made in the moments between the moments. A run spotted early, a conversation on the training ground, a decision made with the whole season in mind. This is where the shape of the story starts to come into focus.</p><h2>A season finding its shape</h2><p>There is a new kind of clarity to the way this campaign is unfolding. The familiar names remain in the conversation, but the rhythm of the game is changing. Across the biggest grounds and the quieter corners, teams are finding fresh ways to set the tempo.</p><blockquote>“The game always tells you something new, if you stay close enough to listen.”<cite>THE FOOTBALL PULSE NOTEBOOK</cite></blockquote><p>What happens next will be decided on the pitch, as it should be. But the context matters: the work, the choices and the belief that carry a team through the long stretch of a season. That is the story worth following.</p><h2>What to watch next</h2><p>The next fixture offers the clearest answer yet. Keep an eye on the small details: who wins the second ball, where the first pass goes, and which side is brave enough to change the picture.</p><div className="article-share"><strong>PASS IT ON</strong><button aria-label="Share this article" onClick={() => navigator.clipboard?.writeText(window.location.href)}>Copy link <ArrowUpRight size={15} /></button><a href={`https://x.com/intent/post?text=${encodeURIComponent(story.title)}`} aria-label="Share on X">𝕏</a><a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} aria-label="Share on Facebook">f</a></div></article><aside className="article-sidebar"><span className="eyebrow">STAY IN THE GAME</span><h3>More from the newsroom</h3>{related.map((item) => <Link key={item.id} to={`/article/${item.id}`}><span>{item.category} · {item.published}</span><strong>{item.title}</strong></Link>)}<Link className="text-link" to="/news">All football news <ArrowRight size={15} /></Link></aside></div><section className="article-related"><SectionHeading eyebrow="KEEP YOUR EYES ON THE GAME" title="More football stories" action="Back to the newsroom" /><div className="news-grid">{related.map((item) => <NewsCard key={item.id} story={item} />)}</div></section></main>
}

function TransfersPage() {
  const [status, setStatus] = useState('ALL MOVES')
  const [league, setLeague] = useState('All leagues')
  const [search, setSearch] = useState('')
  const filtered = transfers.filter((transfer) => (status === 'ALL MOVES' || transfer.status === status) && (league === 'All leagues' || transfer.league === league) && `${transfer.player} ${transfer.from} ${transfer.to}`.toLowerCase().includes(search.toLowerCase()))
  return <><PageIntro eyebrow="THE WINDOW, WITHOUT THE NOISE" title="Every move. Every rumour." description="The names, the numbers and the next steps. Your live guide to the transfer market, from first whisper to final signature." /><main className="section wrap page-section"><section className="transfer-pulse-banner"><div><span className="eyebrow"><span className="live-indicator" /> LIVE TRANSFER TRACKER</span><h2>The window<br />is wide open.</h2><p>Deals shift in a heartbeat. Keep your finger on the pulse.</p></div><div className="transfer-pulse-stats"><div><strong>42</strong><span>DEALS TRACKED</span></div><div><strong>08</strong><span>BREAKING NOW</span></div><div><strong>€1.2bn</strong><span>WINDOW VALUE</span></div></div><div className="transfer-orbit">↗</div></section><SectionHeading eyebrow="MOVING MARKETS" title="The transfer board" /><div className="transfer-filters"><div className="category-filters">{['ALL MOVES', 'BREAKING', 'CONFIRMED', 'RUMOUR'].map((item) => <button className={status === item ? 'filter-active' : ''} key={item} onClick={() => setStatus(item)}>{item}</button>)}</div><select aria-label="Filter by league" value={league} onChange={(event) => setLeague(event.target.value)}>{leagues.map((item) => <option key={item}>{item}</option>)}</select><label className="inline-search"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a player or club" aria-label="Search transfers" /></label></div><div className="transfer-table"><div className="transfer-table-head"><span>THE PLAYER</span><span>THE MOVE</span><span>FEE</span><span>STATUS</span></div>{filtered.map((transfer) => <TransferRow key={transfer.player} transfer={transfer} />)}{filtered.length === 0 && <div className="empty-state">No moves match those filters just yet.</div>}</div><div className="transfer-note"><SlidersHorizontal size={15} /><span>Transfer fees are reported estimates and may include add-ons.</span><CalendarDays size={15} /><span>Window tracker updated today</span></div></main></>
}

function MatchesPage() {
  const [filter, setFilter] = useState('All leagues')
  const [status, setStatus] = useState('ALL')
  const filtered = matches.filter((match) => (filter === 'All leagues' || match.competition.startsWith(filter)) && (status === 'ALL' || match.status === status))
  return <><PageIntro eyebrow="EVERY KICK-OFF, ONE PLACE" title="It’s matchday somewhere." description="Live scores, upcoming fixtures and the moments that stay with you. Find your game and follow every minute." /><main className="section wrap page-section"><div className="match-controls"><div className="category-filters">{['ALL', 'LIVE', 'UPCOMING', 'FT'].map((item) => <button key={item} onClick={() => setStatus(item)} className={status === item ? 'filter-active' : ''}>{item === 'FT' ? 'FINISHED' : item}</button>)}</div><select aria-label="Filter matches by league" value={filter} onChange={(event) => setFilter(event.target.value)}>{leagues.map((item) => <option key={item}>{item}</option>)}</select></div><div className="match-day-heading"><CalendarDays size={18} /><span>Today · Friday, 9 October</span><span className="match-day-rule" /></div>{filtered.length ? <div className="match-grid">{filtered.map((match) => <MatchCard key={match.id} match={match} />)}</div> : <div className="empty-state">No matches for this selection. Try another competition or match status.</div>}<div className="matches-note"><span className="live-indicator" /> Scores are illustrative matchday data. All times shown in your local timezone.</div></main></>
}

function ClubsPage() {
  const [search, setSearch] = useState('')
  const [league, setLeague] = useState('All leagues')
  const filtered = clubs.filter((club) => (league === 'All leagues' || club.league === league) && `${club.name} ${club.country}`.toLowerCase().includes(search.toLowerCase()))
  return <><PageIntro eyebrow="BADGES WITH STORIES" title="Find your club." description="The grounds, the colours and the people who make a club. Explore the teams at the heart of the game." /><main className="section wrap page-section"><div className="directory-controls"><label className="inline-search"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search clubs or countries" aria-label="Search clubs" /></label><select aria-label="Filter clubs by league" value={league} onChange={(event) => setLeague(event.target.value)}>{leagues.map((item) => <option key={item}>{item}</option>)}</select></div><div className="club-grid directory-club-grid">{filtered.map((club) => <ClubCard key={club.id} club={club} />)}</div></main></>
}

function ClubPage() {
  const { id } = useParams()
  const club = clubs.find((item) => item.id === id) || clubs[0]
  const clubPlayers = players.filter((player) => player.club === club.name)
  return <><div className="club-profile-hero"><div className="wrap club-profile-content"><Link className="profile-back" to="/clubs">← All clubs</Link><span className="club-emblem profile-emblem" style={{ '--club-color': club.color } as CSSProperties}>{club.short}</span><span className="eyebrow">{club.country} · {club.league}</span><h1>{club.name}</h1><div className="club-profile-facts"><span><small>HOME</small>{club.stadium}</span><span><small>FORM</small>{club.form}</span><span><small>LEAGUE</small>{club.league}</span></div></div></div><main className="section wrap page-section"><SectionHeading eyebrow="FROM THE TOUCHLINE" title={`${club.name} stories`} action="More club news" to="/news" /><div className="news-grid">{news.slice(0, 3).map((story) => <NewsCard key={story.id} story={story} />)}</div>{clubPlayers.length > 0 && <><SectionHeading eyebrow="IN THE SQUAD" title="Players to know" /><div className="player-grid">{clubPlayers.map((player) => <PlayerCard key={player.id} player={player} />)}</div></>}</main></>
}

function PlayersPage() {
  const [search, setSearch] = useState('')
  const [position, setPosition] = useState('All positions')
  const filtered = players.filter((player) => (position === 'All positions' || player.position === position) && `${player.name} ${player.club} ${player.nationality}`.toLowerCase().includes(search.toLowerCase()))
  return <><PageIntro eyebrow="THE NAMES BEHIND THE NUMBERS" title="Meet the players." description="Profiles, form and the stories beyond the shirt. Get closer to the people shaping football today." /><main className="section wrap page-section"><section className="player-profile-spotlight"><PlayerSpotlight player={players[1]} /></section><div className="directory-controls"><label className="inline-search"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search players, clubs, countries" aria-label="Search players" /></label><select aria-label="Filter by position" value={position} onChange={(event) => setPosition(event.target.value)}>{['All positions', 'Forward', 'Midfielder', 'Defender', 'Goalkeeper'].map((item) => <option key={item}>{item}</option>)}</select></div><div className="player-grid">{filtered.map((player) => <PlayerCard key={player.id} player={player} />)}</div></main></>
}

function PlayerPage() {
  const { id } = useParams()
  const player = players.find((item) => item.id === id) || players[0]
  return <><PageIntro eyebrow="PLAYER PROFILE" title={player.name} description={`${player.position} · ${player.club} · ${player.nationality}`} /><main className="section wrap page-section"><PlayerSpotlight player={player} /><div className="player-facts-grid"><div><span>AGE</span><strong>{player.age}</strong></div><div><span>POSITION</span><strong>{player.position}</strong></div><div><span>NATIONALITY</span><strong>{player.nationality}</strong></div><div><span>CLUB</span><strong>{player.club}</strong></div></div><SectionHeading eyebrow="IN THE NUMBERS" title="Season so far" /><div className="player-stat-grid"><div><strong>{player.appearances}</strong><span>APPEARANCES</span></div><div><strong>{player.goals}</strong><span>GOALS</span></div><div><strong>{player.assists}</strong><span>ASSISTS</span></div></div><SectionHeading eyebrow="IN THEIR WORLD" title="Recent stories" /><div className="news-grid">{news.slice(1, 4).map((story) => <NewsCard key={story.id} story={story} />)}</div><Link className="text-link player-transfer-link" to="/transfers">Transfer history <ArrowRight size={16} /></Link></main></>
}

function AnalysisPage() {
  const analysis = news.filter((story) => story.category === 'Analysis')
  return <><PageIntro eyebrow="BEYOND THE SCORELINE" title="The game, in context." description="Tactics, culture and the details hiding in plain sight. Football is more than 90 minutes. Let’s get into it." /><main className="section wrap page-section"><div className="analysis-lead"><span className="eyebrow">THE PULSE NOTEBOOK</span><h2>Football is a game of space.<br />And stories.</h2><p>Thoughtful analysis from the people who watch closely, ask better questions and love the game too much to leave it at the scoreline.</p><Link className="button button-primary" to={`/article/${analysis[0].id}`}>Read our latest analysis <ArrowUpRight size={16} /></Link></div><div className="news-grid">{analysis.map((story) => <NewsCard key={story.id} story={story} />)}</div></main></>
}

function AboutPage() {
  return <><PageIntro eyebrow="INDEPENDENT. EVERYWHERE." title="For the love of the game." description="Football Pulse is an independent football newsroom built for people who feel the game in every time zone." /><main className="section wrap about-page"><div className="about-statement"><span className="eyebrow">OUR NORTH STAR</span><h2>One game.<br /><i>A million ways to feel it.</i></h2><p>From the first kickabout to the final whistle under the lights, football belongs to everyone. We tell the stories that bring us closer to the game and to each other.</p></div><div className="about-values"><div><span>01</span><h3>Everywhere means everywhere.</h3><p>The game has no borders. Neither should its coverage.</p></div><div><span>02</span><h3>Curiosity over noise.</h3><p>We look beyond the headline to find the human story.</p></div><div><span>03</span><h3>Independent by design.</h3><p>Our only allegiance is to the game and the people in it.</p></div></div><div className="about-contact"><span className="eyebrow">HAVE A STORY?</span><h2>We're listening.</h2><a className="text-link" href="mailto:hello@footballpulse.news">hello@footballpulse.news <ArrowUpRight size={16} /></a></div></main></>
}

export { HomePage, NewsPage, ArticlePage, TransfersPage, MatchesPage, ClubsPage, ClubPage, PlayersPage, PlayerPage, AnalysisPage, AboutPage }