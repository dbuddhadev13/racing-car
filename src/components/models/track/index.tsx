import { useGLTF } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { FunctionComponent, useEffect } from 'react'
import { BufferGeometry, NormalBufferAttributes } from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

const Track: FunctionComponent = () => {
  const result = useGLTF('/3d/models/track.glb')
  const colorMap = useLoader(TextureLoader, '/3d/textures/track/track.png')

  useEffect(() => {
    colorMap.anisotropy = 16
  }, [colorMap])

  let geometry = 'geometry' in result.scene.children[0] ? result.scene.children[0].geometry as  BufferGeometry<NormalBufferAttributes>  : undefined

  return (
    <>
      <mesh geometry={geometry}>
        <meshBasicMaterial toneMapped={false} map={colorMap} />
      </mesh>
    </>
  )
}

export default Track
