
const canvas= document.querySelector('.webgl')


const scene = new THREE.Scene()   



const geometry= new THREE.BoxGeometry(1,1,1)


const material = new THREE.MeshNormalMaterial({color: 0xff0032})

material.color = new THREE.Color(0xff00ff)
//material.wireframe= true // to see the structure
material.side = THREE.DoubleSide //

const sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 16, 16),
    material
)

const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1,1),
    material
)

const torus= new THREE.Mesh(
    new THREE.TorusBufferGeometry(0.3, 0.2, 16,32),
    material
)
plane.position.x= 2
torus.position.x = -1
scene.add(sphere, plane, torus)

const sizes ={
    width: 800,
    height: 600
}


window.addEventListener('dblclick', ()=>{
    if(!document.fullScreenElement){
        canvas.requestFullscreen()
    }else{
        document.exitFullScreen()
    }
})
//Camera
const camera= new THREE.PerspectiveCamera(75, sizes.width / sizes.height) //aspect ratio
camera.position.x= 0 
camera.position.y= 0  
camera.position.z= 3 
scene.add(camera)

//Renderer of the scene, in webGL into the Canvas
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

const clock = new THREE.Clock()

const textureLoader = new THREE.TextureLoader()

const margarita = textureLoader.load('/margarita.jpg')

const tick= () =>{

    const elapsedTime = clock.getElapsedTime()
    sphere.rotation.y= 0.15 * elapsedTime
    plane.rotation.y= 0.15 * elapsedTime
    torus.rotation.y= 0.15 * elapsedTime

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)

}

tick()
renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)

