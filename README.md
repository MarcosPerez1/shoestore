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

3.Crearemos un archivo .yml que contendrá el contenedor que hará correr las imagenes de postgres por la cuales interactuaremos con la bbdd sin necesidad de instalar el programa en sí, y a través del puerto que definidos en este archivo .yml, utilizaremos un herramienta de gestión de bases de datos llamada adminer, que nos permite gestionar las bases de datos que tengamos. Un ejemplo de archivo .yml podría ser este :

        version: "3.7"
services:
  db:
    image: postgres:15.2-alpine
    ports:
      - 5432:5432
    environment:
      POSTGRES_USER: user1
      POSTGRES_PASSWORD: "1234"
      POSTGRES_DB: shoestore

  admin:
    image: adminer
    ports:
      - 8080:8080

4.Empezaremos a crear nuestra primeras queries para poder ir haciendo las consultas para nuestros endpoints. Primero crearemos la query en la carpeta model pasaremos la consulta y la utilizaremos en nuestra funcion que maneja dicha query. Previamente tendremos que haber definido la ruta por la cual tomara la consulta de referencia y cuando hagamos la petición al servidor (get,post,put,delete) nos devuelva una información u otra. por último nos queda crear un controlador para cada ruta, es decir, la lógica que gestiona como se tratan los datos que provienen de estas bbdd o como tienen que gestionar estas bbdd la información que les enviemos.
    Un ejemplo de query para nuestra bbdd seria este:
            const sizeRange = (minSize, maxSize) => sql.unsafe`
                SELECT brand, model, size
                FROM shoes
                WHERE size BETWEEN ${minSize} AND ${maxSize}
                `;
    A continuación crearemos la función que gestione las respuesta efectivas de la bbdd o los errores como pueda ser esta:

            const sizeShoeRange = (db)=> async (minSize, maxSize)=>{
                   try {
            const response = await db.query(sizeRange(minSize, maxSize))
                    return {
                        ok: true,
                        response: response.rows
                             }
            } catch (error) {

                    return {
                        ok: false,
                        message: error.message
                            }

                    }
            }

    La ruta por la cual deberiamos hacer la consulta que maneje esta consulta podria ser esta:
            localhost:5000/shoes/sizes?minSize=x&maxSixe=x

    Y por último el controlador que nos dara la lógica que controle la informacion de la acción de este endpoint podria ser de este estilo:
            module.exports = (db) => async (req, res, next) => {
                const { minSize, maxSize} = req.query
                const dbRes = await queries.sizeShoeRange(await db)(minSize,maxSize)
                
                if (!dbRes.ok) return next({
                    statusCode: 500,
                    error: new Error("something went wrong!")
                 })
                res.status(200).json({
                    success: true,
                    data: dbRes.response
                })
                }

