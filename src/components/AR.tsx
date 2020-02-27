import React from "react";
import { Canvas, CanvasContext } from "react-three-fiber";

import Stars from "./Stars";
import Reticle from "./Reticle";
import { useAR } from "../App";

const Scene: React.FC = () => {
  return <Stars count={1500} />;
};

const AR: React.FC = () => {
  const setGL = useAR(state => state.setGL);
  const onCreated = ({ gl }: CanvasContext) => {
    setGL(gl);
    gl.setPixelRatio(window.devicePixelRatio);
    gl.setSize(window.innerWidth, window.innerHeight);
  };

  return (
    <Canvas onCreated={onCreated} vr>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Scene />
      <Reticle />
    </Canvas>
  );
};

export default AR;
