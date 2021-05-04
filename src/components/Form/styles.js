import styled from "styled-components";

export const FormContainer = styled.div`
  // width: 100%;
  min-height: 100vh;
  flex-grow:1;
`;

export const Main = styled.main`
  background: var(--color-box-base);
  max-width: 74rem;
  border-radius: 0.8rem;
  margin: 3.2rem auto 3.2rem;
  /* padding-top: 6.4rem; */
  overflow: hidden;
  @media (max-width: 768px) {
    margin: 0rem auto 0rem;
  }
`;

export const Title = styled.h1`
  font: 700 2.4rem Poppins;
  color: var(--color-primary);
  margin: 4rem 0rem 4rem 0rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Fieldset = styled.fieldset`
  border: 0;
  padding: 0 2.4rem;
  margin: 0 0 2rem;
  
  & + fieldset {
    margin-top: 2rem;
  }

  @media (min-width: 700px) {
    padding: 0 6.4rem;
  }
`;

export const Subtitle = styled.legend`
  font: 700 1.8rem Poppins;
  color: var(--color-primary);
  /* margin-top: 3.8rem; */
  /* margin-bottom: 1.4rem; */
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 2px solid var(--color-primary);
`;

export const UnderSubtitle = styled.legend`
  font: 500 1.4rem Poppins;
  margin: 0.8rem 0 0.8rem 0;
  display: flex;
`;

export const Footer = styled.footer`
  padding: 0rem 2.4rem;
  background: var(--color-box-footer);
  border-top: 1px solid var(--color-line-in-white);
  margin-top: 3.8rem;

  @media (max-width: 768px) {
    margin-top: 0rem;
    background: var(--color-box-base);
  }
`;

export const ButtonSubmit = styled.button`
  width: 90%;
  height: 5.6rem;
  background: var(--color-secundary);
  color: var(--color-button-text);
  border: 0;
  border-radius: 0.8rem;
  cursor: pointer;
  font: 700 1.8rem Poppins;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: background-color 0.2s;
  /* margin-top: 3.2rem; */
  outline: 0;
  margin: 2.4rem auto 2.4rem;
  &:hover {
    background: var(--color-secundary-dark);
  }
`;


export const ButtonCircle = styled.button`
  width: 50px;
  height: 50px;
  background: var(--color-text-base);
  color: var(--color-button-text);
  border: 0;
  border-radius: 100%;
  cursor: pointer;
  font: 700 1.8rem Poppins;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: background-color 0.2s;
  /* margin-top: 3.2rem; */
  outline: 0;
  margin: 2.4rem auto 2.4rem;
  &:hover {
    background: var(--color-text-complement);
  }
`;

export const ButtonBack = styled.button`
  width: 90%;
  height: 5.6rem;
  background: var(--color-text-base);
  color: var(--color-button-text);
  border: 0;
  border-radius: 0.8rem;
  cursor: pointer;
  font: 700 1.8rem Poppins;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: background-color 0.2s;
  /* margin-top: 3.2rem; */
  outline: 0;
  margin: 2.4rem auto 2.4rem;
  &:hover {
    background: var(--color-text-complement);
  }
`;

export const ButtonDelete = styled.button`
  width: 90%;
  height: 5.6rem;
  background: #dc143c;
  color: var(--color-button-text);
  border: 0;
  border-radius: 0.8rem;
  cursor: pointer;
  font: 700 1.8rem Poppins;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: background-color 0.2s;
  /* margin-top: 3.2rem; */
  outline: 0;
  margin: 2.4rem auto 2.4rem;
  &:hover {
    background: #ba1132;
  }
`;

export const InputError = styled.div`
  color: #dc143c;
  font-size: 1.2rem;
  margin-top: 0.8rem;
`