import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'mysql-db-booked-db-booked.a.aivencloud.com',
  port: 22962,
  user: 'avnadmin',
  password: 'AVNS_RPhw_BkpHf9EOr_l2sK',
  database: 'db-booked',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}).promise();

const note = await getUsers(joao123,senha123)
console.log(note)


async function getUsers(user,password){
  const [rows] = await pool.query(`
    SELECT * 
    FROM Users 
    WHERE Username = ${user} AND Password = ${password}
  `)
  return rows
}

