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
  
    try {
      const [rows, fields] = await pool.query('SELECT * FROM Users WHERE Username = ?', [username]);
      if (rows.length > 0) {
        const user = rows[0];
        if (password === user.Password) {
          res.json({ success: true, message: 'Login bem-sucedido' });
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


app.listen(5000, () => {
  console.log("Server run on port 5000");
});
