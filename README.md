# shoestore
proyecto-intermedio


Documentación de proyecto "Shoestore"

Introducción:
    Esta es la documentación referente a mi proyecto "Shoestore", es la parte back construida a partir de "Node" y "Express" entre otras técnologías para crear una app basada en una supuesta tienda de zapatillas en la que se podrá acceder mediante un usuario y contraseña y podrás añadir artículos a una lista de favoritos. En esta saldrán reflejadas las compras que hayas hecho de los diferentes artículos disponibles en nuestra tienda.

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

5.CRUD.
    5.1.(GET)Haremos el crud para la tabla shoes, para poder modificar los datos que necesitemos, comenzamos con el get, en el cual deberemos hacer la consulta de la bbdd para traernos toda la informacion que necesitemos agregaremos un ruta para esto, por norma general el get/all para ver todos los productos deberá ir a ruta /, nosotros se lo hemos encomendado a la ruta /all.
    
    5.2.A continuacion nos traeremos el producto a traves del id, entonces deberemos diseñar la consulta sql de nuevo para sacar los artículos a través del identificador único, por lo tanto en el controlador deberemos de captar el req.params.id , ya que cuando queramos ir hacia un artículo en concreto deberemos especificar el id en la ruta.

    5.3.Diseñaramos búsquedas para obtener artículos mediante unos "filtros" , de nuevo, empezaremos por hacer la consulta a la bbdd y y lo demas sigue de la misma manera el único cambio es que captaremos el req.query y de ahi desestructuraremos lo que queramos obtener en este caso la talla.

    5.4.En este punto crearemos un nueva zapatilla mediante el metodo post tendremos en cuenta como siempre la consulta a la bbdd, haremos el controlador específico para la ruta /new, que consistira en enviar el req.body con todos los values que vayamos a crear.

    5.5.También vamos a modificar los datos una vez creados, este procedimiento es el mismo que el anterior pero tomaremos tambien id a través del req.params.id y con la ruta /:id enviaremos un petición put, con los campos que tiene la fila y modificaremos los que creamos convenientes.

    5.6.Por último crearemos el endpoint de delete, por el cual simplemente haremos la consulta a la bbdd y a traves del req.params.id y mediante el metodo delete captaremos ese elemento de la tabla que queramos eliminar.

6.NodeMailer.
    Nodemailer es una biblioteca de javascript por la cual podemos enviar correos a través de nuestra aplicacion con Node.js.
    Tendremos que instalar el paquete con el comando npm i nodemailer, tendremos que poner un script que nos proporciona la misma documentación del paquete, en el cual vamos definir desde donde vamos a enviar el correo y para quien o quienes, según configuremos en este script, tendremos que poner nuestro correo y contraseña pero meterlo en la carpete ae variables de entorno, para que no puedan ser visto desde fuera, por ultimo colocaremos la ejecución del script en el script de sign up para que cada vez que hagamos un nuevo registro podemos mandar este correo de confirmación, como que hemos completado el registro satisfactorimente, teniendo en cuenta el mismo email de registro.
        