import styled from 'styled-components';

export const Container = styled.div`
  min-width: 80vw;
  min-height: 100vh;
  width:100%;
  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: top-center;
  ::-webkit-scrollbar {
    display:none;
  }
  
  img {
    width: 60rem;
  }
`;