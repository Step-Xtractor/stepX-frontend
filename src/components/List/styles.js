import styled from "styled-components";

export const ListContainer = styled.div`
  width: 100vw;
  height: 100vh;
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
  /* padding: 0rem 2.4rem; */
  background: var(--color-box-footer);
  /* border-top: 1px solid var(--color-line-in-white); */
  margin-top: 3.2rem;

  /* @media (min-width: 700px) {
    padding: 4rem 6.4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  } */
  @media (max-width: 768px) {
    background: var(--color-box-base);
  }
`;

export const ButtonSubmit = styled.button`
  width: 100%;
  height: 4rem;
  background: var(--color-secundary);
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
  /* margin-top: 3.2rem; */
  outline: 0;
  &:hover {
    background: var(--color-secundary-dark);
  }

  svg {
    margin-right: 0.5rem;
  }

  /* @media (min-width: 700px) {
    width: 20rem;
    margin-top: 0;
  } */
`;

export const Table = styled.table`
  margin-top: 1.6rem;
  border-collapse: collapse;
  width: 100%;
  text-align: center;

  th,
  tr {
    border-bottom: 1px solid var(--color-line-in-white);
    padding: 0.8rem;
  }
`;

export const TableColumnNames = styled.tr`
  background-color: var(--color-primary);
`;

export const ColumnLabel = styled.th`
  font: 700 1.6rem Poppins;
  color: var(--color-button-text);
`;

export const TableData = styled.td`
  font: 500 1.4rem Poppins;
  padding: 0.8rem 0 0.8rem 0;

  a {
    color: var(--color-primary);
    text-decoration: underline;
    font-weight: 700;
  }
`;

export const SituationButton = styled.a`
  padding: 0.2rem 1rem;
  background: ${(props) =>
    props.situation ? "var(--color-secundary)" : "#dc143c"};
  color: var(--color-button-text);
  border: 0;
  cursor: pointer;
  font: 500 1.4rem Poppins;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: background-color 0.2s;
  /* margin-top: 3.2rem; */
  outline: 0;
  &:hover {
    background: ${(props) =>
      props.situation ? "var(--color-secundary-dark)" : "#ba1132"};
    color: var(--color-button-text);
  }
`;

export const FooterButton = styled.span`
  padding: 0.5rem 1rem;
  background: var(--color-primary);
  color: var(--color-button-text);
  border: 0;
  cursor: pointer;
  font: 700 1.4rem Poppins;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: background-color 0.2s;
  /* margin-top: 3.2rem; */
  outline: 0;
  margin-right: 0.8rem;

  &:hover {
    background: #2b4f6b;
    color: var(--color-button-text);
  }
  svg {
    margin-right: 0.3rem;
    vertical-align: middle;
  }
`;

export const InputError = styled.div`
  color: #dc143c;
  font-size: 1.2rem;
  margin-top: 0.8rem;
`;
