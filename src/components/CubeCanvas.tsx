import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const BlueCube = () => {
  return (
    <mesh castShadow>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
};

const CubeCanvas = () => {
  return (
    <Canvas
      className="cursor-pointer w-full h-1/3"
      camera={{ position: [3, 3, 5], fov: 45 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
      <BlueCube />
      <OrbitControls />
    </Canvas>
  );
};

export default CubeCanvas;
