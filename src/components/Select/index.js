import React from 'react';

import {
  SelectBlock,
  Label,
  SelectItem,
} from './styles'

function Select({ label, name, options, touched, defaultOption = 'Selecione uma opção', ...rest }) {
  return (
    <>
      <SelectBlock>
        <Label htmlFor={name}>{label}</Label>
        <SelectItem id={name} value="" {...rest}>
          <option value="" defaultValue disabled hidden >{defaultOption}</option>
          {options.map(option => (
            <option key={option.value} value={option.value} >{option.label}</option>
          ))}
        </SelectItem>
      </SelectBlock>
    </>
  )
}

export default Select;