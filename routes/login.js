const express = require('express');
const router = express.Router();
const { handleCreateUser, handleGetAllUsers, handleLoginUser } = require('../controllers/login');
const { authenticateToken } = require('../middlewares/authorization');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'userProfile/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

router.post('/createUser',upload.single('profileImage'), handleCreateUser);
router.get('/getUsers', handleGetAllUsers); 
router.post('/loginUser', handleLoginUser); 

module.exports = router;
