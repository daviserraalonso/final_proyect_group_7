# final_proyect_group_7
This repository, it´s used for final proyect UNIR MASTER Fullstack

# STANDAR TO THIS REPOSITORY:
 se van a seguir unas pequeñas reglas para este repositorio y el desarrollo de la aplicación solicitada.

1º: Todos los desarrollos que se hagan se harán mediante ramas difrentes unas de otras. El nombre que se establecerá será feature/nombre_funcionalidad_nº_tarea

2º: No se hará merge de las ramas de funcionalidad a la rama de desarrollo, en adelante develop, hasta que no se haya probado 100% dicha funcionalidad y estemos seguros de que hace lo que tiene que hacer.
De esta manera, evitaremos hacer merge de cosas que puedan provocar error en la aplicación.

3º: Las ramas del proyecto serán:
  * main (rama principal y usada solo y exclusivamente para entorno de producción).
  * develop (rama de desarrollo, de la cual que harán los pull request y a donde se harán los merges de las funcionalidades)-
  * ramas features (ramas para las funcionalidades).

4º Cada integrante del grupo de trabajo, se hará cargo del desarrollo en el cual esté implicado y será totalmente responsable de lo que pueda suceder (Si al hacer un merge de la funcionalidad y provocara un error en develop, el desarrollador que hiciera dicha funcionalidad deberá solventarlo).

5º Intentaremos evitar crear excesivas ramas fix. Estas ramas, se usan para solventar los problemas anteriormente comentados, tendrán la siguiente nomenclatura: fix/nombre_funcionalidad_nº_tarea, una vez se haya solventado el problema y probado al 100% se hará merge con develop.

# work methodology

Inicialmente deberemos hacer un pull request del repositorio de trabajo que tendrá ya la estructura básica para empezar, DE LA RAMA MAIN, con las tecnologías a usar en el proyecto, Angular en la versión 18.2.6. También el proyecto inicial contará con Node 22.0 ya preinstalado y expressJS.

Todas las ramas que se hagan nuevas (feature, fix) se deberán hacer desde la rama develop.

Vamos a usar Trello, para organizar el trabajo de cada uno y así llevar un historíco y un progreso de cada tarea, también es una manera de que os habituéis a como se trabaja en un grupo de trabajo con tareas designadas por un Team leader o jefe de producto.

Deberemos de configurar nuestros entornos de trabajo para que nos permita poder hacer pull y push a este repositorio. Este punto se deja un poco a comodidad de cada desarrollador, si se desea usar la GUI del entorno de desarrollo o bien por consola de comandos.

Todos los días deberemos hacer un pull de la rama develop a nuestra rama feature (antes de empezar a modificar nuestra feature), de esta manera siempre tendremos actualizada nuestra rama de funcionalidad y evitaremos posibles conflictos, cuando se haga merge.

CUANDO ESTEMOS SEGUROS 100% DE QUE NUESTRO TRABAJO ESTÁ FUNCIONANDO COMO SE ESPERA, HAREMOS UN MERGE DE LA RAMA DE FUNCIONALIDAD SOBRE LA RAMA DEVELOP, para hacer esto, se siguen estos pasos:

  * PREGUNTAR SIEMPRE SI ALGUIEN ESTÁ HACIENDO UN PUSH A LA RAMA DEVELOP. (ESTO ES INDISCUTIBLE, YA QUE SI NO SURGIRÁN CONFLICTOS).
  * POSTERIORMENTE, 1º git checkout develop, 2º git pull origin feature/nombre_funcionalidad_nº_tarea, 3º git push origin develop (seguramente se haya creado un commit merge, si no, escribir el commit)

Con los pasos anteriores, habremos realizado un merge de nuestro trabajo a la rama de develop para que todos tengamos el trabajo actualizado.


****** Una vez finalizado el proyecto, haremos un merge de la rama develop a la rama main y esta rama será la que se entregue a UNIR.
****** Se creará un subdominio en un hosting, para simular un entorno productivo para así hacer los despligues y poder probar las tareas. 

La plataforma a usar es: https://dashboard.render.com/

Email es: grupo7unir@yahoo.com 
contraseña grupo_7_unir

************* INDISPENSABLE! Antes de hacer un despliegue, se debe de preguntar si alguien está usando render o haciendo un despliegue, ya que si no, podremos pisarnos el trabajo unos a los otros!!

***** TODO EL CÓDIGO SE DEBE HACER EN INGLÉS, definición de variables, definición de métodos o funciones, definición de objetos, definición de modelos... etc. Todo. ¿Porqué? porque programación es una metodología a nivel global y el idioma global es el inglés, así cualquer persona puede entender lo que se está haciendo.

**** TODO EL CÓDIGO DEBE IR CON COMENTARIOS, SOBRE TODO LA DEFINICIÓN DE LAS FUNCIONES O MÉTODOS. SE DEBE EXPLICAR BREVEMENTE QUE HACE DICHA FUNCIÓN. SE ESTABLECERÁN SIEMPRE COMENTARIOS DE BLOQUE, EVITANDO ASÍ COMENTARIOS DE LÍNEAS. SI FUERA NECESARIO UN COMENTARIO DE LÍNEA SE HARÁ JUSTO EN LA LÍNEA SUPERIOR Y HACIENDO REFERENCIA A LA LÍNEA INMEDIATAMENTE SIGUIENTE.


----------- Los comandos básicos de git o de uso diario son.

******* PULL branch develop
git pull origin develop

****** ACTUALIZAR TODAS LAS RAMAS LOCALES
git fetch

Este comando actualiza todas las ramas locales a todas las ramas remotas, esto quiere decir, que sabremos en todo momento, las ramas en git que tendremos disponibles.

******* CREATE branch from develop
git checkout -b myFeature develop

****** PUSH branch feature.
git push origin feature/nombre_funcionalidad_nº_tarea

***** MERGE branch
Cuando estemos situados en nuestra rama local feature/nombre_funcionalidad_nº_tarea, y a diario hagamos un pull de develop, se nos creará por defecto una solicitud de merge, es decir, develop se va a unificar con nuestra rama, se creará un commit automático de merge y solo tendremos que hacer push a nuestra rama feature.

***** Para hacer merge manualmente:
Siempre situados en nuestra rama feature, se ejecutaría: 
git merge develop



# TO DEPLOY IN RENDER

1º acedemos a https://dashboard.render.com/ con el nombre de usuario y contraseña que dejé anteriormente. Una vez dentro, accedemos abajo al link con texto final_proyect_group_7-1

2º navegamos hasta settings, bajamos hacia abajo un poco y buscamos branch, hacemos click en edit y seleccionamos nuestra rama de funcionalidad. Al seleccionarla queda  guardada. Automáticamente empezará el despliegue, para ver el progreso navegamos a la izquierda hasta logs y ahí vemos todo (si no empezara el despliegue, dentro del dashborad y dentro de final_proyect_group_7-1, arriba a la derecha veremos el botón manual deploy, hacemos click y entre las opciones que aparecen, seleccionamos clear build cache & deploy). Si surge cualquier problema, tendremos que intentar solucionarlo.

# IN BACK-END FIRST TIME

Revisar el fichero createDatabase.cjs, establecer las credenciales del usuario local de bases de datos.
ejecutar node createDatabase.cjs debe aparecer en consola Bases de datos teacherappdb creada.
revisar que tenemos instalado sequalice, usamos npm install --save-dev sequelize-cli
hay que asegurarse de que en back_end\package.json tenemos "type": "commonjs", no module, si no habría que transformar todas las migraciones a .cjs
ejecutamos npx sequelize-cli db:migrate debe de crear todas las tablas




# description:

Proyecto final: TeacherApp.

WebApp para la gestión y localización de profesores de clases particulares categorizados.🌡️

🌡️Objetivos

El objetivo del esta aplicación es poder tener un directorio de profesores
categorizados por su rama de conocimiento que impartan clases online como
refuerzo a ciertas necesidades lectivas que pudiese tener la gente.
La aplicación es un directorio que no solo muestra un listado de profesores, que
podrá ser filtrado por su ramas de conocimiento, precio/hora, experiencia, y
puntuación, sino que también se les podrá ubicar en un mapa para ver su localización
y así ver si se sitúa en su misma ciudad.
La aplicación tendrá tres tipos de usuarios, administrador, profesores y alumnos.
El administrador tendrá que validar a los profesores que se hayan dado de alta en la
plataforma para que su ficha aparezca en la a página.
El alumno se tendrá que dar de alta en la aplicación para poder ver los datos privados
como el teléfono del profesor y poder contactar con él. A su vez podrá puntuar y
poner opiniones sobre los profesores, dado que es una aplicación web basada en la
confianza de los usuarios. 
El profesor podrá darse de alta en la plataforma y tendrá que rellenar todos los datos
que sean obligatorios, para que los administradores lo validen y le dejen pertenecer
a la plataforma.

🌡️Requisitos mínimos

 Formularios de registro tanto para alumnos como para profesores.
 Login de acceso a usuarios.
 Parte publica de la web, donde veras un mapa con los profesores que tienes cerca
de u ubicación y un listado con los profesores mejor puntuados.
 Parte privada a la que accederán profesores, alumnos y administrador, donde cada
uno podrá ver un menú de acceso a su secciones en función de su role.
 Los administradores podrán ver el listado de alumnos y darlos de baja (baja lógica
no borrarlos).
 Los administradores podrán ver un listado de los profesores y validarlos para que
puedan aparecer en el directorio
 Los profesores podrán ver su perfil y los datos de los alumnos que están inscritos
con ellos.
 El alumno solo podrá acceder a su perfil y puntuar y opinar sobre los diferentes
profesores siempre y cuando haya sido alumno suyo en algún momento.
. 
🌡️Deseables:

 Envío de notificaciones por email a los administradores cuando un nuevo profesor
se registra para que el administrador vaya a validarlo.
 Sistema de mensajes (no chat en tiempo real) donde un alumno se puede
comunicar con su profesor y viceversa, tipo Wallapop.
Asignatura Datos del alumno Fecha
Apellidos:
Full Stack Developer Nombre:
Actividades 3© Universidad Internacional de La Rioja (UNIR)
Pautas de elaboración
Para realizar este proyecto deberás usar las herramientas descritas durante el
máster.
Como framework de FrontEnd usareis Angular.
La base de datos, dependiendo las necesidades del proyecto, podrá ser elegida entre
MongoDb y MySQL, dependiendo del planteamiento.
Y como backend la aplicación la realizaremos en Node con Express.
Estas herramientas no son una elección, es obligatorio usarlas como parte del
proceso de aprendizaje del máster. El uso de Javascript, HTML y CSS, también
es obligatorio por la necesidad intrínseca de usarlo tanto en los frameworks
