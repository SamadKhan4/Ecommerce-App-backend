const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('✅ MongoDB Connected');

    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@tarzen.com' });
    
    if (adminExists) {
      console.log('ℹ️  Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      name: 'Tarzen Admin',
      email: 'admin@tarzen.com',
      phone: '9876543210',
      password: 'admin123', // This will be hashed by the model
      address: 'Tarzen Mobile Accessories Store, Main Market, City Center',
      role: 'admin',
    });

    console.log('✅ Admin user created successfully');
    console.log('\n📧 Email: admin@tarzen.com');
    console.log('🔑 Password: admin123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin:', error.message);
    process.exit(1);
  }
};

seedAdmin();
