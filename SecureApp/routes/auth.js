const express = require('express');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const router = express.Router();

const SECRET = "mysecretkey";

router.post('/register', async (req, res) => {

    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
        return res.status(400).send('Invalid Email');
    }

    const hashedPassword =
        await bcrypt.hash(password, 10);

    const users =
        JSON.parse(fs.readFileSync('users.json'));

    users.push({
        email,
        password: hashedPassword
    });

    fs.writeFileSync(
        'users.json',
        JSON.stringify(users, null, 2)
    );

    res.send('User Registered');
});

router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    const users =
      JSON.parse(fs.readFileSync('users.json'));

    const user =
      users.find(u => u.email === email);

    if (!user) {
        return res.status(404).send('User Not Found');
    }

    const match =
      await bcrypt.compare(
         password,
         user.password
      );

    if (!match) {
        return res.status(401)
          .send('Invalid Password');
    }

    const token =
      jwt.sign(
         { email: user.email },
         SECRET
      );

    res.json({ token });
});

module.exports = router;