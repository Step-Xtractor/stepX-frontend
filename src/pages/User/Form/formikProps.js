import * as Yup from 'yup';

export const initialValues = {
  professional: '',
  profile: '',
}

export const validationSchema = 
  Yup.object({
    professional: Yup.string()
      .required('Campo obrigatório'),
    profile: Yup.string()
      .required('Campo obrigatório'),
  })