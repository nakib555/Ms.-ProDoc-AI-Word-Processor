
import React, { useState, useMemo, useDeferredValue, useEffect, useRef } from 'react';
import { 
  FileText, Feather, Activity, BookOpen, Mail, Video, LayoutTemplate, 
  Search, ChevronRight, ChevronDown, Code, Database, Server, Cpu, Settings, 
  FlaskConical, FileSearch, Sigma, DollarSign, TrendingUp, Calendar, Briefcase, 
  ClipboardList, Scale, Clapperboard, Music, Mic, GraduationCap, CheckSquare, 
  User, Projector, Scroll, Stethoscope, Pill, Gavel, FileSignature, Landmark,
  Receipt, Building2, ShieldAlert, Hammer, Map, Plane, Leaf, Recycle, Wind, 
  TreeDeciduous, Factory, Wrench, Mountain, Camera, Utensils, Trophy, Dumbbell,
  Brain, Tv, Radio, HeartHandshake, Film, Gamepad2, Scissors, Lightbulb, GitBranch,
  History, Palette, Globe, Library, Microscope, ShoppingBag, Heart, Rocket, Loader2,
  Sparkles
} from 'lucide-react';

// Dynamic Import Map for Categories
const CATEGORY_LOADERS: Record<string, () => Promise<{l: string, f: string}[]>> = {
    "Technology & Innovation": () => import('./TechnologyAndInnovation').then(m => m.TECHNOLOGY_INNOVATION),
    "Cultural Studies & Humanities": () => import('./CulturalStudiesAndHumanities').then(m => m.CULTURAL_HUMANITIES),
    "Research & Academic": () => import('./ResearchAndAcademic').then(m => m.RESEARCH_ACADEMIC),
    "Science & Research Documentation": () => import('./ScienceAndResearchDocumentation').then(m => m.SCIENCE_RESEARCH_DOCUMENTATION),
    "Historical Research": () => import('./HistoricalResearch').then(m => m.HISTORICAL_RESEARCH),
    "Technical & Engineering": () => import('./TechnicalAndEngineering').then(m => m.TECHNICAL_ENGINEERING),
    "Business & Management": () => import('./BusinessAndManagement').then(m => m.BUSINESS_MANAGEMENT),
    "Business & Entrepreneurship": () => import('./BusinessAndEntrepreneurship').then(m => m.BUSINESS_ENTREPRENEURSHIP),
    "Creative & Media": () => import('./CreativeAndMedia').then(m => m.CREATIVE_MEDIA),
    "Media & Journalism": () => import('./MediaAndJournalism').then(m => m.MEDIA_JOURNALISM),
    "Science Fiction & Fantasy": () => import('./ScienceFictionAndFantasy').then(m => m.SCIFI_FANTASY),
    "Arts & Performing Arts": () => import('./ArtsAndPerformingArts').then(m => m.ARTS_PERFORMING_ARTS),
    "Education & Teaching": () => import('./EducationAndTeaching').then(m => m.EDUCATION_TEACHING),
    "Legal & Regulatory": () => import('./LegalAndRegulatory').then(m => m.LEGAL_REGULATORY),
    "Legal & Compliance": () => import('./LegalAndCompliance').then(m => m.LEGAL_COMPLIANCE),
    "Healthcare & Medical": () => import('./HealthcareAndMedical').then(m => m.HEALTHCARE_MEDICAL),
    "Health & Wellness": () => import('./HealthAndWellness').then(m => m.HEALTH_WELLNESS),
    "Finance & Accounting": () => import('./FinanceAndAccounting').then(m => m.FINANCE_ACCOUNTING),
    "Government & Policy": () => import('./GovernmentAndPolicy').then(m => m.GOVERNMENT_POLICY),
    "Philanthropy & NGOs": () => import('./PhilanthropyAndNGOs').then(m => m.PHILANTHROPY_NGOS),
    "Architecture & Construction": () => import('./ArchitectureAndConstruction').then(m => m.ARCHITECTURE_CONSTRUCTION),
    "Travel & Tourism": () => import('./TravelAndTourism').then(m => m.TRAVEL_TOURISM),
    "Travel & Tourism Innovations": () => import('./TravelAndTourismInnovations').then(m => m.TRAVEL_TOURISM_INNOVATIONS),
    "Environmental Science & Sustainability": () => import('./EnvironmentalScienceAndSustainability').then(m => m.ENVIRONMENTAL_SUSTAINABILITY),
    "Food & Recipe": () => import('./FoodAndRecipe').then(m => m.FOOD_RECIPE),
    "Fashion & Lifestyle": () => import('./FashionAndLifestyle').then(m => m.FASHION_LIFESTYLE),
    "Sports & Fitness": () => import('./SportsAndFitness').then(m => m.SPORTS_FITNESS),
    "Sports & Recreation": () => import('./SportsAndRecreation').then(m => m.SPORTS_RECREATION),
    "Entertainment & Media": () => import('./EntertainmentAndMedia').then(m => m.ENTERTAINMENT_MEDIA),
    "Psychology & Mental Health": () => import('./PsychologyAndMentalHealth').then(m => m.PSYCHOLOGY_MENTAL_HEALTH),
    "DIY & How-To": () => import('./DIYAndHowTo').then(m => m.DIY_HOW_TO),
    "Gaming & eSports": () => import('./GamingAndEsports').then(m => m.GAMING_ESPORTS)
};

const CATEGORY_NAMES = Object.keys(CATEGORY_LOADERS).sort();

const getIconForOption = (label: string) => {
  const l = label.toLowerCase();
  
  if (l.includes('roadmap') || l.includes('timeline') || l.includes('milestone')) return GitBranch;
  if (l.includes('innovation') || l.includes('pitch') || l.includes('strategy') || l.includes('idea')) return Lightbulb;
  if (l.includes('prototype') || l.includes('demo')) return Box;
  if (l.includes('specification') || l.includes('spec') || l.includes('requirement')) return ClipboardList;
  if (l.includes('architecture') || l.includes('system') || l.includes('design')) return Settings;
  
  if (l.includes('history') || l.includes('historical') || l.includes('archive') || l.includes('past') || l.includes('chronology')) return History;
  if (l.includes('culture') || l.includes('society') || l.includes('ethnography') || l.includes('anthropology')) return Globe;
  if (l.includes('art') || l.includes('museum') || l.includes('exhibit') || l.includes('gallery')) return Palette;
  if (l.includes('literature') || l.includes('book') || l.includes('novel') || l.includes('poem')) return BookOpen;
  if (l.includes('research') || l.includes('study') || l.includes('paper') || l.includes('thesis')) return Library;

  if (l.includes('magic') || l.includes('spell') || l.includes('fantasy') || l.includes('creature')) return Sparkles;
  if (l.includes('alien') || l.includes('space') || l.includes('planet') || l.includes('sci-fi') || l.includes('future')) return Rocket;
  if (l.includes('world') || l.includes('map') || l.includes('universe')) return Globe;
  if (l.includes('character') || l.includes('hero') || l.includes('villain')) return User;

  if (l.includes('game') || l.includes('level') || l.includes('player') || l.includes('match') || l.includes('tournament') || l.includes('esport') || l.includes('patch') || l.includes('bug') || l.includes('quest') || l.includes('streaming') || l.includes('leaderboard')) return Gamepad2;

  if (l.includes('diy') || l.includes('repair') || l.includes('craft') || l.includes('paint') || l.includes('home improvement') || l.includes('assembly') || l.includes('project plan') || l.includes('renovation') || l.includes('woodworking')) return Hammer;
  
  if (l.includes('fashion') || l.includes('style') || l.includes('outfit') || l.includes('wardrobe') || l.includes('collection') || l.includes('trend')) return ShoppingBag;
  if (l.includes('lifestyle') || l.includes('blog') || l.includes('living')) return Heart;

  if (l.includes('grant') || l.includes('donation') || l.includes('fundraising') || l.includes('charity')) return HeartHandshake;
  if (l.includes('volunteer') || l.includes('community') || l.includes('outreach')) return User;
  if (l.includes('ngo') || l.includes('non-profit') || l.includes('impact')) return Globe;

  if (l.includes('tv') || l.includes('broadcast') || l.includes('show')) return Tv;
  if (l.includes('radio') || l.includes('podcast')) return Radio;
  if (l.includes('film') || l.includes('movie') || l.includes('cinema')) return Film;
  if (l.includes('script') || l.includes('screenplay') || l.includes('production')) return Clapperboard;
  if (l.includes('music') || l.includes('album') || l.includes('song') || l.includes('lyrics')) return Music;
  if (l.includes('casting') || l.includes('actor') || l.includes('role')) return User;
  
  if (l.includes('therapy') || l.includes('counseling') || l.includes('psych') || l.includes('mental')) return Brain;
  if (l.includes('patient') || l.includes('client') || l.includes('support') || l.includes('care')) return HeartHandshake;
  if (l.includes('assessment') || l.includes('evaluation') || l.includes('test')) return ClipboardList;
  if (l.includes('mood') || l.includes('emotion') || l.includes('behavior')) return Activity;

  if (l.includes('recipe') || l.includes('cook') || l.includes('food') || l.includes('meal') || l.includes('menu') || l.includes('chef') || l.includes('ingredient') || l.includes('dish') || l.includes('baking') || l.includes('culinary')) return Utensils;

  if (l.includes('fitness') || l.includes('workout') || l.includes('exercise') || l.includes('gym') || l.includes('strength') || l.includes('cardio') || l.includes('endurance')) return Dumbbell;
  if (l.includes('sport') || l.includes('game') || l.includes('match') || l.includes('tournament') || l.includes('league') || l.includes('competition') || l.includes('athlete') || l.includes('team') || l.includes('coach') || l.includes('award')) return Trophy;

  if (l.includes('blueprint') || l.includes('plan') || l.includes('architect') || l.includes('layout')) return Building2;
  if (l.includes('construction') || l.includes('build') || l.includes('contractor') || l.includes('site')) return Hammer;
  if (l.includes('design') || l.includes('interior') || l.includes('landscape')) return LayoutTemplate;
  if (l.includes('inspection') || l.includes('audit') || l.includes('checklist') || l.includes('safety')) return ClipboardList;
  if (l.includes('material') || l.includes('procurement') || l.includes('inventory')) return Factory;
  if (l.includes('maintenance') || l.includes('repair') || l.includes('work order')) return Wrench;

  if (l.includes('travel') || l.includes('tour') || l.includes('trip') || l.includes('itinerary')) return Map;
  if (l.includes('flight') || l.includes('airline') || l.includes('airport')) return Plane;
  if (l.includes('hotel') || l.includes('booking') || l.includes('accommodation')) return Briefcase;
  if (l.includes('guide') || l.includes('brochure') || l.includes('culture')) return BookOpen;
  if (l.includes('hiking') || l.includes('camping') || l.includes('adventure') || l.includes('backpack')) return Mountain;
  if (l.includes('photo') || l.includes('sightseeing')) return Camera;
  if (l.includes('cruise') || l.includes('sea')) return Video;

  if (l.includes('environment') || l.includes('ecology') || l.includes('nature') || l.includes('habitat')) return Leaf;
  if (l.includes('climate') || l.includes('weather') || l.includes('energy') || l.includes('carbon')) return Wind;
  if (l.includes('recycle') || l.includes('waste') || l.includes('sustainab')) return Recycle;
  if (l.includes('forest') || l.includes('wildlife') || l.includes('conservation') || l.includes('bio')) return TreeDeciduous;
  if (l.includes('pollution') || l.includes('air') || l.includes('water')) return FlaskConical;

  if (l.includes('code') || l.includes('sdk') || l.includes('api') || l.includes('snippet')) return Code;
  if (l.includes('database') || l.includes('sql') || l.includes('schema')) return Database;
  if (l.includes('server') || l.includes('cloud') || l.includes('devops')) return Server;
  if (l.includes('hardware') || l.includes('iot') || l.includes('robotics')) return Cpu;
  if (l.includes('technical') || l.includes('spec') || l.includes('system')) return Settings;
  
  if (l.includes('lab') || l.includes('experiment') || l.includes('microscope')) return Microscope;
  if (l.includes('science') || l.includes('chemical')) return FlaskConical;
  if (l.includes('research') || l.includes('study') || l.includes('analysis') || l.includes('thesis')) return FileSearch;
  if (l.includes('math') || l.includes('equation') || l.includes('formula')) return Sigma;
  
  if (l.includes('financial') || l.includes('budget') || l.includes('profit') || l.includes('revenue') || l.includes('cash') || l.includes('payroll')) return DollarSign;
  if (l.includes('market') || l.includes('sales') || l.includes('growth') || l.includes('trend')) return TrendingUp;
  if (l.includes('meeting') || l.includes('agenda') || l.includes('schedule')) return Calendar;
  if (l.includes('business') || l.includes('company') || l.includes('startup') || l.includes('corporate')) return Briefcase;
  if (l.includes('report') || l.includes('audit') || l.includes('log') || l.includes('review') || l.includes('summary')) return ClipboardList;
  if (l.includes('invoice') || l.includes('receipt') || l.includes('bill')) return Receipt;
  
  if (l.includes('legal') || l.includes('court') || l.includes('litigation') || l.includes('judgment')) return Gavel;
  if (l.includes('contract') || l.includes('agreement') || l.includes('policy') || l.includes('terms')) return FileSignature;
  if (l.includes('regulation') || l.includes('compliance') || l.includes('law')) return Scale;
  if (l.includes('government') || l.includes('public') || l.includes('municipal') || l.includes('civic') || l.includes('census')) return Landmark;
  if (l.includes('infrastructure') || l.includes('urban') || l.includes('housing')) return Building2;
  if (l.includes('safety') || l.includes('security') || l.includes('risk') || l.includes('disaster')) return ShieldAlert;

  if (l.includes('medical') || l.includes('patient') || l.includes('doctor') || l.includes('clinical') || l.includes('surgery') || l.includes('diagnosis')) return Stethoscope;
  if (l.includes('medication') || l.includes('drug') || l.includes('prescription') || l.includes('pharmacy') || l.includes('treatment')) return Pill;
  if (l.includes('health') || l.includes('nursing') || l.includes('vital') || l.includes('discharge')) return Activity;

  if (l.includes('music') || l.includes('song') || l.includes('lyric')) return Music;
  if (l.includes('podcast') || l.includes('audio') || l.includes('speech')) return Mic;
  if (l.includes('video') || l.includes('animation')) return Video;
  if (l.includes('poem') || l.includes('poetry')) return Feather;
  if (l.includes('story') || l.includes('novel') || l.includes('fiction')) return BookOpen;
  
  if (l.includes('lesson') || l.includes('syllabus') || l.includes('curriculum') || l.includes('teaching')) return GraduationCap;
  if (l.includes('quiz') || l.includes('exam') || l.includes('test') || l.includes('grade')) return CheckSquare;
  
  if (l.includes('resume') || l.includes('cv') || l.includes('profile')) return User;
  if (l.includes('email') || l.includes('letter')) return Mail;
  if (l.includes('presentation') || l.includes('slide')) return Projector;
  if (l.includes('scroll') || l.includes('certificate')) return Scroll;
  if (l.includes('scissor') || l.includes('cut')) return Scissors;
  
  return FileText;
};

const Box = (props: any) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={props.size || 24} 
      height={props.size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={props.className}
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
);

const SparklesIcon = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M9 5H5"/><path d="M19 19v2"/><path d="M21 21h-2"/></svg>
);

interface PredictiveBuilderProps {
    onSelect: (item: { l: string, f: string }) => void;
}

export const PredictiveBuilder: React.FC<PredictiveBuilderProps> = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [loadedData, setLoadedData] = useState<Record<string, {l: string, f: string}[]>>({});
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  // --- Search Handling (Loads all on search interaction) ---
  useEffect(() => {
    if (deferredSearchTerm && deferredSearchTerm.length > 1) {
       // If searching, assume user wants to see all matching options.
       // We must load all data to filter it.
       // Note: This might be slightly heavy but ensures search works.
       // To optimize, we only load if not already loaded.
       const loadAll = async () => {
           const pending = CATEGORY_NAMES.filter(name => !loadedData[name] && !loadingStates[name]);
           if (pending.length === 0) return;

           setLoadingStates(prev => {
               const next = {...prev};
               pending.forEach(name => next[name] = true);
               return next;
           });

           const results = await Promise.allSettled(pending.map(name => 
               CATEGORY_LOADERS[name]().then(data => ({ name, data }))
           ));

           const newLoadedData = {...loadedData};
           const newLoadingStates = {...loadingStates};
           
           results.forEach(res => {
               if (res.status === 'fulfilled') {
                   newLoadedData[res.value.name] = res.value.data;
                   newLoadingStates[res.value.name] = false;
               } else {
                   // reset loading state on fail so we can retry later if needed
                   // but realistically just mark false
                   // We don't have the name easily here if rejected, so let's iterate pending
                   // Simplify: Just iterate pending and update state.
               }
           });
           
           // Clean up loading states
           pending.forEach(name => newLoadingStates[name] = false);
           
           setLoadedData(newLoadedData);
           setLoadingStates(newLoadingStates);
       };
       
       loadAll();
    }
  }, [deferredSearchTerm, loadedData, loadingStates]);

  // --- Expansion Handling (Lazy Load on Click) ---
  const handleToggleCategory = async (category: string) => {
      if (expandedCategory === category) {
          setExpandedCategory(null);
          return;
      }

      setExpandedCategory(category);

      if (!loadedData[category] && !loadingStates[category]) {
          setLoadingStates(prev => ({...prev, [category]: true}));
          try {
              const data = await CATEGORY_LOADERS[category]();
              setLoadedData(prev => ({...prev, [category]: data}));
          } catch (error) {
              console.error(`Failed to load category: ${category}`, error);
          } finally {
              setLoadingStates(prev => ({...prev, [category]: false}));
          }
      }
  };

  // --- Filtering Logic ---
  const filteredItems = useMemo(() => {
    if (!deferredSearchTerm) return null;
    const lowerSearch = deferredSearchTerm.toLowerCase();
    const results: { l: string, f: string, category: string }[] = [];
    
    Object.entries(loadedData).forEach(([category, items]) => {
      if (items && Array.isArray(items)) {
          items.forEach(item => {
            if (item.l.toLowerCase().includes(lowerSearch)) {
              results.push({ ...item, category });
            }
          });
      }
    });
    // Optimization: Limit results to prevent massive re-renders during typing
    return results.slice(0, 50);
  }, [deferredSearchTerm, loadedData]);

  // Calculate total items (approximate based on loaded + estimate for unloaded)
  // We'll just show loaded count or "+" if loading
  const totalCount = Object.values(loadedData).reduce((acc, curr: any) => acc + curr.length, 0);
  const hasUnloaded = CATEGORY_NAMES.length > Object.keys(loadedData).length;

  return (
     <div className="flex flex-col flex-1 min-h-0 bg-slate-50/50">
         <div className="px-3 pt-3 pb-2 border-t border-slate-100 bg-slate-50 sticky top-0 z-10">
             <div className="flex items-center justify-between mb-2">
                 <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                     <LayoutTemplate size={10}/> Predictive Builder
                 </div>
                 <span className="text-[9px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded-full font-mono">
                    {totalCount}{hasUnloaded ? '+' : ''}
                 </span>
             </div>
             <div className="relative group">
                 <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500"/>
                 <input 
                    type="text" 
                    placeholder="Search document type..." 
                    className="w-full pl-7 pr-2 py-1.5 text-xs border border-slate-200 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                 />
             </div>
         </div>

         <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300 flex-1 px-2 pb-2">
             {deferredSearchTerm ? (
                 <div className="space-y-0.5 animate-in fade-in slide-in-from-top-2 duration-200">
                     {filteredItems && filteredItems.length > 0 ? (
                         filteredItems.map((item, idx) => {
                             const Icon = getIconForOption(item.l);
                             return (
                                 <button 
                                    key={idx} 
                                    onClick={() => onSelect(item)}
                                    className="w-full text-left px-3 py-2 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 rounded-md group transition-all"
                                 >
                                     <div className="flex justify-between items-baseline">
                                         <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-700 flex items-center gap-2">
                                             <Icon size={12} className="text-slate-400 group-hover:text-blue-500 flex-shrink-0" />
                                             {item.l}
                                         </span>
                                         <span className="text-[9px] text-slate-400 font-medium uppercase tracking-tight">{item.category.split(' ')[0]}</span>
                                     </div>
                                     <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1 opacity-80 pl-5">
                                         <span className="truncate">{item.f.split('→')[0].trim()}</span>
                                         <ChevronRight size={8} />
                                         <span className="truncate text-blue-600 font-medium">{item.f.split('→')[1]?.trim() || 'Next Section'}</span>
                                     </div>
                                 </button>
                             );
                         })
                     ) : (
                         <div className="py-8 text-center text-slate-400 text-xs flex flex-col items-center gap-2">
                             {Object.values(loadingStates).some(Boolean) ? (
                                 <>
                                    <Loader2 className="animate-spin" size={16}/>
                                    <span>Searching templates...</span>
                                 </>
                             ) : (
                                 <span>No templates found for "{deferredSearchTerm}"</span>
                             )}
                         </div>
                     )}
                 </div>
             ) : (
                 <div className="space-y-1">
                     {CATEGORY_NAMES.map((category) => {
                         const isExpanded = expandedCategory === category;
                         const items = loadedData[category];
                         const isLoading = loadingStates[category];

                         return (
                             <div key={category} className="rounded-lg overflow-hidden border border-slate-100 bg-white transition-colors hover:border-blue-200/50">
                                 <button 
                                    onClick={() => handleToggleCategory(category)}
                                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors ${isExpanded ? 'bg-slate-50 border-b border-slate-100 text-blue-700' : ''}`}
                                 >
                                     {category}
                                     <div className="flex items-center gap-2">
                                         {isLoading ? (
                                             <Loader2 size={10} className="animate-spin text-slate-400"/>
                                         ) : (
                                             <span className={`text-[9px] px-1.5 rounded transition-colors ${isExpanded ? 'bg-blue-100 text-blue-600' : 'text-slate-400 bg-slate-100'}`}>
                                                 {items ? items.length : '+'}
                                             </span>
                                         )}
                                         <ChevronDown size={12} className={`text-slate-400 transition-transform duration-300 ease-in-out ${isExpanded ? 'rotate-180 text-blue-500' : ''}`}/>
                                     </div>
                                 </button>
                                 
                                 {/* Smooth Expansion */}
                                 <div 
                                    className={`grid transition-all duration-300 ease-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                                 >
                                    <div className="overflow-hidden min-h-0">
                                        <div className="bg-slate-50/50 p-1 space-y-0.5 max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
                                            {isLoading && !items && (
                                                <div className="p-4 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
                                                    <Loader2 className="animate-spin" size={14} /> Loading...
                                                </div>
                                            )}
                                            
                                            {items && items.map((item, idx) => {
                                                const Icon = getIconForOption(item.l);
                                                return (
                                                    <button 
                                                        key={idx} 
                                                        onClick={() => onSelect(item)}
                                                        className="w-full text-left px-3 py-1.5 hover:bg-white hover:shadow-sm rounded border border-transparent hover:border-slate-100 transition-all group animate-in fade-in slide-in-from-top-1 duration-300"
                                                        style={{ animationDelay: `${Math.min(idx * 20, 300)}ms` }}
                                                    >
                                                        <div className="text-xs text-slate-600 group-hover:text-blue-700 font-medium flex items-center gap-2">
                                                            <Icon size={12} className="text-slate-400 group-hover:text-blue-500 flex-shrink-0 transition-colors" />
                                                            {item.l}
                                                        </div>
                                                        <div className="text-[10px] text-slate-400 truncate pl-5 group-hover:text-slate-500 transition-colors">{item.f}</div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                 </div>
                             </div>
                         );
                     })}
                 </div>
             )}
         </div>
     </div>
  );
};
