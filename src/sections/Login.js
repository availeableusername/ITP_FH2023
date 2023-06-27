import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import { Box, Typography, Grid, TextField, Button } from '@mui/material';
import axios from 'axios';

const Login_URL = '/auth'; //muss im Backend noch gecoded werden, soll sich dann an die Base_URL im axios.js File anhängen

const Login = () => {
  const {setAuth} = useContext(AuthContext);   
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {              //muss dann noch in einen Try Catch block gecoded werden, https://www.youtube.com/watch?v=X3qyxo_UTR4&t=1281s&ab_channel=DaveGray ab min 20
    e.preventDefault();
    await axios.post('http://localhost:3050/login', {email, password})
    .then(res => console.log(res))
    .catch(err => console.log(err));
    // Hier kannst du die Login-Logik implementieren, z.B. eine API-Anfrage senden oder den Login-Status verwalten

    /*console.log('Email:', email);
    console.log('Password:', password); */

    //const response = await axios.post("/log", {email, password})
    // Zurücksetzen der Formulardaten
    setEmail('');
    setPassword('');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5de9d',
      }}
    >
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 400,
          p: 3,
          backgroundColor: '#fff',
          borderRadius: 4,
        }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
