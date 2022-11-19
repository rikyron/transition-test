import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  useFBX,
  Center,
  Loader,
  useProgress,
  Stats,
} from "@react-three/drei";
import { EffectComposer, SMAA, SSAO } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Suspense } from "react";

export default function App() {
  const { progress } = useProgress();

  const fbx = useFBX("/LadyK.fbx");

  return (
    <>
      <Canvas
        shadows
        gl={{ antialias: true }}
        camera={{
          position: [0, 0, 5],
          fov: 50,
          near: 0.1,
          far: 1000,
        }}
      >
        <color attach="background" args={["#525252"]} />
        <Stats />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[-10, 10, 5]}
          shadow-mapSize={[256, 256]}
          shadow-bias={-0.0001}
          castShadow
        />
        <Environment preset="city" />
        {/* <EffectComposer multisampling={0}>
          <SMAA />
          <SSAO blendFunction={BlendFunction.MULTIPLY} />
        </EffectComposer> */}
        <OrbitControls
          enableDamping
          dampingFactor={0.1}
          enablePan={false}
          enableZoom={true}
          autoRotate
          autoRotateSpeed={0.5}
          target={[0, 0, 0]}
        />

        <Suspense fallback={null}>
          <group>
            <Center>
              <primitive object={fbx} scale={0.02} />
            </Center>
          </group>
        </Suspense>
      </Canvas>
      {progress < 100 && <Loader />}
    </>
  );
}
