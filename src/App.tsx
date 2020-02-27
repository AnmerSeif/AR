import React, { useState } from "react";
import { createGlobalStyle } from "styled-components";
import create from "zustand";

import AR from "./components/AR";
import ARData, { defaultARData } from "./models/ArAppData";
import Session from "./models/Session";
import { WebGLRenderer, Matrix4, Ray } from "three";
import ARButton from "./components/ARButton";

export const [useAR, api] = create(set => ({
  gl: null,
  setGL: (gl: WebGLRenderer) => set(state => (state.gl = gl)),
  count: 0,
  increase: () => set(state => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
  session: null,
  setSession: (session: Session | null) =>
    set(state => (state.session = session)),
  matrix: new Matrix4(),
  reticleVisible: true,
  setReticleVisible: (visible: boolean) =>
    set(state => (state.reticleVisible = visible)),
  hitMatrix: new Float32Array(16),
  setHitMatrix: (hitMatrix: any) => set(state => (state.hitMatrix = hitMatrix)),
  ray: new Ray()
}));

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
  }
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1f1f1f;
  }
`;

const Loader: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isArSupported, setIsArSupported] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [reticleVisible, setReticleVisible] = useState<boolean>(
    defaultARData.reticleVisible
  );
  const [hitMatrix, setHitMatrix] = useState<Float32Array>(
    defaultARData.hitMatrix
  );

  const updateSession = (session: Session | null) => {
    setSession(session);
  };

  const updateReticleVisible = (reticleVisible: boolean) => {
    setReticleVisible(reticleVisible);
  };

  const updateHitMatrix = (hitMatrix: Float32Array) => {
    setHitMatrix(hitMatrix);
  };

  const arData: ARData = {
    ...defaultARData,
    session: session,
    setSession: updateSession,
    reticleVisible: reticleVisible,
    setReticleVisible: updateReticleVisible,
    hitMatrix: hitMatrix,
    setHitMatrix: updateHitMatrix
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

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Loader>
      <GlobalStyle />
      <AR />
      <ARButton />
    </Loader>
  );
};

export default App;
