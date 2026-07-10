import React, { useRef, useEffect } from 'react';
import { Category } from '../types';
import { Beef, ChefHat, UtensilsCrossed, Salad, Coffee, Beer, Grid } from 'lucide-react';

interface CategoryNavProps {
  categories: Category[];
  activeCategoryId: string;
  onSelectCategory: (id: string) => void;
}

// Map icon string names to Lucide icons safely
const getIcon = (iconName: string, size = 18) => {
  switch (iconName) {
    case 'Beef':
      return <Beef size={size} />;
    case 'ChefHat':
      return <ChefHat size={size} />;
    case 'UtensilsCrossed':
      return <UtensilsCrossed size={size} />;
    case 'Salad':
      return <Salad size={size} />;
    case 'Coffee':
      return <Coffee size={size} />;
    case 'Beer':
      return <Beer size={size} />;
    case 'Grid':
    default:
      return <Grid size={size} />;
  }
};

export default function CategoryNav({
  categories,
  activeCategoryId,
  onSelectCategory,
}: CategoryNavProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="sticky top-0 z-40 bg-stone-950/95 backdrop-blur-md border-b border-stone-900/80 shadow-lg py-3">
      <div
        ref={containerRef}
        className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2 px-4 w-full max-w-4xl mx-auto"
      >
        {categories.map((category) => {
          const isActive = category.id === activeCategoryId;
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              data-active={isActive}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 border ${
                isActive
                  ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-md shadow-amber-500/20'
                  : 'bg-stone-900/60 text-stone-400 border-stone-800/80 hover:text-stone-200 hover:border-stone-700'
              }`}
              id={`cat-btn-${category.id}`}
            >
              <span className={isActive ? 'text-stone-950' : 'text-amber-500'}>
                {getIcon(category.icon, 13)}
              </span>
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
export { getIcon };
