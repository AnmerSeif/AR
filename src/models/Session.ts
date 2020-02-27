export enum SessionType {
  end = "end"
}

export default interface Session {
  addEventListener: (type: SessionType, handler: () => void) => void;
  removeEventListener: (type: SessionType, handler: () => void) => void;
  requestAnimationFrame: (callback: (time: number, frame: any) => void) => void;
  requestHitTest: (xRay: any, referenceSpace: any) => Promise<void>;
  end: () => void;
}
