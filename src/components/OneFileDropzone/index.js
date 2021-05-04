import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import { FaFile } from 'react-icons/fa';

import { DropzoneSection, UploadButton, FileAside, FileLabel } from './styles';

function OneFileDropzone({ onFileUploaded, fileValueType, fileIndex, buttonLabel='Arquivo' }) {
  const onDrop = useCallback(acceptedFiles => {
      if (fileValueType) {
      console.log(fileIndex, fileValueType, acceptedFiles)
      onFileUploaded(fileIndex, fileValueType, acceptedFiles[0])

    } else {
      onFileUploaded(acceptedFiles)
    }
  }, [fileIndex, fileValueType, onFileUploaded])
  
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({onDrop, maxFiles:1});
  
  const files = acceptedFiles.map(file => (
    <span key={file.path}>
      {file.path}
    </span>
  ));

  return (
    <DropzoneSection className="container" >
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <UploadButton type="button">
          <FaFile size={15} />
          {buttonLabel}
        </UploadButton>
        {(!!files.length) && 
          <FileAside>
            <FileLabel>Arquivo: </FileLabel>
            <span>{files}</span>
          </FileAside>
        }
      </div>
      
    </DropzoneSection>
  );
}

export default OneFileDropzone