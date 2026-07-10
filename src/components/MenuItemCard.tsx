import React from 'react';
import { MenuItem } from '../types';
import { Info, Sparkles } from 'lucide-react';

export const formatPrice = (price: number) => {
  if (price % 1 === 0) {
    return price.toLocaleString('tr-TR', { maximumFractionDigits: 0 }) + ' ₺';
  }
  return price.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₺';
};

interface MenuItemCardProps {
  key?: string | number;
  item: MenuItem;
  onClick: () => void;
}

export default function MenuItemCard({
  item,
  onClick,
}: MenuItemCardProps) {
  // Check if it's a beverage or alcoholic drink for more compact layout
  const isBeverage = item.category === 'mesrubat' || item.category === 'alkol';

  // 1. Sleek Compact Beverage / Side Layout
  if (isBeverage) {
    return (
      <div 
        className={`group relative flex items-center justify-between p-3 rounded-xl border border-stone-900 bg-stone-900/30 hover:bg-stone-900/50 hover:border-amber-500/20 transition-all duration-300 ${
          !item.isAvailable ? 'opacity-60' : ''
        }`}
        id={`item-row-${item.id}`}
      >
        <div className="flex-1 min-w-0 pr-4 cursor-pointer" onClick={onClick}>
          <div className="flex items-center gap-1.5 flex-wrap">
            <h4 className="font-serif text-sm font-semibold text-stone-100 group-hover:text-amber-400 transition-colors">
              {item.name}
            </h4>
            {!item.isAvailable && (
              <span className="bg-red-500/20 border border-red-500/30 text-red-400 text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wider uppercase">
                Tükendi
              </span>
            )}
            {item.tags?.map((tag) => (
              <span 
                key={tag} 
                className="bg-amber-500/10 text-amber-500 text-[9px] px-1.5 py-0.5 rounded font-semibold tracking-wider uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-stone-400 text-[11px] mt-0.5 line-clamp-1">
            {item.description}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-amber-500 font-serif font-bold text-xs">
              {formatPrice(item.price)}
            </span>
            <span className="text-stone-600 text-[10px] flex items-center gap-0.5 hover:text-stone-400 transition-colors">
              <Info size={10} /> Detaylar
            </span>
          </div>
        </div>

        <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-stone-900/80 border border-stone-800 text-amber-500 group-hover:bg-amber-500 group-hover:text-stone-950 transition-all duration-300">
          <Info size={14} />
        </div>
      </div>
    );
  }

  // 2. Beautiful Full Visual Food Card Layout
  return (
    <div
      className={`group relative flex flex-col md:flex-row bg-stone-900/40 border border-stone-900 rounded-2xl overflow-hidden gold-glow-hover hover:border-amber-500/20 transition-all duration-300 ${
        !item.isAvailable ? 'opacity-60' : ''
      }`}
      id={`item-card-${item.id}`}
    >
      {/* Item Image with hover zoom */}
      <div 
        className="relative h-44 md:h-auto md:w-44 shrink-0 overflow-hidden cursor-pointer bg-stone-950"
        onClick={onClick}
      >
        {item.imageUrl ? (
          <>
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-2 left-2 right-2 bg-amber-500 text-stone-950 px-2 py-1 rounded border border-amber-400 pointer-events-none select-none tracking-wider font-extrabold text-[10px] md:text-xs flex items-center justify-center gap-1 shadow-lg z-10 whitespace-nowrap">
              <Sparkles size={11} className="shrink-0 text-stone-950" />
              <span>GÖRSEL TEMSİLİDİR</span>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-stone-950 text-stone-700">
            <Sparkles size={24} className="animate-pulse" />
          </div>
        )}
        
        {/* Out of Stock overlay */}
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center">
            <span className="border-2 border-red-500/80 text-red-400 text-xs font-bold tracking-widest px-3 py-1.5 rounded uppercase rotate-12">
              Tükendi
            </span>
          </div>
        )}

        {/* Hot badge or Gourmet Tag */}
        {item.tags && item.tags.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="bg-amber-500 text-stone-950 text-[9px] font-extrabold px-2.5 py-0.5 rounded-full tracking-wider uppercase shadow-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Item Details */}
      <div className="flex-1 flex flex-col justify-between p-4 md:p-5">
        <div className="cursor-pointer" onClick={onClick}>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-base md:text-lg font-bold tracking-wider text-stone-100 group-hover:text-amber-400 transition-colors">
              {item.name}
            </h3>
            <span className="font-serif font-black text-amber-500 text-base md:text-lg whitespace-nowrap">
              {formatPrice(item.price)}
            </span>
          </div>
          
          <p className="text-stone-400 text-xs mt-1.5 line-clamp-2 md:line-clamp-3 leading-relaxed">
            {item.description}
          </p>


        </div>

        {/* Action / Details Button */}
        <div className="flex items-center justify-between gap-4 mt-4 pt-3 border-t border-stone-800/40">
          <div className="text-[10px] text-stone-500 font-medium tracking-wide">
            {item.ingredients && item.ingredients.length > 0 ? 'İçindekiler & Detay Bilgisi' : 'Ürün Detay Bilgisi'}
          </div>
          <button
            onClick={onClick}
            className="bg-stone-900 text-amber-500 hover:text-amber-400 hover:bg-stone-800 px-4 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors flex items-center gap-1.5 border border-stone-800/80"
            id={`btn-detail-link-${item.id}`}
          >
            <Info size={12} className="text-amber-500" />
            <span>Detayları Gör</span>
          </button>
        </div>
      </div>
    </div>
  );
}
