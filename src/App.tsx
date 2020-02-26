import React, { useState } from "react";
import { createGlobalStyle } from "styled-components";

import AR from "./components/AR";
import ARData, { defaultARData } from "./models/ArAppData";
import Session from "./models/Session";
import { WebGLRenderer } from "three";
import ARButton from "./components/ARButton";

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

export const ArAppContext = React.createContext<ARData>(defaultARData);

const Loader: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isArSupported, setIsArSupported] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  const updateSession = (session: Session | null) => {
    setSession(session);
  };

  const arData: ARData = {
    session: session,
    setSession: updateSession
  };

  if (navigator.xr) {
    navigator.xr
      .isSessionSupported("immersive-ar")
      .then((supported: boolean) => {
        setIsArSupported(supported);
        setIsLoading(false);
      })
      .catch((error: any) => {
        setIsArSupported(false);
      });
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!isArSupported) {
    return <h1>Not supported</h1>;
  }

  return (
    <ArAppContext.Provider value={arData}>{children}</ArAppContext.Provider>
  );
};

const App: React.FC = () => {
  const [gl, setGL] = useState<WebGLRenderer | null>(null);

  return (
    <Loader>
      <GlobalStyle />
      <AR
        setGL={(gl: WebGLRenderer) => {
          setGL(gl);
        }}
      />
      {gl && <ARButton gl={gl} />}
    </Loader>
  );
};

export default App;
