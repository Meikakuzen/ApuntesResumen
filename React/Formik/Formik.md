- Importo el hook de useFormik
- Dentro necesito declarar los valores iniciales en un objeto llamado initialValues.
- Fuera del objeto, agrego la función onSubmit. De momento pongo un console.log para ver la info
- Las funciones dentro de formik  como formik.handleSubmit y formik.handleChange actúan como las declaradas comunmente
- Añado el valor desde formik.values.valor
- El button tiene que ser de tipo submit

~~~~js
import { useFormik } from "formik"



const App = () => {
  
  const formik = useFormik({
    initialValues:{
      
      name:'',
      lastname:'',
      email:''
    },
    onSubmit: values => console.log(values)
  })
  
  return (
    <form onSubmit={formik.handleSubmit}>
      
      <label>Nombre</label>
      <input type="text" 
      name='name' 
      onChange={formik.handleChange} 
      value={formik.values.name} />
      
      <label>Apellido</label>
      <input type="text" 
      name='lastname' 
      onChange={formik.handleChange} 
      value={formik.values.lastname} />
      
      <label>Email</label>
      <input type="email" 
      name='email' 
      onChange={formik.handleChange} 
      value={formik.values.email} />


    <button type="submit">Enviar</button>

    </form>
  )
}

export default App
~~~~

- Validaciones:
- Con la funcion validate, dentro declaro el objeto vacío errors, puedo hacer las validaciones con values.valor

~~~~js
 const formik = useFormik({
    initialValues:{
      
      name:'',
      lastname:'',
      email:''
    },
    validate:(values)=> {
        const errors= {}
        if(!values.name){
          
          errors.name = 'Requerido'
        }else if(values.name.length < 5){
            errors.name="El nombre es muy corto"
        }
        
        
        return errors
    },
    onSubmit: values => console.log(values)
  })

~~~~

- Puedo hacerlo fuera del componente para que esté más limpio

~~~js
const validate = (values)=> {
  const errors= {}
  if(!values.name){
    
    errors.name = 'Requerido'
  }else if(values.name.length < 5){
      errors.name="El nombre es muy corto"
  }
  
  
  return errors
}
~~~~

- Para validar cuando se toque el campo, formik tiene formik.handleBlur que se le pasa en el atributo onBlur, y formik.touched

~~~~js
<label>Nombre</label>
      <input type="text" 
      name='name' 
      onChange={formik.handleChange}
      onBlur={formik.handleBlur} 
      value={formik.values.name} />
    {formik.touched.name && formik.errors.name ?  <div>{formik.errors.name}</div> :null  }

~~~~

- Para reducir el código repetitivo esta formik.getFieldProps con el nombre del campo entre paréntesis
- Devuelve un objeto que contiene el campo, onChange, onBlur y el value

~~~~
<label>Nombre</label>
      <input type="text" {...formik.getFieldProps('name')}/>
    {formik.touched.name && formik.errors.name ?  <div>{formik.errors.name}</div> :null  }


~~~~

-------
# Componentes

