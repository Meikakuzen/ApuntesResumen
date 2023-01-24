import { useRef, useEffect } from "react"
import * as THREE from 'three'
import { PlaneBufferGeometry } from "three"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'


const Scene = () => {
    const mountRef = useRef(null) //es para usarlo en lugar de un querySelector

    useEffect(()=>{
        const currentMount = mountRef.current;

        //Scene
        const scene= new THREE.Scene()

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        scene.add(ambientLight)

        
        
        const house=  new THREE.Group()
        scene.add(house)
        
        const walls = new THREE.Mesh(
          new THREE.BoxBufferGeometry(4,2.5,4),
          new THREE.MeshStandardMaterial({color: "#ace8e82"})
          )
          walls.position.y= 1.25 
          house.add(walls)
          
          const floor = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(20,20),
            new THREE.MeshStandardMaterial({color: '#a9c388'})
            ) 
            floor.rotation.x= -Math.PI *0.5
            floor.position.y = 0

            scene.add(floor)

            const roof = new THREE.Mesh(
              new THREE.ConeBufferGeometry(3.5, 1, 4),
              new THREE.MeshStandardMaterial({color: "#b35f45"})
            )
            
            roof.position.y =2.5 + 0.5
            roof.rotation.y= Math.PI /4 
            scene.add(roof)

            const door = new THREE.Mesh(
              new THREE.PlaneBufferGeometry(2,2),
              new THREE.MeshStandardMaterial({color: '#aa7b7b'})
            )
            door.position.z= 2 + 0.01
            door.position.y = 1
            house.add(door)

            const bushGeometry = new THREE.SphereBufferGeometry(1,16,16)
            const bushMaterial = new THREE.MeshStandardMaterial({color: '#89c854'})
            
            const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
            bush1.scale.set(0.5,0.5,0.5)
            bush1.position.set(0.8, 0.2,2.2)
           
            const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
            bush2.scale.set(0.25,0.25,0.25)
            bush2.position.set(1.4, 0.1,2.1)
            
            const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
            bush3.scale.set(0.4,0.4,0.4)
            bush3.position.set(-0.8, 0.1,2.2)
           
            const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
            bush4.scale.set(0.15,0.15,0.15)
            bush4.position.set(-1, 0.05,2.6)
            
            house.add(bush1, bush2, bush3, bush4)
            
           const graves = new THREE.Group()

           scene.add(graves) //52:03
           
           
           
           
            //Cam    que tan cerca y lejos voy a ver los objetos
            
            const camera = new THREE.PerspectiveCamera(25, currentMount.clientWidth/ currentMount.clientHeight, 0.1, 1000)
            camera.position.z = 12*3
            camera.position.y = 4*3
            
            scene.add(camera)
            
            const renderer = new THREE.WebGLRenderer()
            renderer.setSize(currentMount.clientWidth,currentMount.clientHeight)
        currentMount.appendChild(renderer.domElement) 

        
     


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