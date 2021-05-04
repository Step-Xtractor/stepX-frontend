import React from 'react';
import { Form } from 'formik';

import { FaArrowLeft } from 'react-icons/fa';

import { useHistory } from 'react-router-dom';

import {
  FormContainer,
  Main,
  Footer, 
  ButtonSubmit,
  ButtonBack
} from "./styles";

function FormComponent({ children, hasFooter = true , hasBack=false, style={}, saveButtonText='Salvar'}) {
  const history = useHistory();
  return(
    <FormContainer style={style}>
      <Main style={style?.mainComponent}>
        <Form>
            {children}
            {hasFooter &&
              <Footer>
                <div className="row">
                  { hasBack && 
                  <div className="col-2">
                  <ButtonBack onClick={()=>history.goBack()} type="button">
                    <FaArrowLeft size={12} />
                  </ButtonBack>
                </div>
                  }
                  <div className="col">
                    <ButtonSubmit type="submit">
                      {saveButtonText}
                    </ButtonSubmit>
                  </div>
                </div>
              </Footer>
            } 
            </Form>
      </Main>
    </FormContainer>
  )
};

export default FormComponent;