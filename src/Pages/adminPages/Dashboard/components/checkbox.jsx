import React, { useState } from 'react';

const Checkbox = (params) => {
  const [checked, setChecked] = useState(false);
  
  return (
    <div className="checkbox-wrapper-56">
      <label className="container">
        <input 
          type="checkbox" 
          checked={checked} 
          onChange={() => {setChecked(!checked); params.checked();}} 
          className='select-checkbox'
          value={params.val}
        />
        <div className="checkmark"></div>
      </label>

      <style>
        {`
          .checkbox-wrapper-56 *,
          .checkbox-wrapper-56 ::after,
          .checkbox-wrapper-56 ::before {
            box-sizing: border-box;
          }

          .checkbox-wrapper-56 .container input {
            opacity: 1;
            -webkit-appearance: none;
            cursor: pointer;
            height: 25px;
            width: 25px;
            border-radius: 50%;
            border: 1px solid #ececec;
            outline: none;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s;
          }

          .checkbox-wrapper-56 .container {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .checkbox-wrapper-56 .container input::after {
            transition: 0.5s;
            font-family: monospace;
            content: '';
            color: #fff;
            font-size: 25px;
            left: 0.45em;
            top: 0.25em;
            width: 0.25em;
            height: 0.5em;
            border: solid #fff;
            border-width: 0 0.15em 0.15em 0;
            transform: rotate(45deg);
          }

          .checkbox-wrapper-56 .container input:checked {
            border-color: #15e38a;
            transition: 0.5s;
          }

          .checkbox-wrapper-56 .container input:checked::after {
            transition: 0.5s;
            border: solid #15e38a;
            border-width: 0 0.15em 0.15em 0;
            transform: rotate(45deg);
          }
        `}
      </style>
    </div>
  );
};

export default Checkbox;
