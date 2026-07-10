import React, { useState } from 'react';
import { Clock, MapPin, Phone, Instagram, Facebook, ChevronDown, ChevronUp } from 'lucide-react';
import { RestaurantConfig } from '../types';
import { bahiaBanner } from '../data/menu';

interface HeaderProps {
  info: RestaurantConfig;
}

export default function Header({ info }: HeaderProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <header className="relative w-full bg-stone-950 border-b border-stone-900 overflow-hidden">
      {/* Banner Image with Overlay */}
      <div className="relative h-56 md:h-72 w-full overflow-hidden">
        <img
          src={bahiaBanner}
          alt="Bahia Banner"
          className="w-full h-full object-cover scale-105 filter brightness-75 transition-transform duration-1000 hover:scale-100"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
        
        {/* Decorative Gold Border Line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
      </div>

      {/* Brand Title & Info */}
      <div className="relative px-4 pb-6 -mt-16 text-center">
        {/* Floating Brand Badge */}
        <div className="inline-flex items-center justify-center bg-stone-900 border-2 border-amber-500/80 rounded-full px-6 py-4 mb-4 shadow-xl gold-glow">
          <h1 className="font-serif text-3xl md:text-4xl font-extrabold tracking-[0.2em] text-amber-500">
            {info.logoText}
          </h1>
        </div>

        <p className="font-serif text-sm md:text-base tracking-wider text-stone-300 font-medium">
          {info.slogan}
        </p>

        {/* Collapsible Info Panel */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="mt-3 inline-flex items-center gap-1 text-xs text-amber-500/80 hover:text-amber-400 font-medium tracking-wide transition-colors"
          id="info-toggle-btn"
        >
          {showDetails ? 'Mekân Bilgilerini Gizle' : 'Mekân & İletişim Bilgileri'}
          {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {showDetails && (
          <div className="mt-4 max-w-md mx-auto bg-stone-900/60 border border-stone-800/80 rounded-xl p-4 text-left text-xs text-stone-300 space-y-3 animate-fade-in">
            <div className="flex items-start gap-2.5">
              <MapPin size={15} className="text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-stone-200">Adres</p>
                <p className="text-stone-400">{info.address}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-stone-800/60">
              <div className="flex items-center gap-2">
                <Clock size={15} className="text-amber-500 shrink-0" />
                <div>
                  <p className="font-semibold text-stone-200">Çalışma Saatleri</p>
                  <p className="text-stone-400">{info.openingHours}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Phone size={15} className="text-amber-500 shrink-0" />
                <div>
                  <p className="font-semibold text-stone-200">Telefon</p>
                  <div className="flex flex-col gap-0.5">
                    {info.phone.split('/').map((phoneNum, idx) => {
                      const trimmed = phoneNum.trim();
                      return (
                        <a 
                          key={idx} 
                          href={`tel:${trimmed.replace(/\s+/g, '')}`} 
                          className="text-amber-400 hover:underline text-sm block"
                        >
                          {trimmed}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-3 border-t border-stone-800/60 flex justify-center gap-3">
              <a
                href={info.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-stone-400 hover:text-amber-400 transition-colors py-1.5 px-3 rounded-full bg-stone-950/40 border border-stone-800 text-[11px]"
                id="instagram-link"
              >
                <Instagram size={14} className="text-amber-500" />
                <span>Instagram</span>
              </a>
              {info.facebook && (
                <a
                  href={info.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-stone-400 hover:text-amber-400 transition-colors py-1.5 px-3 rounded-full bg-stone-950/40 border border-stone-800 text-[11px]"
                  id="facebook-link"
                >
                  <Facebook size={14} className="text-amber-500" />
                  <span>Facebook</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
