const express = require("express") /* De esta manera estamos importando la libreria requerida Express para utilizarla en el proyecto, y la estamos identificando con una variable */

const cors = require("cors")

const app = express() /* Esta es una aplicación que representa al servidor y se encarga de utilizar código para recibir peticiones de usuarios, etc */

app.use(cors()) /*  */
app.use(express.json()) /* Para que soporte peticiones de tipo JSON sin errores */

const jugadores=[]

class Jugador {
    constructor(id) {
        this.id = id
    }
    asignarMascota(chimpokomon) {
        this.chimpokomon = chimpokomon
    }
    actualizarPosicion(x,y) {
        this.x = x
        this.y = y
    }
}

class Mascota {
    constructor(nombre) {
        this.nombre = nombre
    }
}

const puerto = 8080 /* Definimos el puerto por el que el servidor web escuchará */

app.get("/unirse", (req, res) => { /* req: requerido, res: respuesta */

    const id = `${Math.random()}` /* Vamos a identificar a los jugadores con un número random, el cual es conocido como identificador único */

    const jugador = new Jugador(id)

    jugadores.push(jugador)

    res.setHeader("Access-Control-Allow-Origin", "*") /* Con esto evitamos un error al abrir el juego, el cual consiste en que el acceso permitido al servidor esta por defecto restringido únicamente a elemntos del propio servidor. Esta configuraciones permite acceder al server desde todos los orígenes, lo cual está representado por el asterisco */

    res.send(id)
}) /* Recibe dos parametros: el primero es en que url va a solicitar el recurso, el segundo es cómo procesar y responder a la petición. Cada vez que un cliente solicite un recurso, realiza una acción. */

app.post("/programacionBasica/:jugadorId" /* Así se define una variable tipo parámetro en express, es una variable que se define en la URL directamente */, (req, res) => {
    const jugadorId = req.params.jugadorId || "" /* Con esto importamos el ID del jugador de los parámetros */
    const nombre = req.body.chimpokomon || "" /* Con esto importamos del Body del JSON el nombre del chimpokomon seleccionado */
    const chimpokomon = new Mascota(nombre)

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id) /* Verificamos que el ID del usuario esté registrado en la lista de jugadores. La función findIndex retorna -1 si no se encontro el objeto, y si lo encuentra retorna el número de lista de dicho objeto  */

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarMascota(chimpokomon) /* Con esto, le asignamos al jugador la mascota seleccionada */
    }
    console.log(jugadores)
    console.log(jugadorId) /* Con esta estructura estamos registrando el Id del usuario en el servidor */
    res.end()
})

app.post("/programacionBasica/:jugadorId/posicion", (req,res) => { /* Con esto estamos buscando transmitir las COORDENADAS del usuario al backend, de forma similar a como se hizo arriba con la mascota del usuario */
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id) 

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x,y) 
    }
/* ------------------------------------------------------------------------------------------ultima clase---------------------- */
    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id) /* De esta manera filtramos a todos los demas jugadores del jugador elegido, de taL forma los catalogamos como enemigos en el Backend */

    res.send({ /* Retornamos al Frontent la lista de todos los enemigos en forma de JSON */
        enemigos
    })

})
/* -----------------------------------------------CLASE 83------------------------------------------------------ */
app.get("/programacionBasica/:jugadorId/ataques", (req, res) => { /* Envíamos la lista de ataques al frontent */
    const jugadorId = req.params.jugadorId || ""
    const jugador = jugadores.find( (jugador) => jugador.id === jugadorId) /* la función find recibe una función que devuelve los valores de Verdadero o Falso */
    res.send({
      ataques: jugador.ataques || []
    })
})
/* ------------------------------------------------CLASE 83--------------------------------------------------------- */

app.listen(puerto, () => { /* 8080 es el puerto elegido por el cual se escuchan las peticiones*/
    console.log("Servidor funcionando")
}) /* De esta manera activamos el servidor y estamos haciendo que se mantenga siempre activo escuchando las peticiones de los usuarios  */
