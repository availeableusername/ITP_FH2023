const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'webshop'
});

app.get('/user', (req, res) => {
  const sql = 'SELECT * FROM user';
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post('/login', (req, res) => {
  const sql = 'SELECT * FROM user WHERE email = ? AND password = ?';

  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) return res.json('Login failed');
    if (data.length > 0) {
      return res.json('Login successful');
    } else {
      return res.json('Password or email wrong');
    }
  });
});

app.post('/register', (req, res) => {
  const sql = 'INSERT INTO user (firstname, lastname, email, password) VALUES (?)';
  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.password
  ];

  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json('Error');
    }
    return res.json(data);
  });
});

app.get('/', (req, res) => {
  return res.json('From Backend Side');
});

app.listen(3050, () => {
  console.log('Server listening on port 3050');
});
