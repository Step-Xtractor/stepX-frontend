import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Field } from 'formik';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Select from '../../../components/Select';
import SideBar from '../../../components/SideBar'
import FormComponent from '../../../components/Form';
import FieldError from '../../../components/FieldError';

import { Title, Fieldset } from '../../../components/Form/styles'

import { initialValues, validationSchema } from './formikProps';

import api from '../../../services/api';

import { useAuth } from '../../../hooks/auth';

function UserForm() {
  const [professionals, setProfessionals] = useState([]);
  const [profiles, setProfiles] = useState([]);

  const MySwal = withReactContent(Swal);
  const history = useHistory();

  const { token } = useAuth();

  useEffect(() => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;;
  },[token])

  useEffect(() => {
    api.get('professionals').then(response => {
      const reducedProfessionals = response.data.map(fullProfessional => ({
        value: fullProfessional.cpf,
        label: fullProfessional.nome
      }))
      setProfessionals(reducedProfessionals);
    });

    api.get('profiles').then(response => {
      const reducedProfiles = response.data.map(fullProfile => ({
        value: fullProfile._id,
        label: fullProfile.nome
      }))
      setProfiles(reducedProfiles);
    })
  }, [])
  
  function handleSubmit(values) {
    api.patch(`professionals/${values.professional}`, {
      "credenciais.permissao": values.profile
    }).then(() => {
      MySwal.fire({
        icon: 'success',
        title: 'Permissão alterada com sucesso!',
        text: 'Você será redirecionado(a) para a página inicial.',
        timer: 2000,
        onClose: () => {
          history.push('/landing')
        }
      })
    }).catch(() => {
      MySwal.fire({
        icon: 'error',
        title: 'Ocorreu um erro na alteração de permissão!',
        timer: 4000,
      })
    })
  }

  return (
    <>
      <SideBar />
      <Formik
        onSubmit={(values) => handleSubmit(values)}
        validateOnMount
        initialValues={initialValues}
        validationSchema={validationSchema}
        >
          {({ errors, touched, handleChange, handleBlur, setFieldValue }) => (
            <FormComponent>
              <Title>Novo Usuário</Title>
              <Fieldset>
                <Field
                  as={Select} 
                  name="professional"
                  label="Nome"
                  onChange={handleChange}
                  options={professionals}
                />
                { errors.professional && touched.professional &&
                  <FieldError>
                    {errors.professional}
                  </FieldError>
                }
                <Field
                  as={Select} 
                  name="profile"
                  label="Perfil"
                  onChange={handleChange}
                  options={profiles}
                />
                { errors.profile && touched.profile &&
                  <FieldError>
                    {errors.profile}
                  </FieldError>
                }
              </Fieldset>
            </FormComponent>
          )}
        </Formik>
    </>
  );
}

export default UserForm;