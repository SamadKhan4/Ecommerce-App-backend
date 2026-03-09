const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
require('dotenv').config();

const products = [
  // Mobile Glass
  {
    name: 'Tempered Glass for iPhone 14 Pro',
    description: '9H hardness tempered glass with oleophobic coating. Ultra-clear and bubble-free installation.',
    price: 299,
    category: null, // Will be set dynamically
    images: [
      { url: 'https://images.unsplash.com/photo-1592899677712-a5a2545034ab?w=800&h=800&fit=crop' },
    ],
    stock: 50,
    brand: 'ShieldPro',
  },
  {
    name: 'Samsung Galaxy S23 Screen Protector',
    description: 'Premium tempered glass with case-friendly design. Anti-fingerprint coating.',
    price: 249,
    category: null,
    images: [
      { url: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&h=800&fit=crop' },
    ],
    stock: 45,
    brand: 'GuardMax',
  },
  
  // Phone Covers
  {
    name: 'Silicone Case for iPhone 14 Pro Max',
    description: 'Soft silicone protective case with microfiber lining. Available in multiple colors.',
    price: 599,
    category: null,
    images: [
      { url: 'https://images.unsplash.com/photo-1603351154351-5cf99bc7f037?w=800&h=800&fit=crop' },
    ],
    stock: 30,
    brand: 'CaseMate',
  },
  {
    name: 'Leather Flip Cover for Samsung S23',
    description: 'Premium leather flip cover with card slots. Magnetic closure for secure protection.',
    price: 799,
    category: null,
    images: [
      { url: 'https://images.unsplash.com/photo-1586953229609-1e16d5dd76ea?w=800&h=800&fit=crop' },
    ],
    stock: 25,
    brand: 'LuxLeather',
  },
  
  // Chargers
  {
    name: '20W USB-C Fast Charger',
    description: 'Compact fast charger compatible with iPhone and Android devices. Over-current protection.',
    price: 899,
    category: null,
    images: [
      { url: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&h=800&fit=crop' },
    ],
    stock: 40,
    brand: 'PowerPlus',
  },
  {
    name: 'Wireless Charging Pad 15W',
    description: 'Fast wireless charging pad with LED indicator. Compatible with all Qi-enabled devices.',
    price: 1299,
    category: null,
    images: [
      { url: 'https://images.unsplash.com/photo-1615214585342-784e43e70c95?w=800&h=800&fit=crop' },
    ],
    stock: 20,
    brand: 'ChargeWave',
  },
  
  // Earphones
  {
    name: 'Wireless Earbuds Pro',
    description: 'True wireless earbuds with active noise cancellation. 24-hour battery life with charging case.',
    price: 2999,
    category: null,
    images: [
      { url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=800&fit=crop' },
    ],
    stock: 15,
    brand: 'SoundMax',
  },
  {
    name: 'Wired Earphones Type-C',
    description: 'High-quality wired earphones with microphone. Crystal clear sound and deep bass.',
    price: 499,
    category: null,
    images: [
      { url: 'https://images.unsplash.com/photo-1572569028738-411a561723f4?w=800&h=800&fit=crop' },
    ],
    stock: 60,
    brand: 'AudioTech',
  },
  
  // Power Banks
  {
    name: '10000mAh Power Bank',
    description: 'Slim portable power bank with dual USB output. Fast charging support for multiple devices.',
    price: 1499,
    category: null,
    images: [
      { url: 'https://images.unsplash.com/photo-1609592424369-7c5b7d4c6e0e?w=800&h=800&fit=crop' },
    ],
    stock: 35,
    brand: 'PowerCore',
  },
  {
    name: '20000mAh Fast Charging Power Bank',
    description: 'High-capacity power bank with PD fast charging. LED display showing remaining battery.',
    price: 2499,
    category: null,
    images: [
      { url: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800&h=800&fit=crop' },
    ],
    stock: 25,
    brand: 'UltraCharge',
  },
  
  // Cables
  {
    name: 'USB-C to Lightning Cable 1m',
    description: 'MFi certified cable for fast charging. Durable braided nylon design.',
    price: 699,
    category: null,
    images: [
      { url: 'https://images.unsplash.com/photo-1542840843-06e278071f00?w=800&h=800&fit=crop' },
    ],
    stock: 80,
    brand: 'CablePro',
  },
  {
    name: 'Micro USB Cable 2m',
    description: 'Long durable Micro USB cable. Supports fast data transfer and charging.',
    price: 299,
    category: null,
    images: [
      { url: 'https://images.unsplash.com/photo-1558002038-1091a1661116?w=800&h=800&fit=crop' },
    ],
    stock: 100,
    brand: 'ConnectPlus',
  },
  
  // Other Accessories
  {
    name: 'Car Phone Mount Holder',
    description: 'Universal car mount with strong suction cup. 360-degree rotation for optimal viewing.',
    price: 599,
    category: null,
    images: [
      { url: 'https://images.unsplash.com/photo-1558002038-1091a1661116?w=800&h=800&fit=crop' },
    ],
    stock: 40,
    brand: 'MountMaster',
  },
  {
    name: 'Phone Ring Holder Stand',
    description: '360-degree rotating ring holder with magnetic car mount compatibility.',
    price: 199,
    category: null,
    images: [
      { url: 'https://images.unsplash.com/photo-1601593346740-925612782e70?w=800&h=800&fit=crop' },
    ],
    stock: 150,
    brand: 'GripIt',
  },
];

const seedProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('✅ MongoDB Connected');

    // Get categories
    const mobileGlass = await Category.findOne({ name: 'Mobile Glass' });
    const phoneCovers = await Category.findOne({ name: 'Phone Covers' });
    const chargers = await Category.findOne({ name: 'Chargers' });
    const earphones = await Category.findOne({ name: 'Earphones' });
    const powerBanks = await Category.findOne({ name: 'Power Banks' });
    const cables = await Category.findOne({ name: 'Cables' });
    const otherAccessories = await Category.findOne({ name: 'Other Accessories' });

    if (!mobileGlass || !phoneCovers || !chargers || !earphones || !powerBanks || !cables || !otherAccessories) {
      console.error('❌ Categories not found. Please run seedCategories.js first.');
      process.exit(1);
    }

    // Assign categories to products
    products[0].category = mobileGlass._id;
    products[1].category = mobileGlass._id;
    products[2].category = phoneCovers._id;
    products[3].category = phoneCovers._id;
    products[4].category = chargers._id;
    products[5].category = chargers._id;
    products[6].category = earphones._id;
    products[7].category = earphones._id;
    products[8].category = powerBanks._id;
    products[9].category = powerBanks._id;
    products[10].category = cables._id;
    products[11].category = cables._id;
    products[12].category = otherAccessories._id;
    products[13].category = otherAccessories._id;

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Existing products cleared');

    // Insert new products
    const inserted = await Product.insertMany(products);
    console.log(`✅ ${inserted.length} products seeded successfully`);

    inserted.forEach((prod) => console.log(`  - ${prod.name}`));

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error.message);
    process.exit(1);
  }
};

seedProducts();
