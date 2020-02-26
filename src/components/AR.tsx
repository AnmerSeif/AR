import React from "react";
import { Canvas, CanvasContext } from "react-three-fiber";

import Stars from "./Stars";
import { WebGLRenderer } from "three";

const Scene: React.FC = () => {
  return <Stars count={1500} />;
};

interface ARProps {
  setGL: (gl: WebGLRenderer) => void;
}

const AR: React.FC<ARProps> = ({ setGL }) => {
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
    </Canvas>
  );
};

export default AR;
