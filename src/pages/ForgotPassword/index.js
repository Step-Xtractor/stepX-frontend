import React from "react";
import { Formik, Form, Field } from "formik";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Link, useRouteMatch, useLocation } from "react-router-dom";

import Input from "../../components/Input";
import { initialValues } from "./formikProps";

import { Container, AnimationContainer, Button } from "./styles";

import logoImg from "../../assets/stepx.png";
import api from "../../services/api";

const ForgotPassword = () => {
  const MySwal = withReactContent(Swal);

  const query = new URLSearchParams(useLocation().search);;

  async function handleSubmit(values) {
    if(query.get('token')){
      api.patch('/users/recoverPassword?token='+query.get('token'), {senha: values.passwd}).then((e)=>{
        MySwal.fire('','Password changed','success');
      }).catch((e)=>{
        MySwal.fire('',e.response.data.message,'error');
      });
    }else{
      api.post('/users/requestPassword', {email: values.email}).then((e)=>{
        MySwal.fire('','Email sent to <b>'+values.email+'</b> , follow the instruction there to change your password','success');
      }).catch((e)=>{
        MySwal.fire('',e.response.data.message,'error');
      });
    }
    // try {
    //   await signIn({
    //     cpf: values.cpf,
    //     password: values.password
    //   });
    //   history.push('/landing');
    // } catch (error) {
    //   MySwal.fire({
    //     icon: 'error',
    //     title: 'Erro de autenticação!',
    //     text: 'Verifique se seu CPF e senha estão corretos',
    //   })
    // }
  }

  return (
    <Container>
      <AnimationContainer>
        <img src={logoImg} alt="STEP-X" />
        <Formik
          onSubmit={(values) => handleSubmit(values)}
          validateOnMount
          initialValues={initialValues}
        >
          <Form>
            {
              !query.get('token') &&  
              <Field as={Input} name="email" required type='email' placeholder="Your email" />
            }

            {     
              query.get('token') &&  
              <Field as={Input} name="passwd" minLength={8} required type='password' placeholder="Your new password" />
            }
            <Button type="submit">Send</Button>
          </Form>
        </Formik>

        <Link to="/">Back to login</Link>
      </AnimationContainer>
    </Container>
  );
};

export default ForgotPassword;
