import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field } from 'formik';
import Swal from 'sweetalert2';
import { FaSearch, FaPlus } from 'react-icons/fa';

import Input from '../../../components/Input';
import Select from '../../../components/Select';
import SideBar from '../../../components/SideBar'
import ListComponent from '../../../components/List';

import { Title, Fieldset, Table, TableColumnNames, ColumnLabel, TableData, SituationButton, Footer, FooterButton, ButtonSubmit } from '../../../components/List/styles'

import { initialValues } from './formikProps';

import api from '../../../services/api';

import { useAuth } from '../../../hooks/auth';

function UserList() {
  const [searchType, setSearchType] = useState('CPF');
  const [profiles, setProfiles] = useState([]);
  const [users, setUsers] = useState({allUsers: []});

  const { token } = useAuth();

  useEffect(() => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },[token]);

  useEffect(() => {
    api.get('profiles').then(response => {
      const reducedProfiles = response.data.map(fullProfile => ({
        value: fullProfile._id,
        label: fullProfile.nome
      }))
      setProfiles(reducedProfiles);
    })
  }, []);

  async function handleSubmit(values) {
    const searchParam = searchType === 'CPF' 
      ? {cpf: values.cpf}
      : {'credenciais.permissao': values.profile};
      
    const response = await api.get('professionals', {
      params: searchParam,
    });

    if(response.data.length) {
      const reducedUsers = response.data.map(fullUser => ({
        id: fullUser._id,
        nome: fullUser.nome,
        cpf: fullUser.cpf,
        perfil: fullUser.credenciais.permissao.nome,
        ativo: fullUser.ativo
      }))
  
      setUsers({allUsers: reducedUsers});
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Usuários não encontrados.',
        timer: 2000,
      })
      setUsers({allUsers: []})
    };
  }

  function handleSearchType(e, setFieldValue) {
    setSearchType(e.target.value);
    if (e.target.value === 'CPF') setFieldValue('cpf', '')
    console.log(e.target.value)
    setFieldValue('searchMode', e.target.value)
  }

  function handleSituation(cpf, name) {
    Swal.fire({
      title: `Você deseja alterar a situação de ${name}?`,
      showCancelButton: true,
      confirmButtonText: `Sim`,
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        const userIndex = users.allUsers.findIndex(user => user.cpf === cpf )
        let newArray = [...users.allUsers]
        newArray[userIndex] = {...newArray[userIndex], ativo: !newArray[userIndex].ativo}
        setUsers({allUsers: newArray});

        api.patch(`professionals/${cpf}`, {
          ativo: newArray[userIndex].ativo
        })
        Swal.fire('Situação alterada', '', 'success')
      }
    })
  }

  return (
    <>
      <SideBar />
      <Formik
        onSubmit={(values) => handleSubmit(values)}
        validateOnMount
        initialValues={initialValues}
        >
          {({ errors, touched, handleChange, handleBlur, setFieldValue }) => (
            <ListComponent>
              <Title>Usuários</Title>
              <Fieldset>
              <div style={{display: "flex",   justifyContent: "space-between"}}>
                <div style={{width: '36%', marginTop: '-3.8rem'}}>
                  <Field
                    as={Select}
                    name="searchMode"
                    label="Buscar por:"
                    onChange={(e) => handleSearchType(e, setFieldValue)}
                    options={[
                      { value: 'CPF', label: 'CPF' },
                      { value: 'Perfil', label: 'Perfil' },
                    ]}
                  />
                </div>
                { (searchType === 'CPF') 
                  ? (
                      <div style={{width: '36%', marginTop: '-2.1rem'}}>
                        <Field
                          as={Input} 
                          name="cpf"
                          placeholder="Insira o CPF"
                        />
                      </div>
                  )
                  :  
                    <div style={{width: '36%', marginTop: '-3.8rem'}}>
                      <Field
                        as={Select} 
                        name="profile"
                        label="Tipo de Perfil"
                        onChange={handleChange}
                        options={profiles}
                      />
                    </div>
                }
                <div style={{width: '21%'}}>
                  <ButtonSubmit type="submit">
                    <FaSearch size={15}/>
                    Buscar
                  </ButtonSubmit>
                </div>
              </div>

              <Table>
                <tbody>
                  <TableColumnNames>
                    <ColumnLabel>Profissional</ColumnLabel>
                    <ColumnLabel>CPF</ColumnLabel>
                    <ColumnLabel>Perfil</ColumnLabel>
                    <ColumnLabel>Situação</ColumnLabel>
                  </TableColumnNames>
                  {users.allUsers && users.allUsers.map((user) => (
                    <tr key={user.id}>
                      <TableData>{user.nome}</TableData>
                      <TableData>{user.cpf}</TableData>
                      <TableData>{user.perfil}</TableData>
                      <TableData>
                        <SituationButton 
                          onClick={() => {handleSituation(user.cpf, user.nome)}}
                          situation={user.ativo}
                        >
                          {user.ativo && 'Ativo'}
                          {!user.ativo && 'Inativo'}
                        </SituationButton>
                      </TableData>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Footer>
                <Link to='/users/new'>
                  <FooterButton type="submit">
                    <FaPlus size={12}/>
                    Novo Usuário
                  </FooterButton>
                </Link>
              </Footer>
              </Fieldset>
            </ListComponent>
          )}
        </Formik>
    </>
  );
}

export default UserList;