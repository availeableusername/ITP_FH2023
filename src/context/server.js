const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const store = new session.MemoryStore();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use(session({
  secret : 'pass',
  cookie: { maxAge: 30000},
  saveUninitialized: false,
  store
}))

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

app.post("/login", (req, res) =>{
  console.log("The client tries to log in!");
  console.log(req.sessionID);
  const {username, password} = req.body;
  if(username & password){
    if(req.session.authenticated){
      res.json(req.session);
    }else{
      if(password == '123'){ // get the pass from the database
        res.session.authenticated = true;
        res.session. user = {
          username, password
        };
        res.json(req.session);
      }else{
        res.status(403).json({ msg: "Bad Credentials"});
      }
    }
  }else{
    res.status(403).json({ msg: "Bad Credentials"});

  }
  res.send(200);
});

app.listen(3050, () => {
  console.log('Server listening on port 3050');
});
