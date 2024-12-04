- En la tabla professors_rating he añadido el campo rating_course y modificado el nombre del campo rating a rating_teacher. He modificado las migrations, los models y los seeders.

- En el model la tabla professors_rating campo ratingDAte he puesto el allownull a true y el timestamps a false ya que me daba errores al grabar los datos.

- El seedor de course he modificado el id 1 por id 3 para que el admin no aparezca como profe de cursos.

- De rutas solo he creado la de score, también he creado un controller de score

- En el controller de user he tocado la función searchTeachers

- He creado 4 migrations, dos para las tablas avg_teacher y avg_course con su trigger correspondiente.

- Las nuevas tablas también tienen su model