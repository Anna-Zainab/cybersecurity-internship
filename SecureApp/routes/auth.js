const express = require('express');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const router = express.Router();

const SECRET = "mysecretkey";

/* --- Week 5: CSRF-Protected Register Route --- */
router.post('/register', async (req, res) => {

    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
        return res.status(400).send('Invalid Email');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const users = JSON.parse(fs.readFileSync('users.json'));

    users.push({
        email,
        password: hashedPassword
    });

    fs.writeFileSync(
        'users.json',
        JSON.stringify(users, null, 2)
    );

    // Week 5: Log successful registration
    console.log(`[CSRF] User registered: ${email}`);
    res.send('User Registered');
});

/* --- Week 5: CSRF-Protected Login Route --- */
router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    const users = JSON.parse(fs.readFileSync('users.json'));

    const user = users.find(u => u.email === email);

    if (!user) {
        console.log(`[CSRF] Login failed: User ${email} not found`);
        return res.status(404).send('User Not Found');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        console.log(`[CSRF] Login failed: Invalid password for ${email}`);
        return res.status(401).send('Invalid Password');
    }

    const token = jwt.sign(
        { email: user.email },
        SECRET
    );

    console.log(`[CSRF] Login successful: ${email}`);
    res.json({ 
        token,
        message: 'Login successful — CSRF protection is active!'
    });
});

module.exports = router;