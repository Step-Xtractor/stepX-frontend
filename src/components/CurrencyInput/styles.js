import styled from 'styled-components'

export const InputBlock = styled.div`
  position: relative;
  margin-top: 1.4rem;

  &:focus-within::after{
    width: calc(100% - 3.2rem);
    height: 2px;
    content: '';
    background: var(--color-primary);
    position: absolute;
    left: 1.6rem;
    right: 1.6rem;
    bottom: 0;
  }

    >input {
      width: 100%;
      height: 4rem;
      margin-top: 0.8rem;
      border-radius: 0.8rem;
      background: var(--color-input-background);
      border: 1px solid var(--color-line-in-white);
      outline: 0;
      /* inline: 0; */
      /* padding: 0 1.6rem; */
      box-sizing: border-box;
      padding-left: 1.6rem;
      font: 1.4rem Poppins;
    }
`

export const Label = styled.label`
  margin-top: 7rem;
  font-size: 1.3rem;
`

export const InputError = styled.div`
  color: #dc143c;
  font-size: 1.2rem;
  margin-top: 0.8rem;
`