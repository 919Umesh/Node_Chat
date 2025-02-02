const User = require('../models/login');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const userProfile = multer({ dest: 'userProfile/' });
const SECRET_KEY = 'MIIEpAIBAAKCAQEAwICVGZOt79JZRG9d7NslU3aPVRzC2rtJJTq7G8848';

const handleCreateUser = async (req, res) => {
    try {
    
        const { name, email, password, gender, age, address } = req.body;
        const profileImage = req.file ? req.file.path : null;

        if (!name || !email || !password || !gender || !age || !address) {
        return res.status(400).json({ status: 400, message: 'All fields are required' });
      }

   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: 400, message: 'User with this email already exists' });
    }   


    const newUser = new User({ name, email, password, gender, age, address ,profileImage});

    await newUser.save();

    res.status(201).json({
        status: 201,
        message: 'User created successfully',
        user:newUser
      })
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'Server error, please try again later' });
    }
};

const handleGetAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });

        if (users.length === 0) {
            return res.status(404).json({
                status: 404,
                message: 'No users found',
            });
        }
        
        const userProfile = users.map(user => {
            return {
                ...user._doc, 
                profileImage: user.profileImage
                    ? `${req.protocol}://${req.get('https://node-chat-mvlu.onrender.com')}/${user.profileImage.replace(/\\/g, '/')}`
                    : null,
            };
        });

        res.status(200).json({
            status: 200,
            message: 'Users retrieved successfully',
            userProfile,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'Server error, please try again later' });
    }
};

function generateToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}

const handleLoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ status: 400, message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }

      if (user.password !== password) {
      return res.status(400).json({ status: 400, message: 'Invalid password' });
       }

        const token = generateToken({ id: user._id, email: user.email });

        
         const profileImageUrl = user.profileImage
         ? `${req.protocol}://${req.get('https://node-chat-mvlu.onrender.com')}/${user.profileImage.replace(/\\/g, '/')}`
         : null;
        
       res.status(200).json({
        status: 200,
        message: 'Login successful',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          gender: user.gender,
          age: user.age,
          address: user.address,
          profileImage: profileImageUrl,
        },
        token,
      });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'Server error, please try again later' });
    }
};

module.exports = { handleCreateUser, handleGetAllUsers, handleLoginUser };
