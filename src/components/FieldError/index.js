import React from 'react';

import { ErrorMessage } from './styles'

function FieldError({children}) {
  return (
    <ErrorMessage>
      {children}
    </ErrorMessage>
  )
};

export default FieldError;