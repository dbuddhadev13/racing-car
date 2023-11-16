import { useGLTF } from '@react-three/drei'
import React, { FunctionComponent, useEffect } from 'react'

const Car: FunctionComponent = () => {
  const { scene: carMeshScene } = useGLTF('/3d/models/car.glb')

  useEffect(() => {
    carMeshScene.scale.set(0.0012, 0.0012, 0.0012)
    carMeshScene.children[0].position.set(-365, 0, -67)
  }, [carMeshScene])

  return <primitive object={carMeshScene} />
}

export default Car
