/* En esta versión cambiamos la lógica de la selección random de la mascota del enemigo, por una selección del mismo basada en las colisiones   */

/* -------------------------------------Variables de iniciarJuego---------------------------- */
const sectionAtaque = document.getElementById("seleccion-ataque")
const sectionReinicio = document.getElementById("reinicio")
const botonMascotaJugador = document.getElementById("boton-mascota")
const botonReinicio = document.getElementById("boton-reinicio")
/* ---------------------------------------Variables de seleccionarMascota---------------------- */
const sectionSeleccionarM = document.getElementById("seleccion-mascota")

const spanmascota = document.getElementById("nombre-mascota-jugador")

/* --------------------------------------Variables del Mapa........................ */
const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")
/* --------------------------------Variables seleccionar PC------------------------------------------------ */
const spanPC = document.getElementById("nombre-mascota-pc")
/* ------------------------------------Variables Combate---------------------------- */
const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasPc = document.getElementById("vidas-PC")

/* ---------------------------------Variables crearMensaje------------------------------- */
const sectionMensaje = document.getElementById("resultado")
const ataquesJugador = document.getElementById("ataquesJugador")
const ataquesEnemigo = document.getElementById("ataquesEnemigo")
/* --------------------------------------------------------------------------------------- */
let jugadorId = null
let opcionDeChimpokomon
const contenedorTarjetas = document.getElementById("contenedorTarjetas") /* Esta variable es la ID del div en donde alamcenamos las tarjetas de personaje */
let imputUribe 
let imputMomoperro 
let imputVene
let mascotaJugador
let mascotaJugadorObjeto
const contenedorAtaques = document.getElementById("contenedorAtaques")
let ataquesChimpokomon
let ataquesChimpokomonEnemigo

let botonFuego 
let botonAgua 
let botonTierra 
let botones = [] /* Arreglo hecho en CLASE 56 */
let ataqueJugador = []
let ataquePC = []
/* ---------------------------canvas---------------------------------- */
let lienzo = mapa.getContext("2d")
let intervalo
let mapaFondo = new Image()
mapaFondo.src = "./assets/mapa.jpg"
let alturaBuscada
let anchoMapa = window.innerWidth-20 /* De esta manera se equipara al ancho de la ventana, menos lo restado */
const anchoMax = 550

if (anchoMapa>anchoMax) {
    anchoMapa = anchoMax-20
}
alturaBuscada = anchoMapa*600/800 /* Esta fórmula es para mantener la proporción del rectangulo, ya que por regla de tres: si por defecto ancho = 800 y largo = 600, el nuevo rectangulo de ancho x tiene una altura y = 600x/800 */
mapa.width = anchoMapa
mapa.height = alturaBuscada

let indexAtaqueJugador
let indexAtaquePC
let victoriasJugador = 0 /* Clase 69 */
let victoriasPC = 0

let vidasJugador = 3
let vidasPC = 3
/* ---------------------------------------------------------------------------------------------- */
let chimpokomones = [] /* Esta es la manera de definir un arreglo */

class Chimpokomon {
    constructor(nombre, foto, vida, fotoMapa) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida 
        this.ataques = [] 
        this.ancho = 60
        this.alto = 60
        this.x = aleatorio(0,mapa.width-this.ancho) /* Ubicación/posición randomizada de las mascotas en el mapa en ambos ejes, para conseguir que si el mapa reduce su tamaño también lo hagan las img de las mascotas */
        this.y = aleatorio(0,mapa.height-this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa /* Fotomapa es la imagen de cada chimpo en el mapa */
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarChimpokomon() { /* De esta manera estamos definiendo un método de la clase */
        lienzo.drawImage(
            this.mapaFoto,
            this.x, /* Ubicación en el eje x */
            this.y, /* Ubicación en el eje y */
            this.ancho, /* Ancho  */
            this.alto /*  Alto */
        )
    }
}

let UribeCop = new Chimpokomon("UribeCop", "./assets/uribecop.png", 5, "./assets/motosierra.png") /* Aqui estamos definiendo los OBJETOS pertenecientes a la clase Chimpokomon */

let Momoperro = new Chimpokomon("Momoperro", "./assets/momoperro.jpeg", 5, "./assets/momocabeza.png")

let Venecosaurio = new Chimpokomon("Venecosaurio", "./assets/venecosaurio.jpg", 5, "./assets/venecrocs.png")

let UribeCopEnemigo = new Chimpokomon("UribeCop", "./assets/uribecop.png", 5, "./assets/motosierra.png") 

let MomoperroEnemigo = new Chimpokomon("Momoperro", "./assets/momoperro.jpeg", 5, "./assets/momocabeza.png")

let VenecosaurioEnemigo = new Chimpokomon("Venecosaurio", "./assets/venecosaurio.jpg", 5, "./assets/venecrocs.png")

UribeCop.ataques.push( /* Inyecta los ataques en el arreglo interno de la clase */
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "🔥", id: "boton-fuego"}
)

UribeCopEnemigo.ataques.push( /* Inyecta los ataques en el arreglo interno de la clase */
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "🔥", id: "boton-fuego"}
)

Momoperro.ataques.push(
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua"}
)

MomoperroEnemigo.ataques.push(
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua"}
)

Venecosaurio.ataques.push(
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "💧", id: "boton-agua"}
)

VenecosaurioEnemigo.ataques.push(
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "💧", id: "boton-agua"}
)
chimpokomones.push(UribeCop,Momoperro,Venecosaurio) /* Inyecta los objetos dentro del parentesis en el arreglo evocado */
/* --------------------------------------------------------------------------------------------------- */
function iniciarJuego() {
    sectionAtaque.style.display = "none" /* Ocultar una sección */
    sectionVerMapa.style.display = "none"

    chimpokomones.forEach((Chimpokomon) => { /* Con esto estamos insertando código HTML desde Javascript al doc HTML */
        opcionDeChimpokomon = `
                <input type="radio" name="chimpokomon" id=${Chimpokomon.nombre} /> 
                <label for=${Chimpokomon.nombre} class="select-mascota">
                    <p>${Chimpokomon.nombre}</p>
                    <img src=${Chimpokomon.foto} alt=${Chimpokomon.nombre}>
                </label>
        `
        contenedorTarjetas.innerHTML += opcionDeChimpokomon /* con el += estamos añadiendo todos los elementos listados en el arreglo Chimpokomones */
        imputUribe = document.getElementById("UribeCop")
        imputMomoperro = document.getElementById("Momoperro")
        imputVene = document.getElementById("Venecosaurio")
    })

    botonMascotaJugador.addEventListener("click", seleccionarMascota)
    
    botonReinicio.addEventListener("click", reinicioJuego)

    unirseJuego() /* El objetivo de invocar esta función es que cuando cargue la primera pantalla, el usuario se una a la partida en la que, asumimos, hay otros jugadores conectados */

}
/* --------------------Esta API está comunicando el Backend con el Frontend---- */
function unirseJuego() {
    fetch("http://localhost:8080/unirse") 
        .then(function (res) {
            console.log(res)
            if (res.ok) { /* Esta parte es necesaria pq la respuesta obtenida del fetch es un objeto, y este paso extra permite identificar el ID del jugador, sin el objeto completo */
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
        /* Esta función Fetch hace una llamada tipo Get al código del servidor, retornando lo que sea que esté en dicho código; este valor retornado se llama aquí "res", y es el parámetro con el que trabajará la función then, que se ejecuta tan pronto dicha respuesta haya llegado */ /* PETICIÓN ASINCRONA: El servidor puede tardarse en devolver la info requerida, así que a este tipo de peticiones en las cuales no sabemos cuando obtendremos respuesta se llaman ASINCRONAS */
}

function seleccionarMascota() {

        sectionSeleccionarM.style.display = "none"
        sectionVerMapa.style.display = "flex"

        if (imputUribe.checked) {
        spanmascota.innerHTML=imputUribe.id
        mascotaJugador = imputUribe.id} 
        else if (imputMomoperro.checked) {spanmascota.innerHTML=imputMomoperro.id
        mascotaJugador = imputMomoperro.id} 
        else if (imputVene.checked) {spanmascota.innerHTML=imputVene.id
        mascotaJugador = imputVene.id} /* Con esto guardamos el nombre de la mascota seleccionada en la variable para poder utilizarla mas adelante*/
    
        seleccionarChimpokomon(mascotaJugador)

        extraerAtaques(mascotaJugador) /* Esta función traerá los ataques específicos de la mascota seleccionada */

        iniciarMapa()
        
    }

function seleccionarChimpokomon(mascotaJugador) {
    fetch(`http://localhost:8080/programacionBasica/${jugadorId}`, {
        method: "post", /* Esta es una petición que ENVIA datos al servidor, por lo cual no se espera una respuesta d ella */
        headers: {
            "Content-Type":"application/json" /* Significa que estamos enviando un JSON */
        },
        body: JSON.stringify({
            chimpokomon: mascotaJugador /* El servidor solo recibe Strings de texto, con esta función volvemos al JSON un string de texto */
        })
    }) /* El ${} dentro de las comillas invertidas es para identificar la variable deseada */
}

function extraerAtaques(mascotaJugador) {
    let ataques 
    for (let i = 0; i < chimpokomones.length; i++) { /* Este es un contador, empieza a contar desde i = 0 hasta que i alcance todos los elementos del arreglo, haciendo i++ : con cada iteración i vale una unidad más */
        if (mascotaJugador === chimpokomones[i].nombre) {
            ataques = chimpokomones[i].ataques
        }
        
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesChimpokomon = `
        <button id=${ataque.id} class="botonAtaque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesChimpokomon
    });
    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botonTierra = document.getElementById("boton-tierra")
    botones = document.querySelectorAll(".BAtaque") /* Selecciona a todos los elementos que coincidan con la descripción del paréntesis */ /* ------------- CLASE 56----------------------------------- */


}
/* La función secuencia de Ataque cambia la lógica del juego, ahora son 5 turnos únicamente y para ello esta función ----- */
function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
        if (e.target.textContent === "🔥") {
            ataqueJugador.push("FUEGO")
            console.log(ataqueJugador)
            boton.style.background = "#0174BE"
            boton.disabled = true
        } else if (e.target.textContent === "💧") {
            ataqueJugador.push("AGUA")
            console.log(ataqueJugador)
            boton.style.background = "#0174BE"
            boton.disabled = true
        } else {
            ataqueJugador.push("TIERRA")
            console.log(ataqueJugador)
            boton.style.background = "#0174BE"
            boton.disabled = true
        }
        seleccionAtaquePC()
    })
}) /* De esta manera cada boton tiene asociado el evento de click, "e" significa el evento mismo, el cual queremos visualizar en la consola mendiante el console.log. El propósito de esto es poder acceder al "target" del boton seleccionado, el cual contiene toda la información del boton seleccionado en cada caso; una vez allí podemos acceder al "text-content" */
}

function aleatorio(min, max) {
     return Math. floor(Math.random()*(max-min+1)+min)}

function seleccionarPC(enemigo) {
    spanPC.innerHTML = enemigo.nombre
    ataquesChimpokomonEnemigo = enemigo.ataques
    secuenciaAtaque() 
}

function seleccionAtaquePC() { /* Un problema con esta función es que no toma en cuenta los ataques específicos de cada Chimpokomon seleccionado */
    ataqueAleatorio = aleatorio(0, ataquesChimpokomonEnemigo.length -1)

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataquePC.push("FUEGO")
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
            ataquePC.push("AGUA")
    } else {ataquePC.push("TIERRA")
}
/* Solución alternativa para tener en cuenta los ataques del Chimpokomon elegido: 

    functionseleccionarAtaqueEnemigo(){
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length - 1)

    if (ataquesMokeponEnemigo[ataqueAleatorio].nombre == '🔥'){
        ataqueEnemigo.push('Fuego 🔥') 
    } elseif(ataquesMokeponEnemigo[ataqueAleatorio].nombre == '💧'){
        ataqueEnemigo.push('Agua 💧')
    } else {
        ataqueEnemigo.push('Planta 🌱')
    }
    console.log(ataqueEnemigo)
        combate()  
}``` */
    iniciarPelea()
}

function iniciarPelea() { /* Con esto lo que conseguimos es que se generen los arreglos del PC después de que esté completo el arreglo del jugador */
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function indexOponentes(jugador, pc) { /*   Con esta función buscamos tomar individualmente los elemenos del Array Ataques, para que se impriminan uno por uno en lugar de todo el array completo */
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaquePC = ataquePC[pc]
}

function combate() {

    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataquePC[index]) {
            indexOponentes(index, index)
            crearMensaje("EMPATE")
        } else if (ataqueJugador[index] === "FUEGO" && ataquePC[index] === "TIERRA") {
            indexOponentes(index, index)
            crearMensaje("GANASTE!")
            victoriasJugador++ /* Con esto modificamos la lógica de las vidas, ahora pasa a ser de victorias y como tal, hacemos que estas victorias aumenten en lugar de dismuniur las vidas */
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === "AGUA" && ataquePC[index] === "FUEGO") {
            indexOponentes(index, index)
            crearMensaje("GANASTE!")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === "TIERRA" && ataquePC[index] === "AGUA") {
            indexOponentes(index, index)
            crearMensaje("GANASTE!")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador        
        } else {
            indexOponentes(index, index)
            crearMensaje("PERDISTE!!")
            victoriasPC++
            spanVidasPc.innerHTML = victoriasPC
        }
    revisarVida()
}}

function crearMensaje(resultado) {

    let nuevoAtaquesJugador = document.createElement("p")
    let nuevoAtaquesEnemigo = document.createElement("p")

    sectionMensaje.innerHTML= resultado
    nuevoAtaquesJugador.innerHTML = indexAtaqueJugador
    nuevoAtaquesEnemigo.innerHTML = indexAtaquePC

    ataquesJugador.appendChild(nuevoAtaquesJugador)
    ataquesEnemigo.appendChild(nuevoAtaquesEnemigo)
   /*  let parrafo = document.createElement("p") */
    /* parrafo.innerHTML = "Tu chimpokomon atacó con " + ataqueJugador + " y el chimpokomon enemigo respondió con " + ataquePC + ". " + resultado
    sectionMensaje.appendChild(parrafo */
}

function revisarVida() {
    if (victoriasJugador === victoriasPC) {
        final("Se ha producido un empate, los jugadores se están besando")

    } else if (victoriasJugador > victoriasPC) {
        final("Has ganado el combate, el PC no tiene pene :c ")

    } else {
        final("Has perdido el combate, el PC te basureó")
    }
}

function final(resultado) {
    sectionMensaje.innerHTML = resultado
    sectionReinicio.style.display = "block"
}

function reinicioJuego() {
    location.reload()
}
/* -------------------------------codigo del mapa-------------------------- */
function pintarCanvas() {
    
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX /* De esta manera, la posición del objeto se actualizará conforme a la velocidad que se le imprima */
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY

    lienzo.clearRect(0,0, mapa.width, mapa.height)  /* Con esto limpiamos el canvas desde la ubicación 0,0 hasta barrer todo el ancho y alto */
    lienzo.drawImage(
        mapaFondo,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarChimpokomon()

    enviarPosicion(mascotaJugadorObjeto.x,mascotaJugadorObjeto.y) /* Esta función nos servirá para enviar los datos de la posición al server */

    UribeCopEnemigo.pintarChimpokomon()
    MomoperroEnemigo.pintarChimpokomon()
    VenecosaurioEnemigo.pintarChimpokomon()

    if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0) {
        revisarColisión(MomoperroEnemigo)
        revisarColisión(UribeCopEnemigo)
        revisarColisión(VenecosaurioEnemigo)
    }
}

function enviarPosicion(x,y) {
    fetch(`http://localhost:8080/programacionBasica/${jugadorId}/posicion`, {
        method: "post", 
        headers: {
            "Content-Type":"application/json" 
        },
        body: JSON.stringify({
            x,
            y /* Esta forma de escritura es válida cuando tenemos lo mismo para clave y para valor en el JSON */
        })
    })  
 }

/* Esta es una configuración alternativa de movimiento es para un movimiento discontinuo:
function moverArriba() {
    Momoperro.y = Momoperro.y - 5 
    pintarPersonaje()
}
function moverAbajo() {
    Momoperro.y = Momoperro.y + 5
    pintarPersonaje()
}
function moverDerecha() {
    Momoperro.x = Momoperro.x + 5
    pintarPersonaje()
}
function moverIzquierda() {
    Momoperro.x = Momoperro.x - 5
    pintarPersonaje()
}  */
function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5 
}
function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5 
}
function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}
function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}
function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function teclaPresionada(event) {
    switch (event.key) { /* Esta función Switch permite utilizar varios condicionales o casos a la vez */
        case "ArrowUp":
            moverArriba()
            break
        case "ArrowDown":
            moverAbajo()
            break
        case "ArrowLeft": 
            moverIzquierda()
            break
        case "ArrowRight":
            moverDerecha()
            break
        default:
            break;
    }
}
/* -----------------------------------Funciones de movimiento continuo--------------------------------- */
function iniciarMapa() {
    mascotaJugadorObjeto = objetoMascota(mascotaJugador)
    
    intervalo = setInterval(pintarCanvas, 50) /* Esta función va llamando a una función (otra) constantemente (primer parametro) esperando un poco de tiempo en milisegundos (segundo parametro)  */
       
    window.addEventListener("keydown", teclaPresionada) /* ----- Configuraciones para movimiento con teclado---------------------- */
    window.addEventListener("keyup", detenerMovimiento)
}

function objetoMascota() {

    for (let i = 0; i < chimpokomones.length; i++) { 
        if (mascotaJugador === chimpokomones[i].nombre) {
            return chimpokomones[i] /* De esta forma nos devuelve el objeto completo que hayamos seleccionado */
        }
        
    }
}

function revisarColisión(enemigo) { /* Esta función fue construida siguiendo una lógica muy específica utilizada en la clase 67, la cual compara la posición de los bordes de las imagenes para determinar si la interacción entre dos imagenes del canvas es o no es una colisión */
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const izquierdaEnemigo = enemigo.x
    const derechaEnemigo = enemigo.x + enemigo.ancho

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const izquierdaMascota = mascotaJugadorObjeto.x
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho

    if (abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo) {
        return
        }
    detenerMovimiento()
    clearInterval(intervalo) /* Detiene el ciclo establecido por los intervalos */
    sectionAtaque.style.display = "flex" /* ---------------se carga pantalla de ataques---------------- */
    sectionVerMapa.style.display = "none"
    //alert("Has colisionado con " + enemigo.nombre)
    seleccionarPC(enemigo)
}

window.addEventListener("load", iniciarJuego)
