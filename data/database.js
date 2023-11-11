const mysql = require('mysql2');

// create a new MySQL connection
const connection = mysql.createConnection({
  host: 'mysql-db-booked-db-booked.a.aivencloud.com',
  port: '22962',
  user: 'avnadmin',
  password: 'AVNS_RPhw_BkpHf9EOr_l2sK',
  database: 'db-booked',
  connectTimeout: 10000
});


//-------------------------------Verificação de Login-------------------------------
function checkLogin(username, password, callback) {
  const sql = 'SELECT * FROM Users WHERE Username = ? AND Password = ?';
  connection.query(sql, [username, password], (error, results) => {
    if (error) {
      console.error('Error checking login:', error);
      callback(false); // Autenticação falhou devido a um erro
    } else {
      // Se houver resultados, as credenciais são válidas
      const isAuthenticated = results.length > 0;
      callback(isAuthenticated);
    }
  });
  connection.end();
}
/* Exemplo de uso
const username = 'joao123';
const password = 'senha123';
checkLogin(username, password, (isAuthenticated) => {
  if (isAuthenticated) {
    console.log('Login bem-sucedido!');
  } else {
    console.log('Falha no login. Credenciais inválidas.');
  }
});
*/
//-------------------------------Verificar se user ou email existe e se nao cria conta--------------------------------
function userOrEmailExists(username, email, callback) {
  const sql = 'SELECT * FROM Users WHERE Username = ? OR Email = ?';
  connection.query(sql, [username, email], (error, results) => {
    if (error) {
      console.error('Error checking username or email existence:', error);
      callback(false); // Falha devido a um erro
    } else {
      const exists = results.length > 0;
      callback(exists);
    }
  });
}
function createAccount(username, password, email, callback) {
  userOrEmailExists(username, email, (exists) => {
    if (exists) {
      callback(false); // Usuário ou email já existe
    } else {
      const sql = 'INSERT INTO Users (Username, Password, Email) VALUES (?, ?, ?)';
      connection.query(sql, [username, password, email], (error, results) => {
        if (error) {
          console.error('Error creating account:', error);
          callback(false); // Falha ao criar conta devido a um erro
        } else {
          callback(true); // Conta criada com sucesso
        }
      });
    }
  });
}
/*
// Exemplo de uso
const newUsername = 'lopes';
const newPassword = 'senha';
const newEmail = 'olga@example.com';
createAccount(newUsername, newPassword, newEmail, (isAccountCreated) => {
  if (isAccountCreated) {
    console.log('Conta criada com sucesso!');
  } else {
    console.log('Falha ao criar conta. Verifique os dados fornecidos.');
  }
  // Fechar a conexão após a operação
  connection.end();
});
*/






/*
// connect to the MySQL database
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database:', error);
  } else {
    console.log('Connected to MySQL database!');
  }
});

// close the MySQL connection
connection.end();
*/