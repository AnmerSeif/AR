import React, { useRef, useMemo } from 'react';
import { useFrame } from 'react-three-fiber';
import { Object3D } from 'three';

interface StarsProps {
    count: number;
}

const Stars: React.FC<StarsProps> = ( {count} ) => {
    const mesh = useRef()
    const dummy = useMemo(() => new Object3D(), [])

    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
          const t = Math.random() * 100
          const factor = 20 + Math.random() * 100
          const speed = 0.01 + Math.random() / 200
          const xFactor = -50 + Math.random() * 100
          const yFactor = -50 + Math.random() * 100
          const zFactor = -50 + Math.random() * 100
          temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
        }
        return temp
      }, [count])

    useFrame(state => {
        // Run through the randomized data to calculate some movement
        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle
            // There is no sense or reason to any of this, just messing around with trigonometric functions
            t = particle.t += speed / 2
            const a = Math.cos(t) + Math.sin(t * 1) / 10
            const b = Math.sin(t) + Math.cos(t * 2) / 10
            const s = Math.cos(t)
            // Update the dummy object
            dummy.position.set(
            (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
            (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
            (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            )
            dummy.scale.set(s, s, s)
            dummy.rotation.set(s * 5, s * 5, s * 5)
            dummy.updateMatrix()
            // @ts-ignore
            mesh.current.setMatrixAt(i, dummy.matrix)
        })
        // @ts-ignore
        mesh.current.instanceMatrix.needsUpdate = true
    })

    return (
        <>
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <dodecahedronBufferGeometry attach="geometry" args={[0.2, 0]} />
            <meshPhongMaterial attach="material" color="black" />
        </instancedMesh>
        </>
    )
}

export default Stars;