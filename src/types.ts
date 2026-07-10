export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl?: string;
  tags?: string[]; // e.g., ['Gurme', 'Yeni', 'Alkol']
  ingredients?: string[];
  isAvailable: boolean;
  options?: {
    name: string;
    choices: string[];
    required: boolean;
  }[];
}

export interface Category {
  id: string;
  name: string;
  icon: string; // Lucide icon name
  description?: string;
}

export interface DraftOrderItem {
  item: MenuItem;
  quantity: number;
  selectedOptions?: { [key: string]: string };
  note?: string;
}

export interface RestaurantConfig {
  name: string;
  logoText: string;
  slogan: string;
  address: string;
  phone: string;
  wifiName?: string;
  wifiPass?: string;
  instagram: string;
  facebook?: string;
  openingHours: string;
}
