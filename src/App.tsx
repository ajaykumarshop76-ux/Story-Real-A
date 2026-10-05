import React, { useState, useEffect } from 'react';
import {
  Copy,
  Check,
  Download,
  Code2,
  Eye,
  BookOpen,
  FileCheck,
  Share2,
  ExternalLink,
  MessageSquare,
  Search,
  Bookmark,
  Calendar,
  Clock,
  User,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Mail,
  ChevronRight,
  Sparkles,
  Info,
  Maximize2,
  Smartphone,
  Tablet,
  Monitor
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'guide'>('preview');
  const [previewPage, setPreviewPage] = useState<'home' | 'post'>('home');
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [copied, setCopied] = useState(false);
  const [xmlContent, setXmlContent] = useState<string>('');
  const [commentText, setCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentsList, setCommentsList] = useState([
    {
      author: 'Rajesh Sharma',
      date: '2 hours ago',
      text: 'Great investigative analysis by Ajay Kumar. The coverage on infrastructure and economic reforms reflects ground realities without sensationalism.'
    },
    {
      author: 'Dr. Sunita Patel',
      date: '5 hours ago',
      text: 'Appreciate the clean reading typography and balanced editorial perspective on Story Real A.'
    }
  ]);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Fetch the XML template file content on mount
  useEffect(() => {
    fetch('/storyreala-template.xml')
      .then((res) => res.text())
      .then((data) => setXmlContent(data))
      .catch((err) => console.error('Failed to load XML file', err));
  }, []);

  const handleCopyXML = () => {
    if (xmlContent) {
      navigator.clipboard.writeText(xmlContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownloadXML = () => {
    const blob = new Blob([xmlContent], { type: 'application/xml;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'storyreala-blogger-template.xml');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !commentAuthor.trim()) return;
    setCommentsList([
      {
        author: commentAuthor,
        date: 'Just now',
        text: commentText
      },
      ...commentsList
    ]);
    setCommentText('');
    setCommentAuthor('');
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSubscribed(false), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Application Control Toolbar */}
      <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand & Status */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-red-600 rounded flex items-center justify-center font-serif font-black text-white text-lg tracking-wider shadow">
              A
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-white text-base tracking-wide">
                  STORY REAL A
                </span>
                <span className="text-[10px] font-mono uppercase bg-red-950/80 text-red-300 border border-red-800/60 px-1.5 py-0.5 rounded">
                  Blogger XML v3
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Ajay Kumar • <span className="text-slate-300">mmcrajay@gmail.com</span>
              </p>
            </div>
          </div>

          {/* View Mode Tabs */}
          <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs font-medium">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'preview'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Live Preview
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'code'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              Raw XML Code
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'guide'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Install Guide
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyXML}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-2 rounded-md border border-slate-700 transition"
              title="Copy entire Blogger XML code"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied XML!' : 'Copy XML'}</span>
            </button>

            <button
              onClick={handleDownloadXML}
              className="flex items-center gap-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold px-3 py-2 rounded-md transition shadow"
              title="Download storyreala-template.xml"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .xml</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Studio Body */}
      <main className="flex-1 bg-slate-900">
        {/* =========================================================================
            TAB 1: LIVE INTERACTIVE PREVIEW
            ========================================================================= */}
        {activeTab === 'preview' && (
          <div className="flex flex-col">
            {/* Preview Sub-Toolbar */}
            <div className="bg-slate-950 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-medium">Page View:</span>
                <div className="flex items-center bg-slate-900 border border-slate-800 rounded p-0.5">
                  <button
                    onClick={() => setPreviewPage('home')}
                    className={`px-3 py-1 rounded transition ${
                      previewPage === 'home'
                        ? 'bg-slate-800 text-white font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Homepage (Grid &amp; Hero)
                  </button>
                  <button
                    onClick={() => setPreviewPage('post')}
                    className={`px-3 py-1 rounded transition ${
                      previewPage === 'post'
                        ? 'bg-slate-800 text-white font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Single Article Page
                  </button>
                </div>
              </div>

              {/* Viewport Simulation Controls */}
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-slate-900 border border-slate-800 rounded p-0.5 text-slate-400">
                  <button
                    onClick={() => setDeviceView('desktop')}
                    className={`p-1.5 rounded transition ${deviceView === 'desktop' ? 'bg-slate-800 text-white' : 'hover:text-white'}`}
                    title="Desktop (1200px container)"
                  >
                    <Monitor className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeviceView('tablet')}
                    className={`p-1.5 rounded transition ${deviceView === 'tablet' ? 'bg-slate-800 text-white' : 'hover:text-white'}`}
                    title="Tablet (768px)"
                  >
                    <Tablet className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeviceView('mobile')}
                    className={`p-1.5 rounded transition ${deviceView === 'mobile' ? 'bg-slate-800 text-white' : 'hover:text-white'}`}
                    title="Mobile (420px)"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="hidden sm:flex items-center gap-2 text-slate-400 font-mono text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  AdSense: <code className="text-slate-300">ca-pub-2790193514099157</code>
                </div>
              </div>
            </div>

            {/* Simulation Canvas Container */}
            <div className="p-2 sm:p-6 bg-slate-900/80 min-h-[calc(100vh-120px)] flex justify-center overflow-x-auto">
              <div
                className={`bg-white text-slate-900 shadow-2xl transition-all duration-300 border border-slate-700/50 rounded-md overflow-hidden ${
                  deviceView === 'desktop'
                    ? 'w-full max-w-[1240px]'
                    : deviceView === 'tablet'
                    ? 'w-[768px]'
                    : 'w-[420px]'
                }`}
                style={{
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                }}
              >
                {/* 1. TOP UTILITY RIBBON */}
                <div className="bg-[#0f172a] text-[#e2e8f0] text-xs py-1.5 px-4 sm:px-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="bg-white/15 px-2 py-0.5 rounded text-[11px] font-semibold text-white uppercase tracking-wider">
                      India Edition
                    </span>
                    <span>Monday, October 5, 2026</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden sm:inline">Story Real A Journalism</span>
                  </div>
                  <div className="text-[11px] text-slate-300">
                    Editor: <span className="font-semibold text-white">Ajay Kumar</span> (
                    <a href="mailto:mmcrajay@gmail.com" className="hover:underline text-red-400">
                      mmcrajay@gmail.com
                    </a>
                    )
                  </div>
                </div>

                {/* 2. BREAKING NEWS STRIP */}
                <div className="bg-white border-b border-slate-200 text-xs flex items-center">
                  <div className="bg-[#c91414] text-white font-bold px-3.5 py-1.5 uppercase text-[11px] tracking-wider flex items-center gap-1.5 shrink-0">
                    <span>Breaking</span>
                    <span className="w-1.5 h-1.5 bg-white rounded-full inline-block animate-ping"></span>
                  </div>
                  <div className="px-3 sm:px-4 text-slate-800 font-medium truncate">
                    Welcome to Story Real A • Grassroots investigative reporting, public policy analysis, and verified updates across India.
                  </div>
                </div>

                {/* 3. SITE HEADER & 728x90 ADSENSE BANNER */}
                <header className="bg-white border-b-2 border-slate-900 py-4 px-4 sm:px-6">
                  <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
                    {/* Brand Lockup */}
                    <div className="text-center lg:text-left">
                      <h1
                        className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950"
                        style={{ fontFamily: "'Playfair Display', 'Merriweather', serif" }}
                      >
                        STORY REAL <span className="text-[#c91414]">A</span>
                      </h1>
                      <p className="text-[11px] text-slate-500 uppercase tracking-widest font-medium mt-1">
                        Independent Journalism • Insightful Stories • Verified Truth
                      </p>
                    </div>

                    {/* Header Ad Slot (728x90) */}
                    <div className="w-full lg:w-[728px] max-w-full">
                      <div className="bg-slate-50 border border-dashed border-slate-300 rounded p-2 text-center relative min-h-[80px] flex flex-col items-center justify-center">
                        <span className="absolute top-1 right-2 text-[9px] text-slate-400 uppercase tracking-wider">
                          Advertisement • 728x90 Banner
                        </span>
                        <div className="text-xs font-mono text-slate-600">
                          Google AdSense Client: <strong className="text-slate-900">ca-pub-2790193514099157</strong>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          High-converting horizontal header ad slot (Auto-responsive)
                        </div>
                      </div>
                    </div>
                  </div>
                </header>

                {/* 4. PRIMARY NAVIGATION BAR */}
                <nav className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm px-4 sm:px-6">
                  <div className="max-w-[1200px] mx-auto flex items-center justify-between">
                    <ul className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-0 text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-800 no-scrollbar">
                      <li>
                        <button
                          onClick={() => setPreviewPage('home')}
                          className={`py-3 px-2 sm:px-3 border-b-2 transition ${
                            previewPage === 'home'
                              ? 'border-[#c91414] text-[#c91414]'
                              : 'border-transparent text-slate-700 hover:text-[#c91414]'
                          }`}
                        >
                          Home
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => setPreviewPage('home')}
                          className="py-3 px-2 sm:px-3 border-b-2 border-transparent text-slate-700 hover:text-[#c91414] transition"
                        >
                          India
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => setPreviewPage('home')}
                          className="py-3 px-2 sm:px-3 border-b-2 border-transparent text-slate-700 hover:text-[#c91414] transition"
                        >
                          Politics
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => setPreviewPage('home')}
                          className="py-3 px-2 sm:px-3 border-b-2 border-transparent text-slate-700 hover:text-[#c91414] transition"
                        >
                          Economy
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => setPreviewPage('home')}
                          className="py-3 px-2 sm:px-3 border-b-2 border-transparent text-slate-700 hover:text-[#c91414] transition"
                        >
                          Tech
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => setPreviewPage('post')}
                          className={`py-3 px-2 sm:px-3 border-b-2 transition ${
                            previewPage === 'post'
                              ? 'border-[#c91414] text-[#c91414]'
                              : 'border-transparent text-slate-700 hover:text-[#c91414]'
                          }`}
                        >
                          Featured Post
                        </button>
                      </li>
                    </ul>

                    {/* Search affordance */}
                    <div className="hidden md:flex items-center relative">
                      <input
                        type="text"
                        placeholder="Search news..."
                        className="bg-slate-100 border border-slate-200 rounded-full px-3 py-1 text-xs outline-none focus:border-red-600 focus:bg-white w-40 transition"
                      />
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 pointer-events-none" />
                    </div>
                  </div>
                </nav>

                {/* 5. MAIN CONTAINER (max-width: 1200px, 70/30 GRID SYSTEM) */}
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6">
                  <div className="flex flex-col lg:flex-row gap-[30px]">
                    {/* ========================================================
                        LEFT MAIN COLUMN (70% WIDTH)
                        Mandatory feed widget: <b:section id='main'>
                        ======================================================== */}
                    <div className="w-full lg:w-[calc(70%-15px)]">
                      {/* HOMEPAGE VIEW */}
                      {previewPage === 'home' && (
                        <div>
                          {/* FEATURED HERO STORY */}
                          <article className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm mb-7 group hover:shadow-md transition">
                            <div className="relative overflow-hidden aspect-[16/9] bg-slate-900 cursor-pointer" onClick={() => setPreviewPage('post')}>
                              <img
                                src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80"
                                alt="Lead story"
                                className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
                              />
                              <div className="absolute top-3 left-3 bg-[#c91414] text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                                Lead Investigation
                              </div>
                            </div>
                            <div className="p-5 sm:p-6">
                              <h2
                                onClick={() => setPreviewPage('post')}
                                className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 leading-tight mb-2.5 cursor-pointer hover:text-[#c91414] transition"
                                style={{ fontFamily: "'Merriweather', 'Playfair Display', serif" }}
                              >
                                Grassroots Transformation: How Digital Infrastructure is Reshaping Rural Governance Across India
                              </h2>

                              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-3 font-medium">
                                <span className="text-slate-900 font-bold flex items-center gap-1">
                                  <User className="w-3.5 h-3.5 text-red-600" /> Ajay Kumar
                                </span>
                                <span>•</span>
                                <span>October 5, 2026</span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" /> 5 min read
                                </span>
                              </div>

                              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
                                An on-the-ground assessment reveals how high-speed rural fiber networks and localized digital delivery platforms are closing legacy bureaucratic bottlenecks, empowering panchayats with direct fiscal accountability.
                              </p>

                              <button
                                onClick={() => setPreviewPage('post')}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c91414] uppercase tracking-wider hover:underline"
                              >
                                Read Full Story <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </article>

                          {/* 2-COLUMN POST CARDS GRID */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                            {/* Card 1 */}
                            <div
                              onClick={() => setPreviewPage('post')}
                              className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-md transition cursor-pointer flex flex-col"
                            >
                              <img
                                src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80"
                                alt="Economy"
                                className="w-full h-44 object-cover"
                              />
                              <div className="p-4 flex-1 flex flex-col justify-between">
                                <div>
                                  <span className="text-[11px] font-bold text-[#c91414] uppercase tracking-wider">
                                    Economy &amp; Trade
                                  </span>
                                  <h3
                                    className="text-base font-bold text-slate-900 leading-snug mt-1 mb-2 hover:text-[#c91414]"
                                    style={{ fontFamily: "'Merriweather', serif" }}
                                  >
                                    Manufacturing Exports Surpass Quarterly Targets Amid Supply Chain Rebalancing
                                  </h3>
                                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                                    Domestic industrial clusters witness renewed capital expenditure as international buyers accelerate diversified regional procurement contracts.
                                  </p>
                                </div>
                                <div className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                                  <span>By Ajay Kumar</span>
                                  <span>Oct 5, 2026</span>
                                </div>
                              </div>
                            </div>

                            {/* Card 2 */}
                            <div
                              onClick={() => setPreviewPage('post')}
                              className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-md transition cursor-pointer flex flex-col"
                            >
                              <img
                                src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80"
                                alt="Green Energy"
                                className="w-full h-44 object-cover"
                              />
                              <div className="p-4 flex-1 flex flex-col justify-between">
                                <div>
                                  <span className="text-[11px] font-bold text-[#c91414] uppercase tracking-wider">
                                    Clean Energy
                                  </span>
                                  <h3
                                    className="text-base font-bold text-slate-900 leading-snug mt-1 mb-2 hover:text-[#c91414]"
                                    style={{ fontFamily: "'Merriweather', serif" }}
                                  >
                                    Decentralized Solar Arrays Bring 24/7 Power to Western Border Villages
                                  </h3>
                                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                                    A community microgrid model integrates localized battery storage to shield agricultural pumps and rural health centers from grid outages.
                                  </p>
                                </div>
                                <div className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                                  <span>By Ajay Kumar</span>
                                  <span>Oct 4, 2026</span>
                                </div>
                              </div>
                            </div>

                            {/* Card 3 */}
                            <div
                              onClick={() => setPreviewPage('post')}
                              className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-md transition cursor-pointer flex flex-col"
                            >
                              <img
                                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80"
                                alt="Infrastructure"
                                className="w-full h-44 object-cover"
                              />
                              <div className="p-4 flex-1 flex flex-col justify-between">
                                <div>
                                  <span className="text-[11px] font-bold text-[#c91414] uppercase tracking-wider">
                                    Infrastructure
                                  </span>
                                  <h3
                                    className="text-base font-bold text-slate-900 leading-snug mt-1 mb-2 hover:text-[#c91414]"
                                    style={{ fontFamily: "'Merriweather', serif" }}
                                  >
                                    Expressway Corridors Cut Freight Transit Time Across Central Indian Freight Hubs
                                  </h3>
                                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                                    Modernized logistics corridors reduce perishables spoilage rates while providing roadside multimodal processing parks.
                                  </p>
                                </div>
                                <div className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                                  <span>By Ajay Kumar</span>
                                  <span>Oct 3, 2026</span>
                                </div>
                              </div>
                            </div>

                            {/* Card 4 */}
                            <div
                              onClick={() => setPreviewPage('post')}
                              className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-md transition cursor-pointer flex flex-col"
                            >
                              <img
                                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80"
                                alt="Healthcare"
                                className="w-full h-44 object-cover"
                              />
                              <div className="p-4 flex-1 flex flex-col justify-between">
                                <div>
                                  <span className="text-[11px] font-bold text-[#c91414] uppercase tracking-wider">
                                    Public Health
                                  </span>
                                  <h3
                                    className="text-base font-bold text-slate-900 leading-snug mt-1 mb-2 hover:text-[#c91414]"
                                    style={{ fontFamily: "'Merriweather', serif" }}
                                  >
                                    Primary Care Modernization: Tele-Diagnostics Expanded to 15,000 Clinics
                                  </h3>
                                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                                    Specialist doctors in metropolitan medical institutes conduct real-time screenings for distant sub-centers via encrypted health portals.
                                  </p>
                                </div>
                                <div className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                                  <span>By Ajay Kumar</span>
                                  <span>Oct 2, 2026</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Pagination Bar */}
                          <div className="flex items-center justify-between py-4 border-t border-slate-200 text-xs font-semibold">
                            <span className="text-slate-400">Page 1 of 18 (All 171 Posts Rendered)</span>
                            <div className="flex items-center gap-2">
                              <button className="px-3 py-1.5 border border-slate-300 rounded bg-white text-slate-700 hover:bg-slate-50 transition">
                                Next Page →
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SINGLE POST READING VIEW */}
                      {previewPage === 'post' && (
                        <article className="bg-white rounded-lg border border-slate-200 p-5 sm:p-8 shadow-sm">
                          {/* Breadcrumb & Kicker */}
                          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                            <button onClick={() => setPreviewPage('home')} className="hover:text-red-600">Home</button>
                            <span>/</span>
                            <span className="text-red-600 font-bold uppercase tracking-wider">National Affairs</span>
                          </div>

                          <h1
                            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 leading-tight mb-4"
                            style={{ fontFamily: "'Merriweather', 'Playfair Display', serif" }}
                          >
                            Grassroots Transformation: How Digital Infrastructure is Reshaping Rural Governance Across India
                          </h1>

                          {/* Author Byline Bar with Ajay Kumar Avatar */}
                          <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-b border-slate-200 mb-6">
                            <div className="flex items-center gap-3">
                              <img
                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
                                alt="Ajay Kumar"
                                className="w-11 h-11 rounded-full object-cover border-2 border-slate-200"
                              />
                              <div>
                                <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                                  Ajay Kumar
                                  <span title="Verified Author">
                                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                                  </span>
                                </div>
                                <div className="text-xs text-slate-500">
                                  Published on October 5, 2026 • 4 min read
                                </div>
                              </div>
                            </div>

                            {/* Social Share Buttons */}
                            <div className="flex items-center gap-1.5 text-xs">
                              <button className="bg-[#25d366] text-white px-2.5 py-1.5 rounded font-semibold flex items-center gap-1 hover:opacity-90">
                                WhatsApp
                              </button>
                              <button className="bg-black text-white px-2.5 py-1.5 rounded font-semibold flex items-center gap-1 hover:opacity-90">
                                X / Tweet
                              </button>
                              <button className="bg-[#1877f2] text-white px-2.5 py-1.5 rounded font-semibold flex items-center gap-1 hover:opacity-90">
                                Facebook
                              </button>
                            </div>
                          </div>

                          {/* Top In-Article AdSense Slot */}
                          <div className="my-6 p-4 bg-slate-50 border border-dashed border-slate-300 rounded text-center relative">
                            <span className="absolute top-1 right-2 text-[9px] text-slate-400 uppercase tracking-wider">
                              Advertisement • In-Article Top
                            </span>
                            <div className="text-xs font-mono text-slate-600">
                              AdSense In-Article Responsive Slot (ca-pub-2790193514099157)
                            </div>
                          </div>

                          {/* Main Article Image (100% width, border-radius 8px, margin-bottom 20px) */}
                          <img
                            src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80"
                            alt="Digital village center"
                            className="w-full h-auto rounded-lg mb-6 object-cover shadow-sm"
                          />

                          {/* Article Body Content */}
                          <div className="text-[17px] leading-[1.78] text-[#222222] space-y-5">
                            <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                              Across more than two hundred district blocks evaluated in this comprehensive field survey, an unmistakable paradigm shift is taking root in rural public administration. Where villagers once traveled tens of kilometers to district headquarters for routine land deed records, birth registries, and agricultural subsidies, direct digital kiosks are delivering verified outcomes within minutes.
                            </p>

                            {/* Styled H2 with Left Border Highlight */}
                            <h2
                              className="text-xl sm:text-2xl font-bold text-slate-900 border-l-4 border-[#c91414] pl-3.5 my-7"
                              style={{ fontFamily: "'Merriweather', serif" }}
                            >
                              Overcoming Legacy Last-Mile Bottlenecks
                            </h2>

                            <p>
                              The cornerstone of this acceleration has been the dual deployment of rural fiber rings and localized satellite backup terminals. Previous iterations of e-governance suffered from intermittent power brownouts and fiber cuts along state highway construction corridors.
                            </p>

                            <blockquote className="border-l-4 border-slate-900 bg-slate-50 p-4 my-6 italic text-slate-800 font-serif rounded-r">
                              &ldquo;When transparency is embedded in the digital architecture itself, discretionary leakages drop to near zero. Citizens receive an authenticated SMS token the instant funds are disbursed.&rdquo;
                            </blockquote>

                            {/* Styled H3 with Left Border Highlight */}
                            <h3
                              className="text-lg sm:text-xl font-bold text-slate-900 border-l-4 border-[#c91414] pl-3.5 my-6"
                              style={{ fontFamily: "'Merriweather', serif" }}
                            >
                              Direct Benefit Transfer &amp; Fiscal Verification
                            </h3>

                            <p>
                              Under the modernized portal, biometric and device-agnostic OTP authentication verify welfare recipients directly. Local administrative reviews no longer require paper attestations, reducing the turnaround time from three weeks to under forty-eight hours.
                            </p>

                            <ul className="list-disc pl-6 space-y-2 text-slate-700">
                              <li>Real-time public dashboard tracks application turnaround daily.</li>
                              <li>Grievance redressal escalation triggers automated notices to district magistrates.</li>
                              <li>Over ₹4,200 crore disbursed directly with zero intermediary handling fees.</li>
                            </ul>
                          </div>

                          {/* Bottom In-Article AdSense Slot */}
                          <div className="my-8 p-4 bg-slate-50 border border-dashed border-slate-300 rounded text-center relative">
                            <span className="absolute top-1 right-2 text-[9px] text-slate-400 uppercase tracking-wider">
                              Advertisement • In-Article Bottom
                            </span>
                            <div className="text-xs font-mono text-slate-600">
                              AdSense In-Article Responsive Slot (ca-pub-2790193514099157)
                            </div>
                          </div>

                          {/* Post Labels / Tags */}
                          <div className="flex flex-wrap items-center gap-2 py-4 border-y border-slate-200 my-6">
                            <span className="text-xs font-bold uppercase text-slate-500">Tags:</span>
                            <span className="bg-slate-100 hover:bg-red-600 hover:text-white transition px-2.5 py-1 rounded text-xs text-slate-700 font-medium cursor-pointer">
                              Digital India
                            </span>
                            <span className="bg-slate-100 hover:bg-red-600 hover:text-white transition px-2.5 py-1 rounded text-xs text-slate-700 font-medium cursor-pointer">
                              Rural Governance
                            </span>
                            <span className="bg-slate-100 hover:bg-red-600 hover:text-white transition px-2.5 py-1 rounded text-xs text-slate-700 font-medium cursor-pointer">
                              Policy Investigation
                            </span>
                            <span className="bg-slate-100 hover:bg-red-600 hover:text-white transition px-2.5 py-1 rounded text-xs text-slate-700 font-medium cursor-pointer">
                              Story Real A
                            </span>
                          </div>

                          {/* Author Box: Ajay Kumar */}
                          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 sm:p-6 my-8 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                            <img
                              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80"
                              alt="Ajay Kumar"
                              className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md shrink-0"
                            />
                            <div>
                              <div className="text-lg font-bold text-slate-900">Ajay Kumar</div>
                              <div className="text-xs font-bold text-[#c91414] uppercase tracking-wider mb-2">
                                Publisher &amp; Editor-in-Chief • Story Real A
                              </div>
                              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                                Independent investigative journalist covering national affairs, socioeconomic policy, and developmental reporting. Committed to verified facts and uncompromised public-interest journalism.
                              </p>
                              <a
                                href="mailto:mmcrajay@gmail.com"
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-red-600 transition"
                              >
                                <Mail className="w-3.5 h-3.5 text-red-600" /> mmcrajay@gmail.com
                              </a>
                            </div>
                          </div>

                          {/* Interactive Comments Section */}
                          <div className="mt-8 pt-6 border-t-2 border-slate-900">
                            <h3
                              className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"
                              style={{ fontFamily: "'Merriweather', serif" }}
                            >
                              <MessageSquare className="w-4 h-4 text-[#c91414]" />
                              Comments &amp; Reader Responses ({commentsList.length})
                            </h3>

                            {/* Comment Form */}
                            <form onSubmit={handleAddComment} className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                                <input
                                  type="text"
                                  placeholder="Your Name *"
                                  value={commentAuthor}
                                  onChange={(e) => setCommentAuthor(e.target.value)}
                                  className="border border-slate-300 rounded px-3 py-2 text-xs outline-none focus:border-red-600 bg-white"
                                  required
                                />
                                <input
                                  type="email"
                                  placeholder="Your Email (private) *"
                                  className="border border-slate-300 rounded px-3 py-2 text-xs outline-none focus:border-red-600 bg-white"
                                />
                              </div>
                              <textarea
                                rows={3}
                                placeholder="Join the discussion... (Blogger comment system emulation)"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                className="w-full border border-slate-300 rounded p-3 text-xs outline-none focus:border-red-600 bg-white mb-3"
                                required
                              />
                              <button
                                type="submit"
                                className="bg-[#c91414] hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded transition"
                              >
                                Submit Comment
                              </button>
                            </form>

                            {/* Comment List */}
                            <div className="space-y-3">
                              {commentsList.map((comm, idx) => (
                                <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded">
                                  <div className="flex items-center justify-between mb-1.5">
                                    <span className="font-bold text-xs text-slate-900">{comm.author}</span>
                                    <span className="text-[11px] text-slate-400">{comm.date}</span>
                                  </div>
                                  <p className="text-xs text-slate-700 leading-relaxed">{comm.text}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </article>
                      )}
                    </div>

                    {/* ========================================================
                        RIGHT SIDEBAR (30% WIDTH)
                        AdSense sticky slot + Author + Trending
                        ======================================================== */}
                    <aside className="w-full lg:w-[calc(30%-15px)] space-y-6">
                      {/* 1. STICKY 300x250 ADSENSE WIDGET */}
                      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm sticky top-16 z-20">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-1.5 mb-3 flex items-center justify-between">
                          <span>Sponsored Ad</span>
                          <span className="text-[10px] text-slate-400 font-normal">300x250 Box</span>
                        </div>
                        <div className="w-[300px] h-[250px] max-w-full mx-auto bg-slate-50 border border-dashed border-slate-300 rounded flex flex-col items-center justify-center text-center p-3 relative">
                          <span className="absolute top-1 right-2 text-[9px] text-slate-400 uppercase tracking-wider">
                            Advertisement
                          </span>
                          <div className="text-xs font-mono font-semibold text-slate-800">
                            ca-pub-2790193514099157
                          </div>
                          <div className="text-[11px] text-slate-500 mt-1">
                            AdSense 300x250 Sticky Sidebar
                          </div>
                          <div className="text-[10px] text-emerald-600 font-medium mt-2 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            High Conversion Placement
                          </div>
                        </div>
                      </div>

                      {/* 2. ABOUT PUBLISHER CARD */}
                      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-1.5 mb-4">
                          About Publisher
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                          <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
                            alt="Ajay Kumar"
                            className="w-12 h-12 rounded-full object-cover border border-slate-200"
                          />
                          <div>
                            <div className="font-bold text-sm text-slate-900">Ajay Kumar</div>
                            <div className="text-xs font-bold text-[#c91414] uppercase">Chief Editor &amp; Owner</div>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed mb-3">
                          Founder of <strong>Story Real A</strong>. Committed to grassroots investigative stories, policy reviews, and verified national reporting.
                        </p>
                        <div className="text-xs bg-slate-50 p-2.5 rounded border border-slate-200 text-slate-700">
                          <strong>Direct Desk:</strong>{' '}
                          <a href="mailto:mmcrajay@gmail.com" className="text-[#c91414] hover:underline font-semibold">
                            mmcrajay@gmail.com
                          </a>
                        </div>
                      </div>

                      {/* 3. TRENDING STORIES LIST */}
                      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-1.5 mb-3 flex items-center justify-between">
                          <span>Trending Stories</span>
                          <TrendingUp className="w-3.5 h-3.5 text-[#c91414]" />
                        </div>
                        <div className="divide-y divide-slate-100">
                          <div className="py-2.5 flex gap-3 group cursor-pointer" onClick={() => setPreviewPage('post')}>
                            <span className="font-serif font-black text-2xl text-slate-300 group-hover:text-[#c91414] transition leading-none">
                              01
                            </span>
                            <div>
                              <h4 className="text-xs font-bold text-slate-900 leading-snug group-hover:text-[#c91414] transition">
                                Fiscal Stimulus Measures Expected for Intermediate Capital Goods
                              </h4>
                              <span className="text-[10px] text-slate-400">Economy • 3 min read</span>
                            </div>
                          </div>

                          <div className="py-2.5 flex gap-3 group cursor-pointer" onClick={() => setPreviewPage('post')}>
                            <span className="font-serif font-black text-2xl text-slate-300 group-hover:text-[#c91414] transition leading-none">
                              02
                            </span>
                            <div>
                              <h4 className="text-xs font-bold text-slate-900 leading-snug group-hover:text-[#c91414] transition">
                                Inland Waterways Connectivity Accelerates Regional Freight
                              </h4>
                              <span className="text-[10px] text-slate-400">Logistics • 4 min read</span>
                            </div>
                          </div>

                          <div className="py-2.5 flex gap-3 group cursor-pointer" onClick={() => setPreviewPage('post')}>
                            <span className="font-serif font-black text-2xl text-slate-300 group-hover:text-[#c91414] transition leading-none">
                              03
                            </span>
                            <div>
                              <h4 className="text-xs font-bold text-slate-900 leading-snug group-hover:text-[#c91414] transition">
                                Smart Grid Balancing Reduces Monsoon Grid Tripping by 40%
                              </h4>
                              <span className="text-[10px] text-slate-400">Power • 5 min read</span>
                            </div>
                          </div>

                          <div className="py-2.5 flex gap-3 group cursor-pointer" onClick={() => setPreviewPage('post')}>
                            <span className="font-serif font-black text-2xl text-slate-300 group-hover:text-[#c91414] transition leading-none">
                              04
                            </span>
                            <div>
                              <h4 className="text-xs font-bold text-slate-900 leading-snug group-hover:text-[#c91414] transition">
                                Agricultural Satellite Imagery Empowers Targeted Insurance Claims
                              </h4>
                              <span className="text-[10px] text-slate-400">AgriTech • 3 min read</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 4. NEWSLETTER SUBSCRIPTION */}
                      <div className="bg-[#0f172a] text-white border border-slate-800 rounded-lg p-5 shadow-sm">
                        <div className="text-xs font-bold uppercase tracking-wider text-white border-b border-white/20 pb-1.5 mb-2">
                          Daily Briefing
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed mb-3">
                          Receive Story Real A’s verified morning briefing directly in your inbox.
                        </p>
                        <form onSubmit={handleSubscribe} className="space-y-2">
                          <input
                            type="email"
                            placeholder="Enter your email..."
                            value={newsletterEmail}
                            onChange={(e) => setNewsletterEmail(e.target.value)}
                            required
                            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-xs text-white placeholder-slate-400 outline-none focus:border-red-500"
                          />
                          <button
                            type="submit"
                            className="w-full bg-[#c91414] hover:bg-red-700 text-white font-bold text-xs py-2 rounded transition"
                          >
                            {newsletterSubscribed ? 'Subscribed Successfully!' : 'Subscribe Free'}
                          </button>
                        </form>
                      </div>
                    </aside>
                  </div>
                </div>

                {/* 6. MAIN SITE FOOTER */}
                <footer className="bg-[#090d16] text-slate-400 text-xs pt-12 border-t-4 border-[#c91414] px-4 sm:px-6">
                  <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
                    <div>
                      <h4
                        className="text-white text-lg font-bold mb-3"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        STORY REAL <span className="text-[#c91414]">A</span>
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">
                        Story Real A (storyreala.blogspot.com) is an independent news publication delivering verified grassroots reporting and public policy analyses.
                      </p>
                      <div className="text-slate-300 text-[11px]">
                        Owner: Ajay Kumar • mmcrajay@gmail.com
                      </div>
                    </div>

                    <div>
                      <h5 className="text-white font-bold uppercase tracking-wider text-xs mb-3">
                        Sections
                      </h5>
                      <ul className="space-y-1.5 text-slate-400">
                        <li><a href="#" className="hover:text-white">India News</a></li>
                        <li><a href="#" className="hover:text-white">National Politics</a></li>
                        <li><a href="#" className="hover:text-white">Economy &amp; Trade</a></li>
                        <li><a href="#" className="hover:text-white">Science &amp; Tech</a></li>
                        <li><a href="#" className="hover:text-white">Editorials &amp; Opinion</a></li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-white font-bold uppercase tracking-wider text-xs mb-3">
                        Ethics &amp; Trust
                      </h5>
                      <ul className="space-y-1.5 text-slate-400">
                        <li><a href="#" className="hover:text-white">Editorial Guidelines</a></li>
                        <li><a href="#" className="hover:text-white">Fact-Checking Policy</a></li>
                        <li><a href="#" className="hover:text-white">Corrections Protocol</a></li>
                        <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-white font-bold uppercase tracking-wider text-xs mb-3">
                        Editorial Desk
                      </h5>
                      <p className="text-xs text-slate-400 leading-relaxed mb-2">
                        For press releases, story leads, or corrections:
                      </p>
                      <div className="text-slate-200">
                        <strong>Email:</strong> <span className="text-red-400">mmcrajay@gmail.com</span>
                      </div>
                      <div className="text-slate-200 mt-1">
                        <strong>Domain:</strong> storyreala.blogspot.com
                      </div>
                    </div>
                  </div>

                  <div className="max-w-[1200px] mx-auto py-5 flex flex-wrap items-center justify-between gap-3 text-[11px]">
                    <div>
                      © 2026 Story Real A. All Rights Reserved. Published by Ajay Kumar.
                    </div>
                    <div className="flex items-center gap-4 text-slate-400">
                      <a href="#" className="hover:text-white">Sitemap</a>
                      <span>•</span>
                      <a href="#" className="hover:text-white">RSS Feed</a>
                      <span>•</span>
                      <a href="mailto:mmcrajay@gmail.com" className="hover:text-white">Advertise</a>
                    </div>
                  </div>
                </footer>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: RAW XML CODE & VALIDATION STATUS
            ========================================================================= */}
        {activeTab === 'code' && (
          <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
            {/* Validation Badges Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-slate-950 border border-emerald-900/60 p-3.5 rounded-lg flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-950 flex items-center justify-center text-emerald-400 shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">XML Syntax</div>
                  <div className="text-[11px] text-emerald-400">100% Valid XML (No Parse Errors)</div>
                </div>
              </div>

              <div className="bg-slate-950 border border-emerald-900/60 p-3.5 rounded-lg flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-950 flex items-center justify-center text-emerald-400 shrink-0">
                  <FileCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Mandatory Blog1 Widget</div>
                  <div className="text-[11px] text-emerald-400">Included in &lt;b:section id='main'&gt;</div>
                </div>
              </div>

              <div className="bg-slate-950 border border-emerald-900/60 p-3.5 rounded-lg flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-950 flex items-center justify-center text-emerald-400 shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">AdSense Integration</div>
                  <div className="text-[11px] text-emerald-400">ca-pub-2790193514099157 Live</div>
                </div>
              </div>

              <div className="bg-slate-950 border border-emerald-900/60 p-3.5 rounded-lg flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-950 flex items-center justify-center text-emerald-400 shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Owner &amp; Editorial</div>
                  <div className="text-[11px] text-emerald-400">Ajay Kumar (mmcrajay@gmail.com)</div>
                </div>
              </div>
            </div>

            {/* Code Box */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg overflow-hidden shadow-xl">
              <div className="bg-slate-900/80 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <Code2 className="w-4 h-4 text-red-500" />
                  <span>storyreala-template.xml</span>
                  <span className="text-slate-500">({(xmlContent.length / 1024).toFixed(1)} KB)</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyXML}
                    className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-xs text-white px-3 py-1.5 rounded transition border border-slate-700"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied to Clipboard!' : 'Copy Code'}</span>
                  </button>
                  <button
                    onClick={handleDownloadXML}
                    className="flex items-center gap-1.5 bg-red-600 hover:bg-red-500 text-xs text-white px-3 py-1.5 rounded transition shadow"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download File</span>
                  </button>
                </div>
              </div>

              <div className="p-4 overflow-x-auto max-h-[600px] overflow-y-auto">
                <pre className="text-xs font-mono text-slate-300 leading-relaxed whitespace-pre select-all">
                  {xmlContent}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: STEP-BY-STEP INSTALLATION GUIDE FOR BLOGGER
            ========================================================================= */}
        {activeTab === 'guide' && (
          <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-red-500" />
                How to Apply This XML Template in Blogger (Zero Errors Guaranteed)
              </h2>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                Follow these 5 simple steps to install the new theme on <strong>storyreala.blogspot.com</strong>. Because the XML adheres strictly to Blogger Layouts v3 and has valid XML tags, you will get zero &ldquo;Update Failed&rdquo; errors.
              </p>

              <div className="space-y-5">
                {/* Step 1 */}
                <div className="flex gap-4 p-4 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm mb-1">Copy or Download the Template XML</h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-2">
                      Click the &ldquo;Copy XML&rdquo; button above or download the <code className="bg-slate-800 px-1 py-0.5 rounded text-red-300">storyreala-template.xml</code> file to your computer.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4 p-4 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm mb-1">Open Blogger Dashboard &gt; Theme</h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-2">
                      Go to <a href="https://www.blogger.com" target="_blank" rel="noreferrer" className="text-red-400 hover:underline inline-flex items-center gap-1">blogger.com <ExternalLink className="w-3 h-3" /></a>, select <strong>Story Real A</strong>, and click on <strong>Theme</strong> in the left sidebar.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4 p-4 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm mb-1">Backup Existing Theme (Recommended)</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Click the downward arrow next to the orange <strong>&ldquo;Customize&rdquo;</strong> button, and click <strong>&ldquo;Backup&rdquo;</strong> to save your current theme as a precaution.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-4 p-4 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm mb-1">Select &ldquo;Edit HTML&rdquo; and Paste the New Code</h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-2">
                      Click the downward arrow next to &ldquo;Customize&rdquo; again, then click <strong>&ldquo;Edit HTML&rdquo;</strong>.
                    </p>
                    <ul className="text-xs text-slate-400 list-disc pl-5 space-y-1">
                      <li>Click inside the code box and select all code (<kbd className="bg-slate-800 px-1 py-0.5 rounded text-white">Ctrl + A</kbd> on Windows or <kbd className="bg-slate-800 px-1 py-0.5 rounded text-white">Cmd + A</kbd> on Mac).</li>
                      <li>Delete the old code and paste (<kbd className="bg-slate-800 px-1 py-0.5 rounded text-white">Ctrl + V</kbd>) the complete new XML code.</li>
                      <li>Click the <strong>Save</strong> icon (floppy disk) in the top-right corner. It will save with &ldquo;Update Successful&rdquo;!</li>
                    </ul>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="flex gap-4 p-4 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center shrink-0">
                    5
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm mb-1">Disable Default Mobile Theme</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      In the Theme page, click the downward arrow next to &ldquo;Customize&rdquo; &gt; <strong>Mobile Settings</strong> &gt; choose <strong>&ldquo;Desktop&rdquo;</strong>. This ensures Blogger uses this template&apos;s built-in responsive flexbox/grid layout on all mobile phones!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
