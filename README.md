# Equipo del Proyecto

## Scrum Máster
**Medina Porras Moisés**

**Tareas:**
- Garantizar que el equipo siga los principios y prácticas ágiles.
- Ayudar a mantener un ambiente de trabajo colaborativo y productivo.
- Eliminar los obstáculos que enfrenta el equipo durante el desarrollo.

---

## Product Owner
**Carlo Aquino Angel Enrique**

**Tareas:**
- Definir y priorizar los requisitos del producto en forma de elementos del backlog del producto.
- Tomar decisiones sobre qué funcionalidades se desarrollarán en cada sprint y cuál es la prioridad de estas funcionalidades.

---

## Agente de Marketing Online
**Martinez Jimenez Luis Fernando**

**Tareas:**
- Desarrollar y ejecutar estrategias de marketing para promocionar el software de gestión de bibliotecas.
- Recopilar y analizar datos de marketing para ajustar las estrategias según sea necesario y optimizar la efectividad de las campañas.

---

## Developers

**Giovanny Duran Torres**

**Tareas:**
- Desarrollar y diseñar el modelo de clases para el proyecto, tanto frontend como backend.

---

**Diego González Contreras**

**Tareas:**
- Implementar el diseño propuesto además de testearlo.

---

**Irving Rodriguez Escobar**

**Tareas:**
- Documentar el proyecto.

---

# Arquitectura de Capas

## 1. Capa Frontend

### Teconolgia asociada a la capa (React):
**Descripción:** React es una biblioteca de JavaScript utilizada para construir interfaces de usuario en este contexto React se encarga de la capa de presentación, permitiendo a los usuarios interactuar con la aplicación a través de un navegador web y sus componentes.

**Responsabilidades:**
- Renderización de componentes de UI.
- Manejo del estado de la aplicación en el cliente.
- Comunicación con la capa de backend a través de API REST.

---

## 2. Capa de Aplicación/Lógica de Negocio (Backend)

### Node.js y Express.js:
**Descripción:** Node.js es un entorno de ejecución de JavaScript del lado del servidor, y Express.js es un framework web para Node.js que simplifica la creación de aplicaciones web y API.

**Responsabilidades:**
- Definir y manejar rutas y controladores para la aplicación.
- Implementar la lógica de negocio.
- Procesar las solicitudes del cliente y enviar respuestas.
- Validación de datos y gestión de errores.
- Autenticación y autorización de usuarios.

---

## 3. Capa Backend (Base de Datos)

### MongoDB:
**Descripción:** MongoDB es una base de datos NoSQL orientada a documentos. Almacena datos en formato BSON.

**Responsabilidades:**
- Almacenamiento y recuperación de datos de la aplicación.
- Manejo de operaciones CRUD 
- Indexación y consultas eficientes.

---

## Comunicación entre Capas

### API REST:
- El frontend se comunica con el backend mediante llamadas a la API.
- Estas llamadas API permiten al frontend enviar solicitudes HTTP al backend para realizar operaciones de datos y recibir respuestas en formato JSON.

---

## Ejemplo de Flujo de Trabajo

### Usuario solicita una página de libros:
- El usuario interactúa con la interfaz React, solicitando ver una lista de libros disponibles.

### React envía una solicitud al backend:
- React hace una llamada API al servidor Express.js.

### Express.js maneja la solicitud:
-  Express.js recibe la solicitud y llama a una función del controlador que maneja las solicitudes relacionadas con libros.
-  El controlador de Express.js interactúa con MongoDB para obtener la lista de libros.

### MongoDB devuelve los datos:
-  MongoDB devuelve los datos de los libros solicitados al controlador de Express.js.

### Express.js envía la respuesta a React:
-  El controlador de Express.js envía la respuesta con los datos de los libros en formato JSON.

### React se encarga del frontend
- React recibe los datos y actualiza la interfaz de usuario para mostrarlos en el frontend.

---

# Patrones
Implementación del Patrón Builder (patrón creacional)

El patrón Builder se ha utilizado en las clases `BookTransactionBuilder`, `UserBuilder` y `BookBuilder` del proyecto de gestión de bibliotecas. Este patrón se emplea para facilitar la creación de instancias de modelos de Mongoose de manera clara y estructurada.

### Descripción del Patrón Builder

El patrón Builder es un patrón creacional que se utiliza cuando la construcción de un objeto es compleja y requiere varios pasos. Permite construir objetos paso a paso, proporcionando un control preciso sobre su creación. En lugar de tener un constructor con múltiples parámetros, el patrón Builder utiliza métodos de configuración para establecer las propiedades del objeto.

### Implementación en las clases

1. **BookTransactionBuilder**: Se utiliza para construir instancias de transacciones de libros.
2. **UserBuilder**: Se encarga de crear instancias de usuarios.
3. **BookBuilder**: Utilizado para la creación de instancias de libros.

### Documentación en las clases

En cada una de las clases mencionadas, se ha documentado el patrón Builder para brindar una guía clara sobre cómo utilizarlo. Los comentarios en el código fuente describen el propósito de la clase y cómo se implementa el patrón Builder para la creación de objetos. Además, cada método dentro de las clases está documentado, lo que proporciona una referencia clara sobre su funcionalidad, los parámetros esperados y el tipo de retorno.

---

## Implementación del Patrón Decorator (patrón estructural)

Si bien no identificamos el patrón Decorator como tal en todo el código, en el archivo `transactionRoutes.js` se puede observar una implementación de este patrón, aunque no sea la más óptima y no sea netamente necesaria. En este archivo, se realiza una verificación para determinar si el usuario que quiere realizar una modificación al libro es administrador. Al abstraer esta funcionalidad, se comporta como un "decorator" porque añade la funcionalidad de verificar si el usuario es un administrador antes de realizar la transacción con la ruta.

En resumen, se implementa el patrón al agregar dinámicamente la responsabilidad de autorización a las rutas, sin modificar la lógica principal de las mismas.

**Este patron se encuentra en una clase llamada booksDecorator**
