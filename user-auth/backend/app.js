const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('./db')
const cors = require('cors')
const authenticate = require('./middleware/middleware')
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;

app.listen(PORT, (error) => {
  console.log(`app running on http://localhost:${PORT}`)
})

app.get('/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users')
    res.status(200).json({ message: result.rows})
  } catch(error) {
    res.status(501).json({error:error})
  }
})

app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await pool.query(
      `SELECT email
      FROM users
      WHERE email = $1
      `,
      [email]
    );
    console.log(existingUser.rowCount)
    if (existingUser.rowCount) return res.status(400).json({ message: "User already exists"});
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (email, password)
        VALUES ($1, $2)`, 
        [email, hashedPassword]
    );
    res.sendStatus(201);
  } catch(error) {
    console.log(error);
    res.status(500).json({ error: error});
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query(
      `SELECT email, password
      FROM users
      WHERE email = $1
      `,
      [email]
    );
    if (!user.rowCount) return res.status(400).json({ error: "user not found" });

    const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);
    if (!isPasswordValid) return res.status(400).json({ error: "Password is not correct" });

    const token = jwt.sign( {email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h'});

    res.status(200).json({ token });

  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/protected', authenticate, (req, res) => {
  res.status(200).json({ message: `Welcome` })
})