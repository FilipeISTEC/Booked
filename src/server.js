// server.js
const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./database');
const cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(cors());
// Rota para lidar com solicitações de login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
});

app.post("/caccount", async (req, res) => {
  const { title, rating, comment } = req.body;
  try {
    const [existingUserRows, existingUserFields] = await pool.query('SELECT * FROM Reviews WHERE ReviewID = ?', [username]);

    // If the username is not taken, proceed to register the user
    const query = 'INSERT INTO Reviews (BookID, Rating, Comment) VALUES (?, ?, ?)';
    const [insertRows, insertFields] = await pool.query(query, [title, rating, comment]);

    if (insertRows.affectedRows > 0) {
      res.json({ success: true, message: 'User registered successfully' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to register user' });
    }
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ success: false, message: 'Internal server error register' });
  }
});


app.listen(5000, () => {
  console.log("Server run on port 5000");
});