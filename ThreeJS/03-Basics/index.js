//capt canvas

const canvas= document.querySelector('.webgl')

//Scene
const scene = new THREE.Scene()   

//red Cube

const geometry= new THREE.BoxGeometry(1,1,1)

//I need material
const material = new THREE.MeshBasicMaterial({color: 0xff0000})
const mesh = new THREE.Mesh(geometry, material)

//add to the scene
scene.add(mesh)

const sizes ={
    width: 800,
    height: 600
}

//Camera
const camera= new THREE.PerspectiveCamera(75, sizes.width / sizes.height) //degrees & aspect ratio(width divvided by height)
camera.position.x= - 0.7 //3 units
camera.position.y= 0.6  //its a CUBE!
camera.position.z= 2 //its a CUBE!
scene.add(camera)

mesh.scale.x= 2
//Renderer of the scene, in webGL into the Canvas
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)

mesh.rotation.y= Math.PI *0.5
mesh.rotation.y= Math.PI *0.25
renderer.render(scene, camera)



//move objects in x=RIGHT y=UP z=FAR (+ to put distance)

//4 propeerties to transform objects

/*position scale rotation quartenion*/
/*Perspective Camera inherit from Object3D, mesh too.. 
Every object has this 4 poroperties when inherit from Object3D*/

/*Those properties will be compiled in matrices (arrays)*/ 

//in  threejs we have vector2 vector3 & vector4. vector3 has a lot of methods. Lets see it!

//The distance between the center of the scene and our object with .length

console.log(mesh.position.length()) //distance between the object and the center of our scene
console.log(mesh.position.distanceTo(camera.position)) //distance between camera (me) and the object

mesh.position.normalize()// reduce the vector untill the length is 1


//update x, y, z at once
mesh.position.set(0.7, -0,6, 1) //put it on before scene.add(camera)


const axesHelper = new THREE.AxesHelper() //I have to put it on the scene. Red one is x, green is y blue is z
scene.add(axesHelper)

//Positioning

//Scale Because is vector3 you can use all methods in there, like set
mesh.scale.x = 2 //bigger horizontally

mesh.scale.set(2, -0.5, 0.5)

//Rotation     2 ways rotation or quartenion
//Para saber que eje es el que rota debes imaginar un palo atravesando el objeto, hacia donde se mueve. Ese es el eje
mesh.rotation.y = 0.5
//Pi helps to rotation. A half rotation is two times PI
//When you get stacked with too much rotations and doesnt work you can call to reorder method before order of rotation


mesh.rotation.reorder('YXZ')

//Eules is problematic. Thats why use Quaternion is more viable. Expresses rotation but in a more mathematical way


//Every Object 3d has a lookAt() method
//The camera by default lookAt the center of the scene-
//Previously we move the camera backguard, and we moved the object 
// Puedo hacer que la cámara apunte al cubo así
camera.lookAt(mesh.position)

//Scene GRAPH

//You can put objects inside groups and use position, rotation, scale and quartenion
//use the Group class


const group = new THREE.Group()
scene.add(group)

const cube1= new THREE.Mesh()
const cube2= new THREE.Mesh()
const cube3= new THREE.Mesh()