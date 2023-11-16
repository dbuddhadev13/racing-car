import { MeshReflectorMaterial } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { BufferAttribute, BufferGeometry, Material, Mesh, NormalBufferAttributes, Object3DEventMap } from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";

const Ground = () => {
      const gridMap = useLoader(
        TextureLoader,
        "/3d/textures/ground/grid.png"
      );
    
      const aoMap = useLoader(
        TextureLoader,
        "/3d/textures/ground/ground-ao.png"
      );
    
      const alphaMap = useLoader(
        TextureLoader,
        "/3d/textures/ground/alpha-map.png"
      );
    
      const meshRef = useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>(null!);
      const meshRef2 = useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>(null!);
    
      useEffect(() => {
        if (!gridMap) return;
        gridMap.anisotropy = 16;
      }, [gridMap]);
    
      useEffect(() => {
        if (!meshRef.current) return;
    
        var uvs = meshRef.current.geometry.attributes.uv.array;
        meshRef.current.geometry.setAttribute("uv2", new BufferAttribute(uvs, 2));
    
        var uvs2 = meshRef2.current.geometry.attributes.uv.array;
        meshRef2.current.geometry.setAttribute("uv2", new BufferAttribute(uvs2, 2));
      }, []);
    
      return (
        <>
          <mesh
            ref={meshRef2}
            position={[-2.285, -0.01, -1.325]}
            rotation-x={-Math.PI * 0.5}
          >
            <planeGeometry args={[12, 12]} />
            <meshBasicMaterial
              opacity={0.325}
              alphaMap={gridMap}
              transparent={true}
              color={"white"}
            />
          </mesh>
    
          <mesh
            ref={meshRef}
            position={[-2.285, -0.015, -1.325]}
            rotation-x={-Math.PI * 0.5}
            rotation-z={-0.079}
          >
            <circleGeometry args={[6.12, 50]} />
            <MeshReflectorMaterial
              aoMap={aoMap}
              alphaMap={alphaMap}
              transparent={true}
              color={[0.5, 0.5, 0.5]}
              envMapIntensity={0.35}
              metalness={0.05}
              roughness={0.4}
    
              dithering={true}
              blur={[1024, 512]} // Blur ground reflections (width, heigt), 0 skips blur
              mixBlur={3} // How much blur mixes with surface roughness (default = 1)
              mixStrength={30} // Strength of the reflections
              mixContrast={1} // Contrast of the reflections
              resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
              mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
              depthScale={0} // Scale the depth factor (0 = no depth, default = 0)
              minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
              maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
              depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [bl
              reflectorOffset={0.02} // Offsets the virtual camera that projects the reflection. Useful when the reflective
            ></MeshReflectorMaterial>
          </mesh>
        </>
      );}

export default Ground