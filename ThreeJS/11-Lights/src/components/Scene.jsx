import { useRef, useEffect } from "react"
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'


const Scene = () => {
    const mountRef = useRef(null) //es para usarlo en lugar de un querySelector

    useEffect(()=>{
        const currentMount = mountRef.current;

        //Scene
        const scene= new THREE.Scene()

        //const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        //scene.add(ambientLight)

        //const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3) //color and intensity
        //directionalLight.position.set(2,1,0)
        //scene.add(directionalLight)
        
        //const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 1) //from the top, bottom and intensity
        //scene.add(hemisphereLight)
        
       //const pointLight = new THREE.PointLight(0xffffff, 0.5)
        //pointLight.position.set(1, -0.5, 1)
        //pointLight.lookAt( new THREE.Vector3())
        //scene.add(pointLight)
        
        //const rectAreaLight = new THREE.RectAreaLight(0xe400ff, 2)
        //scene.add(rectAreaLight)
        
       // const spotLight = new THREE.SpotLight(0x00ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1)
        //spotLight.position.set(0,2,3)

        //scene.add(spotLight)
        
        
        
        //Cam                                                                                               que tan cerca y lejos voy a ver los objetos
        const camera = new THREE.PerspectiveCamera(25, currentMount.clientWidth/ currentMount.clientHeight, 0.1, 1000)
        camera.position.z = 4
        scene.add(camera)

        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(currentMount.clientWidth,currentMount.clientHeight)
        currentMount.appendChild(renderer.domElement) 

        //Cube
        const cube = new THREE.Mesh(
            new THREE.BoxBufferGeometry(1,1,1),
            new THREE.MeshStandardMaterial()
        )
        cube.position.z = -5
        scene.add(cube)

        const geometry= new THREE.SphereBufferGeometry(0.3,32,16)
        const material= new THREE.MeshStandardMaterial({color:'0xffff00'})
        const sphere = new THREE.Mesh( geometry,material )
        scene.add(sphere)
        sphere.scale.set(2,2,1)
        sphere.position.x= 1

        material.roughness= 0.1

        //Orbit Controls
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        
        const animate = () =>{
            renderer.render(scene, camera);
            requestAnimationFrame(animate)
            controls.update()
        }
        animate()
        
        //CleanUP para limpiar los canvas
        return ()=>{
            currentMount.removeChild(renderer.domElement)
        }
    }, [])

  return (
    <div
    className="Contenedor3D"
    ref= {mountRef}
    style={{width: '100%' , height:'100vh'}}>

            
    </div>
  )
}

export default Scene