# shoestore
proyecto-intermedio


Documentación de proyecto "Shoestore"

Introducción:
    Esta es la documentación referente a mi proyecto "Shoestore", es la parte back construida a partir de "Node" y "Express" entre otras técnologías para crear una app basada en una supuesta tienda de zapatillas en la que se podrá acceder mediante un usuario y contraseña y podrás añadir artículos a una lista de favoritos en esta saldrán reflejadas las compras que hayas hecho de los diferentes artículos disponibles en nuestra tienda.

1.Creación de estructura de carpetas.
    Crearemos la estructura de carpetas basada en una arquitectura "MVC" en que la base de datos postgresql sera levantada a traves de docker, tendremos un archivo app.js que será donde diseñemos todas las configuraciones necesarias para el servidor, crearemos también la carpetas routes para todas nuestras rutas referentes a los diferentes endpoints y los permisos, también crearemos la carpeta models, en esta definiremos nuestra estructura referente a la bbdd, consultas sql y como gestionarlas, la siguiente carpeta que crearemos será la de misc, esta sera la encargada de gestionar los errores ya que dentro hemos creado un archivo errors en el que se encuentra un objeto en el cual exportamos todo estos para poderlos utilizar en nuestros "promesas". A continuación, crearemos nuestra carpeta de middlewares donde crearemos los difentes middlewares valga la redundancia, con los cuales gestionaremos asi los permisos para los diferentes endpoints de lo que hemos hablado anteriormente. Más tarde, diseñaremos nuestra carpetas controllers que sera la cual almacene todos las funciones que gestionaran las diferentes acciones que realiza cada endpoint y por último la carpeta configs que contendrá la configuración para la conexión con postgres a traves de slonik.

2.Creación e insercción de los tablas en la bbdd.
    Creamos 4 tablas users,shoes,favourite_products y purchases a traves de comandos consultas sql como esta:

        CREATE TABLE IF NOT EXISTS users (
            id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
            username TEXT NOT NULL UNIQUE,
            age INTEGER NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            address TEXT NOT NULL,
            city TEXT NOT NULL
                                        );

    También haremos las primeras insercciones en la bbdd para poder manejar información a traves de comandos como este :

        INSERT INTO users (
            username,age,email,password,address,city
                ) VALUES (
            'Patricia Diaz', 88, 'soylapatri@hotmail.com','noefdwcno4345','calle carreras 9','Sevilla'
                                        );

3.


