import React, { useEffect, useRef } from 'react'
import {
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  SphereGeometry,
  LineBasicMaterial,
  Vector3,
  Line,
  BufferGeometry,
  MeshBasicMaterial,
  BoxGeometry,
  MeshLambertMaterial,
  PlaneGeometry,
  SpotLight,
  ImageUtils,
  TextureLoader,
  AmbientLight,
  DirectionalLight,
  HemisphereLight,
  Sprite,
  SpriteMaterial,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import './index.less'

import map1 from '@/assets/img/three/map1.jpeg'
import bgPNG from '@/assets/img/three/bg.png'
import expandPNG from '@/assets/img/three/expand.png'

interface ThreeRef {
  camera: PerspectiveCamera | undefined
  renderer: WebGLRenderer | undefined
  controls: OrbitControls | undefined
}

const EarthDemoPage = () => {
  const threeJS = useRef<ThreeRef>({ camera: undefined, renderer: undefined, controls: undefined })

  const initRenderer = () => {
    const renderer = new WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    threeJS.current.renderer = renderer
  }

  /** 打光，特殊材质需要打光才能看到 */
  const spotLight = (scene: Scene) => {
    // var spotLight = new SpotLight(0xffffff)
    // spotLight.position.set(-50, 60, 60)
    // spotLight.castShadow = true
    // scene.add(spotLight)

    const ambientLight = new AmbientLight(0xcccccc, 1.1)
    scene.add(ambientLight)
    var directionalLight = new DirectionalLight(0xffffff, 0.2)
    directionalLight.position.set(1, 0.1, 0).normalize()
    var directionalLight2 = new DirectionalLight(0xff2ffff, 0.2)
    directionalLight2.position.set(1, 0.1, 0.1).normalize()
    scene.add(directionalLight)
    scene.add(directionalLight2)
    var hemiLight = new HemisphereLight(0xffffff, 0x444444, 0.2)
    hemiLight.position.set(0, 1, 0)
    scene.add(hemiLight)
    var directionalLight = new DirectionalLight(0xffffff)
    directionalLight.position.set(1, 500, -20)
    directionalLight.castShadow = true
    directionalLight.shadow.camera.top = 18
    directionalLight.shadow.camera.bottom = -10
    directionalLight.shadow.camera.left = -52
    directionalLight.shadow.camera.right = 12
    scene.add(directionalLight)
  }

  /** 添加用户交互 */
  const initControls = () => {
    threeJS.current.controls = new OrbitControls(threeJS.current.camera!, threeJS.current.renderer?.domElement)
    threeJS.current.controls.enableDamping = true
    threeJS.current.controls.enableZoom = true
    threeJS.current.controls.autoRotate = false
    threeJS.current.controls.autoRotateSpeed = 2
    threeJS.current.controls.enablePan = true
  }

  /** 画背景 */
  const drawBG = (scene: Scene) => {
    const textureLoader = new TextureLoader()
    const texture = textureLoader.load(bgPNG)
    scene.background = texture
  }

  /** 画光晕 */
  const drawExpand = (scene: Scene) => {
    const textureLoader = new TextureLoader()
    const texture = textureLoader.load(expandPNG)
    var spriteMaterial = new SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    })
    var sprite = new Sprite(spriteMaterial)
    sprite.scale.set(50, 50, 1)
    // sprite.position.set(0, 10, 0)
    // sprite.scale.setScalar(1)
    scene.add(sprite)
  }

  /** 画线 */
  const line = (scene: Scene) => {
    const material2 = new LineBasicMaterial({ color: 0x00ff00 })
    const points: any = []
    points.push(new Vector3(-10, 0, 0))
    points.push(new Vector3(0, 10, 0))
    points.push(new Vector3(10, 0, 0))

    const geometry2 = new BufferGeometry().setFromPoints(points)
    const line = new Line(geometry2, material2)
    scene.add(line)
  }

  /**画个矩形 */
  const cube = (scene: Scene) => {
    const geometry = new BoxGeometry(10, 10, 10)
    const material = new MeshBasicMaterial({ color: 0xff0000 })
    const cube = new Mesh(geometry, material)
    scene.add(cube)
    // camera.position.z = 5
  }

  /** 画平面 */
  const plane = (scene: Scene) => {
    const geo = new PlaneGeometry(20, 20, 10, 10)
    const material = new MeshLambertMaterial({ color: 0xffffff, wireframe: false }) // 材料
    const mesh = new Mesh(geo, material)
    mesh.position.set(0, 0, -10) // 设置平面坐标
    scene.add(mesh)
  }

  /** 画球 */
  const sphere = (scene: Scene) => {
    const geometry = new SphereGeometry(16, 40, 40) // 形状
    const material = new MeshPhongMaterial() // 材料 MeshPhongMaterial MeshLambertMaterial
    const earthmesh = new Mesh(geometry, material)
    const tLoader = new TextureLoader()
    material.map = tLoader.load(map1)

    earthmesh.position.set(0, 0, 0)

    scene.add(earthmesh)
    return earthmesh
  }

  useEffect(() => {
    var scene = new Scene()
    // const Dom = document.querySelector('#container')
    // const width = Dom.clientWidth,
    //   height = Dom.clientHeight
    threeJS.current.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    initRenderer()
    initControls()
    spotLight(scene)

    drawBG(scene)

    threeJS.current.camera.position.set(40, 40, 40)
    threeJS.current.camera.lookAt(0, 0, 0)

    // 画线
    // camera.position.set(0, 0, 100)
    // camera.lookAt(0, 0, 0)

    const earthMesh = sphere(scene)
    // line(scene)
    // cube(scene)
    // plane(scene)
    drawExpand(scene)

    // 动态渲染
    function animate() {
      // cube.rotation.x += 0.01
      // cube.rotation.y += 0.01
      // threeJS.current.camera!.position.y = threeJS.current.camera!.position.y + 0.1
      // camera.position.set(0, 0, 100)
      earthMesh.rotation.y += 0.01
      requestAnimationFrame(animate)
      threeJS.current.renderer?.render(scene, threeJS.current.camera!)
    }
    animate()

    return () => {}
  }, [])

  return <div className="EarthDemoPage__root">{/* <div id="earth-container"></div> */}</div>
}

export default EarthDemoPage
