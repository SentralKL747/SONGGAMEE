import React, { useState, useEffect, useMemo, Component, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Music, 
  Mic2, 
  TrendingUp, 
  History, 
  Disc, 
  Users, 
  Star, 
  AlertTriangle,
  Play,
  RotateCcw,
  ChevronRight,
  Award,
  Globe,
  CheckCircle2,
  XCircle,
  BarChart3,
  Settings,
  User,
  Zap,
  Briefcase,
  Plus
} from 'lucide-react';
import { 
  Career, 
  GameState, 
  WheelType, 
  YearEvent, 
  YearSummary, 
  Genre, 
  CareerType,
  ChartEntry,
  EventOutcome,
  CareerStats,
  Album,
  Single,
  MusicEra
} from './types';
import { 
  GENRES, 
  RELEASE_DECISION_OUTCOMES, 
  ALBUM_TYPE_OUTCOMES, 
  SINGLE_TYPE_OUTCOMES, 
  TRACK_COUNT_OUTCOMES, 
  CHART_POSITION_OUTCOMES, 
  AWARD_NOMINATION_OUTCOMES, 
  AWARD_POSITION_OUTCOMES, 
  TOUR_DECISION_OUTCOMES, 
  TOUR_CITIES_OUTCOMES, 
  SPECIAL_EVENT_OUTCOMES,
  COLLAB_CHANCE_OUTCOMES,
  LABEL_OFFER_OUTCOMES,
  COLLABORATORS,
  REAL_ARTISTS,
  getRandomName,
  WORLD_CITIES,
  GENRE_BLENDS,
  CAREER_GOALS,
  MUSIC_ERAS,
  LABELS,
  RIVAL_NAMES,
  ACHIEVEMENTS,
  CAREER_ENDINGS
} from './constants';
import { Wheel } from './components/Wheel';

const INITIAL_STATS: CareerStats = {
  albumsReleased: 0,
  singlesReleased: 0,
  top10Hits: 0,
  numberOneHits: 0,
  toursCompleted: 0,
  soldOutShows: 0,
  awardsWon: 0,
  scandalsSurvived: 0,
  viralMoments: 0,
  collaborations: 0,
  totalPoints: 0
};


export default function App() {
  const [gameState, setGameState] = useState<GameState>('START');
  const [career, setCareer] = useState<Career | null>(null);
  const [settings, setSettings] = useState({ fastMode: false, soundEnabled: true });
  const [currentWheel, setCurrentWheel] = useState<WheelType>('RELEASE_DECISION');
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentYearEvents, setCurrentYearEvents] = useState<YearEvent[]>([]);
  const [tempName, setTempName] = useState('');
  const [namingType, setNamingType] = useState<'Artist' | 'Album' | 'Song'>('Artist');
  const [showConfirmation, setShowConfirmation] = useState<EventOutcome | null>(null);
  const [usedNames, setUsedNames] = useState<Set<string>>(new Set());

  // Save/Load logic
  useEffect(() => {
    const saved = localStorage.getItem('music_career_save');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // We don't auto-load into state, just keep it for "Continue"
      } catch (e) {
        console.error("Failed to parse save", e);
      }
    }
  }, []);

  const saveCareer = (careerData: Career) => {
    localStorage.setItem('music_career_save', JSON.stringify(careerData));
  };

  const loadCareer = () => {
    const saved = localStorage.getItem('music_career_save');
    if (saved) {
      const parsed = JSON.parse(saved);
      setCareer(parsed);
      setUsedNames(new Set(parsed.history.flatMap((y: any) => y.events.map((e: any) => e.name).filter(Boolean))));
      setGameState('YEAR_INTRO');
    }
  };

  // Setup initial career
  const startCareer = (name: string, type: CareerType, genre: Genre) => {
    const artistName = name || getRandomName('Artist');
    const initialEra = Object.keys(MUSIC_ERAS)[Math.floor(Math.random() * Object.keys(MUSIC_ERAS).length)] as any;
    
    // Generate initial rivals
    const rivals = RIVAL_NAMES.slice(0, 8).map(name => ({
      id: Math.random().toString(36).substr(2, 9),
      name,
      genre: GENRES[Math.floor(Math.random() * GENRES.length)],
      momentum: 10 + Math.random() * 40,
      hits: 0,
      age: 1,
      active: true
    }));

    const newCareer: Career = {
      id: Math.random().toString(36).substr(2, 9),
      artistName,
      type,
      genre,
      autoName: !name,
      currentYear: 2024,
      maxYears: 20,
      stats: { ...INITIAL_STATS },
      history: [],
      skills: [],
      hiredHelp: [],
      era: initialEra,
      label: LABELS[0], // Start independent
      rivals,
      achievements: [...ACHIEVEMENTS],
      discography: {
        albums: [],
        singles: []
      },
      momentum: 10
    };
    setCareer(newCareer);
    setUsedNames(new Set([artistName]));
    saveCareer(newCareer);
    setGameState('YEAR_INTRO');
  };

  const calculateMomentum = (stats: CareerStats) => {
    return (stats.numberOneHits * 10) + (stats.top10Hits * 5) + (stats.awardsWon * 7) + (stats.viralMoments * 4);
  };

  const getUniqueName = (type: 'Album' | 'Song' | 'Artist', genre?: Genre) => {
    let name = getRandomName(type, genre);
    let attempts = 0;
    while (usedNames.has(name) && attempts < 50) {
      name = getRandomName(type, genre);
      attempts++;
    }
    return name;
  };

  const nextStep = () => {
    if (!career) return;

    switch (currentWheel) {
      case 'RELEASE_DECISION':
        const decision = currentYearEvents.find(e => e.category === 'Decision')?.outcome.id;
        if (decision === 'dec_album') setCurrentWheel('ALBUM_TYPE');
        else if (decision === 'dec_single') setCurrentWheel('SINGLE_TYPE');
        else setCurrentWheel('TOUR_DECISION');
        break;
      
      case 'ALBUM_TYPE':
        setCurrentWheel('TRACK_COUNT');
        break;
      
      case 'TRACK_COUNT':
        setCurrentWheel('COLLAB_CHANCE');
        break;

      case 'SINGLE_TYPE':
        setCurrentWheel('COLLAB_CHANCE');
        break;

      case 'COLLAB_CHANCE':
        const collab = currentYearEvents.find(e => e.outcome.id === 'collab_yes');
        if (collab) setCurrentWheel('COLLAB_ARTIST');
        else setCurrentWheel('CHART_POSITION');
        break;

      case 'COLLAB_ARTIST':
        setCurrentWheel('CHART_POSITION');
        break;

      case 'CHART_POSITION':
        setCurrentWheel('AWARD_NOMINATION');
        break;

      case 'AWARD_NOMINATION':
        const nominated = currentYearEvents.find(e => e.category === 'Detail' && e.outcome.id.startsWith('nom_') && e.outcome.id !== 'nom_none');
        if (nominated) setCurrentWheel('AWARD_POSITION');
        else setCurrentWheel('TOUR_DECISION');
        break;

      case 'AWARD_POSITION':
        setCurrentWheel('TOUR_DECISION');
        break;

      case 'TOUR_DECISION':
        const touring = currentYearEvents.find(e => e.category === 'Tour' && e.outcome.id !== 'tour_none');
        if (touring) setCurrentWheel('TOUR_CITIES');
        else setCurrentWheel('SPECIAL_EVENT');
        break;

      case 'TOUR_CITIES':
        setCurrentWheel('SPECIAL_EVENT');
        break;

      case 'SPECIAL_EVENT':
        // Check if we should offer a label deal (every 3 years or if momentum is high)
        if (career.history.length % 3 === 2 || career.momentum > 50) {
          setCurrentWheel('LABEL_OFFER');
        } else {
          finalizeYear();
          return;
        }
        break;

      case 'LABEL_OFFER':
        finalizeYear();
        return;
    }
    setGameState('SPINNING');
  };

  const handleSpinEnd = (outcome: EventOutcome) => {
    setIsSpinning(false);
    setShowConfirmation(outcome);
  };

  const confirmOutcome = () => {
    if (!showConfirmation || !career) return;
    const outcome = showConfirmation;
    setShowConfirmation(null);

    const newEvent: YearEvent = {
      category: getCategoryForWheel(currentWheel),
      outcome,
      yearNumber: career.currentYear
    };

    // Special handling for some wheels
    if (currentWheel === 'ALBUM_TYPE') newEvent.albumType = outcome.text as any;
    if (currentWheel === 'SINGLE_TYPE') newEvent.singleType = outcome.text as any;
    if (currentWheel === 'TRACK_COUNT') {
      newEvent.trackCount = parseInt(outcome.text);
      // Add a random genre blend for albums
      newEvent.genreBlend = GENRE_BLENDS[Math.floor(Math.random() * GENRE_BLENDS.length)];
    }
    if (currentWheel === 'TOUR_CITIES') {
      const cityCount = parseInt(outcome.text);
      newEvent.cities = cityCount;
      // Pick random cities from the list
      const shuffled = [...WORLD_CITIES].sort(() => 0.5 - Math.random());
      newEvent.citiesList = shuffled.slice(0, Math.min(cityCount, 10)); // Show up to 10 in list
      newEvent.soldOutShows = Math.floor(Math.random() * cityCount);
    }
    if (currentWheel === 'COLLAB_ARTIST') {
      newEvent.collaborators = [outcome.text];
      // Add a genre blend for collaborations
      newEvent.genreBlend = GENRE_BLENDS[Math.floor(Math.random() * GENRE_BLENDS.length)];
    }
    if (currentWheel === 'LABEL_OFFER') {
      const label = LABELS.find(l => l.type === outcome.shortText) || LABELS[0];
      setCareer(prev => prev ? { ...prev, label } : null);
    }

    setCurrentYearEvents(prev => [...prev, newEvent]);

    // If it's a release, we might need a name
    if (currentWheel === 'ALBUM_TYPE' || currentWheel === 'SINGLE_TYPE') {
      setNamingType(currentWheel === 'ALBUM_TYPE' ? 'Album' : 'Song');
      setGameState('NAMING');
    } else {
      nextStep();
    }
  };

  const getCategoryForWheel = (wheel: WheelType): any => {
    if (wheel === 'RELEASE_DECISION') return 'Decision';
    if (wheel === 'TOUR_DECISION' || wheel === 'TOUR_CITIES') return 'Tour';
    if (wheel === 'SPECIAL_EVENT') return 'Growth';
    if (wheel === 'CHART_POSITION') return 'Release';
    return 'Detail';
  };

  const finalizeYear = () => {
    if (!career) return;

    // Calculate year summary
    const yearSummary: YearSummary = {
      yearNumber: career.history.length + 1,
      calendarYear: career.currentYear,
      events: [...currentYearEvents],
      charts: generateCharts(currentYearEvents),
      era: career.era,
      trend: MUSIC_ERAS[career.era].description
    };

    // Update career stats
    const updatedStats = { ...career.stats };
    let yearPoints = 0;
    const newAlbums: Album[] = [];
    const newSingles: Single[] = [];

    currentYearEvents.forEach(event => {
      if (event.outcome.statIncrement) {
        (updatedStats[event.outcome.statIncrement] as number)++;
        yearPoints += 50;
      }
      if (event.category === 'Release') {
        if (event.albumType) {
          updatedStats.albumsReleased++;
          const album: Album = {
            id: Math.random().toString(36).substr(2, 9),
            name: event.name || 'Untitled Album',
            year: career.currentYear,
            type: event.albumType,
            trackCount: event.trackCount || 10,
            chartPeak: event.chartRank || 100,
            leadSingle: event.leadSingle,
            collaborators: event.collaborators || [],
            genreBlend: event.genreBlend,
            tracks: [] // In a real sim, we'd generate tracks here
          };
          newAlbums.push(album);
        }
        if (event.singleType || event.category === 'Release') {
          if (!event.albumType) updatedStats.singlesReleased++;
          const single: Single = {
            id: Math.random().toString(36).substr(2, 9),
            name: event.name || 'Untitled Single',
            year: career.currentYear,
            type: event.singleType || 'Standard Single',
            chartPeak: event.chartRank || 100,
            weeksOnChart: event.weeksOnChart || 1,
            chartPoints: event.chartPoints || 0,
            collaborators: event.collaborators || []
          };
          newSingles.push(single);
        }
        
        if (event.chartRank) {
          if (event.chartRank === 1) yearPoints += 500;
          else if (event.chartRank <= 5) yearPoints += 250;
          else if (event.chartRank <= 10) yearPoints += 100;
          else if (event.chartRank <= 20) yearPoints += 50;
        }
      }
      if (event.category === 'Tour' && event.outcome.id !== 'tour_none') {
        updatedStats.toursCompleted++;
        if (event.soldOutShows) {
          updatedStats.soldOutShows += event.soldOutShows;
          yearPoints += event.soldOutShows * 10;
        }
        yearPoints += 100;
      }
      if (event.outcome.id === 'pos_win') yearPoints += 300;
    });

    updatedStats.totalPoints += yearPoints;

    // Update rivals
    const updatedRivals = career.rivals.map(rival => {
      const releaseChance = 0.3 + (rival.momentum / 200);
      if (Math.random() < releaseChance) {
        const success = Math.random() * rival.momentum;
        if (success > 80) rival.hits++;
        rival.momentum += (success / 10);
      }
      rival.age++;
      return rival;
    });

    // Era change check
    let newEra = career.era;
    if (career.history.length > 0 && career.history.length % 6 === 0) {
      const eras = Object.keys(MUSIC_ERAS) as MusicEra[];
      newEra = eras[Math.floor(Math.random() * eras.length)];
    }

    // Achievement check
    const updatedAchievements = career.achievements.map(ach => {
      if (ach.unlocked) return ach;
      if (ach.id === 'ach_first_hit' && updatedStats.numberOneHits > 0) ach.unlocked = true;
      if (ach.id === 'ach_world_tour' && currentYearEvents.some(e => e.outcome.id === 'tour_world')) ach.unlocked = true;
      if (ach.id === 'ach_grammy' && currentYearEvents.some(e => e.outcome.id === 'pos_win' && e.name?.includes('Grammy'))) ach.unlocked = true;
      if (ach.id === 'ach_ten_top10' && updatedStats.top10Hits >= 10) ach.unlocked = true;
      if (ach.id === 'ach_superstar' && career.label.type === 'Global Superstar Contract') ach.unlocked = true;
      return ach;
    });

    const updatedCareer: Career = {
      ...career,
      currentYear: career.currentYear + 1,
      stats: updatedStats,
      history: [...career.history, yearSummary],
      era: newEra,
      rivals: updatedRivals,
      achievements: updatedAchievements,
      discography: {
        albums: [...career.discography.albums, ...newAlbums],
        singles: [...career.discography.singles, ...newSingles]
      },
      momentum: calculateMomentum(updatedStats)
    };

    setCareer(updatedCareer);
    saveCareer(updatedCareer);
    setGameState('YEAR_SUMMARY');
  };

  const generateCharts = (events: YearEvent[]): ChartEntry[] => {
    const playerRelease = events.find(e => e.category === 'Release');
    const chartEntries: ChartEntry[] = [];

    // Add real artists
    REAL_ARTISTS.forEach(artist => {
      chartEntries.push({
        artist: artist.name,
        song: artist.songs[Math.floor(Math.random() * artist.songs.length)],
        points: 20 + Math.random() * 70,
        rank: 0,
        isPlayer: false,
        weeksOnChart: Math.floor(Math.random() * 20) + 1
      });
    });

    // Add rivals
    career?.rivals.forEach(rival => {
      chartEntries.push({
        artist: rival.name,
        song: getUniqueName('Song', rival.genre),
        points: 10 + (rival.momentum / 2) + Math.random() * 40,
        rank: 0,
        isPlayer: false,
        weeksOnChart: Math.floor(Math.random() * 15) + 1
      });
    });

    // Add player
    if (playerRelease && playerRelease.outcome.chartPointsRange) {
      const [min, max] = playerRelease.outcome.chartPointsRange;
      let points = min + Math.random() * (max - min);
      
      // Apply bonuses
      if (career) {
        points += (career.momentum / 10);
        points += (career.label.chartBonus * 50);
        const eraData = MUSIC_ERAS[career.era];
        if (eraData.genreBoosts[career.genre]) points += (eraData.genreBoosts[career.genre]! * 40);
        if (eraData.genrePenalties[career.genre]) points += (eraData.genrePenalties[career.genre]! * 40);
      }

      chartEntries.push({
        artist: career?.artistName || 'You',
        song: playerRelease.name || 'Untitled',
        points,
        rank: 0,
        isPlayer: true,
        weeksOnChart: Math.floor(points / 5) + 1
      });
    }

    // Sort and rank
    const sorted = chartEntries
      .sort((a, b) => b.points - a.points)
      .map((entry, index) => ({ ...entry, rank: index + 1 }));

    if (playerRelease) {
      const playerEntry = sorted.find(s => s.isPlayer);
      playerRelease.chartRank = playerEntry?.rank;
      playerRelease.chartPoints = playerEntry?.points;
      playerRelease.weeksOnChart = playerEntry?.weeksOnChart;
    }

    return sorted.slice(0, 20);
  };

  const getSegmentsForWheel = (wheel: WheelType) => {
    if (!career) return [];

    const isDebut = career.history.length === 0;
    const momentum = career.momentum;
    const labelBonus = career.label.chartBonus;

    switch (wheel) {
      case 'RELEASE_DECISION': 
        return RELEASE_DECISION_OUTCOMES
          .filter(o => !isDebut || o.id !== 'dec_skip')
          .map(o => ({ outcome: o, weight: o.weight || 1 }));

      case 'ALBUM_TYPE': 
        return ALBUM_TYPE_OUTCOMES
          .filter(o => !isDebut || (o.id !== 'album_comp' && o.id !== 'album_live'))
          .map(o => ({ outcome: o, weight: o.weight || 1 }));

      case 'SINGLE_TYPE': return SINGLE_TYPE_OUTCOMES.map(o => ({ outcome: o, weight: o.weight || 1 }));
      case 'TRACK_COUNT': return TRACK_COUNT_OUTCOMES.map(o => ({ outcome: o, weight: o.weight || 1 }));
      
      case 'CHART_POSITION': 
        return CHART_POSITION_OUTCOMES.map(o => {
          let weight = o.weight || 1;
          if (o.id === 'chart_1') weight *= (1 + (momentum / 50) + labelBonus);
          if (o.id === 'chart_top10') weight *= (1 + (momentum / 100) + labelBonus);
          if (o.id === 'chart_flop') weight *= Math.max(0.1, 1 - (momentum / 100));
          return { outcome: o, weight };
        });

      case 'AWARD_NOMINATION': 
        return AWARD_NOMINATION_OUTCOMES.map(o => {
          let weight = o.weight || 1;
          if (o.id !== 'nom_none') weight *= (1 + (momentum / 100) + (career.label.type === 'Major Label' ? 0.2 : 0));
          return { outcome: o, weight };
        });

      case 'AWARD_POSITION': return AWARD_POSITION_OUTCOMES.map(o => ({ outcome: o, weight: o.weight || 1 }));
      case 'TOUR_DECISION': return TOUR_DECISION_OUTCOMES.map(o => ({ outcome: o, weight: o.weight || 1 }));
      case 'TOUR_CITIES': return TOUR_CITIES_OUTCOMES.map(o => ({ outcome: o, weight: o.weight || 1 }));
      case 'SPECIAL_EVENT': return SPECIAL_EVENT_OUTCOMES.map(o => ({ outcome: o, weight: o.weight || 1 }));
      case 'COLLAB_CHANCE': return COLLAB_CHANCE_OUTCOMES.map(o => ({ outcome: o, weight: o.weight || 1 }));
      case 'LABEL_OFFER': return LABEL_OFFER_OUTCOMES.map(o => ({ outcome: o, weight: o.weight || 1 }));
      case 'COLLAB_ARTIST': return COLLABORATORS.map(c => ({ 
        outcome: { id: c, text: c, emoji: '👤', color: '#6366F1', shortText: c }, 
        weight: 1 
      }));
      default: return [];
    }
  };

  const goalsProgress = useMemo(() => {
    if (!career) return [];
    return CAREER_GOALS.map(goal => {
      const current = career.stats[goal.stat as keyof CareerStats] as number;
      return {
        ...goal,
        current,
        completed: current >= goal.target
      };
    });
  }, [career]);

  return (
    <div className="fixed inset-0 bg-black text-white font-sans selection:bg-emerald-500 selection:text-black overflow-hidden select-none">
      {/* Settings Button */}
      {gameState !== 'START' && (
        <button 
          onClick={() => setGameState('SETTINGS')}
          className="fixed top-4 right-4 z-50 p-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors"
        >
          <Settings className="w-5 h-5 text-zinc-400" />
        </button>
      )}

      <AnimatePresence mode="wait">
        {gameState === 'START' && (
          <motion.div 
            key="start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-between h-full p-6 text-center"
          >
            <div className="flex-1 flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="mb-8"
              >
                <div className="inline-block px-4 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-4">
                  <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">MVP 12: Living Industry</p>
                </div>
                <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.85] mb-4">
                  Road to<br />The<br /><span className="text-emerald-500">Charts</span>
                </h1>
                <p className="text-zinc-500 text-lg font-medium tracking-widest uppercase">Build your legacy in a living world</p>
              </motion.div>

              <div className="max-w-md w-full space-y-4 bg-zinc-900/50 p-6 rounded-3xl border border-white/5 backdrop-blur-xl">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block text-left ml-2">Artist/Band Name</label>
                  <input 
                    type="text" 
                    placeholder="Leave blank for random"
                    className="w-full bg-black border border-white/10 rounded-2xl p-4 text-lg focus:outline-none focus:border-emerald-500 transition-colors"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => startCareer(tempName, 'Solo Artist', 'Pop')}
                    className="bg-white text-black font-black py-4 rounded-2xl hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2 uppercase text-sm"
                  >
                    <Mic2 size={18} /> Solo
                  </button>
                  <button 
                    onClick={() => startCareer(tempName, 'Band', 'Rock')}
                    className="bg-zinc-800 text-white font-black py-4 rounded-2xl hover:bg-emerald-500 hover:text-black transition-colors flex items-center justify-center gap-2 uppercase text-sm"
                  >
                    <Users size={18} /> Band
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full max-w-md grid grid-cols-3 gap-2 mt-6">
              <button 
                onClick={loadCareer}
                className="bg-zinc-900 border border-white/5 text-zinc-400 font-black py-3 rounded-2xl flex flex-col items-center justify-center gap-1 uppercase text-[8px] tracking-widest"
              >
                <History size={14} /> Continue
              </button>
              <button 
                onClick={() => setGameState('PROFILE')}
                className="bg-zinc-900 border border-white/5 text-zinc-400 font-black py-3 rounded-2xl flex flex-col items-center justify-center gap-1 uppercase text-[8px] tracking-widest"
              >
                <User size={14} /> Profile
              </button>
              <button 
                onClick={() => setGameState('SETTINGS')}
                className="bg-zinc-900 border border-white/5 text-zinc-400 font-black py-3 rounded-2xl flex flex-col items-center justify-center gap-1 uppercase text-[8px] tracking-widest"
              >
                <Settings size={14} /> Settings
              </button>
            </div>
          </motion.div>
        )}

        {gameState === 'YEAR_INTRO' && career && (
          <motion.div 
            key="year-intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center justify-between h-full p-6"
          >
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
              <div className="space-y-2">
                <p className="text-zinc-500 uppercase tracking-[0.4em] text-xs font-black">Current Year</p>
                <h2 className="text-9xl font-black italic text-emerald-500 leading-none">{career.currentYear}</h2>
              </div>
              
              <div className="space-y-2">
                <p className="text-3xl font-black uppercase italic tracking-tighter">{career.artistName}</p>
                <p className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold">Career Year {career.history.length + 1}</p>
              </div>
              
              <div className="grid grid-cols-3 gap-8 w-full max-w-sm">
                <div className="text-center">
                  <p className="text-2xl font-black">{career.stats.albumsReleased}</p>
                  <p className="text-[8px] uppercase tracking-widest text-zinc-500 font-black">Albums</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-black">{career.stats.numberOneHits}</p>
                  <p className="text-[8px] uppercase tracking-widest text-zinc-500 font-black">#1 Hits</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-black">{career.stats.awardsWon}</p>
                  <p className="text-[8px] uppercase tracking-widest text-zinc-500 font-black">Awards</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => {
                setCurrentWheel('RELEASE_DECISION');
                setCurrentYearEvents([]);
                setGameState('SPINNING');
              }}
              className="w-full max-w-md bg-emerald-500 text-black font-black py-6 rounded-3xl text-xl uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-colors"
            >
              Start Year <ChevronRight size={24} />
            </button>
          </motion.div>
        )}

        {gameState === 'SPINNING' && (
          <motion.div 
            key="spinning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-between h-full p-6 overflow-hidden"
          >
            <div className="w-full flex justify-between items-center mb-4">
              <div className="text-left">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Current Step</p>
                <p className="text-sm font-black uppercase italic text-emerald-500">{currentWheel.replace(/_/g, ' ')}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Year</p>
                <p className="text-sm font-black italic">{career?.currentYear}</p>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center w-full max-w-md aspect-square relative">
              <Wheel 
                type={currentWheel}
                segments={getSegmentsForWheel(currentWheel)}
                isSpinning={isSpinning}
                onSpinEnd={handleSpinEnd}
              />
            </div>
            
            <div className="w-full max-w-md mt-8">
              {!isSpinning && !showConfirmation && (
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  onClick={() => setIsSpinning(true)}
                  className="w-full bg-white text-black text-2xl font-black py-6 rounded-3xl hover:bg-emerald-500 transition-colors shadow-2xl shadow-emerald-500/20 uppercase tracking-widest"
                >
                  SPIN
                </motion.button>
              )}

              {showConfirmation && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="bg-zinc-900 p-6 rounded-3xl border border-white/10 shadow-2xl text-center"
                >
                  <div className="text-5xl mb-2">{showConfirmation.emoji}</div>
                  <h3 className="text-xl font-black uppercase mb-4">{showConfirmation.text}</h3>
                  <button 
                    onClick={confirmOutcome}
                    className="w-full bg-emerald-500 text-black font-black py-4 rounded-2xl hover:bg-white transition-colors uppercase tracking-widest"
                  >
                    Continue
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {gameState === 'NAMING' && (
          <motion.div 
            key="naming"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-between h-full p-6"
          >
            <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md text-center space-y-8">
              <div className="space-y-2">
                <h3 className="text-4xl font-black uppercase italic leading-none">Name your<br />{namingType}</h3>
                <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold">What shall we call this masterpiece?</p>
              </div>

              <div className="w-full space-y-4">
                <input 
                  type="text" 
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 rounded-2xl p-6 text-2xl text-center focus:outline-none focus:border-emerald-500 font-black uppercase italic"
                  placeholder="Enter name..."
                />
                
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setTempName(getUniqueName(namingType, career?.genre))}
                    className="bg-zinc-800 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-zinc-700 transition-colors"
                  >
                    Randomize
                  </button>
                  <button 
                    onClick={() => {
                      const name = tempName || getUniqueName(namingType, career?.genre);
                      const updatedEvents = [...currentYearEvents];
                      updatedEvents[updatedEvents.length - 1].name = name;
                      setCurrentYearEvents(updatedEvents);
                      setUsedNames(prev => new Set([...prev, name]));
                      setTempName('');
                      nextStep();
                    }}
                    className="bg-emerald-500 text-black py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white transition-colors"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {gameState === 'YEAR_SUMMARY' && career && (
          <motion.div 
            key="year-summary"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col h-full p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="text-left">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Year {career.history.length} Summary</p>
                <h2 className="text-3xl font-black italic uppercase tracking-tighter">{career.currentYear - 1}</h2>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Momentum</p>
                <p className="text-2xl font-black text-emerald-500">+{Math.round(career.momentum)}</p>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              {career.history[career.history.length - 1].events.map((event, i) => (
                <div key={i} className="bg-zinc-900/50 border border-white/5 p-4 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center text-2xl border border-white/5">
                    {event.outcome.emoji}
                  </div>
                  <div className="flex-1">
                    <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">{event.category}</p>
                    <h4 className="text-sm font-bold text-white">{event.name || event.outcome.text}</h4>
                    {event.chartRank && (
                      <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-1">
                        Peak: #{event.chartRank} ({event.weeksOnChart} Weeks)
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <button 
                onClick={() => setGameState('YEAR_CHARTS')}
                className="bg-zinc-900 border border-white/5 py-4 rounded-2xl flex flex-col items-center justify-center gap-1 uppercase text-[10px] font-black tracking-widest hover:bg-zinc-800 transition-colors"
              >
                <TrendingUp size={18} className="text-emerald-500" /> Charts
              </button>
              <button 
                onClick={() => setGameState('DISCOGRAPHY')}
                className="bg-zinc-900 border border-white/5 py-4 rounded-2xl flex flex-col items-center justify-center gap-1 uppercase text-[10px] font-black tracking-widest hover:bg-zinc-800 transition-colors"
              >
                <Disc size={18} className="text-emerald-500" /> Discography
              </button>
            </div>

            <button 
              onClick={() => setGameState('YEAR_INTRO')}
              className="w-full bg-emerald-500 text-black font-black py-5 rounded-3xl text-lg uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-colors mt-auto"
            >
              Next Year <ChevronRight size={20} />
            </button>
          </motion.div>
        )}

        {gameState === 'YEAR_CHARTS' && career && (
          <motion.div 
            key="year-charts"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="flex flex-col h-full p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-black italic uppercase tracking-tighter">Billboard Top 20</h2>
              <button onClick={() => setGameState('YEAR_SUMMARY')} className="text-zinc-500">
                <RotateCcw size={24} />
              </button>
            </div>

            <div className="space-y-2 mb-8">
              {career.history[career.history.length - 1].charts?.map((entry, i) => (
                <div 
                  key={i} 
                  className={`flex items-center gap-4 p-3 rounded-2xl border ${entry.isPlayer ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-zinc-900/50 border-white/5'}`}
                >
                  <span className={`w-6 text-lg font-black ${i < 3 ? 'text-emerald-500' : 'text-zinc-600'}`}>
                    {entry.rank}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-bold truncate ${entry.isPlayer ? 'text-emerald-500' : 'text-white'}`}>{entry.song}</h4>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold truncate">{entry.artist}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Weeks</p>
                    <p className="text-xs font-black text-white">{entry.weeksOnChart}</p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setGameState('YEAR_SUMMARY')}
              className="w-full bg-white text-black font-black py-5 rounded-3xl text-lg uppercase tracking-widest hover:bg-emerald-500 transition-colors mt-auto"
            >
              Back
            </button>
          </motion.div>
        )}

        {gameState === 'LABEL_OFFER' && career && (
          <motion.div 
            key="label-offer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center h-full p-8 text-center"
          >
            <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mb-8 border border-emerald-500/20">
              <Briefcase size={48} />
            </div>
            <h2 className="text-4xl font-black italic uppercase mb-4 tracking-tighter">Major Label Offer</h2>
            <p className="text-zinc-400 mb-12 max-w-xs">
              Your momentum has caught the eye of the industry giants. A major label wants to sign you.
            </p>
            
            <div className="w-full space-y-3 mb-12">
              <button 
                onClick={() => {
                  const label = LABELS[Math.floor(Math.random() * LABELS.length)];
                  setCareer(prev => prev ? { ...prev, label } : null);
                  setGameState('YEAR_INTRO');
                }}
                className="w-full bg-emerald-500 text-black font-black py-5 rounded-3xl text-lg uppercase tracking-widest hover:bg-white transition-colors"
              >
                Sign the Deal
              </button>
              <button 
                onClick={() => setGameState('YEAR_INTRO')}
                className="w-full bg-zinc-900 text-white font-black py-5 rounded-3xl text-lg uppercase tracking-widest hover:bg-zinc-800 transition-colors"
              >
                Stay Independent
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global HUD */}
      {career && !['START', 'YEAR_SUMMARY', 'DISCOGRAPHY', 'PROFILE', 'SETTINGS'].includes(gameState) && (
        <div className="fixed bottom-0 left-0 right-0 p-6 pointer-events-none z-40">
          <div className="max-w-md mx-auto flex justify-between items-center pointer-events-auto">
            <div className="bg-black/80 backdrop-blur-xl border border-white/10 p-3 rounded-2xl flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500">
                  <BarChart3 size={16} />
                </div>
                <div>
                  <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Points</p>
                  <p className="text-xs font-black italic">{career.stats.totalPoints.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => setGameState('DISCOGRAPHY')}
                className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-3 rounded-2xl text-zinc-400 hover:text-white transition-colors"
              >
                <Disc size={20} />
              </button>
              <button 
                onClick={() => setGameState('START')}
                className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-3 rounded-2xl text-zinc-400 hover:text-red-500 transition-colors"
              >
                <RotateCcw size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Discography & Goals Overlay */}
      <AnimatePresence mode="wait">
        {gameState === 'DISCOGRAPHY' && career && (
          <motion.div 
            key="discography"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-0 z-50 bg-black p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-8 shrink-0">
              <h2 className="text-4xl font-black italic uppercase tracking-tighter">Discography</h2>
              <button 
                onClick={() => setGameState('YEAR_SUMMARY')}
                className="bg-zinc-900 p-3 rounded-2xl text-zinc-400"
              >
                <XCircle size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-8 pb-12">
              {career.discography.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 text-zinc-600">
                  <Disc size={48} className="mb-4 opacity-20" />
                  <p className="font-black uppercase tracking-widest text-xs">No releases yet</p>
                </div>
              )}
              
              {career.discography.slice().reverse().map((release, i) => (
                <div key={i} className="bg-zinc-900/50 p-4 rounded-2xl border border-white/5 flex items-center gap-4">
                  <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center text-3xl shrink-0 border border-white/5 shadow-2xl">
                    {release.type === 'album' ? '💽' : '💿'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-0.5">
                      {release.year} • {release.type}
                    </p>
                    <h4 className="text-lg font-black text-white truncate uppercase italic tracking-tight">
                      {release.name}
                    </h4>
                    <div className="flex gap-3 mt-1">
                      <div className="flex items-center gap-1">
                        <TrendingUp size={10} className="text-zinc-500" />
                        <p className="text-[10px] font-black text-zinc-400 uppercase">#{release.peakChartRank}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap size={10} className="text-zinc-500" />
                        <p className="text-[10px] font-black text-zinc-400 uppercase">{release.weeksOnChart}w</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {gameState === 'PROFILE' && career && (
          <motion.div 
            key="profile"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 bg-black p-6 flex flex-col overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8 shrink-0">
              <h2 className="text-4xl font-black italic uppercase tracking-tighter">Artist Profile</h2>
              <button 
                onClick={() => setGameState('START')}
                className="bg-zinc-900 p-3 rounded-2xl text-zinc-400"
              >
                <XCircle size={24} />
              </button>
            </div>

            <div className="space-y-6 pb-12">
              <div className="bg-emerald-500 text-black p-8 rounded-[2.5rem] relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Current Artist</p>
                  <h3 className="text-4xl font-black italic uppercase leading-none mb-4">{career.artistName}</h3>
                  <div className="flex gap-4">
                    <div>
                      <p className="text-[8px] font-black uppercase tracking-widest opacity-60">Genre</p>
                      <p className="text-sm font-black uppercase">{career.genre}</p>
                    </div>
                    <div>
                      <p className="text-[8px] font-black uppercase tracking-widest opacity-60">Label</p>
                      <p className="text-sm font-black uppercase">{career.label || 'Independent'}</p>
                    </div>
                  </div>
                </div>
                <Zap size={120} className="absolute -right-4 -bottom-4 opacity-10 rotate-12" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-zinc-900/50 p-6 rounded-3xl border border-white/5">
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Momentum</p>
                  <p className="text-2xl font-black text-emerald-500">{Math.round(career.momentum)}</p>
                </div>
                <div className="bg-zinc-900/50 p-6 rounded-3xl border border-white/5">
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Year</p>
                  <p className="text-2xl font-black">{career.currentYear}</p>
                </div>
              </div>

              <div className="bg-zinc-900/50 p-6 rounded-3xl border border-white/5">
                <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">Rivals</h4>
                <div className="space-y-4">
                  {career.rivals.map((rival, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <p className="font-black uppercase text-sm">{rival.name}</p>
                        <p className="text-[10px] text-zinc-500 uppercase font-bold">{rival.genre}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Momentum</p>
                        <p className="text-sm font-black text-red-500">{Math.round(rival.momentum)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-zinc-900/50 p-6 rounded-3xl border border-white/5">
                <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">Achievements</h4>
                <div className="grid grid-cols-4 gap-3">
                  {career.achievements.map((ach, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-xl border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                        {ach.icon}
                      </div>
                      <p className="text-[8px] font-black text-zinc-500 uppercase text-center leading-tight">{ach.name}</p>
                    </div>
                  ))}
                  {career.achievements.length === 0 && (
                    <p className="col-span-4 text-center text-zinc-600 text-[10px] font-black uppercase py-4">No achievements yet</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {gameState === 'SETTINGS' && (
          <motion.div 
            key="settings"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 bg-black p-6 flex flex-col items-center justify-center text-center"
          >
            <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center text-zinc-400 mb-6 border border-white/10">
              <Settings size={48} />
            </div>
            <h2 className="text-5xl font-black italic uppercase mb-2 tracking-tighter">Settings</h2>
            <p className="text-zinc-500 mb-12 uppercase tracking-[0.3em] text-[10px] font-black">Game Configuration</p>
            
            <div className="w-full max-w-sm bg-zinc-900/50 p-8 rounded-[2.5rem] border border-white/5 space-y-8 mb-12">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Fast Animations</p>
                  <button 
                    onClick={() => setSettings(prev => ({ ...prev, fastMode: !prev.fastMode }))}
                    className={`w-12 h-6 rounded-full relative transition-colors ${settings.fastMode ? 'bg-emerald-500' : 'bg-zinc-700'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.fastMode ? 'right-1' : 'left-1'}`} />
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Sound Effects</p>
                  <button 
                    onClick={() => setSettings(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }))}
                    className={`w-12 h-6 rounded-full relative transition-colors ${settings.soundEnabled ? 'bg-emerald-500' : 'bg-zinc-700'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.soundEnabled ? 'right-1' : 'left-1'}`} />
                  </button>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <button 
                    onClick={() => {
                      if (window.confirm('Are you sure? This will delete your current career forever.')) {
                        localStorage.removeItem('musicCareerSave');
                        window.location.reload();
                      }
                    }}
                    className="text-red-500 text-[10px] font-black uppercase tracking-widest hover:underline"
                  >
                    Reset All Progress
                  </button>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setGameState('START')}
              className="bg-white text-black font-black px-12 py-5 rounded-2xl uppercase tracking-[0.2em] text-sm hover:bg-emerald-500 transition-colors"
            >
              Back to Menu
            </button>
          </motion.div>
        )}

        {gameState === 'CAREER_END' && career && (
          <motion.div 
            key="career-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-black p-8 flex flex-col items-center justify-center text-center"
          >
            <div className="text-6xl mb-8">🏆</div>
            <h2 className="text-5xl font-black italic uppercase mb-2 tracking-tighter">Career Complete</h2>
            <p className="text-zinc-500 mb-12 uppercase tracking-[0.3em] text-[10px] font-black">The Legacy of {career.artistName}</p>
            
            <div className="w-full max-w-sm bg-zinc-900/50 p-8 rounded-[2.5rem] border border-white/5 space-y-6 mb-12">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-left">
                  <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Total Points</p>
                  <p className="text-xl font-black">{career.stats.totalPoints.toLocaleString()}</p>
                </div>
                <div className="text-left">
                  <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">#1 Hits</p>
                  <p className="text-xl font-black">{career.stats.numberOneHits}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-white/5 text-left">
                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Final Status</p>
                <p className="text-lg font-bold text-white italic">
                  {career.stats.totalPoints > 1000000 ? 'Global Icon' : 
                   career.stats.totalPoints > 500000 ? 'Industry Legend' : 
                   career.stats.totalPoints > 100000 ? 'Successful Artist' : 'Cult Classic'}
                </p>
              </div>
            </div>

            <button 
              onClick={() => {
                localStorage.removeItem('musicCareerSave');
                window.location.reload();
              }}
              className="bg-emerald-500 text-black font-black px-12 py-5 rounded-2xl uppercase tracking-[0.2em] text-sm hover:bg-white transition-colors"
            >
              Start New Legacy
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

