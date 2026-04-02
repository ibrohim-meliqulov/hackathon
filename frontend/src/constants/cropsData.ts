export interface CostBreakdown {
  seeds: number;
  fertilizer: number;
  water: number;
  labor: number;
  other: number;
}

export interface CropData {
  id: string;
  name: string;
  yieldPerSotix: number; // kg
  pricePerKg: number; // so'm
  costPerSotix: number; // total so'm
  breakdown: CostBreakdown;
  regions: string[];
  demand: 'Juda Yuqori' | 'Yuqori' | 'O\'rta' | 'Barqaror';
  trend: 'up' | 'down' | 'stable';
  change: string;
  description: string;
}

export const allCrops: CropData[] = [
  {
    id: 'tomato',
    name: 'Pomidor',
    yieldPerSotix: 800,
    pricePerKg: 12000,
    costPerSotix: 2500000,
    breakdown: { seeds: 400000, fertilizer: 800000, water: 300000, labor: 700000, other: 300000 },
    regions: ['Toshkent viloyati', 'Samarqand', 'Andijon', 'Farg\'ona', 'Namangan'],
    demand: 'Yuqori',
    trend: 'up',
    change: '+12%',
    description: 'Eksport hajmi oshishi kutilmoqda'
  },
  {
    id: 'cucumber',
    name: 'Bodring',
    yieldPerSotix: 600,
    pricePerKg: 8500,
    costPerSotix: 1800000,
    breakdown: { seeds: 300000, fertilizer: 500000, water: 400000, labor: 400000, other: 200000 },
    regions: ['Toshkent viloyati', 'Samarqand', 'Surxondaryo', 'Xorazm'],
    demand: 'O\'rta',
    trend: 'down',
    change: '-5%',
    description: 'Bozorda taklif ko\'paygan'
  },
  {
    id: 'onion',
    name: 'Piyoz',
    yieldPerSotix: 1200,
    pricePerKg: 4200,
    costPerSotix: 1200000,
    breakdown: { seeds: 200000, fertilizer: 300000, water: 200000, labor: 300000, other: 200000 },
    regions: ['Toshkent viloyati', 'Jizzax', 'Sirdaryo', 'Qashqadaryo'],
    demand: 'Yuqori',
    trend: 'up',
    change: '+20%',
    description: 'Zaxiralar kamayishi hisobiga'
  },
  {
    id: 'potato',
    name: 'Kartoshka',
    yieldPerSotix: 1500,
    pricePerKg: 5500,
    costPerSotix: 2000000,
    breakdown: { seeds: 600000, fertilizer: 500000, water: 300000, labor: 400000, other: 200000 },
    regions: ['Samarqand', 'Toshkent viloyati', 'Namangan', 'Farg\'ona'],
    demand: 'Barqaror',
    trend: 'stable',
    change: '0%',
    description: 'Yangi hosil kutilmoqda'
  },
  {
    id: 'garlic',
    name: 'Sarimsoq',
    yieldPerSotix: 400,
    pricePerKg: 25000,
    costPerSotix: 3000000,
    breakdown: { seeds: 1000000, fertilizer: 600000, water: 200000, labor: 800000, other: 400000 },
    regions: ['Andijon', 'Namangan', 'Farg\'ona', 'Toshkent viloyati'],
    demand: 'Juda Yuqori',
    trend: 'up',
    change: '+15%',
    description: 'Tashqi bozorlarda talab katta'
  },
  {
    id: 'bell-pepper',
    name: 'Bulg\'or qalampiri',
    yieldPerSotix: 500,
    pricePerKg: 15000,
    costPerSotix: 2200000,
    breakdown: { seeds: 500000, fertilizer: 600000, water: 300000, labor: 500000, other: 300000 },
    regions: ['Toshkent viloyati', 'Andijon', 'Farg\'ona'],
    demand: 'Yuqori',
    trend: 'up',
    change: '+10%',
    description: 'Issiqxona mahsulotlariga talab ortmoqda'
  },
  {
    id: 'eggplant',
    name: 'Baqlajon',
    yieldPerSotix: 700,
    pricePerKg: 7000,
    costPerSotix: 1500000,
    breakdown: { seeds: 200000, fertilizer: 400000, water: 300000, labor: 400000, other: 200000 },
    regions: ['Surxondaryo', 'Qashqadaryo', 'Buxoro'],
    demand: 'O\'rta',
    trend: 'stable',
    change: '+2%',
    description: 'Mavsumiy barqarorlik'
  },
  {
    id: 'carrot',
    name: 'Sabzi',
    yieldPerSotix: 1800,
    pricePerKg: 3500,
    costPerSotix: 1300000,
    breakdown: { seeds: 150000, fertilizer: 300000, water: 350000, labor: 300000, other: 200000 },
    regions: ['Toshkent viloyati', 'Samarqand', 'Buxoro', 'Xorazm'],
    demand: 'Barqaror',
    trend: 'up',
    change: '+5%',
    description: 'Ichki bozorda talab doimiy'
  },
  {
    id: 'cabbage',
    name: 'Karam',
    yieldPerSotix: 2500,
    pricePerKg: 2500,
    costPerSotix: 1600000,
    breakdown: { seeds: 200000, fertilizer: 500000, water: 400000, labor: 300000, other: 200000 },
    regions: ['Toshkent viloyati', 'Samarqand', 'Andijon'],
    demand: 'O\'rta',
    trend: 'down',
    change: '-8%',
    description: 'Hosil mo\'lligi sababli narx tushgan'
  },
  {
    id: 'cauliflower',
    name: 'Gulkaram',
    yieldPerSotix: 1200,
    pricePerKg: 9000,
    costPerSotix: 2000000,
    breakdown: { seeds: 400000, fertilizer: 600000, water: 300000, labor: 400000, other: 300000 },
    regions: ['Toshkent viloyati', 'Samarqand'],
    demand: 'Yuqori',
    trend: 'up',
    change: '+15%',
    description: 'Sog\'lom ovqatlanish trendi sababli'
  },
  {
    id: 'radish',
    name: 'Turp',
    yieldPerSotix: 2000,
    pricePerKg: 3000,
    costPerSotix: 1000000,
    breakdown: { seeds: 100000, fertilizer: 200000, water: 300000, labor: 200000, other: 200000 },
    regions: ['Toshkent viloyati', 'Samarqand', 'Xorazm'],
    demand: 'Barqaror',
    trend: 'stable',
    change: '0%',
    description: 'Kuzgi hosil barqaror'
  },
  {
    id: 'beetroot',
    name: 'Lavlagi',
    yieldPerSotix: 1500,
    pricePerKg: 4500,
    costPerSotix: 1200000,
    breakdown: { seeds: 150000, fertilizer: 300000, water: 250000, labor: 300000, other: 200000 },
    regions: ['Toshkent viloyati', 'Samarqand', 'Andijon'],
    demand: 'O\'rta',
    trend: 'up',
    change: '+7%',
    description: 'Sanoat qayta ishlash uchun talab ortgan'
  },
  {
    id: 'strawberry',
    name: 'Qulupnay',
    yieldPerSotix: 300,
    pricePerKg: 35000,
    costPerSotix: 4500000,
    breakdown: { seeds: 1500000, fertilizer: 1000000, water: 500000, labor: 1000000, other: 500000 },
    regions: ['Toshkent viloyati', 'Andijon', 'Namangan', 'Farg\'ona'],
    demand: 'Juda Yuqori',
    trend: 'up',
    change: '+25%',
    description: 'Mavsum boshida narxlar yuqori'
  },
  {
    id: 'melon',
    name: 'Qovun',
    yieldPerSotix: 2000,
    pricePerKg: 6000,
    costPerSotix: 2500000,
    breakdown: { seeds: 300000, fertilizer: 700000, water: 500000, labor: 600000, other: 400000 },
    regions: ['Xorazm', 'Sirdaryo', 'Jizzax', 'Buxoro'],
    demand: 'Yuqori',
    trend: 'up',
    change: '+10%',
    description: 'Eksportbop navlarga talab katta'
  },
  {
    id: 'watermelon',
    name: 'Tarvuz',
    yieldPerSotix: 4000,
    pricePerKg: 3000,
    costPerSotix: 2800000,
    breakdown: { seeds: 400000, fertilizer: 800000, water: 600000, labor: 600000, other: 400000 },
    regions: ['Surxondaryo', 'Qashqadaryo', 'Sirdaryo', 'Jizzax'],
    demand: 'Yuqori',
    trend: 'stable',
    change: '+3%',
    description: 'Yozgi mavsumda talab barqaror'
  },
  {
    id: 'grapes',
    name: 'Uzum',
    yieldPerSotix: 1000,
    pricePerKg: 18000,
    costPerSotix: 5000000,
    breakdown: { seeds: 0, fertilizer: 1500000, water: 800000, labor: 2000000, other: 700000 },
    regions: ['Samarqand', 'Toshkent viloyati', 'Farg\'ona', 'Buxoro'],
    demand: 'Juda Yuqori',
    trend: 'up',
    change: '+18%',
    description: 'Eksport va mayiz uchun talab katta'
  },
  {
    id: 'apple',
    name: 'Olma',
    yieldPerSotix: 1500,
    pricePerKg: 10000,
    costPerSotix: 4000000,
    breakdown: { seeds: 0, fertilizer: 1200000, water: 600000, labor: 1500000, other: 700000 },
    regions: ['Namangan', 'Andijon', 'Toshkent viloyati', 'Samarqand'],
    demand: 'Barqaror',
    trend: 'stable',
    change: '+2%',
    description: 'Sifatli navlarga talab doimiy'
  },
  {
    id: 'cherry',
    name: 'Gilos',
    yieldPerSotix: 600,
    pricePerKg: 45000,
    costPerSotix: 6000000,
    breakdown: { seeds: 0, fertilizer: 1500000, water: 1000000, labor: 2500000, other: 1000000 },
    regions: ['Namangan', 'Andijon', 'Farg\'ona', 'Toshkent viloyati'],
    demand: 'Juda Yuqori',
    trend: 'up',
    change: '+30%',
    description: 'Xitoy va Rossiya bozorlariga eksport'
  },
  {
    id: 'apricot',
    name: 'O\'rik',
    yieldPerSotix: 800,
    pricePerKg: 15000,
    costPerSotix: 3500000,
    breakdown: { seeds: 0, fertilizer: 1000000, water: 500000, labor: 1500000, other: 500000 },
    regions: ['Farg\'ona', 'Namangan', 'Andijon', 'Samarqand'],
    demand: 'Yuqori',
    trend: 'up',
    change: '+12%',
    description: 'Quritilgan mahsulot (turshak) uchun'
  },
  {
    id: 'peach',
    name: 'Shaftoli',
    yieldPerSotix: 1000,
    pricePerKg: 14000,
    costPerSotix: 3800000,
    breakdown: { seeds: 0, fertilizer: 1200000, water: 600000, labor: 1500000, other: 500000 },
    regions: ['Farg\'ona', 'Namangan', 'Andijon', 'Toshkent viloyati'],
    demand: 'Yuqori',
    trend: 'stable',
    change: '+5%',
    description: 'Mavsumiy talab yuqori'
  },
  {
    id: 'pomegranate',
    name: 'Anor',
    yieldPerSotix: 700,
    pricePerKg: 20000,
    costPerSotix: 3000000,
    breakdown: { seeds: 0, fertilizer: 800000, water: 400000, labor: 1200000, other: 600000 },
    regions: ['Surxondaryo', 'Qashqadaryo', 'Farg\'ona'],
    demand: 'Yuqori',
    trend: 'up',
    change: '+15%',
    description: 'Sharbat ishlab chiqarish uchun'
  },
  {
    id: 'persimmon',
    name: 'Xurmo',
    yieldPerSotix: 1200,
    pricePerKg: 8000,
    costPerSotix: 2500000,
    breakdown: { seeds: 0, fertilizer: 700000, water: 400000, labor: 1000000, other: 400000 },
    regions: ['Surxondaryo', 'Farg\'ona', 'Namangan'],
    demand: 'O\'rta',
    trend: 'stable',
    change: '+3%',
    description: 'Kuzgi eksport mahsuloti'
  },
  {
    id: 'walnut',
    name: 'Yong\'oq',
    yieldPerSotix: 400,
    pricePerKg: 40000,
    costPerSotix: 3000000,
    breakdown: { seeds: 0, fertilizer: 800000, water: 400000, labor: 1200000, other: 600000 },
    regions: ['Namangan', 'Toshkent viloyati', 'Jizzax', 'Surxondaryo'],
    demand: 'Yuqori',
    trend: 'up',
    change: '+10%',
    description: 'Doimiy yuqori narx'
  },
  {
    id: 'almond',
    name: 'Bodom',
    yieldPerSotix: 300,
    pricePerKg: 60000,
    costPerSotix: 3500000,
    breakdown: { seeds: 0, fertilizer: 1000000, water: 300000, labor: 1500000, other: 700000 },
    regions: ['Surxondaryo', 'Qashqadaryo', 'Jizzax', 'Samarqand'],
    demand: 'Juda Yuqori',
    trend: 'up',
    change: '+20%',
    description: 'Eksportbop qimmatbaho mahsulot'
  },
  {
    id: 'spinach',
    name: 'Ismaloq',
    yieldPerSotix: 500,
    pricePerKg: 10000,
    costPerSotix: 1000000,
    breakdown: { seeds: 100000, fertilizer: 200000, water: 300000, labor: 200000, other: 200000 },
    regions: ['Toshkent viloyati', 'Samarqand', 'Andijon'],
    demand: 'Yuqori',
    trend: 'up',
    change: '+15%',
    description: 'Bahorgi vitaminli mahsulot'
  },
  {
    id: 'greens',
    name: 'Ko\'katlar (Ukrop, kashnich)',
    yieldPerSotix: 400,
    pricePerKg: 15000,
    costPerSotix: 800000,
    breakdown: { seeds: 100000, fertilizer: 100000, water: 200000, labor: 200000, other: 200000 },
    regions: ['Toshkent viloyati', 'Samarqand', 'Andijon', 'Farg\'ona'],
    demand: 'Juda Yuqori',
    trend: 'up',
    change: '+25%',
    description: 'Doimiy talab va tez hosil'
  },
  {
    id: 'mint',
    name: 'Yalpiz',
    yieldPerSotix: 300,
    pricePerKg: 20000,
    costPerSotix: 700000,
    breakdown: { seeds: 50000, fertilizer: 100000, water: 200000, labor: 200000, other: 150000 },
    regions: ['Toshkent viloyati', 'Samarqand'],
    demand: 'O\'rta',
    trend: 'stable',
    change: '+5%',
    description: 'Choy va tibbiyot uchun'
  },
  {
    id: 'basil',
    name: 'Rayhon',
    yieldPerSotix: 250,
    pricePerKg: 25000,
    costPerSotix: 800000,
    breakdown: { seeds: 100000, fertilizer: 150000, water: 200000, labor: 200000, other: 150000 },
    regions: ['Toshkent viloyati', 'Samarqand', 'Andijon'],
    demand: 'Yuqori',
    trend: 'up',
    change: '+10%',
    description: 'Xushbo\'y ziravor sifatida'
  },
  {
    id: 'mushrooms',
    name: 'Qo\'ziqorin (Veshenka)',
    yieldPerSotix: 500,
    pricePerKg: 20000,
    costPerSotix: 4000000,
    breakdown: { seeds: 1000000, fertilizer: 500000, water: 500000, labor: 1000000, other: 1000000 },
    regions: ['Toshkent viloyati', 'Samarqand'],
    demand: 'Yuqori',
    trend: 'up',
    change: '+15%',
    description: 'Yopiq binolarda yetishtirish uchun'
  },
  {
    id: 'honey',
    name: 'Asal (Asalarichilik)',
    yieldPerSotix: 200,
    pricePerKg: 80000,
    costPerSotix: 5000000,
    breakdown: { seeds: 0, fertilizer: 0, water: 200000, labor: 2000000, other: 2800000 },
    regions: ['Namangan', 'Jizzax', 'Toshkent viloyati', 'Surxondaryo'],
    demand: 'Juda Yuqori',
    trend: 'up',
    change: '+10%',
    description: 'Tabiiy toza asalga talab katta'
  }
];
