import styled from "styled-components";

export const TextAreaBlock = styled.div`
  position: relative;
  margin-top: 1.4rem;
`;
export const Label = styled.label`
  font-size: 1.3rem;
`;
export const InputTextArea = styled.textarea`
  width: 100%;
  height: 16rem;
  min-height: 8rem;
  margin-top: 0.8rem;
  border-radius: 0.8rem;
  background: var(--color-input-background);
  border: 1px solid var(--color-line-in-white);
  outline: 0;
  /* padding: 1.2rem 1.6rem; */
  box-sizing: border-box;
  padding: 1.6rem 0rem 0rem 1.6rem;
  resize: vertical;
  font: 1.4rem Poppins;
  text-transform: uppercase;

  &:focus-within::after{
    width: calc(100% - 3.2rem);
    height: 2px;
    content: "";
    background: var(--color-primary-light);
    position: absolute;
    left: 1.6rem;
    right: 1.6rem;
    bottom: 7px;
  }

  &:disabled {
    background-color: #e6e6eb;
  }
`;