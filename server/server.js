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
                res.json({ success: true, userID: user.UserID, token }); // Retorna o token JWT e o UserID
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
app.get("/books", async (req, res) => {
    try {
        // Execute a consulta para obter os títulos e IDs de todos os livros
        const query = 'SELECT BookID AS id, Title FROM Books'; // Usando BookID como ID do livro
        const [rows, fields] = await pool.query(query);

        // Verifique se há dados retornados da consulta
        if (rows.length > 0) {
            // Se houver dados, retorne os títulos e IDs dos livros
            res.status(200).json(rows);
        } else {
            // Se não houver dados, retorne uma mensagem indicando que nenhum livro foi encontrado
            res.status(404).json({ success: false, message: 'No books found' });
        }
    } catch (error) {
        // Se ocorrer algum erro durante a execução da consulta, retorne uma mensagem de erro
        console.error('Error fetching books from database:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.post("/creview", async (req, res) => {
    const { title, body, userId, bookId, rating } = req.body; 

    try {
        const query = 'INSERT INTO Reviews (Title, Comment, UserId, BookId, Rating) VALUES (?, ?, ?, ?, ?)';
        const [insertRows, insertFields] = await pool.query(query, [title, body, userId, bookId, rating]);

        if (insertRows.affectedRows > 0) {
            res.status(201).json({ success: true, message: 'Review added successfully' });
        } else {
            res.status(500).json({ success: false, message: 'Failed to add review' });
        }
    } catch (error) {
        console.error('Error adding review to database:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.get('/reviews', async (req, res) => {
    try {
        const query = 'SELECT ReviewID, Title, Comment, UserId, Rating FROM Reviews';
        const [rows] = await pool.query(query);
        if (rows.length > 0) {
            res.status(200).json({ success: true, reviews: rows });
        } else {
            res.status(404).json({ success: false, message: 'No reviews found' });
        }
    } catch (error) {
        console.error('Error fetching reviews from database:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
app.post('/detailReview', async (req, res) => {
    const { id } = req.body;
    try {
        const query = 'SELECT * FROM Reviews WHERE ReviewID = ?'; 
        const [rows] = await pool.query(query, [id]); 
        if (rows.length > 0) {
            res.status(200).json({ success: true, review: rows[0] });
        } else {
            res.status(404).json({ success: false, message: 'Review not found' }); 
        }
    } catch (error) {
        console.error('Error fetching review from database:', error);
        res.status(500).json({ success: false, message: 'Internal server error' }); 
    }
});

app.post('/submitUser', async (req, res) => {
    const { id } = req.body;
    try {
        const query = 'SELECT Username FROM Users WHERE UserID = ?'; 
        const [rows] = await pool.query(query, [id]); 
        if (rows.length > 0) {
            res.status(200).json({ success: true, user: rows[0] });
        } else {
            res.status(404).json({ success: false, message: 'User not found' }); 
        }
    } catch (error) {
        console.error('Error fetching user from database:', error);
        res.status(500).json({ success: false, message: 'Internal server error' }); 
    }
});

app.post('/submitBook', async (req, res) => {
    const { id } = req.body; 
    try {
        const query = 'SELECT Title FROM Books WHERE BookID = ?';
        const [rows] = await pool.query(query, [id]); 
        if (rows.length > 0) {
            res.status(200).json({ success: true, book: rows[0] });
        } else {
            res.status(404).json({ success: false, message: 'Book not found' }); 
        }
    } catch (error) {
        console.error('Error fetching book from database:', error);
        res.status(500).json({ success: false, message: 'Internal server error' }); 
    }
});








app.listen(5000, () => {
    console.log("Server run on port 5000");
});

