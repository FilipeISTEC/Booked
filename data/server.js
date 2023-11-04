const express = require('express');
const mysql = require('mysql')
const cors = require('cors')

const app = express();
app.use(cors())

const db=mysql.createConnection({
    host: "mysql-db-booked-db-booked.a.aivencloud.com",
    user: 'avnadmin',
    password: 'AVNS_RPhw_BkpHf9EOr_l2sK',
    database: 'db-booked',
})


app.get('/', (re,res)=> {
    return res.render("From Backend side");
});



app.get('/reviews', (req,res)=> {
    const sql = "SELECT * FROM Reviews";
    db.query(sql, (err, data)=> {
        if(err) return res.json(err);
        return res.json(data);
    })
});

app.get('/users', (req,res)=> {
    const sql = "SELECT * FROM Users";
    db.query(sql, (err, data)=> {
        if(err) return res.json(err);
        return res.json(data);
    })
});


app.listen(22962, ()=> {
    console.log("listening on");
});