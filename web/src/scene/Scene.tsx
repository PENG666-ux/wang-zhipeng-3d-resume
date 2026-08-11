import { useRef } from 'react'
import { Float, Sparkles } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const SENSOR_POSITIONS: [number, number, number][] = [
  [-0.18, 1.72, 0.48],
  [0, 1.72, 0.48],
  [0.18, 1.72, 0.48],
  [-0.18, 0.56, 0.48],
  [0, 0.56, 0.48],
  [0.18, 0.56, 0.48],
  [-0.18, -1.72, 0.48],
  [0, -1.72, 0.48],
  [0.18, -1.72, 0.48],
]

const DAMAGE_POINT = new THREE.Vector3(0, -0.58, 0.64)

function PztNode({ position, index }: { position: [number, number, number]; index: number }) {
  const material = useRef<THREE.MeshStandardMaterial>(null)

  useFrame(({ clock }) => {
    if (!material.current) return
    material.current.emissiveIntensity = 1.3 + Math.sin(clock.elapsedTime * 2.4 + index * 0.7) * 0.55
  })

  return (
    <mesh position={position} rotation={[Math.PI / 2, 0, 0]} castShadow>
      <cylinderGeometry args={[0.115, 0.115, 0.075, 32]} />
      <meshStandardMaterial
        ref={material}
        color="#b7fff1"
        emissive="#35d8c5"
        emissiveIntensity={1.4}
        metalness={0.72}
        roughness={0.24}
      />
    </mesh>
  )
}

function GuidedPath({ start, bend }: { start: [number, number, number]; bend: number }) {
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(...start),
    new THREE.Vector3(bend, (start[1] + DAMAGE_POINT.y) * 0.5, 0.72),
    DAMAGE_POINT,
  ])

  return (
    <mesh>
      <tubeGeometry args={[curve, 48, 0.012, 6, false]} />
      <meshBasicMaterial color="#8af4e7" transparent opacity={0.48} />
    </mesh>
  )
}

function WaveRing({ index }: { index: number }) {
  const mesh = useRef<THREE.Mesh>(null)
  const material = useRef<THREE.MeshBasicMaterial>(null)

  useFrame(({ clock }) => {
    if (!mesh.current || !material.current) return
    const phase = (clock.elapsedTime * 0.24 + index / 5) % 1
    const scale = 0.45 + phase * 5.2
    mesh.current.scale.setScalar(scale)
    material.current.opacity = Math.pow(1 - phase, 1.7) * 0.5
  })

  return (
    <mesh ref={mesh} position={[DAMAGE_POINT.x, DAMAGE_POINT.y, 0.72]}>
      <ringGeometry args={[0.34, 0.365, 64]} />
      <meshBasicMaterial
        ref={material}
        color="#b8fff4"
        transparent
        opacity={0.4}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

function RailAssembly() {
  return (
    <group rotation={[0.05, -0.12, -0.1]}>
      <mesh position={[0, 2.48, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.4, 0.48, 0.95]} />
        <meshStandardMaterial color="#314a52" metalness={0.78} roughness={0.3} />
      </mesh>
      <mesh position={[0, -2.48, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.4, 0.48, 0.95]} />
        <meshStandardMaterial color="#263d45" metalness={0.82} roughness={0.28} />
      </mesh>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.56, 5.05, 0.82]} />
        <meshStandardMaterial color="#38545c" metalness={0.74} roughness={0.32} />
      </mesh>

      {SENSOR_POSITIONS.map((position, index) => (
        <PztNode key={`${position[0]}-${position[1]}`} position={position} index={index} />
      ))}

      {[0, 2, 4, 6, 8].map((sensorIndex, pathIndex) => (
        <GuidedPath
          key={sensorIndex}
          start={SENSOR_POSITIONS[sensorIndex]}
          bend={(pathIndex - 2) * 0.32}
        />
      ))}

      <mesh position={DAMAGE_POINT} rotation={[0, 0, Math.PI / 4]} castShadow>
        <octahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial
          color="#ff8d72"
          emissive="#ff4d38"
          emissiveIntensity={2.5}
          metalness={0.38}
          roughness={0.28}
        />
      </mesh>

      {Array.from({ length: 5 }, (_, index) => (
        <WaveRing key={index} index={index} />
      ))}
    </group>
  )
}

export default function Scene() {
  const rig = useRef<THREE.Group>(null)
  const cameraPosition = useRef(new THREE.Vector3())
  const lookTarget = useRef(new THREE.Vector3())

  useFrame(({ camera, clock }, delta) => {
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
    const progress = THREE.MathUtils.clamp(window.scrollY / maxScroll, 0, 1)
    const timelineProgress = THREE.MathUtils.smoothstep(progress, 0.03, 0.72)
    const damping = 1 - Math.exp(-delta * 2.8)

    if (rig.current) {
      const targetX = THREE.MathUtils.lerp(0, -3.15, timelineProgress)
      rig.current.position.x = THREE.MathUtils.lerp(rig.current.position.x, targetX, damping)
      rig.current.position.y = Math.sin(clock.elapsedTime * 0.38) * 0.08
      rig.current.rotation.y = THREE.MathUtils.lerp(
        rig.current.rotation.y,
        -0.12 + progress * 0.34,
        damping,
      )
      rig.current.rotation.z = Math.sin(clock.elapsedTime * 0.22) * 0.018
    }

    cameraPosition.current.set(
      THREE.MathUtils.lerp(0, 0.65, progress),
      THREE.MathUtils.lerp(0.45, 0.8, progress),
      THREE.MathUtils.lerp(14.2, 13.2, progress),
    )
    camera.position.lerp(cameraPosition.current, damping)
    lookTarget.current.set(THREE.MathUtils.lerp(0, -1.25, timelineProgress), 0, 0)
    camera.lookAt(lookTarget.current)
  })

  return (
    <>
      <color attach="background" args={['#9bb7b2']} />
      <fog attach="fog" args={['#9bb7b2', 15, 30]} />

      <hemisphereLight args={['#effff9', '#21343a', 1.9]} />
      <directionalLight
        castShadow
        position={[5, 7, 7]}
        intensity={3.2}
        color="#e8fff7"
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-5, 1, 4]} intensity={25} distance={12} color="#54d9ce" />
      <pointLight position={[4, -1, 3]} intensity={18} distance={10} color="#ffae8c" />

      <group ref={rig}>
        <Float speed={1.05} rotationIntensity={0.12} floatIntensity={0.18}>
          <RailAssembly />
        </Float>
      </group>

      <Sparkles count={110} scale={[14, 8, 8]} size={1.4} speed={0.22} color="#dbfff7" />
      <gridHelper
        args={[30, 30, '#568a89', '#789f9b']}
        position={[0, -3.15, 0]}
        rotation={[0, 0, 0]}
      />
    </>
  )
}
