const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');


cloudinary.config({ 
    cloud_name: 'dvyy9s6wa', 
    api_key: '629445168398351', 
    api_secret: 'mr5GDjTtWKWSp-gTc6R_UzXPRmA' 
});

const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png', 'jpeg'],
    filename: function (req, file, cb) {
      cb(null, file.originalname); 
    }
});


const uploadCloud = multer({ storage });

module.exports = uploadCloud;