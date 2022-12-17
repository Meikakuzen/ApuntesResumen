# Server Mongo Typescript
## Handlebars

- Creo el archivo main.hbs en layouts
- Este archivo va a enmarcar el código de las partes comunes
- Voy a usar una variante de Bootstrap llamada Bootswatch
- Descargo la temática Cosmo
- El archivo CSS debo colocarlo en la carpeta public
- Enlazo el archivo en el head de main.hbs

>  <link rel="stylesheet" href="../../public/bootstrap.min.css">

- Debo decir en la configuración el uso del main.hbs en layouts
- index.ts

~~~js
app.engine('.hbs', engine({
    extname: '.hbs',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    helpers: require('./lib/helpers'),
    defaultLayout: 'main'
}))
~~~

- Para decirle que ese hello world del index.hbs irá en todas las vistas abro triples llaves en el body del main y coloco body
- Le estoy diciendo que todo el código que escriba se va a colocar en el body

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TsNode App</title>
    <link rel="stylesheet" href="../../public/bootstrap.min.css">
</head>
<body>
    {{{body}}}
    
</body>
</html>
~~~

- La carpeta partials dentro de views sirve para definir la navegación
- Creo el archivo navigation.hbs dentro
- Voy a usar la navegación de algún ejemplo de bootstrap
- Voy a la web bootsrap/components/navbar

~~~html
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Features</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Pricing</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">Disabled</a>
      </li>
    </ul>
  </div>
</nav>
~~~

- Coloco la navegación encima del body ( en el main ), ahora con doble llave y el símbolo de mayor qué
- Debo borrar el layout: false que tenía en el IndexController
- Cargo bootsrap a través de un CDN

~~~js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TsNode App</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">

</head>
<body>

    {{> navigation}}


    {{{body}}}
    
</body>
</html>
~~~

- Ahora si creo un archivo about.hbs en src con una etiqueta de texto html
- Si quiero pintar ese texto en una ruta lo haría así
- index.routes.ts

~~~js
router.get('/about', (req,res)=>{
    res.render('about')
})
~~~

- Se sigue viendo la navegación porque se está reutilizando a través de layouts
- Ahora quiero crear un formulario para añadir libros
- En la carpeta views creo una carpeta llamada books
    - Creo el archivo index.hbs que me va a permitir listar todos los libros
    - Otro llamado add.hbs que me va a permitir tener un formulario para poder agregar libros
- Añado en el index.hbs un Jumbotron de la página de bootstrap que es como un panel de bienvenida

~~~html
<div class="jumbotron">
  <h1 class="display-4">Hello, world!</h1>
  <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
  <hr class="my-4">
  <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
  <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
</div>
~~~

- Creo books.routes.ts y books.controllers.ts
- Creo la clase BooksController
- Qué métodos quiero que tengan mis libros? Uno para guardar, otro para listar, etc
- Voy a crear un método para renderizar un formulario

~~~js
import {Request, Response} from 'express'

class BooksController{
    public renderFormBook(req: Request, res:Response): void{
        res.render('books/add',{
            title: 'Add a Book'
        })
    }
}
export const booksController = new BooksController()
~~~

- Creo otro metodo para renderizar los libros en el books.controllers

~~~ts
    public indexBooks(req:Request, res:Response):void{
        res.render('/books/index',{
            title: 'Books'
        })
    }
~~~

- En el books.routes importo booksController
- Creo rutas para mis libros con los métodos escritos en el books.controllers.ts

~~~ts
import {Router} from 'express'
import { booksController } from '../controllers/books.controllers'

const router: Router = Router()

router.get('/', booksController.indexBooks)
router.get('/add', booksController.renderFormBook)




export default router
~~~

- Las rutas quedan así (importo el router de books.routes )
- index.ts

~~~js
app.use('/', IndexRoutes)
app.use('/books', BooksRoutes)
~~~

- En el main, meto el body con un padding de 4

~~~html
<body>

    {{> navigation}}

    <div class="container p-4">
        {{{body}}}

    </div>
    
</body>
~~~

- Mejor
- Para agregar los titulos que está recibiendo coloco en title dobles llaves con title dentro

~~~html
<title>TsNode App {{title}} </title>
~~~

- Pinto el add.hbs con el formulario

~~~html
<div class="col-md-4 mx-auto">
    <div class="card card-body">
    <form action="">
        <div class="form-group">
            <input type="text" name="title" class="form-control" placeholder="Book Title" autofocus required>
        </div>
    </form>
</div>
</div>
~~~

- Para que quede bonito , meto el body en una fila ( en el main )
- main.hbs

~~~js
<body>

    {{> navigation}}

    <div class="container p-4">
        <div class="row">
            {{{body}}}

        </div>

    </div>
    
</body>
~~~

- Con pattern (de html) puedo validar el isbn.
- Busco en internet html isbn patterns y lo copio

> (?:(?=.{17}$)97[89][ -](?:[0-9]+[ -]){2}[0-9]+[ -][0-9]|97[89][0-9]{10}|(?=.{13}$)(?:[0-9]+[ -]){2}[0-9]+[ -][0-9Xx]|[0-9]{9}[0-9Xx])

~~~html
<div class="col-md-4 mx-auto">
    <div class="card card-body">
    <form action="">
        <div class="form-group">
            <input type="text" name="title" class="form-control" placeholder="Book Title" autofocus required>
        </div>
        <div class="form-group">
            <input type="text" name="author" class="form-control" placeholder="Author"  required>
        </div>
        <div class="form-group">
            <input type="text" name="isbn" class="form-control" pattern="(?:(?=.{17}$)97[89][ -](?:[0-9]+[ -]){2}[0-9]+[ -][0-9]|97[89][0-9]{10}|(?=.{13}$)(?:[0-9]+[ -]){2}[0-9]+[ -][0-9Xx]|[0-9]{9}[0-9Xx])" placeholder="ISBN" >
        </div>
        <button class="btn btn-primary btn-block"> Save </button>
    </form>
</div>
</div>
~~~

- A dónde envía la información? A mi servidor '/books/add'. Uso el form action

~~~html
<form action="/books/add" method="POST">
~~~

- Creo una ruta en books.router para que lo pueda recibir
- Pero tengo que crear un método en el books.controllers
- books.controller

~~~js
    public saveBook(req: Request, res: Response): void{
        console.log(req.body)
        res.send('received!')
    }
~~~

- books.routes
~~~js
router.post('/add', booksController.saveBook)
~~~

- Si ahora introduzco los datos en el formulario los imprime en consola










