'use client'
import CanvasView from '@/components/canvas-view'
import Car from '@/components/models/car'
import Ground from '@/components/models/ground'
import Track from '@/components/models/track'
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import React, { Suspense } from 'react'

const HomePage = () => {
  return (
      <Suspense fallback={null}>
        <CanvasView className='w-full h-full min-h-screen'>
          <Environment background files={'/3d/textures/background/envmap.hdr'} />
          <PerspectiveCamera makeDefault position={[-5, 3.9, 6.21]} fov={42.5} />
          <OrbitControls target={[-2.64, -0.71, 0.03]} />
          <Track />
          <Ground />
          <Car />
        </CanvasView>
      </Suspense>
  )
}

export default HomePage
