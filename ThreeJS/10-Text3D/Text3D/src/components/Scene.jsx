import { useRef, useEffect } from "react"
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'

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
        //scene.add(cube)

        const resize =() =>{
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
            camera.aspect = currentMount.clientWidth/ currentMount.clientHeight;
            camera.updateProjectionMatrix()
        }
        window.addEventListener('resize',resize)

        //axes Helper

       // const axesHelper = new THREE.AxesHelper()
        //scene.add(axesHelper)

        //Matcap
        
        const textureLoader = new THREE.TextureLoader()
        const matcapTexture = textureLoader.load('../../src/Matcap/Matcap1.png')

        //FontLoader needs a callback
        const fontLoader = new FontLoader()
        fontLoader.load(
            '../../src/fonts/helvetiker_regular.typeface.json',
            (font)=>{
                const textGeometry = new TextGeometry(
                    'Migue foreve',
                    {
                        font, 
                        size: 0.5,
                        height: 0.2,
                        curveSegments: 5,
                        bevelEnabled: true,
                        bevelThickness: 0.03,
                        bevelSize: 0.02,
                        bevelOffset: 0,
                        bevelSegments: 5
                    }
                )



                const textMaterial= new THREE.MeshMatcapMaterial({map: matcapTexture})
                const text = new THREE.Mesh(textGeometry, textMaterial)
                scene.add(text)
                //Bounding
                textGeometry.computeBoundingBox() //to calculate in coords the space of the geometry object 
                console.log(textGeometry.boundingBox)

                //CENTER THE TEXT
                textGeometry.center()
               /* textGeometry.translate(
                    - (textGeometry.boundingBox.max.x -0.02) * 0.5,
                    - (textGeometry.boundingBox.max.y -0.2) * 0.5,
                    - (textGeometry.boundingBox.max.z - 0.3) * 0.5

                )*/

                console.time('donuts')
                const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45)
                const donutMaterial = new THREE.MeshNormalMaterial()

                for(let i = 0; i < 100; i++){

                    const donut = new THREE.Mesh( donutGeometry, donutMaterial)

                    donut.position.x= (Math.random() -0.5) * 10
                    donut.position.y= (Math.random() -0.5) * 10
                    donut.position.z= (Math.random() -0.5) * 10

                    donut.rotation.x = Math.random() * Math.PI
                    const scale = Math.random()
                    donut.scale.set(scale, scale, scale)
                
                     
                    
                    scene.add(donut)
                }
            
                console.timeEnd('donuts')
            } 
        )
       

        //MINUT 35:41
    

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