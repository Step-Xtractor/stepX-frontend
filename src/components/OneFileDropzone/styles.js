import styled from "styled-components";

export const DropzoneSection = styled.section`
  font: 1.6rem Poppins;
`;

export const UploadButton = styled.button`
  width: 100px;
  height: 2.4rem;
  background: var(--color-primary);
  color: var(--color-button-text);
  border: 0;
  border-radius: 0.8rem;
  cursor: pointer;
  font: 700 1.5rem Poppins;
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: center; */
  text-decoration: none;
  transition: background-color 0.2s;
  outline: 0;
  margin: 1.4rem 0.8rem 1.4rem 0;
  vertical-align: middle;

  svg {
    margin-right: 0.4rem;
    vertical-align: middle;
  }
  &:hover {
    background: #2b4f6b;
  }
`;

export const FileAside = styled.span`
  font: 1.2rem Poppins;
  margin: 1.4rem auto;

  li {
    margin: 0.8rem 2.4rem;
  }
`;

export const FileLabel = styled.span`
  font: 700 1.2rem Poppins;
`