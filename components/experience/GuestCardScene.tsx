"use client";

import { Canvas, type ThreeEvent, useFrame } from "@react-three/fiber";
import { Environment, Float, RoundedBox, Text } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import type { Invitation } from "@/data/invitations";

function Card({ invitation }: { invitation: Invitation }) {
  const group = useRef<THREE.Group>(null);
  const [flipped, setFlipped] = useState(false);
  const [dragging, setDragging] = useState(false);
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!group.current) return;
    const restingY = flipped ? Math.PI : 0;
    const targetX = dragging ? -pointer.current.y * 0.13 : -0.07;
    const targetY = restingY + (dragging ? pointer.current.x * 0.18 : 0.12);
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      targetX,
      5,
      delta,
    );
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      targetY,
      5,
      delta,
    );
  });

  const updatePointer = (event: ThreeEvent<PointerEvent>) => {
    const bounds = (
      event.nativeEvent.currentTarget as HTMLCanvasElement
    ).getBoundingClientRect();
    pointer.current = {
      x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 2,
      y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 2,
    };
  };

  return (
    <Float floatIntensity={0.16} rotationIntensity={0.08} speed={1.2}>
      <group
        ref={group}
        onClick={() => setFlipped((value) => !value)}
        onPointerDown={(event) => {
          event.stopPropagation();
          setDragging(true);
          updatePointer(event);
        }}
        onPointerMove={(event) => {
          if (dragging) updatePointer(event);
        }}
        onPointerOut={() => setDragging(false)}
        onPointerUp={() => setDragging(false)}
      >
        <RoundedBox args={[3.4, 2.12, 0.12]} radius={0.12} smoothness={8}>
          <meshPhysicalMaterial
            clearcoat={0.78}
            clearcoatRoughness={0.22}
            color="#090909"
            metalness={0.72}
            roughness={0.24}
          />
        </RoundedBox>

        <group position={[0, 0, 0.066]}>
          <Text
            anchorX="left"
            anchorY="top"
            color="#f2efe8"
            fontSize={0.17}
            letterSpacing={0.18}
            position={[-1.42, 0.78, 0]}
          >
            FEVER
          </Text>
          <Text
            anchorX="left"
            color="#c58a42"
            fontSize={0.18}
            letterSpacing={0.08}
            position={[-1.42, 0.2, 0]}
          >
            HONORED GUEST
          </Text>
          <Text
            anchorX="left"
            color="#f2efe8"
            fontSize={0.14}
            letterSpacing={0.04}
            position={[-1.42, -0.62, 0]}
          >
            {invitation.fullName.toUpperCase()}
          </Text>
          <Text
            anchorX="left"
            color="#a8a49b"
            fontSize={0.095}
            letterSpacing={0.08}
            position={[-1.42, -0.82, 0]}
          >
            MEMBER {invitation.memberNumber}
          </Text>
          <Text
            anchorX="right"
            color="#6e4d25"
            fontSize={0.48}
            position={[1.37, -0.72, 0]}
          >
            ∞
          </Text>
        </group>

        <group position={[0, 0, -0.066]} rotation={[0, Math.PI, 0]}>
          <Text
            anchorX="left"
            anchorY="top"
            color="#f2efe8"
            fontSize={0.16}
            letterSpacing={0.18}
            position={[-1.42, 0.78, 0]}
          >
            FEVER
          </Text>
          <Text
            color="#c58a42"
            fontSize={0.17}
            letterSpacing={0.06}
            position={[0, 0.32, 0]}
          >
            LIFETIME VIP ACCESS
          </Text>
          <Text color="#f2efe8" fontSize={0.5} position={[0, -0.05, 0]}>
            {String(invitation.complimentaryShots).padStart(2, "0")}
          </Text>
          <Text
            color="#a8a49b"
            fontSize={0.12}
            letterSpacing={0.06}
            position={[0, -0.46, 0]}
          >
            COMPLIMENTARY SHOTS
          </Text>
          <Text
            color="#6e4d25"
            fontSize={0.1}
            letterSpacing={0.12}
            position={[0, -0.72, 0]}
          >
            EVERY VISIT
          </Text>
        </group>
      </group>
    </Float>
  );
}

export default function GuestCardScene({
  invitation,
  lowPower,
}: {
  invitation: Invitation;
  lowPower: boolean;
}) {
  return (
    <Canvas
      camera={{ fov: 36, position: [0, 0, 5.1] }}
      dpr={lowPower ? 1 : [1, 1.5]}
      frameloop="always"
      gl={{
        alpha: true,
        antialias: !lowPower,
        powerPreference: "high-performance",
      }}
    >
      <ambientLight intensity={0.18} />
      <spotLight
        angle={0.5}
        color="#c58a42"
        intensity={28}
        penumbra={0.8}
        position={[2.5, 3, 3]}
      />
      <pointLight color="#ffffff" intensity={5} position={[-3, 0, 2]} />
      <Card invitation={invitation} />
      {!lowPower && <Environment preset="night" />}
    </Canvas>
  );
}
