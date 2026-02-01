import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { TaskList } from './pages/TaskList';
import { TaskExecution } from './pages/TaskExecution';
import { Earnings } from './pages/Earnings';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { LandingPage } from './pages/LandingPage';
import { About } from './pages/About';
import { Contributors } from './pages/Contributors';
import { Money } from './pages/Money';
import { AdminCreateTask } from './pages/AdminCreateTask';
import { AdminDashboard } from './pages/AdminDashboard';
import { PageView, Task, UserRole, TaskType, TaskStatus } from './types';
import { Menu, User, MapPin, Smartphone, Laptop, Globe, Shield, Award, Calendar, LayoutDashboard, Database, CreditCard, MoreHorizontal, Moon, Sun } from 'lucide-react';
import { Logo } from './components/Logo';
import { PublicPageType } from './components/PublicLayout';
import { supabase } from "./supabaseClient";
import CompleteProfile from "./pages/CompleteProfile";



const INACTIVITY_LIMIT_MS = 15 * 60 * 1000; // 15 Minutes

// Initial Mock Data Moved to App Level State
const initialTasks: Task[] = [
  {
    id: 't-101',
    title: 'Voice: "Alexa, turn on the living room lights"',
    type: TaskType.AUDIO_COLLECTION,
    compensation: 120.00,
    currency: 'INR',
    estimatedTimeMin: 1,
    status: TaskStatus.AVAILABLE,
    language: 'English (India)',
    instructions: 'Record the displayed command naturally. Ensure no background TV noise.',
    prompt: "Alexa, turn on the living room lights.",
    aiCapability: "Speech Recognition (ASR)",
    dataUsage: "Training acoustic models for smart home devices.",
    imageUrl: 'https://images.unsplash.com/photo-1558002038-1091a1661116?auto=format&fit=crop&w=800&q=80',
    project: 'Project Echo Home',
    difficulty: 'Beginner',
    requirements: ['Quiet Environment', 'Clear Pronunciation']
  },
  {
    id: 't-102',
    title: 'Voice: "Show me recipes for Paneer Butter Masala"',
    type: TaskType.AUDIO_COLLECTION,
    compensation: 120.00,
    currency: 'INR',
    estimatedTimeMin: 1,
    status: TaskStatus.AVAILABLE,
    language: 'English (India)',
    instructions: 'Speak clearly with your natural accent.',
    prompt: "Show me recipes for Paneer Butter Masala.",
    aiCapability: "Speech Recognition (ASR)",
    dataUsage: "Training conversational AI for culinary queries.",
    imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80',
    project: 'Project Chef Bot',
    difficulty: 'Beginner',
    requirements: ['Native Accent']
  },
  {
    id: 't-105',
    title: 'Image: Hand Gesture "Peace"',
    type: TaskType.IMAGE_COLLECTION,
    compensation: 80.00,
    currency: 'INR',
    estimatedTimeMin: 2,
    status: TaskStatus.AVAILABLE,
    language: 'Universal',
    instructions: 'Capture an image of your hand showing the "Peace" (V) sign against a neutral background. Ensure good lighting.',
    prompt: "Capture: Peace Sign (V)",
    aiCapability: "Gesture Recognition",
    dataUsage: "Training touchless interface models.",
    imageUrl: 'https://images.unsplash.com/photo-1468421201266-486c74549195?auto=format&fit=crop&w=800&q=80',
    project: 'Project GestureControl',
    difficulty: 'Intermediate',
    requirements: ['Good Lighting', 'Plain Background']
  },
  {
    id: 't-103',
    title: 'Sentiment: Food Delivery Review',
    type: TaskType.TEXT_ANNOTATION,
    compensation: 25.00,
    currency: 'INR',
    estimatedTimeMin: 2,
    status: TaskStatus.AVAILABLE,
    language: 'English',
    instructions: 'Read the review and classify the sentiment. Identify the main complaint.',
    prompt: "The delivery was 45 minutes late and the pizza was completely cold. The rider didn't even apologize.",
    options: ['Positive', 'Neutral', 'Negative', 'Unclear'],
    aiCapability: "Sentiment Analysis (NLP)",
    dataUsage: "Fine-tuning customer service automated triage systems.",
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    project: 'Project Support AI',
    difficulty: 'Beginner',
    requirements: ['Reading Comprehension']
  },
  {
    id: 't-104',
    title: 'Image Labeling: Identify Street Objects',
    type: TaskType.IMAGE_LABELING,
    compensation: 60.00,
    currency: 'INR',
    estimatedTimeMin: 3,
    status: TaskStatus.AVAILABLE,
    language: 'English',
    instructions: 'List all the visible vehicles in the image. Separate items with a comma.',
    prompt: "Describe all vehicles visible in this intersection.",
    aiCapability: "Computer Vision (Object Detection)",
    dataUsage: "Training autonomous driving perception layers.",
    imageUrl: 'https://images.unsplash.com/photo-1565514020176-db79237c569a?auto=format&fit=crop&w=800&q=80',
    project: 'Project Autonomy',
    difficulty: 'Expert',
    requirements: ['High Detail', 'Automotive Knowledge']
  },
  {
    id: 't-106',
    title: 'Voice: "What is the cricket score?" (Tamil)',
    type: TaskType.AUDIO_COLLECTION,
    compensation: 150.00,
    currency: 'INR',
    estimatedTimeMin: 1,
    status: TaskStatus.AVAILABLE,
    language: 'Tamil',
    instructions: 'Translate and record the phrase in spoken Tamil.',
    prompt: "What is the cricket score?",
    aiCapability: "Machine Translation (Speech-to-Speech)",
    dataUsage: "Building low-resource language datasets for Tamil.",
    imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
    project: 'Project Indic Voice',
    difficulty: 'Intermediate',
    requirements: ['Native Speaker']
  },
  {
    id: 't-107',
    title: 'Survey: AI Usage Habits',
    type: TaskType.SURVEY,
    compensation: 15.00,
    currency: 'INR',
    estimatedTimeMin: 2,
    status: TaskStatus.AVAILABLE,
    language: 'English',
    instructions: 'Answer honestly about your daily technology usage.',
    prompt: "How often do you use voice assistants (Siri, Alexa, Google) in a week?",
    options: ['Daily', 'Few times a week', 'Rarely', 'Never'],
    aiCapability: "User Behavior Modeling",
    dataUsage: "Statistical analysis for product development.",
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    project: 'Project Insight',
    difficulty: 'Beginner',
    requirements: ['Honesty']
  },
];

const App: React.FC = () => {
  // Navigation State
  const [viewMode, setViewMode] = useState<'public' | 'app'>('public');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [publicPage, setPublicPage] = useState<PublicPageType>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('contributor');
  const [currentPage, setCurrentPage] = useState<PageView>('dashboard');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [activeTask, setActiveTask] = useState<Task | null>(null);



const loadTasks = async () => {
  try {
    const res = await fetch("http://localhost:3000/admin/tasks");
    if (!res.ok) throw new Error("Failed to fetch tasks");
    const data = await res.json();
    setTasks(data);
  } catch (err) {
    console.error("Error loading tasks:", err);
  }
};

  // Global Data State
const [tasks, setTasks] = useState<Task[]>([]);
useEffect(() => {
  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:3000/admin/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  };

  fetchTasks();
}, []);

  // Theme State
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:3000/admin/tasks");

      if (!res.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  fetchTasks();
}, []);


  // Initialize Theme
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Security: Auto-logout on inactivity
  useEffect(() => {
    if (!isAuthenticated) return;

    let inactivityTimer: number;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = window.setTimeout(() => {
        // Securely clear session
        handleLogout();
        alert("Session terminated due to inactivity for security.");
      }, INACTIVITY_LIMIT_MS);
    };

    // Events to monitor
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    window.addEventListener('click', resetTimer);
    window.addEventListener('scroll', resetTimer);

    // Init
    resetTimer();

    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('scroll', resetTimer);
    };
  }, [isAuthenticated]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Handlers
  const handleEnterApp = () => {
    setAuthMode('login');
    setViewMode('app');
  };

  const handleStartSignup = () => {
    setAuthMode('signup');
    setViewMode('app');
  }

  const handleExitApp = () => {
    setViewMode('public');
    setPublicPage('home');
    setCurrentPage('dashboard');
    setIsAuthenticated(false);
  };

const handleLogin = async (role: UserRole) => {
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  setUserRole(profile.role);
  setIsAuthenticated(true);

  if (!profile.profile_completed) {
    setCurrentPage("complete-profile");
  } else {
    setCurrentPage(role === "admin" ? "admin-dashboard" : "dashboard");
  }
  setUserRole(role);
  setIsAuthenticated(true);

  await loadTasks(); // 🔥 ALWAYS LOAD TASKS

  setCurrentPage(role === "admin" ? "admin-dashboard" : "dashboard");
};


 

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTask(null);
    setViewMode('public');
    setPublicPage('home');
  };

  const handleSelectTask = (task: Task) => {
    setActiveTask(task);
    setCurrentPage('execution');
  };

  const handleCompleteTask = () => {
    setActiveTask(null);
    setCurrentPage('tasks');
  };

  const handleCreateTask = async (newTask: Task) => {
  setTasks(prev => [newTask, ...prev]);
  setCurrentPage("tasks");
};



  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const handlePublicNavigate = (page: PublicPageType) => {
    setPublicPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render Logic
  if (viewMode === 'public') {
    switch (publicPage) {
      case 'about':
        return <About onNavigate={handlePublicNavigate} onEnterApp={handleEnterApp} isDark={isDark} toggleTheme={toggleTheme} />;
      case 'contributors':
        return <Contributors onNavigate={handlePublicNavigate} onEnterApp={handleStartSignup} isDark={isDark} toggleTheme={toggleTheme} />;
      case 'money':
        return <Money onNavigate={handlePublicNavigate} onEnterApp={handleStartSignup} isDark={isDark} toggleTheme={toggleTheme} />;
      default:
        return <LandingPage onNavigate={handlePublicNavigate} onEnterApp={handleEnterApp} onStartSignup={handleStartSignup} isDark={isDark} toggleTheme={toggleTheme} />;
    }
  }

  if (!isAuthenticated) {
    if (authMode === 'signup') {
      return (
        <Signup 
          onLogin={() => handleLogin('contributor')} 
          onSwitchToLogin={() => setAuthMode('login')}
          onBackHome={handleExitApp}
          isDark={isDark} 
          toggleTheme={toggleTheme} 
        />
      );
    }
    return (
      <Login 
        onLogin={handleLogin} 
        onSwitchToSignup={() => setAuthMode('signup')}
        onBackHome={handleExitApp}
        isDark={isDark} 
        toggleTheme={toggleTheme} 
      />
    );
  }

  const renderContent = () => {
    // Admin Views
    if (userRole === 'admin') {
      switch(currentPage) {
        case 'admin-dashboard':
          return <AdminDashboard onNavigate={setCurrentPage} tasks={tasks} />;
        case 'admin-create-task':
          return <AdminCreateTask onSave={handleCreateTask} />;
        case 'tasks':
          return <TaskList onSelectTask={handleSelectTask} tasks={tasks} userRole="admin" onDeleteTask={handleDeleteTask} />;
        case 'account':
          return (
             <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-stone-200 dark:border-white/10">
                <h1 className="text-2xl font-bold text-[#121212] dark:text-white mb-4">Admin Profile</h1>
                <p className="text-stone-500">System Administrator Access. Level 5 Clearance.</p>
             </div>
          );
        default:
          return <AdminDashboard onNavigate={setCurrentPage} tasks={tasks} />;
      }
    }

    // Contributor Views
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'tasks':
        return <TaskList onSelectTask={handleSelectTask} tasks={tasks} />;
      case 'execution':
        if (!activeTask) return <TaskList onSelectTask={handleSelectTask} tasks={tasks} />;
        return (
          <TaskExecution 
            task={activeTask} 
            onBack={() => setCurrentPage('tasks')} 
            onComplete={handleCompleteTask}
          />
        );
      case 'earnings':
        return <Earnings />;
      case 'guidelines':
        return (
          <div className="bg-white/70 dark:bg-black/40 backdrop-blur-md p-6 md:p-10 rounded-2xl border border-stone-200 dark:border-white/10 shadow-sm max-w-4xl animate-in fade-in duration-500">
             <h1 className="text-2xl md:text-3xl font-bold mb-8 text-[#121212] dark:text-white">Quality Guidelines</h1>
             <p className="mb-8 text-base md:text-lg text-stone-600 dark:text-stone-300 leading-relaxed">Strict adherence to these guidelines is required for payout. Violations may result in account suspension.</p>
             <div className="grid md:grid-cols-2 gap-6">
               <div className="p-6 md:p-8 bg-[#FAF9F7]/80 dark:bg-white/5 rounded-xl border border-stone-200 dark:border-white/10">
                 <h3 className="font-bold text-[#121212] dark:text-white mb-3 text-lg">Audio</h3>
                 <p className="text-stone-600 dark:text-stone-400 leading-relaxed">No background noise (TV, fans, other people). Clear pronunciation required. Use a headset if possible.</p>
               </div>
               <div className="p-6 md:p-8 bg-[#FAF9F7]/80 dark:bg-white/5 rounded-xl border border-stone-200 dark:border-white/10">
                 <h3 className="font-bold text-[#121212] dark:text-white mb-3 text-lg">Text</h3>
                 <p className="text-stone-600 dark:text-stone-400 leading-relaxed">Proper grammar and spelling are required unless colloquialisms are explicitly requested.</p>
               </div>
             </div>
          </div>
        );
      case 'support':
        return (
          <div className="bg-white/70 dark:bg-black/40 backdrop-blur-md p-6 md:p-10 rounded-2xl border border-stone-200 dark:border-white/10 shadow-sm max-w-3xl animate-in fade-in duration-500">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-[#121212] dark:text-white">Support</h1>
            <p className="text-stone-600 dark:text-stone-300 mb-10 text-lg">Need help? Submit a ticket below.</p>
            <form className="space-y-8">
              <div>
                <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-2 uppercase tracking-wide">Issue Type</label>
                <select className="w-full border-stone-200 dark:border-white/10 rounded-xl p-4 border bg-[#FAF9F7]/50 dark:bg-white/5 focus:bg-white dark:focus:bg-black focus:ring-2 focus:ring-teal-500/20 focus:border-[#0f766e] transition-all outline-none text-base text-zinc-900 dark:text-white">
                  <option>Payment Issue</option>
                  <option>Task Bug</option>
                  <option>Account Question</option>
                </select>
              </div>
              <div>
                 <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-2 uppercase tracking-wide">Description</label>
                 <textarea className="w-full border-stone-200 dark:border-white/10 rounded-xl p-4 border h-40 bg-[#FAF9F7]/50 dark:bg-white/5 focus:bg-white dark:focus:bg-black focus:ring-2 focus:ring-teal-500/20 focus:border-[#0f766e] transition-all resize-none outline-none text-base text-zinc-900 dark:text-white"></textarea>
              </div>
              <button className="bg-[#0f766e] text-white px-8 py-4 rounded-xl font-medium shadow-lg shadow-teal-900/10 hover:shadow-teal-900/20 hover:-translate-y-0.5 transition-all text-lg w-full md:w-auto">Submit Ticket</button>
            </form>
          </div>
        );
      case 'account':
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
             <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#121212] dark:text-white">Contributor ID: 8829-X</h1>
             
             {/* Profile Header */}
             <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-stone-200 dark:border-white/10 p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm">
                <div className="h-24 w-24 bg-stone-100 dark:bg-white/10 rounded-full flex items-center justify-center text-3xl font-bold text-stone-500 dark:text-white">JD</div>
                <div className="flex-1 text-center md:text-left">
                   <h2 className="text-2xl font-bold text-[#121212] dark:text-white">Jane Doe</h2>
                   <p className="text-stone-500 dark:text-stone-400 flex items-center justify-center md:justify-start gap-2 mt-1">
                      <Shield className="h-4 w-4 text-emerald-500" /> Verified Contributor • Joined Oct 2023
                   </p>
                </div>
                <div className="text-center md:text-right w-full md:w-auto border-t md:border-t-0 border-stone-100 dark:border-white/5 pt-4 md:pt-0">
                   <div className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">Trust Score</div>
                   <div className="text-3xl font-bold text-emerald-500">98/100</div>
                </div>
             </div>

             <div className="grid md:grid-cols-2 gap-6">
                {/* Demographics */}
                <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-stone-200 dark:border-white/10 p-6 md:p-8 shadow-sm">
                   <h3 className="text-lg font-bold text-[#121212] dark:text-white mb-6 flex items-center gap-2">
                      <User className="h-5 w-5 text-blue-500" /> Demographics
                   </h3>
                   <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">Age</label>
                            <p className="text-base font-medium text-[#121212] dark:text-white">28</p>
                         </div>
                         <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">Gender</label>
                            <p className="text-base font-medium text-[#121212] dark:text-white">Female</p>
                         </div>
                      </div>
                      <div>
                         <label className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">Location</label>
                         <p className="text-base font-medium text-[#121212] dark:text-white flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-stone-400" /> Mumbai, India
                         </p>
                      </div>
                      <div>
                         <label className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">Email</label>
                         <p className="text-base font-medium text-[#121212] dark:text-white break-all">jane@example.com</p>
                      </div>
                   </div>
                </div>
             </div>
             
             <div className="pt-8 border-t border-stone-200 dark:border-white/10 flex justify-end pb-20 md:pb-0">
                <button 
                  className="text-red-600 font-medium text-base hover:underline hover:text-red-700 transition-colors w-full md:w-auto text-center"
                  onClick={() => alert("Contact support to delete account.")}
                >
                  Delete Account
                </button>
              </div>
          </div>
        );
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="flex h-[100dvh] bg-transparent text-[#121212] dark:text-white font-sans selection:bg-teal-100 selection:text-teal-900 overflow-hidden">
      {/* Desktop Sidebar - Hidden on Mobile */}
      <div className="hidden md:block h-full">
        <Sidebar 
          currentPage={currentPage} 
          onNavigate={setCurrentPage} 
          isMobileOpen={isMobileNavOpen}
          setIsMobileOpen={setIsMobileNavOpen}
          onLogout={handleLogout}
          onExitApp={handleExitApp}
          isDark={isDark}
          toggleTheme={toggleTheme}
          userRole={userRole}
        />
      </div>

      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile Header - Visible only on Mobile */}
        <header className="md:hidden bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-stone-200 dark:border-white/10 h-16 flex items-center justify-between px-4 flex-shrink-0 z-30 relative">
          <div className="flex items-center gap-2">
            <Logo className="h-6 w-6 text-blue-600 dark:text-blue-500" />
            <span className="font-bold text-base text-[#121212] dark:text-white tracking-[0.1em] uppercase whitespace-nowrap">STARSET</span>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={toggleTheme} className="p-2 text-zinc-600 dark:text-zinc-400">
               {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
             </button>
             {/* Open Sidebar Overlay for extra menu items if needed */}
             <button 
                onClick={() => setIsMobileNavOpen(true)}
                className="p-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-white/10 rounded-lg transition-colors"
              >
                <MoreHorizontal className="h-6 w-6" />
              </button>
          </div>
        </header>
        
        {/* Mobile Sidebar Overlay (For Menu Items not in Bottom Nav) */}
        <div className="md:hidden">
           <Sidebar 
              currentPage={currentPage} 
              onNavigate={setCurrentPage} 
              isMobileOpen={isMobileNavOpen}
              setIsMobileOpen={setIsMobileNavOpen}
              onLogout={handleLogout}
              onExitApp={handleExitApp}
              isDark={isDark}
              toggleTheme={toggleTheme}
              userRole={userRole}
            />
        </div>

        {/* Main Content Scrollable Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-10 scroll-smooth pb-24 md:pb-10">
          <div className="max-w-[1600px] mx-auto min-h-full flex flex-col">
            <div className="flex-1">
               {renderContent()}
            </div>
            
            <footer className="mt-12 py-6 border-t border-zinc-200 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-400 dark:text-zinc-600 text-xs">
                <div className="flex items-center gap-2">
                   <Logo className="h-5 w-5 opacity-70" />
                   <span className="font-bold tracking-wider uppercase">Starset Intelligence</span>
                </div>
                <div className="flex items-center gap-6">
                   <span className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors cursor-pointer">System Status: Stable</span>
                   <span className="font-mono opacity-50">v2.5.4</span>
                </div>
            </footer>
          </div>
        </main>

        {/* Mobile Bottom Navigation - Visible only on Mobile */}
        <div className="md:hidden absolute bottom-0 left-0 w-full bg-white dark:bg-black border-t border-stone-200 dark:border-white/10 px-6 py-3 flex justify-between items-center z-40 safe-area-bottom">
           <button 
             onClick={() => setCurrentPage('dashboard')}
             className={`flex flex-col items-center gap-1 transition-colors ${currentPage === 'dashboard' ? 'text-blue-600 dark:text-blue-500' : 'text-stone-400'}`}
           >
              <LayoutDashboard className="h-6 w-6" strokeWidth={currentPage === 'dashboard' ? 2.5 : 2} />
              <span className="text-[10px] font-medium">Home</span>
           </button>
           
           <button 
             onClick={() => setCurrentPage('tasks')}
             className={`flex flex-col items-center gap-1 transition-colors ${currentPage === 'tasks' || currentPage === 'execution' ? 'text-blue-600 dark:text-blue-500' : 'text-stone-400'}`}
           >
              <Database className="h-6 w-6" strokeWidth={currentPage === 'tasks' || currentPage === 'execution' ? 2.5 : 2} />
              <span className="text-[10px] font-medium">Tasks</span>
           </button>

           <button 
             onClick={() => setCurrentPage('earnings')}
             className={`flex flex-col items-center gap-1 transition-colors ${currentPage === 'earnings' ? 'text-blue-600 dark:text-blue-500' : 'text-stone-400'}`}
           >
              <CreditCard className="h-6 w-6" strokeWidth={currentPage === 'earnings' ? 2.5 : 2} />
              <span className="text-[10px] font-medium">Money</span>
           </button>

           <button 
             onClick={() => setCurrentPage('account')}
             className={`flex flex-col items-center gap-1 transition-colors ${currentPage === 'account' ? 'text-blue-600 dark:text-blue-500' : 'text-stone-400'}`}
           >
              <User className="h-6 w-6" strokeWidth={currentPage === 'account' ? 2.5 : 2} />
              <span className="text-[10px] font-medium">Profile</span>
           </button>
        </div>
      </div>
    </div>
  );
};

export default App;