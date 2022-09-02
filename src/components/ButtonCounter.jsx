import React, { useState } from 'react'
import Button from './Button';

export default function ButtonCounter() {
    let buttons = [
        {color: 'primary', step: 1},
        {color: 'danger', step: 10},
        {color: 'info', step: 100},
        {color: 'warning', step: 1000},
      ]
      // set a state for count - initial state of 0 and setCount is function to change state value of count
      const [count, setCount] = useState(0);
   
      // create an effect -> function to execute after every render
      
  
      // function to be executed when a button is clicked
      function handleClick(step){
          setCount(count + step)
      };
    return (
        <>
            <h1 className='text-center'>Hello React World</h1>
            <h3 className='text-center'>Total: {count}</h3>
            {buttons.map((b, i) => <Button color={b.color} step={b.step} key={i} handleClick={handleClick} />)}
        </>
    )
}
