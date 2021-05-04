import React from 'react';

import {
  RadioContainer,
  FieldLabel,
  RadioBlock
 } from './styles'

function RadioGroup({ label, name, children, ...rest }) {
  return (
    <RadioContainer>
      <FieldLabel htmlFor={name} >{label}</FieldLabel>
      <RadioBlock htmlFor={name}>
        {children}
      </RadioBlock>
    </RadioContainer>
    // <RadioContainer>
    //   <FieldLabel htmlFor={name}>
    //     {label}
    //   </FieldLabel>
    //   <div style={{marginTop: '0.8rem'}}>
    //     <RadioBlock htmlFor={name}>
    //       {children}
    //     </RadioBlock>
    //   </div>
    // </RadioContainer>
  )
};

export default RadioGroup;