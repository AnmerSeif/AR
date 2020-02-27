import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import Session, { SessionType } from "../models/Session";
import { useAR } from "../App";
import shallow from "zustand/shallow";

const Button = styled.button`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: none;
  border: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  text-transform: uppercase;
  font-weight: 900;
  background-color: black;
  color: white;
  border: 2px solid black;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.3);
`;

const ARButton: React.FC = () => {
  const {
    gl,
    session,
    setSession,
    ray,
    matrix,
    setHitMatrix,
    setReticleVisible
  } = useAR(
    state => ({
      gl: state.gl,
      session: state.session,
      setSession: state.setSession,
      ray: state.ray,
      matrix: state.matrix,
      setHitMatrix: state.setHitMatrix,
      setReticleVisible: state.setReticleVisible
    }),
    shallow
  );

  const onSessionStarted = (session: Session) => {
    setSession(session);
    session.addEventListener(SessionType.end, onSessionEnded);
    gl.xr.setReferenceSpaceType("local");
    gl.xr.setSession(session);

    const onXRFrame = (time: number, frame: any) => {
      const referenceSpace = gl.xr.getReferenceSpace();
      const pose = frame.getViewerPose(referenceSpace);

      if (pose) {
        matrix.fromArray(pose.transform.matrix);

        ray.origin.set(0, 0, 0);
        ray.direction.set(0, 0, -1);
        ray.applyMatrix4(matrix);

        // @ts-ignore
        const xrRay = new XRRay(ray.origin, ray.direction);

        session.requestHitTest(xrRay, referenceSpace).then((results: any) => {
          if (results.length) {
            var hitResult = results[0];

            setReticleVisible(true);
            setHitMatrix(hitResult.hitMatrix);
          } else {
            setReticleVisible(false);
          }
        });
      }
      session.requestAnimationFrame(onXRFrame);
    };

    session.requestAnimationFrame(onXRFrame);
  };

  const onSessionEnded = () => {
    if (session && session !== null) {
      session.removeEventListener(SessionType.end, onSessionEnded);
      setSession(null);
    }
  };

  const onARButtonClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (session === null) {
      navigator.xr
        .requestSession("immersive-ar")
        .then(onSessionStarted)
        .catch((error: any) => {
          console.log(error);
        });
    }
    //TODO: Not sure if needed
    else {
      setSession(null);
    }
  };

  return (
    <Button onClick={onARButtonClicked}>
      {session === null ? "Start AR" : "Stop AR"}
    </Button>
  );
};

export default ARButton;
