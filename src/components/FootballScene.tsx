import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { CanvasTexture, Group, SRGBColorSpace } from 'three'
import type { Mesh } from 'three'

function Football() {
  const ball = useRef<Mesh>(null)
  const group = useRef<Group>(null)
  const pointer = useThree((state) => state.pointer)
  useFrame((_, delta) => {
    if (ball.current) {
      ball.current.rotation.y += delta * 0.18
      ball.current.rotation.x += delta * 0.035
    }
    if (group.current) {
      group.current.rotation.y = pointer.x * 0.12
      group.current.rotation.x = -pointer.y * 0.07
    }
  })
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 512
    const context = canvas.getContext('2d')!
    context.fillStyle = '#e8e8de'
    context.fillRect(0, 0, canvas.width, canvas.height)
    for (let row = 0; row < 7; row += 1) {
      for (let column = 0; column < 12; column += 1) {
        const x = column * 94 + (row % 2) * 47 - 10
        const y = row * 78 - 16
        context.beginPath()
        for (let corner = 0; corner < 6; corner += 1) {
          const angle = (Math.PI / 3) * corner + Math.PI / 6
          const px = x + Math.cos(angle) * 30
          const py = y + Math.sin(angle) * 28
          if (corner === 0) context.moveTo(px, py)
          else context.lineTo(px, py)
        }
        context.closePath()
        context.fillStyle = (row + column) % 3 === 0 ? '#18201b' : '#29342d'
        context.fill()
      }
    }
    const map = new CanvasTexture(canvas)
    map.colorSpace = SRGBColorSpace
    return map
  }, [])

  return (
    <group ref={group}>
      <Float speed={1.25} rotationIntensity={0.14} floatIntensity={0.34}>
        <mesh ref={ball} castShadow receiveShadow>
          <sphereGeometry args={[1.42, 64, 64]} />
          <meshStandardMaterial map={texture} roughness={0.56} metalness={0.02} />
        </mesh>
      </Float>
    </group>
  )
}

function StadiumLines() {
  return (
    <group rotation={[0.16, 0, -0.16]}>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1.6, -1]}>
        <ringGeometry args={[2.35, 2.39, 96]} />
        <meshBasicMaterial color="#b5eb43" transparent opacity={0.46} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1.61, -1]}>
        <ringGeometry args={[2.72, 2.75, 96]} />
        <meshBasicMaterial color="#b5eb43" transparent opacity={0.19} />
      </mesh>
    </group>
  )
}

function Scene({ reducedDetail }: { reducedDetail: boolean }) {
  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[-4, 5, 5]} intensity={3.2} castShadow />
      <pointLight position={[3, 1, 1]} color="#bcf55f" intensity={16} distance={8} />
      <pointLight position={[-3, -2, -3]} color="#c0d9d0" intensity={8} distance={7} />
      <StadiumLines />
      <Football />
      <Sparkles count={reducedDetail ? 26 : 70} scale={5.6} size={2.1} speed={0.2} color="#d1ff78" opacity={0.7} />
    </>
  )
}

function canRenderWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')))
  } catch {
    return false
  }
}

export default function FootballScene() {
  const [enabled, setEnabled] = useState(false)
  const [reducedDetail, setReducedDetail] = useState(false)
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const device = navigator as Navigator & { deviceMemory?: number }
    const lowPower = (device.deviceMemory !== undefined && device.deviceMemory <= 2) || navigator.hardwareConcurrency <= 2
    setReducedDetail(window.matchMedia('(max-width: 600px), (pointer: coarse)').matches)
    setEnabled(canRenderWebGL() && !reducedMotion && !lowPower)
  }, [])

  if (!enabled) {
    return <div className="ball-fallback" role="img" aria-label="A football floating above a lit stadium pitch"><span /></div>
  }

  return (
    <div className="football-canvas" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6.7], fov: 36 }} dpr={reducedDetail ? [1, 1.15] : [1, 1.5]} shadows={!reducedDetail} gl={{ alpha: true, antialias: !reducedDetail }}>
        <Suspense fallback={null}><Scene reducedDetail={reducedDetail} /></Suspense>
      </Canvas>
    </div>
  )
}