export enum SessionType {
  end = "end"
}

export default interface Session {
  addEventListener: (type: SessionType, handler: () => void) => void;
  removeEventListener: (type: SessionType, handler: () => void) => void;
  requestAnimationFrame: (callback: (time: number, frame: any) => void) => void;
  end: () => void;
}
