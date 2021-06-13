import React, { useEffect, useMemo } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Box, useGLTF, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { Suspense } from 'react'

const TShirt = ({img}) => {
    const texture = useLoader(THREE.TextureLoader, img)
    const gltf = useGLTF('/uploads/scene.glb')

    const { camera } = useThree()
    useEffect(() => {
        camera.position.z = 2
    }, [])

    const sphere = useMemo(() => {
        const geometry = gltf.nodes.Sphere.geometry.clone()
        const material = gltf.nodes.Sphere.material.clone()
        material.map = texture
        return new THREE.Mesh(geometry,material)
    }, [gltf])

    useFrame((state, dt)=>{
        sphere.rotation.y += 0.1 * dt
        
    })

    return (
        <group>
            <primitive object={sphere} rotation={[Math.PI,0,0]} scale={[5,5,5]}/>
            {/* <mesh geometry={sphere.geometry} material={sphere.material} material-map={texture} scale={[10,10,10]} rotation={[Math.PI,0,0]} /> */}
            <mesh geometry={gltf.nodes.Shirt_on_Hanger_1.geometry} material={gltf.nodes.Shirt_on_Hanger_1.material} material-map={texture} />
        </group>
    )
}

const Scene = ({product}) => {
    return (
        <Canvas style={{height:'100vh', borderRadius:'25px'}}>
            <Suspense fallback={null}>
                <ambientLight intensity={0.2} />
                <pointLight intensity={0.5} position={0,0.5,0.5} />
                <group scale={[2,2,2]}>
                    <TShirt img={product.image} />
                </group>
            </Suspense>
            <OrbitControls />
        </Canvas>
    )
}

export default Scene