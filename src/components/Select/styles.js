import styled from "styled-components";

export const SelectBlock = styled.div`
  position: relative;
  margin-top: 1.4rem;
`;

export const Label = styled.label`
  font-size: 1.3rem;
`;

export const SelectItem = styled.select`
  width: 100%;
  height: 4rem;
  margin-top: 0.8rem;
  border-radius: 0.8rem;
  background: var(--color-input-background);
  border: 1px solid var(--color-line-in-white);
  outline: 0;
  padding: 0 1.6rem;
  font: 1.4rem Poppins;
  text-transform: uppercase;
  color: ${props => props.value === "" ? "gray" : "black"};

  option {
    color: black
  }

  &:focus-within::after {
    width: calc(100% - 3.2rem);
    height: 2px;
    content: "";
    background: var(--color-primary-light);
    position: absolute;
    left: 1.6rem;
    right: 1.6rem;
    bottom: 0;
    outline: 0;
  }

  &:disabled {
    background-color: #e6e6eb;
    color: #545454;
  }
`;

export const InputError = styled.div`
  color: #dc143c;
  font-size: 1.2rem;
  margin-top: 0.8rem;
`