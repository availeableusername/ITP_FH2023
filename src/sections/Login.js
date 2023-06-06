import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';

const Login_URL = '/auth'; //muss im Backend noch gecoded werden, soll sich dann an die Base_URL im axios.js File anhängen

const Login = () => {
  const {setAuth} = useContext(AuthContext);   
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {              //muss dann noch in einen Try Catch block gecoded werden, https://www.youtube.com/watch?v=X3qyxo_UTR4&t=1281s&ab_channel=DaveGray ab min 20
    e.preventDefault();
    // Hier kannst du die Login-Logik implementieren, z.B. eine API-Anfrage senden oder den Login-Status verwalten
    console.log('Email:', email);
    console.log('Password:', password);
    const response = await axios.post("/log", {email, password})
    // Zurücksetzen der Formulardaten
    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
