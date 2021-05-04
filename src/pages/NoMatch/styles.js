import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  color: var(--color-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ::-webkit-scrollbar {display:none;}
  img {
    width: 50rem;
  }
`;

export const Title = styled.div`
  font: 700 3rem Poppins;
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

  > a {
    color: var(--color-primary);
    display: block;
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
