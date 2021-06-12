import React, { useEffect, useMemo } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Box, useGLTF, OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { Suspense } from 'react'


const SceneBackground = ({ style }) => {
    return (
        <Canvas style={{...style}}>
            <Suspense fallback={null}>
                <ambientLight />
                <Stars />
            </Suspense>
            {/* <OrbitControls /> */}
        </Canvas>
    )
}

export default SceneBackground