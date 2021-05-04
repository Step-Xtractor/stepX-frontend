import React, { useEffect } from 'react';
import {
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';
import { decode } from 'jsonwebtoken';

import { useAuth } from '../hooks/auth';

const Route = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user, signOut } = useAuth();
  const token = localStorage.getItem('@Step:token');

  useEffect(() => {
    if (token) {
      const tokenExpirationDate = decode(token).exp;
      const nowDate = Date.now()/1000;
  
      tokenExpirationDate < nowDate
        ? signOut()
        : console.log('Não expirou')
    }
  },[token, signOut])

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : 'landing',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
