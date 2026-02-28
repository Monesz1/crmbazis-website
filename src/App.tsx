/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Layout, 
  Menu, 
  X, 
  ChevronRight, 
  ArrowUp, 
  ShoppingBag, 
  BookOpen, 
  Info, 
  CheckCircle2, 
  Zap, 
  Users, 
  BarChart3,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

gsap.registerPlugin(ScrollToPlugin);

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
type Page = 'home' | 'shop' | 'learn' | 'about';

// --- Components ---

const Navbar = ({ currentPage, setPage }: { currentPage: Page, setPage: (p: Page) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Főoldal', id: 'home' as Page, icon: Layout },
    { name: 'Webshop', id: 'shop' as Page, icon: ShoppingBag },
    { name: 'Tudástár', id: 'learn' as Page, icon: BookOpen },
    { name: 'Rólunk', id: 'about' as Page, icon: Info },
  ];

  return (
    <nav className="glass-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setPage('home')}>
            <div className="w-10 h-10 bg-hungarian-green rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-display font-bold tracking-tighter">
              CRM<span className="text-hungarian-red">Bázis</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setPage(link.id)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-hungarian-green",
                  currentPage === link.id ? "text-hungarian-green font-bold" : "text-slate-600"
                )}
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => setPage('home')}
              className="btn-primary py-2 px-5 text-sm"
            >
              Regisztráció
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-600">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => { setPage(link.id); setIsOpen(false); }}
                  className="flex items-center gap-3 w-full px-3 py-4 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  <link.icon className="w-5 h-5 text-hungarian-green" />
                  {link.name}
                </button>
              ))}
              <div className="pt-4">
                <button className="w-full btn-primary">Regisztráció</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
      });
      gsap.from(textRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power4.out'
      });
      gsap.from(ctaRef.current, {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: 'power4.out'
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const handleRegistration = async () => {
    // Configurable API endpoint simulation
    const API_ENDPOINT = 'https://api.example.com/register';
    console.log(`Calling API: ${API_ENDPOINT}`);
    
    // Simulation of the fetch call
    try {
      alert('Regisztrációs folyamat elindítva! (API hívás szimulálva)');
      // In real scenario:
      // await fetch(API_ENDPOINT, { method: 'POST', body: JSON.stringify({ action: 'register' }) });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section ref={heroRef} className="relative pt-20 pb-32 overflow-hidden bg-white">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-hungarian-green/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-hungarian-red/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-semibold mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-hungarian-green animate-pulse" />
            Új generációs CRM magyar vállalkozóknak
          </motion.div>
          
          <h1 ref={titleRef} className="text-5xl md:text-7xl font-display font-extrabold text-slate-900 leading-[1.1] mb-8">
            Vezesse vállalkozását <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-hungarian-green to-emerald-500">
              könnyedén, bárhonnan.
            </span>
          </h1>
          
          <p ref={textRef} className="text-xl text-slate-600 mb-12 leading-relaxed max-w-2xl mx-auto">
            A CRM Bázis segít automatizálni az értékesítést, kezelni az ügyfélkapcsolatokat és növelni a bevételt – mindezt egy modern, magyar nyelvű felületen.
          </p>
          
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={handleRegistration} className="btn-primary text-lg px-10 py-4 w-full sm:w-auto">
              Regisztráció
            </button>
            <button className="btn-outline text-lg px-10 py-4 w-full sm:w-auto flex items-center justify-center gap-2">
              Demó megtekintése <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dashboard Preview */}
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-20 relative"
        >
          <div className="bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800 p-2">
            <img 
              src="https://picsum.photos/seed/crm-dashboard/1600/900" 
              alt="CRM Dashboard Preview" 
              className="rounded-xl opacity-90 grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Floating Stats */}
          <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden lg:block">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <BarChart3 className="text-emerald-600 w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Havi növekedés</p>
                <p className="text-2xl font-bold text-slate-900">+24.8%</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      title: 'Ügyfélkezelés',
      desc: 'Minden ügyféladat egy helyen, átláthatóan és biztonságosan.',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Értékesítési tölcsér',
      desc: 'Kövesse nyomon az üzleti lehetőségeket a megkereséstől a zárásig.',
      icon: BarChart3,
      color: 'bg-emerald-500'
    },
    {
      title: 'Automatizáció',
      desc: 'Spóroljon időt az ismétlődő feladatok automatizálásával.',
      icon: Zap,
      color: 'bg-amber-500'
    }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Miért válassza a CRM Bázist?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Modern eszközök, amelyekkel a vállalkozása szintet léphet.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all"
            >
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-white shadow-lg", f.color)}>
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-slate-600 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-slate-900 text-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="text-hungarian-green w-8 h-8" />
            <span className="text-2xl font-display font-bold tracking-tighter">
              CRM<span className="text-hungarian-red">Bázis</span>
            </span>
          </div>
          <p className="text-slate-400 max-w-sm mb-6">
            A jövő CRM rendszere magyar vállalkozásoknak. Egyszerű, gyors és hatékony ügyfélkezelés.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-6">Linkek</h4>
          <ul className="space-y-4 text-slate-400">
            <li><a href="#" className="hover:text-white transition-colors">Főoldal</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Webshop</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Tudástár</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Rólunk</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6">Kapcsolat</h4>
          <ul className="space-y-4 text-slate-400">
            <li>info@crmbazis.hu</li>
            <li>+36 1 234 5678</li>
            <li>Budapest, Magyarország</li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} CRM Bázis. Minden jog fenntartva.
      </div>
    </div>
  </footer>
);

// --- Page Views ---

const ShopPage = ({ onBack }: { onBack: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    className="max-w-7xl mx-auto px-4 py-20"
  >
    <button onClick={onBack} className="flex items-center gap-2 text-hungarian-green font-semibold mb-12 hover:underline">
      <ArrowLeft className="w-4 h-4" /> Vissza a főoldalra
    </button>
    <h1 className="text-4xl font-bold mb-8">CRM Csomagok & Kiegészítők</h1>
    <div className="grid md:grid-cols-3 gap-8">
      {[
        { name: 'Starter Csomag', price: '9.900 Ft / hó', features: ['3 felhasználó', 'Alap riportok', 'Email támogatás'] },
        { name: 'Pro Csomag', price: '19.900 Ft / hó', features: ['10 felhasználó', 'Haladó automatizáció', 'Telefonos támogatás'] },
        { name: 'Enterprise', price: 'Egyedi árazás', features: ['Korlátlan felhasználó', 'Egyedi fejlesztések', 'Dedicated manager'] },
      ].map((pkg, i) => (
        <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
          <p className="text-hungarian-green text-xl font-bold mb-6">{pkg.price}</p>
          <ul className="space-y-4 mb-8">
            {pkg.features.map((f, j) => (
              <li key={j} className="flex items-center gap-2 text-slate-600">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" /> {f}
              </li>
            ))}
          </ul>
          <button className="w-full btn-primary">Kiválasztom</button>
        </div>
      ))}
    </div>
  </motion.div>
);

const LearnPage = ({ onBack }: { onBack: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    className="max-w-4xl mx-auto px-4 py-20"
  >
    <button onClick={onBack} className="flex items-center gap-2 text-hungarian-green font-semibold mb-12 hover:underline">
      <ArrowLeft className="w-4 h-4" /> Vissza a főoldalra
    </button>
    <h1 className="text-4xl font-bold mb-8">Tudástár & Blog</h1>
    <div className="space-y-12">
      {[
        { title: 'Hogyan válasszunk CRM rendszert?', date: '2024. Március 10.', excerpt: 'A megfelelő CRM kiválasztása kritikus pont minden vállalkozás életében...' },
        { title: '5 tipp az értékesítés automatizálásához', date: '2024. Március 05.', excerpt: 'Az automatizáció nem csak időt spórol, de növeli a konverziót is...' },
        { title: 'Ügyfélélmény javítása adatokkal', date: '2024. Február 28.', excerpt: 'Az adatok segítenek jobban megérteni az ügyfelek igényeit...' },
      ].map((post, i) => (
        <div key={i} className="group cursor-pointer">
          <p className="text-sm text-slate-500 mb-2">{post.date}</p>
          <h3 className="text-2xl font-bold mb-3 group-hover:text-hungarian-green transition-colors">{post.title}</h3>
          <p className="text-slate-600 mb-4">{post.excerpt}</p>
          <button className="text-hungarian-green font-bold flex items-center gap-1">
            Olvasd tovább <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  </motion.div>
);

const AboutPage = ({ onBack }: { onBack: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    className="max-w-4xl mx-auto px-4 py-20"
  >
    <button onClick={onBack} className="flex items-center gap-2 text-hungarian-green font-semibold mb-12 hover:underline">
      <ArrowLeft className="w-4 h-4" /> Vissza a főoldalra
    </button>
    <h1 className="text-4xl font-bold mb-8">Rólunk</h1>
    <div className="prose prose-slate max-w-none">
      <p className="text-xl text-slate-600 mb-8">
        A CRM Bázis csapata elkötelezett amellett, hogy a legmodernebb technológiát tegye elérhetővé a magyar kis- és középvállalkozások számára.
      </p>
      <div className="grid md:grid-cols-2 gap-12 mt-12">
        <div>
          <h3 className="text-2xl font-bold mb-4">Küldetésünk</h3>
          <p className="text-slate-600">
            Célunk, hogy lebontsuk a technológiai korlátokat és egy olyan eszközt adjunk a vállalkozók kezébe, amellyel valódi növekedést érhetnek el.
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-4">Értékeink</h3>
          <ul className="space-y-2 text-slate-600">
            <li>• Ügyfélközpontúság</li>
            <li>• Innováció</li>
            <li>• Átláthatóság</li>
            <li>• Megbízhatóság</li>
          </ul>
        </div>
      </div>
    </div>
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    gsap.to(window, { duration: 0.8, scrollTo: 0, ease: 'power3.inOut' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={page} setPage={setPage} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {page === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero />
              <Features />
              {/* Social Proof */}
              <section className="py-20 bg-white border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-4 text-center">
                  <p className="text-slate-400 font-semibold uppercase tracking-widest text-sm mb-12">
                    Több mint 500+ elégedett magyar vállalkozás
                  </p>
                  <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale">
                    {/* Placeholder Logos */}
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="h-8 w-32 bg-slate-400 rounded" />
                    ))}
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {page === 'shop' && (
            <motion.div key="shop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ShopPage onBack={() => setPage('home')} />
            </motion.div>
          )}
          {page === 'learn' && (
            <motion.div key="learn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LearnPage onBack={() => setPage('home')} />
            </motion.div>
          )}
          {page === 'about' && (
            <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <AboutPage onBack={() => setPage('home')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-4 bg-hungarian-green text-white rounded-full shadow-2xl hover:bg-emerald-700 transition-colors z-50"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
