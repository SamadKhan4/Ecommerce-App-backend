const mongoose = require('mongoose');
const Category = require('../models/Category');
require('dotenv').config();

const categories = [
  {
    name: 'Mobile Glass',
    image: 'https://images.unsplash.com/photo-1592899677712-a5a2545034ab?w=500&h=500&fit=crop',
  },
  {
    name: 'Phone Covers',
    image: 'https://images.unsplash.com/photo-1603351154351-5cf99bc7f037?w=500&h=500&fit=crop',
  },
  {
    name: 'Chargers',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&h=500&fit=crop',
  },
  {
    name: 'Earphones',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop',
  },
  {
    name: 'Power Banks',
    image: 'https://images.unsplash.com/photo-1609592424369-7c5b7d4c6e0e?w=500&h=500&fit=crop',
  },
  {
    name: 'Cables',
    image: 'https://images.unsplash.com/photo-1542840843-06e278071f00?w=500&h=500&fit=crop',
  },
  {
    name: 'Other Accessories',
    image: 'https://images.unsplash.com/photo-1586953229609-1e16d5dd76ea?w=500&h=500&fit=crop',
  },
];

const seedCategories = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('✅ MongoDB Connected');

    // Clear existing categories
    await Category.deleteMany({});
    console.log('🗑️  Existing categories cleared');

    // Insert new categories
    const inserted = await Category.insertMany(categories);
    console.log(`✅ ${inserted.length} categories seeded successfully`);

    inserted.forEach((cat) => console.log(`  - ${cat.name}`));

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding categories:', error.message);
    process.exit(1);
  }
};

seedCategories();
