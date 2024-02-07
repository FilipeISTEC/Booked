// server.js
const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./database');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // Importa o módulo jwt

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Rota para lidar com solicitações de login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows, fields] = await pool.query('SELECT * FROM Users WHERE Username = ?', [username]);
        if (rows.length > 0) {
            const user = rows[0];
            if (password === user.Password) {
                const token = jwt.sign({ username: user.Username }, 'M1nhaC#av3S3cr3ta&SupeR!Segur@P@raTok3nsJWT', { expiresIn: '1h' }); // Gera o token JWT
                res.json({ success: true, token }); // Retorna o token JWT
            } else {
                res.status(401).json({ success: false, message: 'Credenciais inválidas' });
            }
        } else {
            res.status(401).json({ success: false, message: 'Credenciais inválidas' });
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ success: false, message: 'Erro interno do servidor' });
    }
});

app.post("/caccount", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const [existingUserRows, existingUserFields] = await pool.query('SELECT * FROM Users WHERE Username = ?', [username]);
        if (existingUserRows.length > 0) {
            res.status(400).json({ success: false, message: 'Username already taken' });
            return;
        }

        // If the username is not taken, proceed to register the user
        const query = 'INSERT INTO Users (Username, Email, Password) VALUES (?, ?, ?)';
        const [insertRows, insertFields] = await pool.query(query, [username, email, password]);

        if (insertRows.affectedRows > 0) {
            const token = jwt.sign({ username }, 'your_secret_key', { expiresIn: '1h' }); // Gera o token JWT
            res.json({ success: true, token }); // Retorna o token JWT
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

