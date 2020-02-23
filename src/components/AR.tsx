import React, { useEffect, useState, Suspense } from 'react';
import { Canvas, useThree, Dom, useLoader } from 'react-three-fiber'
import { ARButton } from 'three/examples/jsm/webxr/ARButton';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// @ts-ignore
import arrowGLTF from '../models/arrow/model.gltf';

import Stars from './Stars';

const Arrow : React.FC = () => {
    const gltf = useLoader(GLTFLoader, arrowGLTF);
    const { gl } = useThree();
    useEffect(() => {
        gl.setPixelRatio( window.devicePixelRatio );
        gl.setSize( window.innerWidth, window.innerHeight );
    }, [gl])
    return <primitive object={gltf.scene} />
  }



const Scene: React.FC = () => {
    return <Stars count={1500} />
}

const AR: React.FC = () => {
    return (
        <>
            <Canvas vr onCreated={({gl}) => { document.body.appendChild(ARButton.createButton(gl))}}>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Scene />
                <Suspense fallback={<Dom><h1>Loading..</h1></Dom>}><Arrow /></Suspense>
            </Canvas>
        </>
    )
}

export default AR; 