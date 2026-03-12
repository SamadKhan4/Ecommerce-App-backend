const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');
require('dotenv').config();

// Configure Cloudinary with validation
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

console.log('\n☁️  Cloudinary Configuration:');
console.log('   Cloud Name:', cloudName ? `✅ ${cloudName}` : '❌ Missing');
console.log('   API Key:', apiKey ? `✅ ${apiKey}` : '❌ Missing');
console.log('   API Secret:', apiSecret ? '✅ Set (hidden)' : '❌ Missing\n');

if (!cloudName || !apiKey || !apiSecret) {
  console.warn('⚠️  WARNING: Cloudinary credentials incomplete!');
  console.warn('   Uploads will fail. Check your .env file.\n');
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

// Upload file to Cloudinary
const uploadToCloudinary = async (filePath) => {
  try {
    if (!apiKey) {
      throw new Error('API Key missing - cannot upload to Cloudinary');
    }

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'auto',
      folder: 'tarzen-mobile-accessories',
    });
    
    // Delete local file after upload
    fs.unlinkSync(filePath);
    
    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error('\n❌ Cloudinary Upload Error:', error.message);
    console.error('   This usually means:\n');
    console.error('   1. Check CLOUDINARY_API_KEY in .env file');
    console.error('   2. Verify credentials on cloudinary.com/console');
    console.error('   3. Restart server after updating .env\n');
    throw error;
  }
};

// Delete file from Cloudinary
const deleteFromCloudinary = async (publicId) => {
  try {
    if (!apiKey) {
      throw new Error('API Key missing - cannot delete from Cloudinary');
    }
    
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Cloudinary deletion error:', error);
    throw new Error('Image deletion failed');
  }
};

module.exports = {
  cloudinary,
  uploadToCloudinary,
  deleteFromCloudinary,
};
