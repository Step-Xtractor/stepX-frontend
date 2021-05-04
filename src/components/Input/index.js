import React from 'react';
// import { FormattedMessage } from 'react-intl';

import {
  InputBlock,
  Label,
 } from './styles'

function Input({ label, name, ...rest }) {
  return (
    <>
      <InputBlock>  
        <Label htmlFor={name}>
          {/* <FormattedMessage 
            id={label}
            defaultMessage="batata"
            description=""
          /> */}
          {label}
        </Label>
        <input
          type="text"
          id={name}
          {...rest}
        />
      </InputBlock>
    </>
  )
};

export default Input;