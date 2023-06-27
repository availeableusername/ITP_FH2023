import React, { useState } from 'react';
import { Box, Typography, Grid, TextField, Button } from '@mui/material';
import axios from 'axios';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3050/register', {firstName, lastName, email, password})
    .then(res => console.log(res))
    .catch(err => console.log(err));
    axios.get('http://localhost:3050/user')
    .then(res => console.log(res));

    /*console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Email:', email);
    console.log('Password:', password); */

    // Zurücksetzen der Formulardaten
    setFirstName('');
    setLastName('');
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
          Register
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <TextField
              label="First Name"
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Last Name"
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              id="email"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
