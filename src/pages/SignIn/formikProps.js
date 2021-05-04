import * as Yup from 'yup';

export const initialValues = {
  cpf: '',
  password: '',
}

export const validationSchema = 
  Yup.object({
    cpf: Yup.string()
      .min(11, 'O CPF deve possuir ao menos 11 caracteres.')
      .required('CPF obrigatório'),
    password: Yup.string()
      .required('Senha obrigatória'),
  })