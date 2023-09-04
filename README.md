# ServerAuth

## API endpoints

### registerProject
Este endpoint tiene como objetivo registrar un nuevo proyecto en la base de datos. Para ello, recibimos únicamente un parámetro, key, que es una cadena de texto que representa el código de acceso a la API. Es necesario introducir la clave correctamente para poder realizar esta acción; de lo contrario, solo recibiremos un mensaje de error y no se registrará nada en la base de datos.
<p align="center">
  <img width="100%" src="TFG - Diagramas - Flujo - ServerAuth - registerProject.png">
</p>

### AddHWID
Su objetivo es registrar un nuevo HWID a un proyecto previamente registrado. De esta manera, podemos incluir una o más máquinas para que puedan acceder al proyecto. Si la ejecución de la acción es correcta veremos como en el archivo db.json se incluye información adicional en el array con la clave hwids. Esta acción únicamente devuelve un status code 200 en caso de ser ejecutado correctamente y un status code 400 en caso de producirse algún error.
<p align="center">
  <img width="100%" src="TFG - Diagramas - Flujo - ServerAuth - AddHWID.png">
</p>


### Auth
Finalmente llegamos a la autenticación. Todo lo que previamente he hecho es únicamente para que esta acción funcione correctamente y pueda ser utilizada por el Stub.  Cuando todo está en producción, esta acción es la encargada de comprobar si a un usuario se le debería proporcionar la información necesaria para ejecutar el programa en su máquina.
<p align="center">
  <img width="100%" src="TFG - Diagramas - Flujo - ServerAuth - Auth.png">
</p>

