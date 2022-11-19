import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  useGLTF,
  Center,
  useProgress,
  Stats,
} from "@react-three/drei";
// import { EffectComposer, SMAA, SSAO } from "@react-three/postprocessing";
// import { BlendFunction } from "postprocessing";
import { Suspense, useState } from "react";

export default function App() {
  const [selectedModel, setSelectedModel] = useState<1 | 2 | 3 | 4>(1);

  // const fbx1 = useFBX("/LadyK.fbx");
  // const fbx2 = useFBX("purple-hero.fbx");
  // const fbx3 = useFBX("/Velf.fbx");
  // const fbx4 = useFBX("Yellow_Lady.fbx");

  const { loaded, total, progress } = useProgress();

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
              <Model selectedModel={selectedModel} />
            </Center>
          </group>
        </Suspense>
      </Canvas>
      {progress < 100 && (
        <div className="loading">
          Loading... {loaded}/{total} Elements
        </div>
      )}
      {progress === 100 && (
        <div className="interface">
          <button
            style={{
              backgroundColor: selectedModel === 1 ? "skyblue" : "white",
            }}
            onClick={() => setSelectedModel(1)}
          >
            LadyK
          </button>
          <button
            style={{
              backgroundColor: selectedModel === 2 ? "skyblue" : "white",
            }}
            onClick={() => setSelectedModel(2)}
          >
            Velf
          </button>
          <button
            style={{
              backgroundColor: selectedModel === 3 ? "skyblue" : "white",
            }}
            onClick={() => setSelectedModel(3)}
          >
            Purple Hero
          </button>
          <button
            style={{
              backgroundColor: selectedModel === 4 ? "skyblue" : "white",
            }}
            onClick={() => setSelectedModel(4)}
          >
            Yellow Lady
          </button>
        </div>
      )}
    </>
  );
}

const Model = ({ selectedModel }: { selectedModel: 1 | 2 | 3 | 4 }) => {
  const { scene } = useGLTF("/LadyK_out/LadyK.gltf");
  const { scene: scene2 } = useGLTF("/Velf_out/Velf.gltf");
  const { scene: scene3 } = useGLTF("/purple-hero_out/purple-hero.gltf");
  const { scene: scene4 } = useGLTF("/Yellow_Lady_out/Yellow_Lady.gltf");

  return (
    <primitive
      object={
        selectedModel === 1
          ? scene
          : selectedModel === 2
          ? scene2
          : selectedModel === 3
          ? scene3
          : selectedModel === 4
          ? scene4
          : null
      }
    />
  );
};
