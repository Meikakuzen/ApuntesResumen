
const canvas= document.querySelector('.webgl')


const scene = new THREE.Scene()   



const geometry= new THREE.BoxGeometry(1,1,1)


const material = new THREE.MeshBasicMaterial({color: 0xff0000})
const mesh = new THREE.Mesh(geometry, material)


scene.add(mesh)

const sizes ={
    width: window.innerWidth,
    height: window.innerHeight
}

//Camera
const camera= new THREE.PerspectiveCamera(75, sizes.width / sizes.height) // focus degrees & aspect ratio
camera.position.x= 0 
camera.position.y= 0  
camera.position.z= 3 
scene.add(camera)

//Resize

window.addEventListener('resize', ()=>{
    //Update sizes
    sizes.width= window.innerWidth()
    sizes.height= window.innerHeight()
    //Update the camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width,sizes.height)

// I can se steps in the edges of my cube . Thats because my screen has a pixel ratio greater than 1
})

//Handle full screen with doubleclik

window.addEventListener('dblclick', ()=>{
        if(!document.fullScreenElement){
            canvas.requestFullscreen()
        }else{
            document.exitFullScreen()
        }
})

//Renderer of the scene, in webGL into the Canvas
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
//renderer.setPixelRatio(window.devicePixelRatio)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) //set the pixel ratio  to two is enough
renderer.render(scene, camera)

