import React  from 'react';

import {
  TextAreaBlock,
  Label,
  InputTextArea
} from './styles';

function TextArea({ label, name, ...rest }) {
  return (
    <TextAreaBlock>
      <Label htmlFor={name}>{label}</Label>
      <InputTextArea id={name} {...rest} />
    </TextAreaBlock>
  );
}

export default TextArea;