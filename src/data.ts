export type NewsStory = {
  id: string
  category: string
  title: string
  summary: string
  image: string
  author: string
  published: string
  readTime: string
}

export type FootballClub = {
  id: string
  name: string
  short: string
  country: string
  league: string
  color: string
  stadium: string
  form: string
}

export type FootballPlayer = {
  id: string
  name: string
  club: string
  position: string
  nationality: string
  age: number
  number: string
  image: string
  goals: number
  assists: number
  appearances: number
}

export const news: NewsStory[] = [
  {
    id: 'title-race-turns',
    category: 'Premier League',
    title: 'The title race is turning into a test of nerve',
    summary: 'A relentless run-in has changed the shape of the season. The margins are smaller, the stakes higher, and every weekend feels decisive.',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1500&q=85',
    author: 'Marcus Reid',
    published: '12 min ago',
    readTime: '6 min read',
  },
  {
    id: 'midfield-blueprint',
    category: 'Analysis',
    title: 'Inside the midfield blueprint changing the modern game',
    summary: 'Why the best sides are finding new ways to own the space between the lines.',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1000&q=85',
    author: 'Nia Okafor',
    published: '38 min ago',
    readTime: '8 min read',
  },
  {
    id: 'afcon-homecoming',
    category: 'African Football',
    title: 'A homecoming years in the making for a new generation',
    summary: 'Across the continent, a fresh wave of talent is making its mark on the biggest stages.',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1000&q=85',
    author: 'Kwame Mensah',
    published: '1 hr ago',
    readTime: '5 min read',
  },
  {
    id: 'derby-prepared',
    category: 'La Liga',
    title: 'Madrid derby arrives with everything still to play for',
    summary: 'Two rivals, one city and a fixture that could reshape the race at the top.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1000&q=85',
    author: 'Elena Torres',
    published: '2 hrs ago',
    readTime: '4 min read',
  },
  {
    id: 'summer-window',
    category: 'Transfers',
    title: 'European heavyweights begin early summer planning',
    summary: 'Recruitment teams are moving quickly as the next window starts to take shape.',
    image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1000&q=85',
    author: 'Tomás Silva',
    published: '3 hrs ago',
    readTime: '7 min read',
  },
  {
    id: 'champions-night',
    category: 'Champions League',
    title: 'Under the lights, Europe still belongs to the fearless',
    summary: 'The knockout rounds have a way of rewarding teams who trust their instincts.',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1000&q=85',
    author: 'Luca Moretti',
    published: '4 hrs ago',
    readTime: '6 min read',
  },
  {
    id: 'women-game-growing',
    category: 'International',
    title: 'The next chapter of the women’s game is being written now',
    summary: 'More fans, bigger stages, and a new generation setting its own pace.',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1000&q=85',
    author: 'Sofia Laurent',
    published: '5 hrs ago',
    readTime: '5 min read',
  },
  {
    id: 'bundesliga-press',
    category: 'Bundesliga',
    title: 'The press that never sleeps: a tactical evolution',
    summary: 'A new approach to pressing is changing how teams build from the back.',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1000&q=85',
    author: 'Jonas Weber',
    published: '6 hrs ago',
    readTime: '9 min read',
  },
  {
    id: 'serie-a-revival',
    category: 'Serie A',
    title: 'Serie A’s revival is built on more than nostalgia',
    summary: 'Fresh ideas and fearless young coaches are giving Italy’s top flight new energy.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1000&q=85',
    author: 'Luca Moretti',
    published: 'Yesterday',
    readTime: '7 min read',
  },
  {
    id: 'keepers-new-role',
    category: 'Analysis',
    title: 'The goalkeeper is no longer the last line. They are the first.',
    summary: 'A look at the keepers who have become the most important passers on the pitch.',
    image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1000&q=85',
    author: 'Nia Okafor',
    published: 'Yesterday',
    readTime: '6 min read',
  },
]

export const clubs: FootballClub[] = [
  { id: 'arsenal', name: 'Arsenal', short: 'ARS', country: 'England', league: 'Premier League', color: '#ed1c24', stadium: 'Emirates Stadium', form: 'W W D W W' },
  { id: 'man-city', name: 'Manchester City', short: 'MCI', country: 'England', league: 'Premier League', color: '#6cabdd', stadium: 'Etihad Stadium', form: 'W W W D W' },
  { id: 'liverpool', name: 'Liverpool', short: 'LIV', country: 'England', league: 'Premier League', color: '#c8102e', stadium: 'Anfield', form: 'W D W W L' },
  { id: 'real-madrid', name: 'Real Madrid', short: 'RMA', country: 'Spain', league: 'La Liga', color: '#e8e8e8', stadium: 'Santiago Bernabéu', form: 'W W W W D' },
  { id: 'barcelona', name: 'Barcelona', short: 'FCB', country: 'Spain', league: 'La Liga', color: '#a50044', stadium: 'Estadi Olímpic', form: 'W W D W W' },
  { id: 'bayern', name: 'Bayern Munich', short: 'FCB', country: 'Germany', league: 'Bundesliga', color: '#dc052d', stadium: 'Allianz Arena', form: 'W W L W W' },
  { id: 'inter', name: 'Inter Milan', short: 'INT', country: 'Italy', league: 'Serie A', color: '#0068a8', stadium: 'San Siro', form: 'W W W D W' },
  { id: 'psg', name: 'Paris Saint-Germain', short: 'PSG', country: 'France', league: 'Ligue 1', color: '#004170', stadium: 'Parc des Princes', form: 'W W W W W' },
]

export const players: FootballPlayer[] = [
  { id: 'mohamed-salah', name: 'Mohamed Salah', club: 'Liverpool', position: 'Forward', nationality: 'Egypt', age: 33, number: '11', image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=85', goals: 24, assists: 12, appearances: 32 },
  { id: 'jude-bellingham', name: 'Jude Bellingham', club: 'Real Madrid', position: 'Midfielder', nationality: 'England', age: 22, number: '5', image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=85', goals: 19, assists: 8, appearances: 29 },
  { id: 'vinicius-junior', name: 'Vinícius Júnior', club: 'Real Madrid', position: 'Forward', nationality: 'Brazil', age: 25, number: '7', image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=900&q=85', goals: 21, assists: 9, appearances: 31 },
  { id: 'sam-kerr', name: 'Sam Kerr', club: 'Chelsea', position: 'Forward', nationality: 'Australia', age: 32, number: '20', image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=85', goals: 15, assists: 5, appearances: 21 },
]

export type Match = {
  id: string
  competition: string
  home: string
  away: string
  homeScore: number
  awayScore: number
  status: 'LIVE' | 'FT' | 'UPCOMING'
  time: string
}

export const matches: Match[] = [
  { id: 'madrid-barca', competition: 'La Liga · Matchday 28', home: 'Real Madrid', away: 'Barcelona', homeScore: 2, awayScore: 1, status: 'LIVE', time: '67′' },
  { id: 'city-liverpool', competition: 'Premier League · Matchday 30', home: 'Man City', away: 'Liverpool', homeScore: 1, awayScore: 1, status: 'FT', time: 'FT' },
  { id: 'arsenal-chelsea', competition: 'Premier League · Matchday 30', home: 'Arsenal', away: 'Chelsea', homeScore: 0, awayScore: 0, status: 'UPCOMING', time: '20:00' },
  { id: 'inter-milan', competition: 'Serie A · Matchday 29', home: 'Inter Milan', away: 'AC Milan', homeScore: 3, awayScore: 1, status: 'FT', time: 'FT' },
  { id: 'bayern-dortmund', competition: 'Bundesliga · Matchday 26', home: 'Bayern Munich', away: 'Dortmund', homeScore: 0, awayScore: 0, status: 'UPCOMING', time: '17:30' },
]

export type Transfer = {
  player: string
  from: string
  to: string
  fee: string
  status: 'CONFIRMED' | 'RUMOUR' | 'BREAKING'
  league: string
}

export const transfers: Transfer[] = [
  { player: 'Victor Osimhen', from: 'Napoli', to: 'Paris Saint-Germain', fee: '€95m', status: 'BREAKING', league: 'Ligue 1' },
  { player: 'Michael Olise', from: 'Crystal Palace', to: 'Bayern Munich', fee: '€53m', status: 'CONFIRMED', league: 'Bundesliga' },
  { player: 'Florian Wirtz', from: 'Bayer Leverkusen', to: 'Real Madrid', fee: '€110m', status: 'RUMOUR', league: 'La Liga' },
  { player: 'Nico Williams', from: 'Athletic Club', to: 'Barcelona', fee: '€58m', status: 'RUMOUR', league: 'La Liga' },
  { player: 'Khvicha Kvaratskhelia', from: 'Napoli', to: 'Liverpool', fee: '€75m', status: 'BREAKING', league: 'Premier League' },
]

export const leagues = ['All leagues', 'Premier League', 'La Liga', 'Champions League', 'Serie A', 'Bundesliga', 'Ligue 1', 'CAF Champions League']
export const categories = ['All', 'Breaking', 'Transfers', 'Premier League', 'La Liga', 'Champions League', 'African Football', 'International', 'Analysis']