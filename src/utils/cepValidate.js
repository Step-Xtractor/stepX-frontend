export default function cepValidate(cep = '') {	
  cep = cep.replace(/[^\d]+/g,'');
  if(cep.length !== 8)
    return false;
  return true;
}