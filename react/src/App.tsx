import { OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";  
import { StitchShader } from "./StitchShader";
 

function App() {
  return (
    <div
      className="App"
      style={{
        height: "100vh",
        width: "100vw"
      }}
    >
    <Canvas>
      <OrthographicCamera makeDefault position={[0, 0, 1]} />
      <StitchShader />
    </Canvas>
    </div>
  );
}

export default App;