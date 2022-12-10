# Cargar Contenido

- En la carpeta assets tengo los archivos png
    - La bomba
    - El personaje desde varios ángulos
    - La plataforma
    - El fondo
    - La estrella
- En preload cargo las imágenes
    - El primer parámetro es el nombre de la imagen y el segundo la ruta
- Para añadirlo voy a create
    - El primer parámetro es el eje x, el segundo y, el tercero el nombre de la imagen
- Para el personaje se usa spritesheet
    - El primer parámetro es el nombre, el segundo la ruta, el tercero es un objeto con los frames
        - Tanto del ancho que queremos y el alto. La imagen (en propiedades) mide 288 x 48
        - Hay nueve personajes en la imagen
        - Divido el ancho por nueve = 32
        - Anoto el alto 
~~~js
function preload(){
    this.load.image('sky', 'assets/sky.png')
    this.load.image('platform', 'assets/platform.png')
    this.load.image('bomb', 'assets/bomb.png')
    this.load.image('star', 'assets/star.png')
    this.load.spritesheet('dude', 'assets/dude.png', {frameWidth:32, frameHeight: 48})
}

function create(){
    this.add.image(400, 300, 'sky')
}
~~~

- Para centrar la imagen lo que hace Phaser es tomar el punto de origen de la imagen
- Para centrarlo a la mitad hay que dividir por dos. Si mide 500, coloco 250 en el eje x, y lo mismo en y
- Como el cielo mide 800 x 600 para centrarlo pongo 400, 300
- Si quiero ubicar una estrella en el centro la coloco en 400,300

~~~js
function create(){
    this.add.image(400, 300, 'sky')
    this.add.image(400,300,'star')
}
~~~

- Si coloco primero la estrella y luego el fondo, esta no aparece
- hay que crear primero el fondo y luego las demás