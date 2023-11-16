import WheelDebug from '@/components/wheel-debug'
import useControls from '@/hooks/useControls'
import { useWheels } from '@/hooks/useWheels'
import { Triplet, useBox, useRaycastVehicle } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { FunctionComponent, useEffect, useRef } from 'react'
import { Group, Object3DEventMap, Quaternion, Vector3 } from 'three'

const Car: FunctionComponent<{ thirdPersonMode: boolean }> = ({ thirdPersonMode }) => {
  const { scene: carMeshScene } = useGLTF('/3d/models/car.glb')
  const position: Triplet = [-1.5, 0.5, 3]
  const width = 0.15
  const height = 0.07
  const front = 0.15
  const wheelRadius = 0.05

  const chassisBodyArgs: Triplet = [width, height, front * 2]
  const [chassisBody, chassisApi] = useBox<Group<Object3DEventMap>>(
    () => ({
      args: chassisBodyArgs,
      mass: 150,
      position,
    }),
    useRef(null),
  )

  const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius)

  const [vehicle, vehicleApi] = useRaycastVehicle<Group<Object3DEventMap>>(
    () => ({
      chassisBody,
      wheels,
      wheelInfos,
    }),
    useRef(null),
  )

  useControls(vehicleApi, chassisApi);

  useFrame((state) => {
    if(!thirdPersonMode || !chassisBody.current) return;

    let position = new Vector3(0,0,0);
    position.setFromMatrixPosition(chassisBody.current.matrixWorld);

    let quaternion = new Quaternion(0, 0, 0, 0);
    quaternion.setFromRotationMatrix(chassisBody.current.matrixWorld);

    let wDir = new Vector3(0,0,1);
    wDir.applyQuaternion(quaternion);
    wDir.normalize();

    let cameraPosition = position.clone().add(wDir.clone().multiplyScalar(1).add(new Vector3(0, 0.3, 0)));
    
    wDir.add(new Vector3(0, 0.2, 0));
    state.camera.position.copy(cameraPosition);
    state.camera.lookAt(position);
  });


  useEffect(() => {
    carMeshScene.scale.set(0.0012, 0.0012, 0.0012)
    carMeshScene.children[0].position.set(-365, 0, -67)
  }, [carMeshScene])

  // return <primitive object={carMeshScene} rotation-y={Math.PI / 2} />
  return (
    <group ref={vehicle} name='vehicle'>
      <group ref={chassisBody} name='chassisBody'>
        <primitive object={carMeshScene} rotation-y={Math.PI} position={[0, -0.09, 0]} />
      </group>
      <WheelDebug radius={wheelRadius} wheelRef={wheels[0]} />
      <WheelDebug radius={wheelRadius} wheelRef={wheels[1]} />
      <WheelDebug radius={wheelRadius} wheelRef={wheels[2]} />
      <WheelDebug radius={wheelRadius} wheelRef={wheels[3]} />
    </group>
  )
}

export default Car
