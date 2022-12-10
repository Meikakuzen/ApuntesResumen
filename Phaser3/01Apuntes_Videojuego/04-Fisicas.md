# Físicas

- La variable platforms crea un nuevo grupo de elementos estáticos con física
- En arcade hay dos tipos de cuerpos
    - Dinámicos: que puede moverse aplicándole fuerza o aceleración. Puede rebotar y chocar con otros objetos condicionado por la masa del cuerpo y otros elementos
    - Estáticos: inmóviles. Tiene una posición y un tamaño. Cuando algo choca contra él no se mueve. Perfecto para el suelo y las plataformas
- Grupo es una forma de agrupar objetos similares y controlarlos a todos como a uno solo
- Los miembros de un grupo tendrán habilitada la física, lo que ahorra trabajo
- Al escalar es necesario avisar al sistema de físicas de los cambios que se han hecho con refreshBody()

~~~js
    platforms.create(400, 568, 'platform').setScale(2).refreshBody()
~~~

