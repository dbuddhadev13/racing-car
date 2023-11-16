import { useTrimesh } from '@react-three/cannon'
import { useLoader } from '@react-three/fiber'
import { FunctionComponent, useRef } from 'react'
import { BufferGeometry, NormalBufferAttributes } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const Ramp: FunctionComponent = () => {
  const result = useLoader(GLTFLoader, '/3d/models/ramp.glb')

  const geometry =  'geometry' in result.scene.children[0]
  ? (result.scene.children[0].geometry as BufferGeometry<NormalBufferAttributes>)
  : {} as any

  const vertices = geometry.attributes.position.array
  const indices = geometry.index.array

  const [ref] = useTrimesh(
    () => ({
      args: [vertices, indices],
      mass: 1,
      type: 'Static',
    }),
    useRef(null),
  )

  return <></>
}

export default Ramp
