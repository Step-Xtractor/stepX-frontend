import React from 'react';

import { Link } from 'react-router-dom';

import { Container, AnimationContainer, Title } from './styles';

import noMatchImg from '../../assets/Person with a cold-bro.svg';

const NoMatch = () => {
  return (
    <Container>
      <AnimationContainer>
        <Title>Página Não Encontrada</Title>
        <img src={noMatchImg} alt='cold' />
        <Link to="/">Voltar</Link>
        </AnimationContainer>
    </Container>
  );
};

export default NoMatch;