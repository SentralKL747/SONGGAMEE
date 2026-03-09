import { EventOutcome, Genre, MusicEra, Label, Achievement, CareerEnding } from './types';

export const GENRES: Genre[] = ['Pop', 'Rock', 'Metal', 'Jazz', 'Hip-Hop', 'EDM', 'Indie', 'R&B', 'Country'];

export const MUSIC_ERAS: Record<MusicEra, { genreBoosts: Partial<Record<Genre, number>>, genrePenalties: Partial<Record<Genre, number>>, description: string }> = {
  '2000s Pop Era': {
    genreBoosts: { 'Pop': 0.2, 'R&B': 0.1 },
    genrePenalties: { 'Indie': -0.1 },
    description: 'Bubblegum pop and R&B dominate the airwaves.'
  },
  'Trap Dominance': {
    genreBoosts: { 'Hip-Hop': 0.25, 'R&B': 0.1 },
    genrePenalties: { 'Rock': -0.15, 'Metal': -0.1 },
    description: 'Heavy 808s and triplet flows are everywhere.'
  },
  'EDM Boom': {
    genreBoosts: { 'EDM': 0.2, 'Pop': 0.1 },
    genrePenalties: { 'Jazz': -0.1, 'Country': -0.1 },
    description: 'Electronic dance music takes over the global charts.'
  },
  'Indie Revival': {
    genreBoosts: { 'Indie': 0.2, 'Rock': 0.1 },
    genrePenalties: { 'Pop': -0.1 },
    description: 'Authentic, raw sounds and independent artists are rising.'
  },
  'Retro Pop': {
    genreBoosts: { 'Pop': 0.15, 'Jazz': 0.1, 'R&B': 0.1 },
    genrePenalties: { 'Metal': -0.1 },
    description: '80s synths and disco grooves make a massive comeback.'
  }
};

export const LABELS: Label[] = [
  {
    type: 'Independent',
    name: 'Self-Released',
    benefits: ['100% Creative Freedom', 'Higher Royalty Share'],
    chartBonus: 0,
    tourBonus: -0.1,
    scandalChance: 0.05
  },
  {
    type: 'Indie Label',
    name: 'Neon Records',
    benefits: ['Creative Freedom', 'Niche Marketing'],
    chartBonus: 0.05,
    tourBonus: 0,
    scandalChance: 0.08
  },
  {
    type: 'Major Label',
    name: 'Global Music Group',
    benefits: ['Huge Marketing Budget', 'Award Nomination Bonus'],
    chartBonus: 0.15,
    tourBonus: 0.1,
    scandalChance: 0.15
  },
  {
    type: 'Global Superstar Contract',
    name: 'Empire Entertainment',
    benefits: ['Guaranteed Radio Play', 'Global Distribution'],
    chartBonus: 0.3,
    tourBonus: 0.2,
    scandalChance: 0.25
  }
];

export const RIVAL_NAMES = [
  'Neon Wolf', 'Luna Ray', 'Shadow Kid', 'Electric Eve', 'The Void',
  'Starlet', 'Viper', 'Ghost Writer', 'King Cobra', 'Velvet',
  'Echo', 'Static', 'Mirage', 'Thunder', 'Rogue'
];

export const NAME_PATTERNS = [
  'ADJ_NOUN',
  'NOUN_NOUN',
  'THE_NOUN',
  'VERB_NOUN',
  'ADJ_ADJ_NOUN'
];

export const COLLABORATORS = [
  'Taylor Swift', 'Beyoncé', 'Drake', 'Adele', 'Billie Eilish', 
  'Ed Sheeran', 'Travis Scott', 'Ariana Grande', 'Kanye West', 'Rihanna',
  'Harry Styles', 'Lady Gaga', 'Post Malone', 'Doja Cat', 'The Weeknd',
  'Dua Lipa', 'Bruno Mars', 'Justin Bieber', 'SZA', 'Kendrick Lamar',
  'Coldplay', 'Imagine Dragons', 'Shawn Mendes', 'Halsey', 'Megan Thee Stallion',
  'Sam Smith', 'Lizzo', 'J. Cole', 'Khalid', 'Olivia Rodrigo',
  'Sabrina Carpenter', 'Troye Sivan', 'Tate McRae', 'Future', 'Lil Baby',
  'Jack Harlow', 'Metro Boomin', 'Arctic Monkeys', 'Paramore', 'The 1975',
  'Foo Fighters', 'Kings of Leon', 'Phoebe Bridgers', 'Clairo', 'Beabadoobee',
  'Rex Orange County', 'Central Cee', 'Ice Spice', 'Lana Del Rey', 'Tyla'
];

export const REAL_ARTISTS = [
  { name: 'Adele', songs: ['Easy on Me', 'Hello', 'Someone Like You'], genre: 'Pop' },
  { name: 'Drake', songs: ['God\'s Plan', 'One Dance', 'Hotline Bling'], genre: 'Hip-Hop' },
  { name: 'Taylor Swift', songs: ['Anti-Hero', 'Shake It Off', 'Blank Space'], genre: 'Pop' },
  { name: 'The Weeknd', songs: ['Blinding Lights', 'Starboy', 'Save Your Tears'], genre: 'Pop' },
  { name: 'Billie Eilish', songs: ['Bad Guy', 'Happier Than Ever', 'Ocean Eyes'], genre: 'Indie' },
  { name: 'Ed Sheeran', songs: ['Shape of You', 'Perfect', 'Bad Habits'], genre: 'Pop' },
  { name: 'Justin Bieber', songs: ['Stay', 'Peaches', 'Sorry'], genre: 'Pop' },
  { name: 'Dua Lipa', songs: ['Levitating', 'Don\'t Start Now', 'New Rules'], genre: 'Pop' },
  { name: 'Harry Styles', songs: ['As It Was', 'Watermelon Sugar', 'Sign of the Times'], genre: 'Pop' },
  { name: 'Ariana Grande', songs: ['7 Rings', 'Thank U, Next', 'Positions'], genre: 'Pop' },
  { name: 'Olivia Rodrigo', songs: ['Drivers License', 'Good 4 U', 'Vampire'], genre: 'Pop' },
  { name: 'Sabrina Carpenter', songs: ['Espresso', 'Feather', 'Nonsense'], genre: 'Pop' },
  { name: 'Travis Scott', songs: ['Sicko Mode', 'Goosebumps', 'Feather'], genre: 'Hip-Hop' },
  { name: 'Arctic Monkeys', songs: ['Do I Wanna Know?', 'R U Mine?', '505'], genre: 'Rock' },
  { name: 'Phoebe Bridgers', songs: ['Motion Sickness', 'Kyoto', 'Garden Song'], genre: 'Indie' },
];

export const WORLD_CITIES = [
  'London', 'New York', 'Los Angeles', 'Tokyo', 'Sydney', 'Berlin', 'Paris', 'Toronto', 
  'Seoul', 'Mexico City', 'São Paulo', 'Mumbai', 'Dubai', 'Singapore', 'Amsterdam', 
  'Madrid', 'Rome', 'Chicago', 'Miami', 'Nashville', 'Austin', 'Seattle', 'Dublin'
];

export const GENRE_BLENDS = [
  'Pop / Alternative', 'Hip-Hop / R&B', 'Rock / Indie', 'EDM / Pop', 'Jazz / Soul',
  'Country / Rock', 'Metal / Core', 'Pop / Punk', 'Lo-fi / Chill', 'Hyperpop / Glitch'
];

export const ALBUM_NAME_ADJECTIVES = ['Electric', 'Neon', 'Broken', 'Golden', 'Silent', 'Vibrant', 'Dark', 'Midnight', 'Velvet', 'Wild', 'Infinite', 'Savage', 'Ethereal', 'Plastic', 'Crimson', 'Azure', 'Liquid', 'Stellar', 'Atomic', 'Sacred', 'Paper', 'Glass', 'Quiet', 'Digital', 'Cyber', 'Hyper', 'Late'];
export const ALBUM_NAME_NOUNS = ['Heartbeat', 'Dreams', 'Nights', 'Echoes', 'Soul', 'Rhythm', 'Sky', 'Waves', 'Fire', 'Shadows', 'Kingdom', 'Paradox', 'Horizon', 'Empire', 'Legacy', 'Prophecy', 'Rebellion', 'Sanctuary', 'Odyssey', 'Eclipse', 'Satellites', 'Cinema', 'Oceans', 'Flex', 'Lights', 'Chains', 'Mirage', 'Gravity', 'Thunder'];

export const SONG_NAME_ADJECTIVES = ['Fast', 'Slow', 'Sweet', 'Bitter', 'Lost', 'Found', 'Deep', 'High', 'Young', 'Old', 'Cold', 'Warm', 'Rough', 'Smooth', 'Hard', 'Soft', 'Loud', 'Quiet', 'Bright', 'Dim', 'Midnight', 'Neon', 'Electric', 'Paper', 'Glass', 'Late', 'Gold', 'Golden', 'Silent'];
export const SONG_NAME_NOUNS = ['Love', 'Road', 'City', 'Rain', 'Sun', 'Dance', 'Cry', 'Smile', 'Ghost', 'Star', 'Heart', 'Mind', 'Soul', 'Life', 'Death', 'Truth', 'Lie', 'Dream', 'Night', 'Day', 'Motion', 'Hearts', 'Summer', 'Satellites', 'Cinema', 'Oceans', 'Flex', 'Lights', 'Chains', 'Gravity', 'Echo', 'Thunder', 'Mirage'];

export const ARTIST_NAME_ADJECTIVES = ['The', 'Lil', 'Big', 'Young', 'Old', 'Saint', 'Bad', 'Good', 'Real', 'Fake', 'New', 'Last', 'First', 'Only', 'Main', 'Side', 'Top', 'Low', 'High', 'Deep', 'Neon', 'Electric', 'Silent', 'Golden', 'Midnight'];
export const ARTIST_NAME_NOUNS = ['Star', 'Wolf', 'King', 'Queen', 'Prince', 'Lord', 'God', 'Ghost', 'Shadow', 'Flame', 'Wave', 'Storm', 'Bird', 'Cat', 'Dog', 'Bear', 'Lion', 'Tiger', 'Snake', 'Fish', 'Mirage', 'Gravity', 'Echo', 'Thunder', 'Cinema'];

export const GENRE_THEMES: Record<Genre, { adjectives: string[], nouns: string[] }> = {
  'Pop': { adjectives: ['Sweet', 'Shiny', 'Happy', 'Neon', 'Plastic', 'Midnight', 'Electric'], nouns: ['Love', 'Heart', 'Dream', 'Night', 'Dance', 'Motion', 'Summer'] },
  'Rock': { adjectives: ['Hard', 'Heavy', 'Wild', 'Electric', 'Raw', 'Broken'], nouns: ['Fire', 'Stone', 'Road', 'Storm', 'Blood', 'Thunder', 'Mirage'] },
  'Metal': { adjectives: ['Dark', 'Black', 'Dead', 'Iron', 'Grim', 'Savage'], nouns: ['Death', 'Hell', 'Scream', 'Void', 'Metal', 'Shadows'] },
  'Jazz': { adjectives: ['Smooth', 'Cool', 'Blue', 'Midnight', 'Soft', 'Velvet'], nouns: ['Soul', 'Note', 'Mood', 'Rain', 'Vibe', 'Echoes'] },
  'Hip-Hop': { adjectives: ['Real', 'Cold', 'Street', 'Gold', 'Fresh', 'Late'], nouns: ['Game', 'Money', 'City', 'Life', 'Hood', 'Flex', 'Chains'] },
  'EDM': { adjectives: ['Digital', 'Cyber', 'Neon', 'Fast', 'Hyper', 'Stellar'], nouns: ['Beat', 'Bass', 'Pulse', 'Wave', 'Drop', 'Gravity'] },
  'Indie': { adjectives: ['Quiet', 'Small', 'Lost', 'Paper', 'Wild', 'Glass'], nouns: ['Forest', 'Sea', 'Bird', 'Home', 'Wind', 'Satellites', 'Cinema'] },
  'R&B': { adjectives: ['Deep', 'Slow', 'Sweet', 'Warm', 'Smooth', 'Liquid'], nouns: ['Love', 'Touch', 'Night', 'Soul', 'Heart', 'Oceans'] },
  'Country': { adjectives: ['Old', 'Dusty', 'Long', 'Red', 'Wild', 'Golden'], nouns: ['Road', 'Truck', 'Home', 'River', 'Sky', 'Horizon'] },
};

export const getRandomName = (type: 'Album' | 'Song' | 'Artist', genre?: Genre) => {
  const pattern = NAME_PATTERNS[Math.floor(Math.random() * NAME_PATTERNS.length)];
  
  let adjs = SONG_NAME_ADJECTIVES;
  let nouns = SONG_NAME_NOUNS;

  if (type === 'Artist') {
    adjs = ARTIST_NAME_ADJECTIVES;
    nouns = ARTIST_NAME_NOUNS;
  } else if (type === 'Album') {
    adjs = ALBUM_NAME_ADJECTIVES;
    nouns = ALBUM_NAME_NOUNS;
  }

  if (genre && GENRE_THEMES[genre]) {
    adjs = [...adjs, ...GENRE_THEMES[genre].adjectives];
    nouns = [...nouns, ...GENRE_THEMES[genre].nouns];
  }

  const getAdj = () => adjs[Math.floor(Math.random() * adjs.length)];
  const getNoun = () => nouns[Math.floor(Math.random() * nouns.length)];

  switch (pattern) {
    case 'ADJ_NOUN': return `${getAdj()} ${getNoun()}`;
    case 'NOUN_NOUN': return `${getNoun()} ${getNoun()}`;
    case 'THE_NOUN': return `The ${getNoun()}`;
    case 'VERB_NOUN': return `Midnight ${getNoun()}`; // Simplified verb pattern
    case 'ADJ_ADJ_NOUN': return `${getAdj()} ${getAdj()} ${getNoun()}`;
    default: return `${getAdj()} ${getNoun()}`;
  }
};

export const RELEASE_DECISION_OUTCOMES: EventOutcome[] = [
  { id: 'dec_album', text: 'Release an Album', shortText: 'Album', icon: 'Disc', emoji: '💿', color: '#10B981', weight: 40 },
  { id: 'dec_single', text: 'Release a Single', shortText: 'Single', icon: 'Music', emoji: '🎵', color: '#34D399', weight: 40 },
  { id: 'dec_skip', text: 'Take a Break Year', shortText: 'Break', icon: 'Coffee', emoji: '🏖️', color: '#EF4444', weight: 20 },
];

export const ALBUM_TYPE_OUTCOMES: EventOutcome[] = [
  { id: 'album_studio', text: 'Studio Album', shortText: 'Studio', icon: 'Disc', emoji: '💿', color: '#10B981', weight: 50 },
  { id: 'album_ep', text: 'EP', shortText: 'EP', icon: 'Disc', emoji: '📀', color: '#34D399', weight: 20 },
  { id: 'album_mixtape', text: 'Mixtape', shortText: 'Mixtape', icon: 'CassetteTape', emoji: '📼', color: '#6EE7B7', weight: 15 },
  { id: 'album_live', text: 'Live Album', shortText: 'Live', icon: 'Mic2', emoji: '🎤', color: '#A7F3D0', weight: 10 },
  { id: 'album_comp', text: 'Compilation', shortText: 'Comp', icon: 'Library', emoji: '📚', color: '#D1FAE5', weight: 5 },
];

export const SINGLE_TYPE_OUTCOMES: EventOutcome[] = [
  { id: 'single_lead', text: 'Lead Single', shortText: 'Lead', icon: 'Rocket', emoji: '🚀', color: '#10B981', weight: 40 },
  { id: 'single_promo', text: 'Promo Single', shortText: 'Promo', icon: 'Megaphone', emoji: '📢', color: '#34D399', weight: 30 },
  { id: 'single_viral', text: 'Viral Track', shortText: 'Viral', icon: 'Zap', emoji: '⚡', color: '#6EE7B7', weight: 10 },
  { id: 'single_standard', text: 'Standard Single', shortText: 'Standard', icon: 'Music', emoji: '🎵', color: '#A7F3D0', weight: 20 },
];

export const TRACK_COUNT_OUTCOMES: EventOutcome[] = [
  { id: 'tracks_6', text: '6 Tracks', shortText: '6', icon: 'ListMusic', emoji: '💿', color: '#10B981', weight: 20 },
  { id: 'tracks_10', text: '10 Tracks', shortText: '10', icon: 'ListMusic', emoji: '💿', color: '#34D399', weight: 40 },
  { id: 'tracks_12', text: '12 Tracks', shortText: '12', icon: 'ListMusic', emoji: '💿', color: '#6EE7B7', weight: 30 },
  { id: 'tracks_15', text: '15 Tracks', shortText: '15', icon: 'ListMusic', emoji: '💿', color: '#A7F3D0', weight: 10 },
];

export const CHART_POSITION_OUTCOMES: EventOutcome[] = [
  { id: 'chart_1', text: '#1 Global Smash!', shortText: '#1', icon: 'Trophy', emoji: '🏆', statIncrement: 'numberOneHits', color: '#10B981', chartPointsRange: [95, 100], weight: 5 },
  { id: 'chart_top10', text: 'Top 10 Hit', shortText: 'Top 10', icon: 'Flame', emoji: '🔥', statIncrement: 'top10Hits', color: '#34D399', chartPointsRange: [75, 94], weight: 15 },
  { id: 'chart_mid', text: 'Mid-Chart Success', shortText: 'Mid', icon: 'TrendingUp', emoji: '📈', color: '#6EE7B7', chartPointsRange: [40, 74], weight: 30 },
  { id: 'chart_low', text: 'Low Chart Entry', shortText: 'Low', icon: 'Radio', emoji: '📻', color: '#A7F3D0', chartPointsRange: [20, 39], weight: 30 },
  { id: 'chart_flop', text: 'Flop / Did Not Chart', shortText: 'Flop', icon: 'XCircle', emoji: '❌', color: '#EF4444', chartPointsRange: [0, 19], weight: 20 },
];

export const LABEL_OFFER_OUTCOMES: EventOutcome[] = [
  { id: 'label_indie', text: 'Neon Records (Indie)', shortText: 'Indie', icon: 'Building', emoji: '🏢', color: '#34D399', weight: 50 },
  { id: 'label_major', text: 'Global Music Group (Major)', shortText: 'Major', icon: 'Building2', emoji: '🏙️', color: '#10B981', weight: 30 },
  { id: 'label_superstar', text: 'Empire Ent. (Superstar)', shortText: 'Superstar', icon: 'Crown', emoji: '👑', color: '#F59E0B', weight: 5 },
  { id: 'label_none', text: 'Stay Independent', shortText: 'Stay Indie', icon: 'User', emoji: '👤', color: '#6B7280', weight: 15 },
];

export const CAREER_GOALS = [
  { id: 'goal_1', text: 'Release 5 Albums', target: 5, stat: 'albumsReleased' },
  { id: 'goal_2', text: 'Get 3 #1 Hits', target: 3, stat: 'numberOneHits' },
  { id: 'goal_3', text: 'Win 5 Awards', target: 5, stat: 'awardsWon' },
  { id: 'goal_4', text: 'Complete 10 Tours', target: 10, stat: 'toursCompleted' },
  { id: 'goal_5', text: 'Survive 3 Scandals', target: 3, stat: 'scandalsSurvived' },
];

export const AWARD_NOMINATION_OUTCOMES: EventOutcome[] = [
  { id: 'nom_grammy', text: 'Grammy Nomination', shortText: 'Grammy', icon: 'Award', emoji: '🏆', color: '#10B981', weight: 10 },
  { id: 'nom_brit', text: 'BRIT Award Nomination', shortText: 'BRIT', icon: 'Award', emoji: '🇬🇧', color: '#34D399', weight: 10 },
  { id: 'nom_billboard', text: 'Billboard Nomination', shortText: 'Billboard', icon: 'BarChart3', emoji: '📊', color: '#6EE7B7', weight: 15 },
  { id: 'nom_vma', text: 'MTV VMA Nomination', shortText: 'VMA', icon: 'Tv', emoji: '📺', color: '#A7F3D0', weight: 15 },
  { id: 'nom_none', text: 'No Major Nominations', shortText: 'None', icon: 'Minus', emoji: '🤷', color: '#EF4444', weight: 50 },
];

export const AWARD_POSITION_OUTCOMES: EventOutcome[] = [
  { id: 'pos_win', text: 'Winner!', shortText: 'Win', icon: 'CheckCircle2', emoji: '🥇', statIncrement: 'awardsWon', color: '#10B981', weight: 20 },
  { id: 'pos_runner', text: 'Runner Up', shortText: 'Runner', icon: 'Circle', emoji: '🥈', color: '#34D399', weight: 30 },
  { id: 'pos_nominee', text: 'Just a Nominee', shortText: 'Nominee', icon: 'FileText', emoji: '📜', color: '#6EE7B7', weight: 50 },
];

export const TOUR_DECISION_OUTCOMES: EventOutcome[] = [
  { id: 'tour_world', text: 'World Tour', shortText: 'World', icon: 'Globe', emoji: '🌎', statIncrement: 'toursCompleted', color: '#10B981', weight: 15 },
  { id: 'tour_domestic', text: 'Domestic Tour', shortText: 'Domestic', icon: 'Truck', emoji: '🚐', statIncrement: 'toursCompleted', color: '#34D399', weight: 35 },
  { id: 'tour_festivals', text: 'Festival Circuit', shortText: 'Festivals', icon: 'Mic2', emoji: '🎤', color: '#6EE7B7', weight: 25 },
  { id: 'tour_none', text: 'No Tour This Year', shortText: 'None', icon: 'Home', emoji: '🏠', color: '#EF4444', weight: 25 },
];

export const TOUR_CITIES_OUTCOMES: EventOutcome[] = [
  { id: 'cities_5', text: '5 Cities', shortText: '5', icon: 'MapPin', emoji: '📍', color: '#10B981', weight: 40 },
  { id: 'cities_10', text: '10 Cities', shortText: '10', icon: 'MapPin', emoji: '📍', color: '#34D399', weight: 30 },
  { id: 'cities_20', text: '20 Cities', shortText: '20', icon: 'MapPin', emoji: '📍', color: '#6EE7B7', weight: 20 },
  { id: 'cities_50', text: '50 Cities (Mega Tour)', shortText: '50', icon: 'MapPin', emoji: '📍', color: '#A7F3D0', weight: 10 },
];

export const SPECIAL_EVENT_OUTCOMES: EventOutcome[] = [
  { id: 'special_viral', text: 'Surprise Viral Moment!', shortText: 'Viral', icon: 'Zap', emoji: '📱', statIncrement: 'viralMoments', color: '#10B981', weight: 25 },
  { id: 'special_film', text: 'Song Featured in Major Film!', shortText: 'Film', icon: 'Film', emoji: '🎬', color: '#34D399', weight: 25 },
  { id: 'special_tweet', text: 'Controversial Tweet!', shortText: 'Tweet', icon: 'Twitter', emoji: '🐦', statIncrement: 'scandalsSurvived', color: '#EF4444', weight: 25 },
  { id: 'special_scandal', text: 'Tabloid Scandal!', shortText: 'Scandal', icon: 'Camera', emoji: '📸', statIncrement: 'scandalsSurvived', color: '#EF4444', weight: 25 },
];

export const COLLAB_CHANCE_OUTCOMES: EventOutcome[] = [
  { id: 'collab_yes', text: 'Collaboration Secured!', shortText: 'Yes', icon: 'Users', emoji: '🤝', color: '#10B981', weight: 30 },
  { id: 'collab_no', text: 'No Collaboration', shortText: 'No', icon: 'User', emoji: '👤', color: '#EF4444', weight: 70 },
];

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'ach_first_hit', name: 'First #1 Hit', description: 'Score your first #1 single.', unlocked: false, icon: 'Trophy' },
  { id: 'ach_world_tour', name: 'Global Star', description: 'Complete a World Tour.', unlocked: false, icon: 'Globe' },
  { id: 'ach_grammy', name: 'Grammy Winner', description: 'Win a Grammy Award.', unlocked: false, icon: 'Award' },
  { id: 'ach_ten_top10', name: 'Hit Maker', description: 'Score 10 Top 10 hits.', unlocked: false, icon: 'Star' },
  { id: 'ach_superstar', name: 'Global Superstar', description: 'Sign a Global Superstar Contract.', unlocked: false, icon: 'Crown' },
];

export const CAREER_ENDINGS: CareerEnding[] = [
  { id: 'end_legend', title: 'Music Legend', description: 'You are a global icon with a legacy that will last forever.', icon: 'Crown' },
  { id: 'end_cult', title: 'Cult Classic', description: 'You never had the biggest hits, but your fans are the most loyal in the world.', icon: 'Heart' },
  { id: 'end_onehit', title: 'One Hit Wonder', description: 'You had one glorious moment in the sun.', icon: 'Sun' },
  { id: 'end_flop', title: 'Industry Flop', description: 'The music industry was tougher than it looked.', icon: 'XCircle' },
];
