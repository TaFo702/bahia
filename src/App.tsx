import React, { useState, useEffect } from 'react';
import { MenuItem, Category } from './types';
import { RESTAURANT_INFO, CATEGORIES, INITIAL_MENU_ITEMS } from './data/menu';
import Header from './components/Header';
import CategoryNav from './components/CategoryNav';
import MenuItemCard from './components/MenuItemCard';
import DetailModal from './components/DetailModal';
import AdminPanel from './components/AdminPanel';
import { Search, Settings, Sparkles, ChefHat, AlertCircle, ArrowUp, WifiOff } from 'lucide-react';
import { subscribeToMenu, updateMenuItemInFirestore, resetMenuInFirestore } from './lib/firebase';

export default function App() {
  // --- STATE ---
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string>('all');
  const [selectedItemForDetail, setSelectedItemForDetail] = useState<MenuItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Realtime loading & connection states
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  // --- REALTIME FIREBASE SUBSCRIPTION ---
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = subscribeToMenu(
      (items) => {
        setMenuItems(items);
        setIsLoading(false);
        setFirebaseError(null);
      },
      (err) => {
        console.error('Firebase subscription error in App:', err);
        setFirebaseError('Menü yüklenirken bir sorun oluştu. Lütfen bağlantınızı kontrol edin.');
        setIsLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // --- NETWORK CONNECTIVITY MONITORING ---
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // --- SCROLL TO TOP MONITORING ---
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- ACTIONS ---
  const handleUpdateMenuItem = async (id: string, updatedFields: Partial<MenuItem>) => {
    try {
      await updateMenuItemInFirestore(id, updatedFields);
    } catch (err) {
      console.error('Failed to update menu item:', err);
      alert('Güncelleme sırasında hata oluştu. Lütfen internet bağlantınızı kontrol edin.');
    }
  };

  const handleResetToDefaults = async () => {
    try {
      await resetMenuInFirestore();
    } catch (err) {
      console.error('Failed to reset menu:', err);
      alert('Sıfırlama sırasında hata oluştu. Lütfen internet bağlantınızı kontrol edin.');
    }
  };

  const handleOpenDetail = (item: MenuItem) => {
    setSelectedItemForDetail(item);
    setIsDetailOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- FILTERED DISHES ---
  const filteredDishes = menuItems.filter((item) => {
    if (activeCategoryId === 'all') {
      return true;
    } else {
      return item.category === activeCategoryId;
    }
  });

  return (
    <div className="min-h-screen bg-stone-950 pb-12 text-stone-100 flex flex-col selection:bg-amber-500 selection:text-stone-950">
      
      {/* Network offline warning banner */}
      {!isOnline && (
        <div className="bg-red-500/10 border-b border-red-500/20 text-red-400 text-xs py-3 px-4 text-center flex items-center justify-center gap-2 sticky top-0 z-40 backdrop-blur-md">
          <WifiOff size={14} className="animate-pulse" />
          <span>İnternet bağlantısı kesildi. Değişiklikler bağlantı geldiğinde eşitlenecektir.</span>
        </div>
      )}

      {/* Firebase database loading error banner */}
      {firebaseError && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 text-amber-500 text-xs py-3 px-4 text-center flex items-center justify-center gap-2 sticky top-0 z-40 backdrop-blur-md">
          <AlertCircle size={14} />
          <span>{firebaseError}</span>
        </div>
      )}

      {/* 1. RESTAURANT BRANDING & OVERVIEW HEADER */}
      <Header info={RESTAURANT_INFO} />

      {/* 2. CATEGORY NAV CAROUSEL (Sticky) */}
      <CategoryNav
        categories={CATEGORIES}
        activeCategoryId={activeCategoryId}
        onSelectCategory={(id) => {
          setActiveCategoryId(id);
          // Smooth scroll below header
          const element = document.getElementById('menu-items-grid');
          if (element) {
            const yOffset = -120; 
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }}
      />

      {/* 3. MAIN MENU ITEMS CONTAINER */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 pt-6" id="menu-items-grid">
        
        {/* Category Description Tag */}
        <div className="mb-6 text-center sm:text-left">
          <h2 className="font-serif text-lg font-bold tracking-widest text-amber-500 flex items-center justify-center sm:justify-start gap-2">
            <Sparkles size={16} />
            {CATEGORIES.find((c) => c.id === activeCategoryId)?.name}
          </h2>
          <p className="text-stone-400 text-xs mt-1 italic max-w-xl">
            {CATEGORIES.find((c) => c.id === activeCategoryId)?.description}
          </p>
        </div>

        {isLoading ? (
          /* Realtime Skeleton Loading State */
          <div className="space-y-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="p-4 bg-stone-900/30 border border-stone-900/80 rounded-2xl animate-pulse space-y-3">
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-stone-800 rounded w-1/3" />
                  <div className="h-4 bg-stone-800 rounded w-1/6" />
                </div>
                <div className="h-3 bg-stone-800 rounded w-5/6" />
                <div className="h-3 bg-stone-800 rounded w-4/6" />
                <div className="h-8 bg-stone-800 rounded w-full mt-2" />
              </div>
            ))}
          </div>
        ) : activeCategoryId === 'all' ? (
          <div className="space-y-12">
            {CATEGORIES.filter(cat => cat.id !== 'all').map((category) => {
              const categoryItems = menuItems.filter(item => item.category === category.id);
              if (categoryItems.length === 0) return null;
              return (
                <div key={category.id} className="space-y-5">
                  <div className="border-b border-stone-900 pb-2">
                    <h3 className="font-serif text-base font-bold tracking-widest text-amber-500 uppercase flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      {category.name}
                    </h3>
                    <p className="text-stone-500 text-[11px] mt-0.5 italic pl-3">
                      {category.description}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categoryItems.map((item) => (
                      <MenuItemCard
                        key={item.id}
                        item={item}
                        onClick={() => handleOpenDetail(item)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Single Category Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDishes.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onClick={() => handleOpenDetail(item)}
              />
            ))}
          </div>
        )}

        {/* VAT Notice */}
        <div className="mt-12 text-center text-[10px] text-stone-600 tracking-wider">
          Fiyatlarımıza KDV dahildir. • Bahia Gurme Burger hijyen standartlarına uygun üretim yapmaktadır.
        </div>
      </main>

      {/* 5. FOOTER */}
      <footer className="mt-16 py-8 border-t border-stone-900 bg-stone-950/60 text-center text-xs text-stone-500 space-y-3">
        <p className="font-serif tracking-widest text-stone-400 text-[10px] uppercase">
          BAHİA GURME BURGER © 2026 • TÜM LEZZETLER KORUMA ALTINDADIR.
        </p>

        {/* Admin Link lock trigger */}
        <div className="pt-2">
          <button
            onClick={() => setIsAdminOpen(true)}
            className="inline-flex items-center gap-1 text-stone-700 hover:text-amber-500/80 transition-colors text-[9px] font-bold uppercase tracking-wider bg-stone-900/30 px-2.5 py-1 rounded border border-stone-900"
            id="admin-panel-trigger"
          >
            <Settings size={10} />
            <span>YÖNETİCİ GİRİŞİ</span>
          </button>
        </div>

        <div className="flex flex-col items-center gap-1">
          <a
            href="https://mavibasim.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[9px] text-stone-600 hover:text-amber-500/80 transition-colors tracking-wide underline decoration-stone-850 hover:decoration-amber-500/40"
          >
            QR Menü Altyapısı: Mavi Basım Matbaa & Reklam
          </a>
          <a
            href="https://wa.me/905366022373"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[9px] text-stone-600 hover:text-amber-500/80 transition-colors tracking-wide flex items-center gap-0.5"
          >
            📞 0536 602 23 73
          </a>
        </div>
      </footer>

      {/* 6. FLOATING MODALS & UTILITIES */}
      <DetailModal
        item={selectedItemForDetail}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedItemForDetail(null);
        }}
      />

      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        menuItems={menuItems}
        onUpdateMenuItem={handleUpdateMenuItem}
        onResetToDefaults={handleResetToDefaults}
      />

      {/* Scroll to Top Arrow */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-4 z-30 w-10 h-10 rounded-full bg-stone-900 border border-stone-800 text-amber-500 flex items-center justify-center shadow-lg hover:text-amber-400 hover:border-stone-700 transition-all active:scale-90"
          title="Yukarı Git"
          id="scroll-to-top-btn"
        >
          <ArrowUp size={16} />
        </button>
      )}
    </div>
  );
}
