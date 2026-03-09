
export type CareerType = 'Solo Artist' | 'Band';

export type Genre = 'Pop' | 'Rock' | 'Metal' | 'Jazz' | 'Hip-Hop' | 'EDM' | 'Indie' | 'R&B' | 'Country';

export type AlbumType = 'Studio Album' | 'EP' | 'Mixtape' | 'Live Album' | 'Compilation';
export type SingleType = 'Lead Single' | 'Promo Single' | 'Viral Track' | 'Standard Single';

export type MusicEra = '2000s Pop Era' | 'Trap Dominance' | 'EDM Boom' | 'Indie Revival' | 'Retro Pop';

export type LabelType = 'Independent' | 'Indie Label' | 'Major Label' | 'Global Superstar Contract';

export interface Label {
  type: LabelType;
  name: string;
  benefits: string[];
  chartBonus: number;
  tourBonus: number;
  scandalChance: number;
}

export interface RivalArtist {
  id: string;
  name: string;
  genre: Genre;
  momentum: number;
  hits: number;
  age: number;
  active: boolean;
}

export interface Album {
  id: string;
  name: string;
  year: number;
  type: AlbumType;
  trackCount: number;
  chartPeak: number;
  leadSingle?: string;
  collaborators: string[];
  genreBlend?: string;
  tracks: Single[];
}

export interface Single {
  id: string;
  name: string;
  year: number;
  type: SingleType;
  chartPeak: number;
  weeksOnChart: number;
  chartPoints: number;
  collaborators: string[];
}

export type EventOutcome = {
  id: string;
  text: string;
  shortText?: string; // For wheel display
  icon?: string; // Icon for icon-first wheels
  emoji: string;
  statIncrement?: keyof CareerStats;
  awardChance?: number;
  collaboration?: boolean;
  color: string;
  chartPointsRange?: [number, number]; // Min and Max points for this outcome
  weight?: number; // Base weight
};

export type EventCategory = 'Release' | 'Tour' | 'Growth' | 'Decision' | 'Detail' | 'Industry';

export type YearEvent = {
  category: EventCategory;
  outcome: EventOutcome;
  name?: string;
  albumType?: AlbumType;
  singleType?: SingleType;
  leadSingle?: string;
  trackCount?: number;
  collaborators?: string[];
  genreBlend?: string;
  awards?: string[];
  cities?: number;
  citiesList?: string[];
  soldOutShows?: number;
  chartPoints?: number;
  chartRank?: number;
  weeksOnChart?: number;
  yearNumber?: number;
};

export type YearSummary = {
  yearNumber: number;
  calendarYear: number;
  events: YearEvent[];
  charts?: ChartEntry[];
  era: MusicEra;
  trend: string;
};

export type ChartEntry = {
  artist: string;
  song: string;
  points: number;
  rank: number;
  isPlayer: boolean;
  weeksOnChart: number;
};

export type CareerStats = {
  albumsReleased: number;
  singlesReleased: number;
  top10Hits: number;
  numberOneHits: number;
  toursCompleted: number;
  soldOutShows: number;
  awardsWon: number;
  scandalsSurvived: number;
  viralMoments: number;
  collaborations: number;
  totalPoints: number;
};

export type CareerGoal = {
  id: string;
  text: string;
  target: number;
  stat: keyof CareerStats;
};

export type Achievement = {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  icon: string;
};

export type CareerEnding = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type Career = {
  id: string;
  artistName: string;
  type: CareerType;
  genre: Genre;
  autoName: boolean;
  currentYear: number;
  maxYears: number;
  stats: CareerStats;
  history: YearSummary[];
  skills: string[];
  hiredHelp: string[];
  era: MusicEra;
  label: Label;
  rivals: RivalArtist[];
  achievements: Achievement[];
  discography: {
    albums: Album[];
    singles: Single[];
  };
  momentum: number;
};

export type GameState = 
  | 'START' 
  | 'YEAR_INTRO'
  | 'SPINNING' 
  | 'NAMING' 
  | 'NAME_SELECTION'
  | 'YEAR_SUMMARY' 
  | 'YEAR_CHARTS'
  | 'DISCOGRAPHY'
  | 'PROFILE'
  | 'SETTINGS'
  | 'CAREER_END'
  | 'LABEL_OFFER';

export type WheelType = 
  | 'RELEASE_DECISION' 
  | 'ALBUM_TYPE'
  | 'SINGLE_TYPE'
  | 'TRACK_COUNT' 
  | 'LEAD_SINGLE' 
  | 'COLLAB_CHANCE'
  | 'COLLAB_ARTIST'
  | 'CHART_POSITION' 
  | 'AWARD_NOMINATION'
  | 'AWARD_POSITION'
  | 'TOUR_DECISION'
  | 'TOUR_CITIES'
  | 'SPECIAL_EVENT'
  | 'NAME_SELECTION'
  | 'RANDOM_NAME'
  | 'LABEL_OFFER';

export type WheelSegment = {
  outcome: EventOutcome;
  weight: number; // Probability weight
};
