import * as Yup from 'yup';

export default Yup.date().max((new Date()), 'Data máxima permitida é o dia de hoje');