import styled from 'styled-components'

export const RadioContainer = styled.div`
  margin-top: 1.4rem;

    >input {
      margin-top: 0.8rem;
      border-radius: 0.8rem;
      background: var(--color-input-background);
      border: 1px solid var(--color-line-in-white);
      outline: 0;
      box-sizing: border-box;
      padding-left: 1.6rem;
      font: 1.4rem Poppins;
    }
`

export const FieldLabel = styled.label`
  font-size: 1.3rem;
`

export const RadioBlock = styled.div`
  font-size: 1.4rem;
  margin-top: 0.8rem;
  div {
    >input {
    margin-right: 0.3rem;
    font: 1.4rem Poppins;
    vertical-align: middle;
  }

    >label {
      font-size: 1.4rem;
      margin-right: 0.8rem;
      vertical-align: middle;
    }
  }
  >input {
    margin-right: 0.3rem;
    font: 1.4rem Poppins;
    vertical-align: middle;
  }

  >label {
    font-size: 1.4rem;
    margin-right: 0.8rem;
    vertical-align: middle;
  }
`