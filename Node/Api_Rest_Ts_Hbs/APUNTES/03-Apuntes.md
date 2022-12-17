# Conexión a la DB

- Voy a database.ts en la raíz
- Importo mongoose
- Instalo los types para mongoose

> npm @types/mongoose

- Tengo un archivo en la raíz llamado keys.ts
- keys.ts

~~~js
export const mongodb={
    "URI": "mongodb://localhost/ts_crud"
}
~~~

- database.ts

~~~js
import mongoose from 'mongoose'
import { mongodb } from './keys'


mongoose.connect(mongodb.URI)
~~~

- Con esto ya funcionaría
- Puedo colocarle métodos de conexión
- Necesita ciertos atributos para poder funcionar
- database.ts

~~~ts
import mongoose from 'mongoose'
import { mongodb } from './keys'


mongoose.connect(mongodb.URI,{

})
    .then(db=> console.log("DB connected"))
    .catch(e=> console.log(e))
~~~

- Ahora hay que usar la conexión en index.ts, debajo de const app= express()

~~~ts
const app = express()
import './database'
~~~

- Genero un schema para los libros en /models/Book.ts
- Puedo crear una interface para validar mis datos

~~~js
import mongoose, {Schema, model} from 'mongoose'

export interface BookInterface extends mongoose.Document{
    title: string;
    author: string;
    isb: string
}


const BookSchema = new Schema({
    title: String,
    author: String,
    isbn: String
})

export default model<BookInterface>('Book', BookSchema)
~~~

- Voy al metodo saveBook en books.controllers
- Uso async await y el método save
- Lo redirecciono a /books

~~~js
    public async saveBook(req: Request, res: Response){
       const {title, author, isbn} = req.body
       
        const book: BookInterface = new Book({title, author, isbn})

        await book.save()

        res.redirect('/books')

        res.send('received!')
    }
~~~

- En el método indexBooks de BooksController hago una consulta a la db con Book.find().lean()

~~~js
    public async indexBooks(req:Request, res:Response){
       
        const books: BookInterface[]= await Book.find().lean()
        res.render('books/index',{
            title: 'Books',
            books
        })
    }
~~~

- En el index.hbs de /books hago una consulta de handlebars
- Uso un condicional y recorro 

~~~js
{{#if books}}
{{#each books}}
<div class="col-md-4">
    <div class="card card-body">
        <h3>{{title}}</h3>
        <p>Author: {{author}}</p>
        <p>ISBN: {{isbn}}</p>
</div>
</div>
{{/each}}
{{/if}}
~~~


