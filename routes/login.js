// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const { handleCreateUser, handleGetAllUsers, handleLoginUser } = require('../controllers/login');
// const { authenticateToken } = require('../middlewares/authorization');


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, 'userProfile/'),
//     filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
// });

// const upload = multer({ storage });

// router.post('/createUser',upload.single('profileImage'), handleCreateUser);
// router.get('/getUsers', handleGetAllUsers); 
// router.post('/loginUser', handleLoginUser); 

// module.exports = router;


const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { handleCreateUser, handleGetAllUsers, handleLoginUser } = require('../controllers/login');

// Ensure the directory exists
const uploadDir = path.join(__dirname, '../userProfile');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Define routes
router.post('/createUser', upload.single('profileImage'), handleCreateUser);
router.get('/getUsers', handleGetAllUsers);
router.post('/loginUser', handleLoginUser);

module.exports = router;

