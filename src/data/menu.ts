import { Category, MenuItem, RestaurantConfig } from '../types';

const bahiaBurgerImg = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80';
const bahiaBanner = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1600&auto=format&fit=crop&q=80';
const tulumPatatesImg = 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=600&auto=format&fit=crop&q=80';

export const RESTAURANT_INFO: RestaurantConfig = {
  name: 'Bahia Gurme Burger',
  logoText: 'BAHİA',
  slogan: 'El Yapımı Gurme Burgerler ve Seçkin Lezzetler',
  address: 'Selimiye Sığliman Kümevleri No:19 Selimiye',
  phone: '0534 297 96 72 / 0546 183 14 78',
  instagram: 'https://www.instagram.com/bahiaselimiye/',
  facebook: 'https://www.facebook.com/bahiaselimiye/?locale=tr_TR',
  openingHours: '12:00-23:00'
};

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'TÜMÜ', icon: 'Grid', description: 'Bahia Gurme Burger lezzetlerinin tamamı' },
  { id: 'burgerler', name: 'BURGERLER', icon: 'Beef', description: 'En taze gurme köfte ve malzemeler ile hazırlanan ev yapımı burgerlerimiz' },
  { id: 'kofte_kuruet', name: 'ET VE KÖFTE MENÜ', icon: 'ChefHat', description: 'Geleneksel lezzetler ve tütsülenmiş et tabaklarımız' },
  { id: 'manti_yogurtlama', name: 'EV LEZZETLERİ', icon: 'UtensilsCrossed', description: 'El açması mantı ve geleneksel yoğurtlama' },
  { id: 'patates_citir', name: 'PATATES & BAŞLANGIÇLAR', icon: 'Grid', description: 'Çıtır çıtır taze başlangıçlar ve özel patateslerimiz' },
  { id: 'salata', name: 'SALATA', icon: 'Salad', description: 'Taze ve hafif Akdeniz esintili salatamız' },
  { id: 'mesrubat', name: 'MEŞRUBAT', icon: 'Coffee', description: 'Sıcak ve soğuk alkolsüz içecek çeşitleri' },
  { id: 'alkol', name: 'ALKOL', icon: 'Beer', description: 'Özenle seçilmiş soğuk biralarımız' }
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // --- BURGERLER ---
  {
    id: 'bosna_burger',
    name: 'BOSNA BURGER',
    price: 820.00,
    category: 'burgerler',
    description: 'Özel Bosna baharatlı gurme dana köfte, közlenmiş kırmızı biber, orijinal Boşnak kajmak sosu, taze marul ve karamelize soğan.',
    imageUrl: bahiaBurgerImg,
    tags: ['Gurme Seçim', 'Popüler', 'Özel Baharatlı'],
    ingredients: ['Gurme Köfte', 'Boşnak Kajmak Sosu', 'Köz Biber', 'Karamelize Soğan', 'Marul'],
    isAvailable: true,
    options: [
      { name: 'Sos Tercihi', choices: ['Sarımsaklı Mayonez', 'Acı Sos', 'Barbekü Sos'], required: false }
    ]
  },
  {
    id: 'bahia_burger',
    name: 'BAHİA BURGER',
    price: 770.00,
    category: 'burgerler',
    description: 'Bahia özel gurme köftesi, eritilmiş füme peynir, özel çıtır dana füme eti, karamelize soğan ve ev yapımı Bahia burger sosu.',
    imageUrl: bahiaBurgerImg,
    tags: ['İmza Lezzet', 'Popüler'],
    ingredients: ['Bahia Köfte', 'Dana Füme Et', 'Füme Peynir', 'Bahia Sos', 'Karamelize Soğan'],
    isAvailable: true
  },
  {
    id: 'cheese_burger',
    name: 'CHEESE BURGER',
    price: 770.00,
    category: 'burgerler',
    description: 'Çift kat cheddar peyniri, sulu gurme dana köfte, çıtır turşu ve hardal ile klasik lezzet.',
    imageUrl: bahiaBurgerImg,
    tags: ['Klasik'],
    ingredients: ['Gurme Köfte', 'Double Cheddar', 'Turşu', 'Hardal'],
    isAvailable: true
  },
  {
    id: 'mantarli_burger',
    name: 'MANTARLI BURGER',
    price: 745.00,
    category: 'burgerler',
    description: 'Kremalı taze mantar sosu, eritilmiş kaşar, gurme dana köfte, karamelize soğan ve mayonez.',
    imageUrl: bahiaBurgerImg,
    tags: ['Mantarlı', 'Yeni'],
    ingredients: ['Gurme Köfte', 'Kremalı Mantar Sosu', 'Eritilmiş Kaşar', 'Karamelize Soğan', 'Mayonez'],
    isAvailable: true
  },
  {
    id: 'begendili_burger',
    name: 'BEĞENDİLİ BURGER',
    price: 745.00,
    category: 'burgerler',
    description: 'Geleneksel köz patlıcanlı hünkar beğendi sosu, gurme köfte ve eritilmiş eski kaşar peyniri ile Türk mutfağı sentezi.',
    imageUrl: bahiaBurgerImg,
    tags: ['Yöresel Sentez'],
    ingredients: ['Gurme Köfte', 'Hünkar Beğendi Sosu', 'Eski Kaşar', 'Brioche Ekmek'],
    isAvailable: true
  },
  {
    id: 'kaburga_burger',
    name: 'KABURGA BURGER',
    price: 820.00,
    category: 'burgerler',
    description: '12 saat meşe odununda ağır ateşte pişmiş tiftik dana kaburga eti, cheddar peyniri, barbekü sos ve çıtır soğan halkaları.',
    imageUrl: bahiaBurgerImg,
    tags: ['Gurme Seçim', 'Özel Pişirim'],
    ingredients: ['Ağır Pişmiş Kaburga Eti', 'Double Cheddar', 'Barbekü Sos', 'Çıtır Soğan Halkaları'],
    isAvailable: true
  },
  {
    id: 'pastirma_burger',
    name: 'PASTIRMA BURGER',
    price: 820.00,
    category: 'burgerler',
    description: 'Özel Kayseri çemenli pastırması, eritilmiş eski kaşar peyniri, sulu gurme köfte ve el yapımı özel sos.',
    imageUrl: bahiaBurgerImg,
    tags: ['Geleneksel'],
    ingredients: ['Gurme Köfte', 'Kayseri Çemenli Pastırma', 'Eski Kaşar', 'Özel Sos'],
    isAvailable: true
  },

  // --- ET VE KÖFTE MENÜ ---
  {
    id: 'kofte_tabagi',
    name: 'BOŞNAK KÖFTESİ',
    price: 750.00,
    category: 'kofte_kuruet',
    description: 'Özel Boşnak köftesi (8 adet), közlenmiş domates ve biber, patates kızartması ve taze yeşillik ve özel sos eşliğinde.',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
    tags: ['Izgara', 'Doyurucu Menü'],
    ingredients: ['Izgara Boşnak Köfte', 'Köz Biber', 'Köz Domates', 'Baharatlı Patates'],
    isAvailable: true
  },
  {
    id: 'kuru_et_tabagi',
    name: 'KURU ET TABAĞI',
    price: 700.00,
    category: 'kofte_kuruet',
    description: 'Sadece kuru et ve kaymak ile servis edilir',
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80',
    tags: ['Meze', 'Atıştırmalık', 'Premium'],
    ingredients: ['Tütsülenmiş Boşnak Kuru Eti', 'Kaymak'],
    isAvailable: true
  },

  // --- EV LEZZETLERİ ---
  {
    id: 'anne_mantisi',
    name: 'ANNE MANTISI',
    price: 500.00,
    category: 'manti_yogurtlama',
    description: 'Elde açılmış, içi bol kıymalı çıtır ve sulu Kayseri mantısı, süzme sarımsaklı yoğurt, kızgın tereyağı ve pul biber sosu ile.',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80',
    tags: ['Ev Yapımı', 'Klasik'],
    ingredients: ['El Açması Mantı', 'Süzme Sarımsaklı Yoğurt', 'Kızgın Tereyağı Süsü', 'Nane ve Pul Biber'],
    isAvailable: true
  },
  {
    id: 'yogurtlama',
    name: 'YOĞURTLAMA',
    price: 350.00,
    category: 'manti_yogurtlama',
    description: 'Sadece patates ve sarımsaklı yoğurt zeytinyağlı biber sosu ile servis edilir',
    imageUrl: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&auto=format&fit=crop&q=80',
    tags: ['Vejetaryen', 'Geleneksel'],
    ingredients: ['Kızarmış Patates', 'Sarımsaklı Yoğurt', 'Zeytinyağlı Biber Sosu'],
    isAvailable: true
  },

  // --- PATATES & BAŞLANGIÇLAR ---
  {
    id: 'patates',
    name: 'ANNE PATATESİ',
    price: 300.00,
    category: 'patates_citir',
    description: 'Ev usulü çıtır çıtır elma dilim anne patatesi, özel Bahia baharatlı tuz karışımı ile servis edilir. Sade, üstünde herhangi bir peynir bulunmaz.',
    imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80',
    tags: ['Atıştırmalık', 'Vejetaryen'],
    ingredients: ['Elma Dilim Patates', 'Özel Bahia Baharatı'],
    isAvailable: true
  },
  {
    id: 'tulum_soslu_patates',
    name: 'TULUM SOSLU PATATES',
    price: 350.00,
    category: 'patates_citir',
    description: 'Çıtır elma dilim anne patatesi üzerine sıcak kremalı Erzincan tulum peyniri sosu ve taze ince kıyılmış baharatlar.',
    imageUrl: tulumPatatesImg,
    tags: ['Özel Soslu', 'Favori'],
    ingredients: ['Taze Patates', 'Kremalı Erzincan Tulum Sosu', 'Maydanoz', 'Taze Frenk Soğanı'],
    isAvailable: true
  },
  {
    id: 'citir_tavuk',
    name: 'ÇITIR TAVUK',
    price: 450.00,
    category: 'patates_citir',
    description: 'Özel mısır gevrekli ve baharatlı harç ile kaplanmış dışı çıtır, içi yumuşacık tavuk göğsü dilimleri.',
    imageUrl: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=600&auto=format&fit=crop&q=80',
    tags: ['Çıtır', 'Popüler'],
    ingredients: ['Mısır Gevrekli Tavuk Dilimleri'],
    isAvailable: true
  },

  // --- SALATA ---
  {
    id: 'salata',
    name: 'ŞOPSKA BOŞNAK SALATASI',
    price: 400.00,
    category: 'salata',
    description: 'Taze Akdeniz yeşillikleri, kiraz domates, çıtır salatalık, tatlı mısır, sızma zeytinyağlı limon sosu ve tulum peyniri rendesi ile.',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80',
    tags: ['Sağlıklı', 'Hafif', 'Vejetaryen'],
    ingredients: ['Akdeniz Yeşillikleri', 'Kiraz Domates', 'Mısır', 'Zeytinyağı', 'Limon', 'Tulum Peyniri'],
    isAvailable: true
  },

  // --- MEŞRUBAT ---
  {
    id: 'kola',
    name: 'KOLA',
    price: 165.00,
    category: 'mesrubat',
    description: 'Coca-Cola veya Coca-Cola Zero (330ml Şişe/Kutu seçeneğiyle)',
    imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80',
    isAvailable: true,
    options: [{ name: 'Tip', choices: ['Orijinal', 'Sıfır Şeker (Zero)'], required: true }]
  },
  {
    id: 'fanta',
    name: 'FANTA',
    price: 165.00,
    category: 'mesrubat',
    description: 'Kutu Fanta Portakal (330ml)',
    imageUrl: 'https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?w=600&auto=format&fit=crop&q=80',
    isAvailable: true
  },
  {
    id: 'sprite',
    name: 'SPRITE',
    price: 165.00,
    category: 'mesrubat',
    description: 'Kutu Sprite (330ml)',
    imageUrl: 'https://images.unsplash.com/photo-1625772291427-f3f2c5fe96bc?w=600&auto=format&fit=crop&q=80',
    isAvailable: true
  },
  {
    id: 'fuse_tea',
    name: 'FUSE TEA',
    price: 150.00,
    category: 'mesrubat',
    description: 'Şeftali veya Limon aromalı soğuk çay (330ml)',
    imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop&q=80',
    isAvailable: true,
    options: [{ name: 'Aroma', choices: ['Şeftali', 'Limon'], required: true }]
  },
  {
    id: 'soda',
    name: 'SODA',
    price: 70.00,
    category: 'mesrubat',
    description: 'Doğal mineralli sade maden suyu (200ml)',
    imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80',
    isAvailable: true
  },
  {
    id: 'su',
    name: 'SU',
    price: 50.00,
    category: 'mesrubat',
    description: 'Cam şişe küçük kaynak suyu (330ml)',
    imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&auto=format&fit=crop&q=80',
    isAvailable: true
  },
  {
    id: 'buyuk_su',
    name: 'BÜYÜK SU',
    price: 100.00,
    category: 'mesrubat',
    description: 'Cam şişe büyük kaynak suyu (750ml)',
    imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&auto=format&fit=crop&q=80',
    isAvailable: true
  },
  {
    id: 'turk_kahvesi',
    name: 'TÜRK KAHVESİ',
    price: 150.00,
    category: 'mesrubat',
    description: 'Geleneksel Türk kahvesi, çifte kavrulmuş lokum ve küçük cam şişe su ile servis edilir.',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
    isAvailable: true,
    options: [{ name: 'Şeker Derecesi', choices: ['Sade', 'Az Şekerli', 'Orta', 'Şekerli'], required: true }]
  },

  // --- ALKOL ---
  {
    id: 'tuborg_gold',
    name: 'TUBORG GOLD',
    price: 265.00,
    category: 'alkol',
    description: 'Soğuk Tuborg Gold Şişe (50cl)',
    imageUrl: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=600&auto=format&fit=crop&q=80',
    tags: ['Soğuk Bira'],
    isAvailable: true
  },
  {
    id: 'efes_pilsen',
    name: 'EFES PİLSEN',
    price: 280.00,
    category: 'alkol',
    description: 'Soğuk Efes Pilsen Şişe (50cl)',
    imageUrl: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=600&auto=format&fit=crop&q=80',
    tags: ['Soğuk Bira'],
    isAvailable: true
  },
  {
    id: 'efes_malt',
    name: 'EFES MALT',
    price: 280.00,
    category: 'alkol',
    description: 'Soğuk Efes Malt Şişe (50cl)',
    imageUrl: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=600&auto=format&fit=crop&q=80',
    tags: ['Soğuk Bira'],
    isAvailable: true
  },
  {
    id: 'efes_ozel_seri',
    name: 'EFES ÖZEL SERİ',
    price: 290.00,
    category: 'alkol',
    description: 'Soğuk Efes Özel Seri Şişe (50cl)',
    imageUrl: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=600&auto=format&fit=crop&q=80',
    tags: ['Soğuk Bira'],
    isAvailable: true
  },
  {
    id: 'bomonti_filtresiz',
    name: 'BOMONTİ FİLTRESİZ',
    price: 280.00,
    category: 'alkol',
    description: 'Soğuk Bomonti Filtresiz Şişe (50cl)',
    imageUrl: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=600&auto=format&fit=crop&q=80',
    tags: ['Filtresiz', 'Popüler'],
    isAvailable: true
  },
  {
    id: 'corona',
    name: 'CORONA',
    price: 350.00,
    category: 'alkol',
    description: 'Soğuk Corona Şişe (35.5cl) limon dilimiyle servis edilir.',
    imageUrl: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=600&auto=format&fit=crop&q=80',
    tags: ['İthal', 'Ferahlatıcı'],
    isAvailable: true
  },
  {
    id: 'miller',
    name: 'MILLER',
    price: 320.00,
    category: 'alkol',
    description: 'Soğuk Miller Şişe (33cl)',
    imageUrl: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=600&auto=format&fit=crop&q=80',
    tags: ['İthal', 'Hafif İçim'],
    isAvailable: true
  },
  {
    id: 'stella',
    name: 'STELLA',
    price: 290.00,
    category: 'alkol',
    description: 'Soğuk Stella Artois Şişe (33cl)',
    imageUrl: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=600&auto=format&fit=crop&q=80',
    tags: ['İthal', 'Premium'],
    isAvailable: true
  },
  {
    id: 'carlsberg',
    name: 'CARLSBERG',
    price: 280.00,
    category: 'alkol',
    description: 'Soğuk Carlsberg Şişe (50cl)',
    imageUrl: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=600&auto=format&fit=crop&q=80',
    tags: ['Soğuk Bira'],
    isAvailable: true
  }
];

export { bahiaBanner };
