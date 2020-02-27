import React, { useRef, useEffect, useContext } from "react";
import { RingBufferGeometry, Mesh } from "three";
import { useAR, api } from "../App";
import shallow from "zustand/shallow";

const Reticle: React.FC = () => {
  const { reticleVisible, hitMatrix, session } = useAR(
    state => ({
      reticleVisible: state.reticleVisible,
      hitMatrix: state.hitMatrix,
      session: state.session
    }),
    shallow
  );
  const ringBufferGeometry = useRef<RingBufferGeometry | null>(null);
  const reticle = useRef<Mesh | null>(null);

  useEffect(() => {
    if (ringBufferGeometry !== null && ringBufferGeometry.current !== null) {
      ringBufferGeometry.current.rotateX(-Math.PI / 2);
    }

    const unsub = api.subscribe(
      hitMatrix => {
        reticle.current?.matrix.fromArray(hitMatrix as Float32Array);
      },
      state => state.hitMatrix
    );
  }, []);

  return (
    <mesh ref={reticle} matrixAutoUpdate={false} visible={reticleVisible}>
      <ringBufferGeometry
        attach="geometry"
        ref={ringBufferGeometry}
        args={[0.15, 0.2, 32]}
      />
      <meshBasicMaterial attach="material" />
    </mesh>
  );
};

export default Reticle;
