import React from 'react';

import {
  InputBlock,
  CheckboxInput,
  Label,
 } from './styles'

function Checkbox({ label, name, ...rest }) {
  return (
    <>
      <InputBlock>  
          <div>
            <div>
              <Label htmlFor={name}>
                {label}
              </Label>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <CheckboxInput
                id={name}
                type="checkbox"
                {...rest}
              />
            </div>
          </div>
      </InputBlock>
    </>
  )
};

export default Checkbox;