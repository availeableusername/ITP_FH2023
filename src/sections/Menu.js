import { Box, Grid, Typography, FormControlLabel, Checkbox, Button } from '@mui/material';
import React, {useState, useRef} from 'react'
import axios from 'axios'

//import axios from './api/axios'
//const Login_URL='/auth';

export default function Menu() {      //export default function Menu() {

    const [inputs, setInputs] = useState('');      // const [inputs, setInputs] = useState({})
    
    /*const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const id = event.target.id;
        setInputs(values => ({...values, [id]: inputs}));     //setInputs(values => ({...values, [id]: inputs}));
    } */

    const handleSubmit = async (e) => {
        e.preventDefault();

       await axios.post('http://localhost:3050/menu', {inputs}); //'http://localhost:4000/api/user/save' http://localhost:3050/user/save
        console.log(inputs);
        //setInputs('');

    }                     //Menü auf 3 Pakete aufgeteilt, einfacher für die DB

  return (
    
  <form onSubmit={handleSubmit}>
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', backgroundColor: '#f3c23a' }}>
      <div style={{ width: '90%', maxWidth: '900px', margin: '0 auto', color: '#000', textAlign: 'center' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '2.5rem', marginTop: '0' }}>
          Choose from our Menu! Bon Appetit!
        </h3>
        <div style={{ marginTop: '1rem' }}>
          <label htmlFor="menuOne">Menu 1: Chickenbox, Chickenwings, Chickenburger, Chickennuggets, 3x Fries, Cola, Water 29,99€</label>
          <input
            type="checkbox"
            name="menuOne"
            id="1"
            value={'1'}
            onChange={(e) => setInputs(e.target.value)}
          />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label htmlFor="menuTwo">Menu 2: Chickenbox, Double Chickenburger, Chickenburger, 1x Fries, 2xCola, 2xWater 23,99€</label>
          <input
            type="checkbox"
            name="menuTwo"
            id="2"
            value={'2'}
            onChange={(e) => setInputs(e.target.value)}
          />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label htmlFor="menuThree">Menu 3: Chickennuggets, Chickenwings, Chickenbox, 3x Fries, Cola, Water 19,99€</label>
          <input
            type="checkbox"
            name="menuThree"
            id="3"
            value={3}
            onChange={(e) => setInputs(e.target.value)}
          />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label htmlFor="menuFour">Menu 4: Chickenburger, 1x Fries, Cola 12,99€</label>
          <input
            type="checkbox"
            name="menuFour"
            id="4"
            value={4}
            onChange={(e) => setInputs(e.target.value)}
          />
        </div>
        <button style={{ marginTop: '1rem' }}>Order now!</button>
      </div>
    </div>
  </form>

  )

}

