import Session from "./Session";
import { Matrix4, Ray, WebGLRenderer } from "three";

export const defaultARData: ARData = {
  session: null,
  setSession: (session: Session | null) => {},
  matrix: new Matrix4(),
  reticleVisible: false,
  setReticleVisible: (visible: boolean) => {},
  hitMatrix: new Float32Array(16),
  setHitMatrix: (hitMatrix: any) => {},
  ray: new Ray()
};

export default interface ARData {
  session: Session | null;
  setSession: (session: Session | null) => void;
  matrix: Matrix4;
  reticleVisible: boolean;
  setReticleVisible: (visible: boolean) => void;
  hitMatrix: Float32Array;
  setHitMatrix: (hitMatrix: any) => void;
  ray: Ray;
}
