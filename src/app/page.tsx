'use client'
import CanvasView from '@/components/canvas-view'
import Car from '@/components/models/car'
import Ground from '@/components/models/ground'
import Track from '@/components/models/track'
import { Physics } from '@react-three/cannon'
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import React, { Suspense, useEffect, useState } from 'react'
import { Vector3 } from 'three'

const HomePage = () => {
  const [thirdPersonMode, setThirdPersonMode] = useState<boolean>(false)
  const [cameraPosition, setCameraPosition] = useState<Vector3>(new Vector3(-5, 3.9, 6.21))

  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      if (e.key == 'k') {
        // random is necessary to trigger a state change
        if (thirdPersonMode) setCameraPosition(new Vector3(-6, 3.9, 6.21 + Math.random() * 0.01))
        setThirdPersonMode((current) => !current)
      }
    }

    window.addEventListener('keydown', keydownHandler)
    return () => window.removeEventListener('keydown', keydownHandler)
  }, [thirdPersonMode])

  return (
    <Suspense fallback={null}>
      <CanvasView className='w-full h-full min-h-screen'>
        <Physics broadphase='SAP' gravity={[0, -2.6, 0]}>
          <Environment background files={'/3d/textures/background/envmap.hdr'} />
          <PerspectiveCamera makeDefault position={cameraPosition} fov={42.5} />
          {!thirdPersonMode && <OrbitControls target={[-2.64, -0.71, 0.03]} />}
          <Track />
          <Ground />
          <Car thirdPersonMode={thirdPersonMode} />
        </Physics>
      </CanvasView>
    </Suspense>
  )
}

export default HomePage
