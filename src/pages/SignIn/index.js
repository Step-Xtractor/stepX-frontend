import React from "react";
import { Formik, Form, Field } from "formik";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link, useHistory } from "react-router-dom";

import Input from "../../components/Input";
import { initialValues } from "./formikProps";

import { useAuth } from "../../hooks/auth";
import { Container, AnimationContainer, Button } from "./styles";

import logoImg from "../../assets/stepx.png";

const SignIn = () => {
  const MySwal = withReactContent(Swal);

  const { signIn } = useAuth();
  const history = useHistory();

  async function handleSubmit(values) {
    try {
      await signIn({
        cpf: values.cpf,
        password: values.password,
      });

      history.push("/landing");
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Authentication error!",
        text: "Verify if e-mail and password are correct",
      });
    }
  }

  return (
    <Container>
      <AnimationContainer>
        <img src={logoImg} alt="STEP-X" style={{ width: "50%" }} />
        <Formik
          onSubmit={(values) => handleSubmit(values)}
          validateOnMount
          initialValues={initialValues}
        >
          <Form>
            <Field as={Input} name="cpf" placeholder="E-mail" />

            <Field
              as={Input}
              name="password"
              type="password"
              placeholder="Password"
            />
            <Button type="submit">Login</Button>
          </Form>
        </Formik>

        <Link to="recoverPassword">Forgot password</Link>
      </AnimationContainer>
    </Container>
  );
};

export default SignIn;
