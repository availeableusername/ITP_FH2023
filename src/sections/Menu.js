import { Checkbox } from '@mui/material'
import React, {useState, useRef} from 'react'

export default function Menu() {
  return (
    
    <form>
        <h3>
            Choose from our Menu! Bon Appetit!
        </h3>
    <div>
        <label htmlFor="chickenbox">Chickenbox 7,30€</label>
        <input
          type="checkbox"
          id="chickenbox"
        />
      </div>
      <div>
        <label htmlFor="chickenwings">Chickenwings 9,30€</label>
        <input
          type="checkbox"
          id="chickenwings"
        />
      </div>
      <div>
        <label htmlFor="chickennuggets">Chickennuggets 6x 5,30€</label>
        <input
          type="checkbox"
          id="chickennuggets"
        />
      </div>
      <div>
        <label htmlFor="chickenburger">Chickenburger 11,30€</label>
        <input
          type="checkbox"
          id="chickenburger"
        />
      </div>
      <div>
        <label htmlFor="chickenburgerdouble">Chickenburger Double 16,30€</label>
        <input
          type="checkbox"
          id="chickenburgerdouble"
        />
      </div>
      <div>
        <label htmlFor="fries">Fries 3,30€</label>
        <input
          type="checkbox"
          id="fries"
        />
      </div>
      <div>
        <label htmlFor="cola">Cola 3,00€</label>
        <input
          type="checkbox"
          id="cola"
        />
      </div>
      <button>Order now!</button>
      </form>

    
    
  )
}

