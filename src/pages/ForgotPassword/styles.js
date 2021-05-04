import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';


export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;

  img {
    width: 50rem;
    margin-bottom: 0.8rem;
  }

  h1 {
    font: 700 2.4rem Poppins;
    color: var(--color-primary);
    margin-bottom: 0.8rem;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    /* transform: translateY(-50px); */
  }
  to {
    opacity: 1;
    /* transform: translateY(0); */
  }
`;
export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${fadeIn} 1s;

  form {
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: var(--color-primary);
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#1D374B')};
      }
    }
  }

  > a {
    color: var(--color-primary);
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#1D374B')};
    }
  }
`;

export const Button = styled.button`
  /* padding: 0 16; */
  width: 100%;
  margin-top: 1.6rem;

  height: 4rem;
  background: var(--color-primary);
  color: var(--color-button-text);
  border: 0;
  border-radius: 0.8rem;
  cursor: pointer;
  font: 700 1.6rem Poppins;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: background-color(0.2s);
  /* margin-top: 3.2rem; */
  outline: 0;

  &:hover {
    background: ${shade(0.2, '#1D374B')};
  }
`;
