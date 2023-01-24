//Animating in threejs is like doing stop motion
//Move, take a picture, move a little bit more, take a picture
// the technique is to create a function, put the movement into this function and call the renderer, and call that function each frame
//we need to do little steps each time

//requestAnimationFrame -->the goal is to call a function on the next frame
//My computer is running at 60fps



const canvas= document.querySelector('.webgl')


const scene = new THREE.Scene()   



const geometry= new THREE.BoxGeometry(1,1,1)


const material = new THREE.MeshBasicMaterial({color: 0xff0000})
const mesh = new THREE.Mesh(geometry, material)


scene.add(mesh)

const sizes ={
    width: 800,
    height: 600
}

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

renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)

//Animations

let time = Date.now()
/*
const tickLoop = () =>{


    const currentTime= Date.now() //The difference between de previous timestamp and the current timestamp will be the DELTA
    const deltaTime= currentTime - time
    time= currentTime

    mesh.rotation.y -= 0.001 * deltaTime //Now this cube is rotating at the same regard of the frame, the correct speed
    renderer.render(scene, camera)

    window.requestAnimationFrame(tickLoop)
}

tickLoop()

*/ // We can USE A CLOCK too. ITS A CLASS, so I have to instanciet it and I can use the method getElapsedTime

const clock = new THREE.Clock()

//greenSock has his own "tick" internally
gsap.to(mesh.position, {duration:1, delay: 1, x:2})
gsap.to(mesh.position, {duration:1, delay: 2, x:0})

const tick = ()=>{
    
    const elapsedTime = clock.getElapsedTime() //Its another way to get a timestamp but it's in seconds, not miliseconds
    
   // mesh.rotation.y = elapsedTime  //I'm not incrementing the value, I took it as a reference since it started
    //mesh.rotation.y = elapsedTime * Math.PI *2 // To get 1 revolution per second
   // mesh.position.y = Math.sin(elapsedTime) //sin de sinoidal
   // mesh.position.x = Math.cos(elapsedTime) //cosinus, now is doing cercles. The explanation is about waves sinus and cosinus
    
    //camera.lookAt(mesh.position)
    
    renderer.render(scene, camera)
    
    window.requestAnimationFrame(tick)
}

tick()

//ADD GSAP LIBRARY  gsap#3.5.1