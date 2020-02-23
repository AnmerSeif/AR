import React, { useState } from 'react';
import {createGlobalStyle } from 'styled-components';

import AR from './components/AR';

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
  }
  body {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const ArSupportedContext = React.createContext<boolean>(false);

const Loader: React.FC = ({children}) => { 
  const [isLoading, setIsLoading] = useState(true);
  const [isArSupported, setIsArSupported] = useState(false);

  if(navigator.xr) {
    navigator.xr.isSessionSupported( 'immersive-ar' ).then( ( supported: boolean ) => {
      setIsArSupported(supported);
      setIsLoading(false);
    } ).catch( (error: any) => {
      setIsArSupported(false);
    });
  }

  if(isLoading) {
    return <h1>Loading...</h1>
  }

  if(!isArSupported) {
    return <h1>Not supported</h1>
  }

  return <ArSupportedContext.Provider value={isArSupported}>
      {children}
    </ArSupportedContext.Provider>
}


const App : React.FC = () => {
  
  return (
    <Loader>
      <GlobalStyle />
      <AR />
    </Loader>
  );
}

export default App;
