import React, { useState } from 'react';
import styled from 'styled-components';
import { useThree, Dom } from 'react-three-fiber';

enum SessionType {
    end = 'end'
}

export interface Session {
    addEventListener: (type: SessionType, handler: () => void ) => void;
    removeEventListener: (type: SessionType, handler: () => void ) => void;
    end: () => void;
}


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
    box-shadow: 0 0 10px 1px rgba(0,0,0,0.3);
`;

interface ARBUttonProps {
    setSession: (session: Session | null) => void;
}


const ARButton: React.FC<ARBUttonProps> = ({ setSession }) => {
    const [currentSession, setCurrentSession] = useState<Session | null>(null);

    const onSessionStarted = ( session : Session ) => {
        session.addEventListener( SessionType.end, onSessionEnded );

        setCurrentSession(session);
        setSession(session);
        console.dir(session);
    }

    const onSessionEnded = () => {
        if(currentSession !== null) {
            currentSession.removeEventListener( SessionType.end, onSessionEnded );
            setCurrentSession(null);
            setSession(null);
        }
    }

    const onARButtonClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(currentSession === null) {
            navigator.xr.requestSession( 'immersive-ar' ).then( onSessionStarted ).catch((error: any) => {
                console.log(error);
            });
        }
        //TODO: Not sure if needed
        else {
            setCurrentSession(null);
            setSession(null);
        }
    }

    return <Button onClick={onARButtonClicked}>{currentSession === null ? 'Start AR' : 'Stop AR'}</Button>
}

export default ARButton;