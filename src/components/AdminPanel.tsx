import React, { useState, useEffect } from 'react';
import { MenuItem } from '../types';
import { X, Save, Edit2, CheckCircle, RefreshCw, AlertTriangle, ToggleLeft, ToggleRight, Search, Lock } from 'lucide-react';

const formatPrice = (price: number) => {
  if (price % 1 === 0) {
    return price.toLocaleString('tr-TR', { maximumFractionDigits: 0 }) + ' ₺';
  }
  return price.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₺';
};

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  onUpdateMenuItem: (id: string, updatedFields: Partial<MenuItem>) => void;
  onResetToDefaults: () => void;
}

export default function AdminPanel({
  isOpen,
  onClose,
  menuItems,
  onUpdateMenuItem,
  onResetToDefaults,
}: AdminPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<string>('');
  const [showNotification, setShowNotification] = useState(false);
  const [showResetWarning, setShowResetWarning] = useState(false);

  // Authentication states
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Reset authentication states when the modal is closed
  useEffect(() => {
    if (!isOpen) {
      setIsAuthenticated(false);
      setPassword('');
      setPasswordError(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Password Verification Screen
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/95 backdrop-blur-md">
        {/* Backdrop click close */}
        <div className="absolute inset-0" onClick={onClose} />

        <div className="relative w-full max-w-sm bg-stone-900 border border-stone-800/80 rounded-2xl overflow-hidden p-6 shadow-2xl gold-glow animate-fade-in text-center space-y-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-950 border border-stone-800 text-stone-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            id="close-admin-auth-btn"
          >
            <X size={16} />
          </button>

          <div className="mx-auto w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center">
            <Lock size={20} />
          </div>

          <div className="space-y-1.5">
            <h3 className="font-serif text-sm font-bold tracking-widest text-amber-500 uppercase">
              YÖNETİCİ GİRİŞİ
            </h3>
            <p className="text-stone-400 text-xs">
              Değişiklik yapabilmek için şifreyi giriniz.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (password === 'bahia-2026') {
                setIsAuthenticated(true);
                setPasswordError(false);
              } else {
                setPasswordError(true);
              }
            }}
            className="space-y-4"
          >
            <div className="space-y-1 text-left">
              <label className="text-[10px] uppercase tracking-wider font-bold text-stone-500 pl-1">
                Giriş Şifresi
              </label>
              <input
                type="password"
                placeholder="Şifreyi yazın..."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) setPasswordError(false);
                }}
                autoFocus
                className="w-full bg-stone-950 border border-stone-800/80 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/10 transition-all rounded-xl px-4 py-3 text-xs text-stone-200 placeholder-stone-600 focus:outline-none"
                id="admin-password-input"
              />
              {passwordError && (
                <p className="text-red-500 text-[10px] font-semibold mt-1.5 pl-1 animate-pulse">
                  Hatalı şifre! Lütfen tekrar deneyiniz.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl transition-all duration-300 shadow-md shadow-amber-500/10 cursor-pointer"
              id="admin-auth-submit-btn"
            >
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    );
  }

  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startEditing = (item: MenuItem) => {
    setEditingId(item.id);
    setEditPrice(item.price.toString());
  };

  const handleSavePrice = (id: string) => {
    const parsedPrice = parseFloat(editPrice);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      alert('Lütfen geçerli bir fiyat giriniz.');
      return;
    }

    onUpdateMenuItem(id, { price: parsedPrice });
    setEditingId(null);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const handleToggleAvailability = (id: string, currentStatus: boolean) => {
    onUpdateMenuItem(id, { isAvailable: !currentStatus });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const handleConfirmReset = () => {
    onResetToDefaults();
    setShowResetWarning(false);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-md">
      {/* Backdrop click close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden max-h-[85vh] flex flex-col shadow-2xl gold-glow animate-fade-in">
        
        {/* Modal Header */}
        <div className="shrink-0 px-5 py-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-sm font-bold tracking-widest text-amber-500 uppercase">
              BAHİA YÖNETİCİ PANELİ
            </h3>
            <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-extrabold px-1.5 py-0.5 rounded tracking-wide uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              BULUT MODU
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 text-stone-400 hover:text-white flex items-center justify-center"
            id="close-admin-btn"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          
          {/* Quick Notice */}
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3 text-stone-300 text-xs leading-relaxed space-y-1">
            <span className="font-bold text-amber-500 flex items-center gap-1 text-[10px] tracking-wider uppercase">
              <AlertTriangle size={12} /> Bilgilendirme:
            </span>
            <p className="text-[11px] text-stone-400">
              Bu panelden yaptığınız fiyat ve stok değişiklikleri, **gerçek zamanlı (Realtime) olarak tüm bağlı müşterilerin, telefonların ve tarayıcıların ekranında 1-2 saniye içinde anında güncellenir.** Sayfa yenilemek gerekmez.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500" />
            <input
              type="text"
              placeholder="Ürün veya kategori ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-4 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500/40"
              id="admin-search-input"
            />
          </div>

          {/* Action reset default button */}
          <div className="flex justify-end">
            {showResetWarning ? (
              <div className="bg-stone-950 border border-red-500/30 rounded-xl p-3 text-right space-y-2 w-full">
                <p className="text-[10px] text-stone-400 text-left">Fiyatları ilk orijinal menü haline döndürmek istediğinize emin misiniz?</p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowResetWarning(false)}
                    className="px-2.5 py-1 rounded bg-stone-800 text-xs text-stone-400 font-bold"
                  >
                    İptal
                  </button>
                  <button
                    onClick={handleConfirmReset}
                    className="px-2.5 py-1 rounded bg-red-500/20 hover:bg-red-500/30 text-xs text-red-400 font-bold"
                  >
                    Evet, Sıfırla
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowResetWarning(true)}
                className="inline-flex items-center gap-1 bg-stone-950 hover:bg-stone-800 border border-stone-800 text-stone-400 hover:text-amber-500 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors"
                id="reset-menu-btn"
              >
                <RefreshCw size={11} /> Varsayılan Menüye Dön
              </button>
            )}
          </div>

          {/* Items List */}
          <div className="space-y-2">
            <p className="text-[10px] font-bold tracking-widest text-stone-500 uppercase">MENÜ LİSTESİ ({filteredItems.length})</p>
            
            <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-1">
              {filteredItems.map((item) => {
                const isEditing = editingId === item.id;
                return (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-stone-950/40 rounded-xl border border-stone-800/60"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] bg-stone-800 text-stone-400 px-1.5 py-0.5 rounded font-mono uppercase tracking-wider">
                          {item.category}
                        </span>
                        {!item.isAvailable && (
                          <span className="text-[9px] bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                            Tükendi
                          </span>
                        )}
                      </div>
                      <h4 className="font-serif text-xs font-bold text-stone-100 mt-1">{item.name}</h4>
                      <p className="text-[11px] text-amber-500 font-serif font-semibold mt-0.5">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                      {/* Availability toggle */}
                      <button
                        onClick={() => handleToggleAvailability(item.id, item.isAvailable)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          item.isAvailable
                            ? 'bg-stone-900 border-stone-800 text-emerald-500'
                            : 'bg-stone-900 border-stone-800 text-stone-500'
                        }`}
                        title={item.isAvailable ? 'Satışta (Aktif)' : 'Tükendi (Pasif)'}
                        id={`toggle-status-btn-${item.id}`}
                      >
                        {item.isAvailable ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                      </button>

                      {/* Edit control */}
                      {isEditing ? (
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            value={editPrice}
                            onChange={(e) => setEditPrice(e.target.value)}
                            className="w-16 bg-stone-950 border border-amber-500 rounded px-1.5 py-1 text-xs font-serif font-bold text-stone-100"
                            id={`edit-price-input-${item.id}`}
                          />
                          <button
                            onClick={() => handleSavePrice(item.id)}
                            className="p-1.5 bg-amber-500 text-stone-950 rounded hover:bg-amber-400 transition-colors"
                            id={`save-price-btn-${item.id}`}
                          >
                            <Save size={12} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEditing(item)}
                          className="p-1.5 bg-stone-900 border border-stone-800 rounded-lg text-stone-400 hover:text-white hover:border-stone-700 transition-colors"
                          id={`edit-price-trigger-${item.id}`}
                        >
                          <Edit2 size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Floating Notification */}
        {showNotification && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-stone-950 font-bold text-xs tracking-wider uppercase py-2 px-4 rounded-xl shadow-lg flex items-center gap-1.5 animate-bounce">
            <CheckCircle size={14} />
            <span>KAYDEDİLDİ!</span>
          </div>
        )}

        {/* Modal Footer */}
        <div className="shrink-0 p-4 bg-stone-950 border-t border-stone-800">
          <button
            onClick={onClose}
            className="w-full bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 font-extrabold uppercase text-xs tracking-widest py-3 rounded-xl transition-colors"
            id="close-admin-footer-btn"
          >
            PANELDEN ÇIK
          </button>
        </div>
      </div>
    </div>
  );
}

