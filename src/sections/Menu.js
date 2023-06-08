import { Checkbox } from '@mui/material'
import React, {useState, useRef} from 'react'
import axios from 'axios'

//import axios from './api/axios'
//const Login_URL='/auth';

export default function Menu() {

    const [inputs, setInputs] = useState({})
    
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:4000/api/user/save', inputs);
        console.log(inputs);

    }
  return (
    
    <form onSubmit={handleSubmit}>
        <h3>
            Choose from our Menu! Bon Appetit!
        </h3>
    <div>
        <label htmlFor="chickenbox">Chickenbox 7,30€</label>
        <input
          type="checkbox"
          name="chickenbox"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="chickenwings">Chickenwings 9,30€</label>
        <input
          type="checkbox"
          name="chickenwings"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="chickennuggets">Chickennuggets 6x 5,30€</label>
        <input
          type="checkbox"
          name="chickennuggets"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="chickenburger">Chickenburger 11,30€</label>
        <input
          type="checkbox"
          name="chickenburger"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="chickenburgerdouble">Chickenburger Double 16,30€</label>
        <input
          type="checkbox"
          name="chickenburgerdouble"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="fries">Fries 3,30€</label>
        <input
          type="checkbox"
          name="fries"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="cola">Cola 3,00€</label>
        <input
          type="checkbox"
          name="cola"
          onChange={handleChange}
        />
      </div>
      <button>Order now!</button>
      </form>

    
    
  )
}

