
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


//OrthographicCamera without 3D
//const aspectRatio = sizes.width / sizes.height
//const camera = new THREE.OrthographicCamera(-1*aspectRatio,1*aspectRatio,1, -1, 0.1, 100)


 //Control the camera with the mouse
 const cursor = {
     x: 0,
     y: 0
 }
window.addEventListener('mousemove', (e)=>{
  
   cursor.x = e.clientX /sizes.width ;
   cursor.y = - (e.clientY /sizes.height) 

})



 //PerspectiveCamera
const camera= new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 200) //75dge= field of view, VERTICAL VISION DEGREES, the other is aspect ratio
//camera.position.x= 2                                //Recomended between 45 and 75   The other two parameters are the near and the far  
//camera.position.y= 2                                    //No poner valores extremos en near y far  para evitar glitches (Triangulos)
camera.position.z= 3 
camera.lookAt(mesh.position)
scene.add(camera)

console.log(camera.position.length()) //--> to get the position of the cam 
//Renderer of the scene, in webGL into the Canvas

//const controls= new OrbitControls(camera, canvas)  -----> works with webpack and a example package
//controls.enableDumping = true   ---> to have a smooth move of the camera
// controls.update()---> Its necessary to update everytime yo do changes


const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})


const clock = new THREE.Clock()

const tick = () =>{
    
    
    
    const elapsedTime = clock.getElapsedTime()
    //mesh.rotation.y = elapsedTime
    
    //update Camera , change position
    //In threejs up y is positive
    //camera.position.x= cursor.x *10 //Multiply to ampliate the movement
    //camera.position.y= cursor.y *10

    camera.position.x= (Math.sin(cursor.x*Math.PI *2)) *3 //we multiply the value cause sinus & cosinus goes from -1 to 1 and the cube is too near in front
    camera.position.z= (Math.cos(cursor.y*Math.PI *2)) *3
    camera.position.y = cursor.y * 5
    camera.lookAt(mesh.position)

    //now I want to rodeate as in a cercle 360º my cube. So I need sinus, cosinus and Math.PI (cause the crecle)
    //If we combine a sinus in an axes and cosinus in another axis with the same angle we have a cercle
    
    renderer.render(scene, camera)
    
    window.requestAnimationFrame(tick)
    
}
tick()
console.log(THREE.OrbitControls)

renderer.setSize(sizes.width, sizes.height)

//Camera is an abstract class. You're not suposed to use it directly
//ArrayCamera render the scene from multiple cmaeras on specific areas of the render
//StereoCamera: two cameras to mimic the eyes to create an effect like parrallax VR
//CubeCamera 6 renders (Surroinding, emvironment maps)
//Ortogtraphic Camera, create a render of the scene without perspective
//PerspectiveCamera:
//
renderer.render(scene, camera)