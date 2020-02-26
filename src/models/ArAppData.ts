import Session from "./Session";

export const defaultARData: ARData = {
  session: null,
  setSession: (session: Session | null) => {}
};

export default interface ARData {
  session: Session | null;
  setSession: (session: Session | null) => void;
}
