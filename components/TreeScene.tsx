'use client'
import { useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'

const NUM_PETALS = 140
const TREE_HEIGHT = 4.2

interface PetalData {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  turbOffset: number
  turbFreq: number
}

function buildTreeGeometry(group: THREE.Group, branchMat: THREE.MeshStandardMaterial): THREE.Vector3[] {
  const tipPositions: THREE.Vector3[] = []

  function addBranch(
    origin: THREE.Vector3,
    direction: THREE.Vector3,
    length: number,
    radius: number,
    depth: number,
    seed: number
  ) {
    const geo = new THREE.CylinderGeometry(radius * 0.55, radius, length, 6)
    const mesh = new THREE.Mesh(geo, branchMat)

    const up = new THREE.Vector3(0, 1, 0)
    const normDir = direction.clone().normalize()
    const q = new THREE.Quaternion()
    if (Math.abs(normDir.dot(up)) < 0.9999) {
      q.setFromUnitVectors(up, normDir)
    }
    mesh.quaternion.copy(q)
    mesh.position.copy(origin).add(normDir.multiplyScalar(length * 0.5))
    group.add(mesh)

    const tip = origin.clone().add(direction.clone().normalize().multiplyScalar(length))

    if (depth >= 3) {
      const count = 7 + (seed % 4)
      for (let i = 0; i < count; i++) {
        const sx = ((seed * 1.3 + i * 7.1) % 2) - 1
        const sy = ((seed * 0.9 + i * 5.3) % 1.6) - 0.8
        const sz = ((seed * 1.7 + i * 3.9) % 1.6) - 0.8
        tipPositions.push(
          tip.clone().add(new THREE.Vector3(sx * 0.22, sy * 0.22, sz * 0.15))
        )
      }
      return
    }

    const numForks = depth === 0 ? 4 : depth === 1 ? 3 : 2
    const baseAzimuth = (seed * 1.618) % (Math.PI * 2)

    for (let i = 0; i < numForks; i++) {
      const azimuth = baseAzimuth + (i / numForks) * Math.PI * 2 + ((seed + i) % 7) * 0.18
      const tilt = 0.38 + ((seed * 0.7 + i * 1.3) % 0.42)

      const nx = Math.sin(tilt) * Math.cos(azimuth)
      const ny = Math.cos(tilt)
      const nz = Math.sin(tilt) * Math.sin(azimuth) * 0.45

      addBranch(
        tip,
        new THREE.Vector3(nx, ny, nz),
        length * (0.58 + ((seed + i) % 5) * 0.028),
        radius * 0.6,
        depth + 1,
        (seed * 31 + i * 17 + 7) % 256
      )
    }
  }

  // Trunk
  const trunkGeo = new THREE.CylinderGeometry(0.07, 0.2, TREE_HEIGHT, 8)
  const trunk = new THREE.Mesh(trunkGeo, branchMat)
  trunk.position.set(0, TREE_HEIGHT / 2, 0)
  group.add(trunk)

  // 5 primary branches from top of trunk
  for (let i = 0; i < 5; i++) {
    const az = (i / 5) * Math.PI * 2 + 0.3
    const tilt = 0.32 + i * 0.04
    const dir = new THREE.Vector3(
      Math.sin(tilt) * Math.cos(az),
      Math.cos(tilt),
      Math.sin(tilt) * Math.sin(az) * 0.4
    )
    addBranch(new THREE.Vector3(0, TREE_HEIGHT, 0), dir, 1.75, 0.095, 0, i * 43 + 11)
  }

  return tipPositions
}

function TokyoSkyline() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <svg
        viewBox="0 0 600 400"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax meet"
        className="absolute bottom-0 left-0 right-0 w-full"
        style={{ height: '65%', opacity: 0.6 }}
      >
        {/* building silhouettes */}
        <rect x="0" y="220" width="65" height="180" fill="#050510" />
        <rect x="10" y="195" width="30" height="225" fill="#060614" />
        <rect x="55" y="240" width="50" height="160" fill="#050510" />
        <rect x="95" y="200" width="40" height="200" fill="#060614" />
        <rect x="125" y="170" width="55" height="230" fill="#050510" />
        <rect x="170" y="230" width="35" height="170" fill="#060614" />
        <rect x="195" y="185" width="48" height="215" fill="#050510" />
        <rect x="235" y="215" width="38" height="185" fill="#060614" />
        <rect x="263" y="160" width="60" height="240" fill="#050510" />
        <rect x="315" y="195" width="42" height="205" fill="#060614" />
        <rect x="348" y="240" width="30" height="160" fill="#050510" />
        <rect x="370" y="175" width="55" height="225" fill="#060614" />
        <rect x="415" y="210" width="44" height="190" fill="#050510" />
        <rect x="450" y="235" width="35" height="165" fill="#060614" />
        <rect x="478" y="190" width="52" height="210" fill="#050510" />
        <rect x="522" y="215" width="40" height="185" fill="#060614" />
        <rect x="555" y="175" width="45" height="225" fill="#050510" />

        {/* antenna / tower on tallest building */}
        <rect x="290" y="100" width="3" height="60" fill="#0a0a1e" />
        <rect x="263" y="130" width="3" height="30" fill="#0a0a1e" />

        {/* neon window accents — cyan */}
        <rect x="22" y="210" width="5" height="3" fill="#00f5ff" opacity="0.18" />
        <rect x="32" y="225" width="5" height="3" fill="#00f5ff" opacity="0.12" />
        <rect x="140" y="188" width="6" height="4" fill="#00f5ff" opacity="0.15" />
        <rect x="155" y="205" width="5" height="3" fill="#00f5ff" opacity="0.1" />
        <rect x="275" y="175" width="7" height="4" fill="#00f5ff" opacity="0.2" />
        <rect x="290" y="190" width="5" height="3" fill="#00f5ff" opacity="0.14" />
        <rect x="380" y="195" width="6" height="4" fill="#00f5ff" opacity="0.16" />
        <rect x="490" y="208" width="5" height="3" fill="#00f5ff" opacity="0.12" />
        <rect x="560" y="192" width="6" height="4" fill="#00f5ff" opacity="0.15" />

        {/* warm window accents */}
        <rect x="100" y="215" width="4" height="3" fill="#e07a6e" opacity="0.12" />
        <rect x="200" y="198" width="5" height="3" fill="#ff6eb4" opacity="0.1" />
        <rect x="350" y="210" width="4" height="3" fill="#e07a6e" opacity="0.1" />
        <rect x="430" y="225" width="5" height="3" fill="#ff6eb4" opacity="0.1" />

        {/* subtle ground glow */}
        <defs>
          <radialGradient id="groundGlow" cx="50%" cy="100%" r="50%">
            <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#00f5ff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="0" y="350" width="600" height="50" fill="url(#groundGlow)" />
      </svg>
    </div>
  )
}

export default function TreeScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const treeGroupRef = useRef<THREE.Group | null>(null)
  const branchMatRef = useRef<THREE.MeshStandardMaterial | null>(null)
  const blossomMatRef = useRef<THREE.MeshStandardMaterial | null>(null)
  const cyanLightRef = useRef<THREE.PointLight | null>(null)
  const petalsRef = useRef<THREE.Points | null>(null)
  const petalDataRef = useRef<PetalData[]>([])
  const animFrameRef = useRef<number>(0)
  const scrollRef = useRef(0)
  const tRef = useRef(0)

  const initScene = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const w = container.clientWidth
    const h = container.clientHeight
    if (w === 0 || h === 0) return

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100)
    camera.position.set(1.2, 3.8, 9.5)
    camera.lookAt(0, 4.2, 0)
    cameraRef.current = camera

    // Lighting
    const ambient = new THREE.AmbientLight(0x0d0a0b, 0.8)
    scene.add(ambient)

    const cyanLight = new THREE.PointLight(0x00f5ff, 3.0, 14)
    cyanLight.position.set(0, 2, 4)
    scene.add(cyanLight)
    cyanLightRef.current = cyanLight

    const warmLight = new THREE.PointLight(0xe07a6e, 1.2, 12)
    warmLight.position.set(-2.5, 6.5, 3)
    scene.add(warmLight)

    const fillLight = new THREE.PointLight(0xff6eb4, 0.4, 10)
    fillLight.position.set(3, 7, 1)
    scene.add(fillLight)

    // Branch material
    const branchMat = new THREE.MeshStandardMaterial({
      color: 0x0d0d1e,
      emissive: new THREE.Color(0x00f5ff),
      emissiveIntensity: 0.18,
      roughness: 0.75,
      metalness: 0.08,
    })
    branchMatRef.current = branchMat

    // Tree group
    const treeGroup = new THREE.Group()
    scene.add(treeGroup)
    treeGroupRef.current = treeGroup

    const tipPositions = buildTreeGeometry(treeGroup, branchMat)

    // Blossom instanced mesh
    if (tipPositions.length > 0) {
      const blossomGeo = new THREE.SphereGeometry(0.075, 6, 5)
      const blossomMat = new THREE.MeshStandardMaterial({
        color: 0xff6eb4,
        emissive: new THREE.Color(0xff6eb4),
        emissiveIntensity: 0.45,
        transparent: true,
        opacity: 0.8,
        roughness: 0.9,
      })
      blossomMatRef.current = blossomMat

      const blossomMesh = new THREE.InstancedMesh(blossomGeo, blossomMat, tipPositions.length)
      blossomMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
      const dummy = new THREE.Object3D()
      const colorA = new THREE.Color(0xff6eb4)
      const colorB = new THREE.Color(0xe07a6e)

      tipPositions.forEach((pos, i) => {
        const scale = 0.55 + ((i * 1.618) % 0.9)
        dummy.position.copy(pos)
        dummy.scale.set(scale, scale, scale)
        dummy.updateMatrix()
        blossomMesh.setMatrixAt(i, dummy.matrix)
        const t = (i * 0.618) % 1
        const c = colorA.clone().lerp(colorB, t)
        blossomMesh.setColorAt(i, c)
      })
      blossomMesh.instanceMatrix.needsUpdate = true
      if (blossomMesh.instanceColor) blossomMesh.instanceColor.needsUpdate = true
      treeGroup.add(blossomMesh)
    }

    // Petal particle texture
    const petalCanvas = document.createElement('canvas')
    petalCanvas.width = 32
    petalCanvas.height = 32
    const pCtx = petalCanvas.getContext('2d')
    if (pCtx) {
      pCtx.clearRect(0, 0, 32, 32)
      const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 14)
      grad.addColorStop(0, 'rgba(255,255,255,1)')
      grad.addColorStop(0.7, 'rgba(255,255,255,0.6)')
      grad.addColorStop(1, 'rgba(255,255,255,0)')
      pCtx.fillStyle = grad
      pCtx.beginPath()
      pCtx.ellipse(16, 16, 10, 14, 0, 0, Math.PI * 2)
      pCtx.fill()
    }
    const petalTex = new THREE.CanvasTexture(petalCanvas)

    // Petal geometry
    const petalPositions = new Float32Array(NUM_PETALS * 3)
    const petalColors = new Float32Array(NUM_PETALS * 3)
    const petalData: PetalData[] = []
    const cA = new THREE.Color(0xff6eb4)
    const cB = new THREE.Color(0xe07a6e)

    for (let i = 0; i < NUM_PETALS; i++) {
      const x = (((i * 2.718) % 2) - 1) * 5.5
      const y = ((i * 1.414) % 14) - 2
      const z = (((i * 3.141) % 2) - 1) * 3
      petalPositions[i * 3] = x
      petalPositions[i * 3 + 1] = y
      petalPositions[i * 3 + 2] = z

      const t = (i * 0.618) % 1
      const c = cA.clone().lerp(cB, t)
      petalColors[i * 3] = c.r
      petalColors[i * 3 + 1] = c.g
      petalColors[i * 3 + 2] = c.b

      petalData.push({
        x,
        y,
        z,
        vx: (((i * 2.41) % 2) - 1) * 0.006,
        vy: -(0.007 + ((i * 1.73) % 0.013)),
        turbOffset: (i * 1.618) % (Math.PI * 2),
        turbFreq: 0.006 + ((i * 0.42) % 0.012),
      })
    }
    petalDataRef.current = petalData

    const petalGeo = new THREE.BufferGeometry()
    petalGeo.setAttribute('position', new THREE.BufferAttribute(petalPositions, 3))
    petalGeo.setAttribute('color', new THREE.BufferAttribute(petalColors, 3))

    const petalMat = new THREE.PointsMaterial({
      size: 0.13,
      map: petalTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.78,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })

    const petals = new THREE.Points(petalGeo, petalMat)
    scene.add(petals)
    petalsRef.current = petals

    // Scroll listener
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Resize
    const onResize = () => {
      if (!container || !renderer || !camera) return
      const nw = container.clientWidth
      const nh = container.clientHeight
      if (nw === 0 || nh === 0) return
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', onResize, { passive: true })

    // Animation loop
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate)
      tRef.current += 0.01

      const scroll = scrollRef.current
      const t = tRef.current

      // Rotate tree with scroll
      if (treeGroupRef.current) {
        treeGroupRef.current.rotation.y = scroll * Math.PI * 2.2
      }

      // Section-based glow shift
      if (branchMatRef.current && cyanLightRef.current) {
        if (scroll < 0.18) {
          // Hero: warm coral
          branchMatRef.current.emissive.set(0x00c8e8)
          cyanLightRef.current.color.set(0x00e5f5)
          cyanLightRef.current.intensity = 2.8
        } else if (scroll < 0.45) {
          // About/Experience: bright cyan
          branchMatRef.current.emissive.set(0x00f5ff)
          cyanLightRef.current.color.set(0x00f5ff)
          cyanLightRef.current.intensity = 3.5
        } else if (scroll < 0.68) {
          // Projects/Skills: electric cyan
          branchMatRef.current.emissive.set(0x00ffea)
          cyanLightRef.current.color.set(0x00ffcc)
          cyanLightRef.current.intensity = 4.2
        } else {
          // Recognition/Contact: muted
          branchMatRef.current.emissive.set(0x002244)
          cyanLightRef.current.color.set(0x0033aa)
          cyanLightRef.current.intensity = 1.6
        }
      }

      // Update blossom emissive with blossomMat
      if (blossomMatRef.current) {
        const pulse = 0.35 + Math.sin(t * 0.8) * 0.1
        blossomMatRef.current.emissiveIntensity = pulse
      }

      // Update petals
      if (petalsRef.current) {
        const pos = petalsRef.current.geometry.getAttribute('position') as THREE.BufferAttribute
        const speedMult = 1.0 + scroll * 1.5

        const data = petalDataRef.current
        for (let i = 0; i < NUM_PETALS; i++) {
          const d = data[i]
          d.y += d.vy * speedMult
          d.x += d.vx + Math.sin(t * d.turbFreq + d.turbOffset) * 0.004

          if (d.y < -4) {
            d.x = (((i * 2.718 + t) % 2) - 1) * 5.5
            d.y = 10 + ((i * 0.618) % 4)
            d.z = (((i * 1.41 + t * 0.1) % 2) - 1) * 3
          }

          pos.setXYZ(i, d.x, d.y, d.z)
        }
        pos.needsUpdate = true
      }

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      branchMat.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  useEffect(() => {
    const cleanup = initScene()
    return cleanup
  }, [initScene])

  return (
    <>
      {/* Mobile: small fixed cherry blossom accent top-right */}
      <div
        aria-hidden="true"
        className="fixed top-4 right-4 w-28 h-28 pointer-events-none md:hidden"
        style={{ zIndex: 5, opacity: 0.4 }}
      >
        <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" fill="none">
          <path d="M60 115 C60 100 58 86 56 72 C54 58 52 46 54 34 C55 24 58 16 60 8" stroke="#e07a6e" strokeWidth="6" strokeLinecap="round" />
          <path d="M57 52 C48 44 38 34 26 22" stroke="#e07a6e" strokeWidth="4" strokeLinecap="round" />
          <path d="M58 38 C66 30 76 20 88 10" stroke="#e07a6e" strokeWidth="4" strokeLinecap="round" />
          <circle cx="26" cy="20" r="12" fill="#ff6eb4" opacity="0.5" />
          <circle cx="19" cy="13" r="8" fill="#e07a6e" opacity="0.4" />
          <circle cx="88" cy="9" r="11" fill="#ff6eb4" opacity="0.45" />
          <circle cx="96" cy="4" r="7" fill="#e07a6e" opacity="0.35" />
          <circle cx="60" cy="6" r="10" fill="#ff6eb4" opacity="0.5" />
        </svg>
      </div>

      {/* Desktop: full Three.js scene */}
      <div
        aria-hidden="true"
        className="fixed top-0 right-0 pointer-events-none hidden md:block"
        style={{
          width: '45vw',
          height: '100vh',
          zIndex: 10,
          willChange: 'transform',
        }}
      >
        <TokyoSkyline />
        <div ref={containerRef} className="absolute inset-0" />
      </div>
    </>
  )
}
