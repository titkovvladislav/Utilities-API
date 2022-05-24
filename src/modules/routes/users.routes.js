const express = require('express');
const router = express.Router();

const {
    createNewUser,
    loginUser,
    logoutUser,
    refreshToken,
    allUsers
} = require('../controllers/users.controllers');

// User routes
router.post('/registration', createNewUser);
router.post('/login', loginUser);
// router.post('/logout', logoutUser);
// router.get('/refresh', refreshToken);
router.get('/users', allUsers);


module.exports = router;
