import styled from "styled-components";
export const DropzoneSection = styled.section`
  font: 1.6rem Poppins;
`;

export const UploadButton = styled.button`
  width: 20%;
  height: 3rem;
  background: var(--color-primary);
  color: var(--color-button-text);
  border: 0;
  border-radius: 0.8rem;
  cursor: pointer;
  font: 700 1.6rem Poppins;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: background-color 0.2s;
  outline: 0;
  margin: 2.4rem auto 2.4rem;

  svg {
    margin-right: 0.4rem;
  }
  &:hover {
    background: #2b4f6b;
  }
`;

export const FileAside = styled.aside`
  font: 1.6rem Poppins;
  margin: 2.4rem auto 2.4rem;

  li {
    margin: 0.8rem 2.4rem;
  }
`;