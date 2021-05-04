import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import { FaUpload } from 'react-icons/fa';

import { DropzoneSection, UploadButton, FileAside } from './styles';

function CustomDropzone({ onFileUploaded }) {
  const onDrop = useCallback(acceptedFiles => {
    onFileUploaded(acceptedFiles)
  }, [onFileUploaded])
  
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({onDrop});
  
  
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path}
    </li>
  ));

  return (
    <DropzoneSection className="container" >
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <UploadButton type="button">
          <FaUpload size={15} />
          Arquivos
        </UploadButton>
      </div>
      {(!!files.length) && 
        <FileAside>
          <h4>Lista de arquivos:</h4>
          <ul>{files}</ul>
        </FileAside>
      }
    </DropzoneSection>
  );
}

export default CustomDropzone