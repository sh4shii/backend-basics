import express from 'express';
import { login, register, refresh } from '../controller/authController.js';

const router = express.Router();

// Register
router.post('/register', register);

// Login
router.post('/login', login);

// Login
router.get('/refresh', refresh);

// module.exports = router;
export default router;


/*
 total endpoints can be
 1. /api/auth/register
 2. /api/auth/login

so frontend has now access to 2 apis:-
BASE_URL = http://localhost:5000

1. register/signup -> {BASE_URL}/api/auth/register
1. login -> {BASE_URL}/api/auth/login
*/