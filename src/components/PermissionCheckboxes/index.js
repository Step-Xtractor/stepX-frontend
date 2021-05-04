import React from 'react';
import { Field } from 'formik';

import {
  PermissionContainer,
  GroupLabel,
  TypeLabel,
  Permission
 } from './styles'

function PermissionCheckboxes({ groupLabel, name, permissions, isCheckAll, setFieldValue, values, ...rest }) {
  const permissionsTypes = ["Inclusão", "Exclusão", "Consulta", "Alteração", "Impressão"]

  function handleCheckAll(checkBoxValue, inputValues, permissionInputName) {
    const permissionName = permissionInputName.replace('checkAllPermissons.', '');
    const permissionsEntriesList = Object.entries(inputValues);
    const checkboxValue = checkBoxValue === 'true' ? false : true;
    
    permissionsEntriesList.forEach((permissionEntry) => {
      if (permissionEntry[0] === 'profileName')
        return
      else {
        switch (permissionName) {
          case 'include':
            inputValues[permissionEntry[0]].include = checkboxValue;
            break;
          case 'exclude':
          inputValues[permissionEntry[0]].exclude = checkboxValue;
            break;
          case 'consult':
            inputValues[permissionEntry[0]].consult = checkboxValue;
            break;
          case 'change':
            inputValues[permissionEntry[0]].change = checkboxValue;
            break;
          case 'print':
            inputValues[permissionEntry[0]].print = checkboxValue;
            break;
          default:
            console.log('Erro');
        }
      }
    })
  }

  return (
    <PermissionContainer>
      {groupLabel &&
        <GroupLabel>
          {`${groupLabel}: `}
        </GroupLabel>
      }
      <div style={{ verticalAlign: 'middle', margin: '0.5rem 0 1rem 0' }}>
        {permissions.map((permission, index) => (
          <Permission key={permission[0]}>
            {isCheckAll
              ? (
                <>
                  <Field 
                    type="checkbox"
                    name={`${name}.${permission[0]}`}
                    onClick={(e) => handleCheckAll(e.target.value, values, `${name}.${permission[0]}`)}
                    {...rest}
                  />
                  <TypeLabel>{permissionsTypes[index]}</TypeLabel>
                </>
              )

              : (
                <>
                  <Field 
                    type="checkbox"
                    name={`${name}.${permission[0]}`}
                    {...rest}
                  />
                  <TypeLabel>{permissionsTypes[index]}</TypeLabel>
                </>
              )
            }
          </Permission>
        ))}
      </div>
      
    </PermissionContainer>
  )
};

export default PermissionCheckboxes;