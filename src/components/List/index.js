import React from 'react';
import { Form } from 'formik';

import {
  ListContainer,
  Main,
} from "./styles";

function ListComponent({ children }) {
  return(
    <ListContainer>
      <Main>
        <Form>
          {children}
        </Form>
      </Main>
    </ListContainer>
  )
};

export default ListComponent;