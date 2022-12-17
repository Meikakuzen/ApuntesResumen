# Express Mongo Typescript

- Inicio el proyecto

> npm init

- Instalo algunos paquetes

> npm i express express-handlebars mongoose 

- Handlebars es un motor de plantillas para las vistas

- Creo la carpeta src y dentro las carpetas
    - routes : las rutas
    - controllers : dónde va la lógica de las rutas
    - models: los modelos de mongoose
    - lib: código reutilizable
    - views: las vistas
- Creo en src el index.ts, database.ts, keys.ts
- Cómo tengo typescript instalado globalmente, tengo disponible el comando tsc para compilar. Lo uso para tener el archivo de configuración ts

> tsc --init

- Incluyo todos los archivos de src en tsconfig
- Excluyo node_modules
- Mi archivo tsconfig queda así

~~~js
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig to read more about this file */

    /* Projects */
    // "incremental": true,                              /* Save .tsbuildinfo files to allow for incremental compilation of projects. */
    // "composite": true,                                /* Enable constraints that allow a TypeScript project to be used with project references. */
    // "tsBuildInfoFile": "./.tsbuildinfo",              /* Specify the path to .tsbuildinfo incremental compilation file. */
    // "disableSourceOfProjectReferenceRedirect": true,  /* Disable preferring source files instead of declaration files when referencing composite projects. */
    // "disableSolutionSearching": true,                 /* Opt a project out of multi-project reference checking when editing. */
    // "disableReferencedProjectLoad": true,             /* Reduce the number of projects loaded automatically by TypeScript. */

    /* Language and Environment */
    "target": "es2016",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    // "lib": [],                                        /* Specify a set of bundled library declaration files that describe the target runtime environment. */
    // "jsx": "preserve",                                /* Specify what JSX code is generated. */
    // "experimentalDecorators": true,                   /* Enable experimental support for TC39 stage 2 draft decorators. */
    // "emitDecoratorMetadata": true,                    /* Emit design-type metadata for decorated declarations in source files. */
    // "jsxFactory": "",                                 /* Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'. */
    // "jsxFragmentFactory": "",                         /* Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'. */
    // "jsxImportSource": "",                            /* Specify module specifier used to import the JSX factory functions when using 'jsx: react-jsx*'. */
    // "reactNamespace": "",                             /* Specify the object invoked for 'createElement'. This only applies when targeting 'react' JSX emit. */
    // "noLib": true,                                    /* Disable including any library files, including the default lib.d.ts. */
    // "useDefineForClassFields": true,                  /* Emit ECMAScript-standard-compliant class fields. */
    // "moduleDetection": "auto",                        /* Control what method is used to detect module-format JS files. */

    /* Modules */
    "module": "commonjs",                                /* Specify what module code is generated. */
    // "rootDir": "./",                                  /* Specify the root folder within your source files. */
    // "moduleResolution": "node",                       /* Specify how TypeScript looks up a file from a given module specifier. */
    // "baseUrl": "./",                                  /* Specify the base directory to resolve non-relative module names. */
    // "paths": {},                                      /* Specify a set of entries that re-map imports to additional lookup locations. */
    // "rootDirs": [],                                   /* Allow multiple folders to be treated as one when resolving modules. */
    // "typeRoots": [],                                  /* Specify multiple folders that act like './node_modules/@types'. */
    // "types": [],                                      /* Specify type package names to be included without being referenced in a source file. */
    // "allowUmdGlobalAccess": true,                     /* Allow accessing UMD globals from modules. */
    // "moduleSuffixes": [],                             /* List of file name suffixes to search when resolving a module. */
    // "resolveJsonModule": true,                        /* Enable importing .json files. */
    // "noResolve": true,                                /* Disallow 'import's, 'require's or '<reference>'s from expanding the number of files TypeScript should add to a project. */

    /* JavaScript Support */
    // "allowJs": true,                                  /* Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files. */
    // "checkJs": true,                                  /* Enable error reporting in type-checked JavaScript files. */
    // "maxNodeModuleJsDepth": 1,                        /* Specify the maximum folder depth used for checking JavaScript files from 'node_modules'. Only applicable with 'allowJs'. */

    /* Emit */
    // "declaration": true,                              /* Generate .d.ts files from TypeScript and JavaScript files in your project. */
    // "declarationMap": true,                           /* Create sourcemaps for d.ts files. */
    // "emitDeclarationOnly": true,                      /* Only output d.ts files and not JavaScript files. */
    // "sourceMap": true,                                /* Create source map files for emitted JavaScript files. */
    // "outFile": "./",                                  /* Specify a file that bundles all outputs into one JavaScript file. If 'declaration' is true, also designates a file that bundles all .d.ts output. */
       "outDir": "./build/src",                                   /* Specify an output folder for all emitted files. */
    // "removeComments": true,                           /* Disable emitting comments. */
    // "noEmit": true,                                   /* Disable emitting files from a compilation. */
    // "importHelpers": true,                            /* Allow importing helper functions from tslib once per project, instead of including them per-file. */
    // "importsNotUsedAsValues": "remove",               /* Specify emit/checking behavior for imports that are only used for types. */
    // "downlevelIteration": true,                       /* Emit more compliant, but verbose and less performant JavaScript for iteration. */
    // "sourceRoot": "",                                 /* Specify the root path for debuggers to find the reference source code. */
    // "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,                          /* Include sourcemap files inside the emitted JavaScript. */
    // "inlineSources": true,                            /* Include source code in the sourcemaps inside the emitted JavaScript. */
    // "emitBOM": true,                                  /* Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
    // "newLine": "crlf",                                /* Set the newline character for emitting files. */
    // "stripInternal": true,                            /* Disable emitting declarations that have '@internal' in their JSDoc comments. */
    // "noEmitHelpers": true,                            /* Disable generating custom helper functions like '__extends' in compiled output. */
    // "noEmitOnError": true,                            /* Disable emitting files if any type checking errors are reported. */
    // "preserveConstEnums": true,                       /* Disable erasing 'const enum' declarations in generated code. */
    // "declarationDir": "./",                           /* Specify the output directory for generated declaration files. */
    // "preserveValueImports": true,                     /* Preserve unused imported values in the JavaScript output that would otherwise be removed. */

    /* Interop Constraints */
    // "isolatedModules": true,                          /* Ensure that each file can be safely transpiled without relying on other imports. */
    // "allowSyntheticDefaultImports": true,             /* Allow 'import x from y' when a module doesn't have a default export. */
    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
    // "preserveSymlinks": true,                         /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */

    /* Type Checking */
    "strict": true,                                      /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,                         /* When type checking, take into account 'null' and 'undefined'. */
    // "strictFunctionTypes": true,                      /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
    // "strictBindCallApply": true,                      /* Check that the arguments for 'bind', 'call', and 'apply' methods match the original function. */
    // "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */
    // "noImplicitThis": true,                           /* Enable error reporting when 'this' is given the type 'any'. */
    // "useUnknownInCatchVariables": true,               /* Default catch clause variables as 'unknown' instead of 'any'. */
    // "alwaysStrict": true,                             /* Ensure 'use strict' is always emitted. */
    // "noUnusedLocals": true,                           /* Enable error reporting when local variables aren't read. */
    // "noUnusedParameters": true,                       /* Raise an error when a function parameter isn't read. */
    // "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
    // "noImplicitReturns": true,                        /* Enable error reporting for codepaths that do not explicitly return in a function. */
    // "noFallthroughCasesInSwitch": true,               /* Enable error reporting for fallthrough cases in switch statements. */
    // "noUncheckedIndexedAccess": true,                 /* Add 'undefined' to a type when accessed using an index. */
    // "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
    // "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type. */
    // "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
    // "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */

    /* Completeness */
    // "skipDefaultLibCheck": true,                      /* Skip type checking .d.ts files that are included with TypeScript. */
    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
  },
  "include": [
    "./src/**/*"
  ],
  "exclude":[
    "node_modules"
  ]
}
~~~



- Voy a index.ts e importo express
- Lo declaro con app = express(). Hace falta instalar los tipos para que no de error

~~~js
import express from 'express'

const app = express()

//Settings

//Middlewares

//Routes

//Static Files

//Starting de server

~~~

> npm i @types/express -D

- Seteo el puerto y lo pongo a escuchar

~~~js
import express from 'express'

const app = express()

//Settings

app.set('port', 3000)



//Middlewares

//Routes

//Static Files

//Starting de server

app.listen(app.get('port'), ()=>{
    console.log(`Servidor corriendo en puerto ${app.get('port')}`)
})

~~~

- Configuro package.json con algunos scripts. Instalo typescript y ts-node nodemon -D para el proyecto

> npm i typescript

> npm i ts-node nodemon -D

- Hay que configurar nodemon para que trabaje con ts. Creo el archivo en la raíz nodemon.json

~~~json
{
    "watch": [
        "src"
    ],
    "ext": "ts",
    "ignore":[
        "src/**/*.spec.ts"
    ],
    "exec": "ts-node ./src/index.ts"
}
~~~

- Los scripts del package.json quedan así

~~~json
  "scripts": {
    "clean": " del build",           //borrar la carpeta build
    "build": "tsc",                  //compilar
    "start": "node build/src",         //iniciar el servidor de producción
    "ts:node": "ts-node src/index.ts", //inicia el servidor con node
    "dev": "nodemon"                   //nodemon para escuchar los cambios (configurado en su json)
  },
~~~

- Coloco algunas variables como el puerto del servidor en variables de entorno
- Uso el middleware para activar la lectura de json
- También urlencoded  con extended en false para que cuando un formulario de html me envíe un dato yo poder interpretarlo

~~~js
import express from 'express'

const app = express()

//Settings

app.set('port', 3000 || process.env.PORT)



//Middlewares

app.use(express.json())
app.use(express.urlencoded({extended: false}))


//Routes

//Static Files

//Starting de server

app.listen(app.get('port'), ()=>{
    console.log(`Servidor corriendo en puerto ${app.get('port')}`)
})
~~~

- Configuro handlebars
- Para ello importo engine from express-handlebars
- Instalo los types de handlebars

> npm i @types/express-handlebars -D

- Indico también dónde está la carpeta para acceder a los archivos handlebars ( en views )
- Para establecer la ruta importo el módulo path. Usaré dirname para decirle que views está en src
- Establezco la configuración a través de la extensión de archivo .hbs y un objeto
- Creo dos carpetas: layouts y partials
- Creo el archivo helpers en la carpeta lib

~~~js
import express from 'express'
import {engine} from 'express-handlebars'
import path from 'path'


const app = express()

//Settings

app.set('port', 3000 || process.env.PORT)
app.set('views',path.join(__dirname, 'views') )
app.engine('.hbs', engine({
    extname: '.hbs',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    helpers: require('./lib/helpers')
}))

app.set('view engine', '.hbs')
//Middlewares

app.use(express.json())
app.use(express.urlencoded({extended: false}))


//Routes

//Static Files

//Starting de server

app.listen(app.get('port'), ()=>{
    console.log(`Servidor corriendo en puerto ${app.get('port')}`)
})
~~~

- En staticFiles voy a definir la carpeta pública (cualquiera puede acceder) de mi app, dónde poner css, etc
- Creo la carpeta public en src
- Le indico dónde está con un middleware

~~~js
app.use(express.static(path.join(__dirname, 'public')))
~~~

-----

# routes

- Creo una ruta en index.ts

~~~js
app.get('/books', (_, res)=>{
    res.json({
        msg: "ok"
    })
})
~~~

- Pero mejor hacerlo en la carpeta routes. Creo el archivo index.routes.ts
- index.routes

~~~js
import {Router} from 'express'

const router: Router = Router()

router.get('/', (_, res)=>{
    res.send("Books")
})


export default router
~~~
- Puedo importar de express Response para tipar el res y tener autocompletado

~~~ts
import {Router, Response} from 'express'

const router: Router = Router()

router.get('/', (_, res: Response)=>{
    res.send("Books")
    
})


export default router
~~~

- Importo el router con el nombre que quiera ( IndexRoutes ) en index.ts ya que es un export default 
- Lo uso en el index.ts en la ruta books

~~~js
app.use('/books', IndexRoutes)
~~~

- En la carpeta controllers coloco la lógica de las rutas
- Creo el archivo index.controllers.ts
- En el defino una clase IndexController
- Le indico que renderice el archivo index.hbs ( ya pre-configurado ) en el que he colocado un h1 con Hello World
- Creo una nueva instancia de IndexController, necesaria para usar la clase
- Renderizo el index. Coloco en el objeto el título y he de colocar layout:false porque todavía no hay layout

~~~js
import {Response} from 'express'


class IndexController{

    public index (_:any, res: Response){
        res.render('index', { title: 'Welcome to books app', layout:false})
        
    }
}

export const indexController = new IndexController()
~~~

- Importo indexController en index.routes

~~~js
import {Router} from 'express'
import { indexController } from '../controllers/index.controllers'

const router: Router = Router()

router.get('/', indexController.index)


export default router
~~~

- Creo el archivo main.hbs en layouts
-----







