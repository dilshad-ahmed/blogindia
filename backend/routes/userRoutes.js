const express = require('express');
const { registration, getAllUsers, login, logout } = require('../contorollers/userController');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated');

router.route("/registration").post(registration);
router.route("/users").get(isAuthenticated, getAllUsers);
router.route("/login").post(login)
router.route("/logout").get(logout)



module.exports = router;