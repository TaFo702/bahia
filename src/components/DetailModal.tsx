import React, { useState, useEffect } from 'react';
import { MenuItem } from '../types';
import { X, Check, ShieldAlert, Sparkles, ChefHat } from 'lucide-react';

const formatPrice = (price: number) => {
  if (price % 1 === 0) {
    return price.toLocaleString('tr-TR', { maximumFractionDigits: 0 }) + ' ₺';
  }
  return price.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₺';
};

interface DetailModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DetailModal({
  item,
  isOpen,
  onClose,
}: DetailModalProps) {

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-950/80 backdrop-blur-sm transition-opacity duration-300">
      {/* Backdrop click close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Content Modal Container */}
      <div className="relative w-full sm:max-w-lg bg-stone-900 border-t sm:border border-stone-800 rounded-t-3xl sm:rounded-2xl overflow-hidden max-h-[92vh] sm:max-h-[85vh] flex flex-col shadow-2xl gold-glow animate-slide-up sm:animate-fade-in">
        
        {/* Header visual banner for modal */}
        <div className="relative h-48 sm:h-56 shrink-0 bg-stone-950">
          {item.imageUrl ? (
            <>
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover filter brightness-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-amber-500 text-stone-950 px-3 py-1.5 rounded-lg border border-amber-400 pointer-events-none select-none tracking-wider font-extrabold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 shadow-xl z-20 whitespace-nowrap">
                <Sparkles size={13} className="shrink-0 text-stone-950 animate-pulse" />
                <span>GÖRSEL TEMSİLİDİR</span>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-amber-500 bg-stone-950">
              <ChefHat size={48} />
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-stone-950/50" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-stone-900/80 border border-stone-800 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
            id="close-modal-btn"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable details area */}
        <div className="flex-1 overflow-y-auto px-5 pb-6 pt-2 space-y-5">
          {/* Title & Price */}
          <div>
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-stone-100">
                {item.name}
              </h2>
              <span className="font-serif font-black text-lg sm:text-xl text-amber-500">
                {formatPrice(item.price)}
              </span>
            </div>

            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-wider uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mt-3 border-l-2 border-amber-500/40 pl-3">
              {item.description}
            </p>


          </div>

          {/* Ingredients list */}
          {item.ingredients && item.ingredients.length > 0 && (
            <div className="space-y-1.5">
              <h4 className="text-[11px] font-bold tracking-widest text-stone-400 uppercase">
                İÇİNDEKİLER
              </h4>
              <p className="text-stone-300 text-xs leading-relaxed bg-stone-950/40 border border-stone-800/55 rounded-xl p-3">
                {item.ingredients.join(', ')}
              </p>
            </div>
          )}



        </div>

        {/* Footer actions */}
        <div className="shrink-0 p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between gap-4">
          <div className="text-left">
            <span className="text-stone-500 text-[10px] uppercase font-bold tracking-wider">FİYAT</span>
            <p className="text-amber-500 text-lg sm:text-xl font-serif font-black">{formatPrice(item.price)}</p>
          </div>

          <button
            onClick={onClose}
            className="flex-1 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black uppercase text-xs tracking-wider py-3.5 px-5 rounded-xl transition-all duration-300 active:scale-95 shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
            id="close-modal-footer-btn"
          >
            <span>KAPAT & MENÜYE DÖN</span>
          </button>
        </div>
      </div>
    </div>
  );
}

