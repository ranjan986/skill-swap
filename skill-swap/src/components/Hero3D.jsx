import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, OrbitControls } from '@react-three/drei';

function FloatingShape() {
    const meshRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.x = t * 0.2;
            meshRef.current.rotation.y = t * 0.3;
            meshRef.current.position.y = Math.sin(t * 0.5) * 0.2;
        }
    });

    return (
        <Float speed={4} rotationIntensity={1} floatIntensity={2}>
            < mesh ref={meshRef} scale={2.8} >
                <icosahedronGeometry args={[1, 1]} />
                <meshStandardMaterial
                    color="#4f46e5"
                    emissive="#312e81"
                    emissiveIntensity={0.2}
                    roughness={0.1}
                    metalness={0.8}
                    wireframe
                />
            </mesh >
        </Float >
    );
}

function InnerShape() {
    return (
        <mesh scale={1.5}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial
                color="#6366f1"
                roughness={0.4}
                metalness={0.6}
            />
        </mesh>
    )
}

export default function Hero3D() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-60">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#60a5fa" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a78bfa" />

                <FloatingShape />
                {/* <InnerShape /> */}

                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    );
}
