~~~js
import { useRef, useEffect } from "react"
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'


const Scene = () => {
    const mountRef = useRef(null) //es para usarlo en lugar de un querySelector

    useEffect(()=>{
        const currentMount = mountRef.current;

        //Scene
        const scene= new THREE.Scene()
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
            new THREE.MeshBasicMaterial()
        )
        cube.position.z = -5
        scene.add(cube)

        const resize =() =>{
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
            camera.aspect = currentMount.clientWidth/ currentMount.clientHeight;
            camera.updateProjectionMatrix()
        }
        window.addEventListener('resize',resize)

    

        //Orbit Controls
        const controls = new OrbitControls(camera, renderer.domElement)
        
        const animate = () =>{
            renderer.render(scene, camera);
            requestAnimationFrame(animate)

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