/* -------------------------------------Variables de iniciarJuego---------------------------- */
const sectionAtaque = document.getElementById("seleccion-ataque")
const sectionReinicio = document.getElementById("reinicio")
const botonMascotaJugador = document.getElementById("boton-mascota")
const botonReinicio = document.getElementById("boton-reinicio")
/* ---------------------------------------Variables de seleccionarMascota---------------------- */
const sectionSeleccionarM = document.getElementById("seleccion-mascota")

const spanmascota = document.getElementById("nombre-mascota-jugador")
/* zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz */
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
let opcionDeChimpokomon
const contenedorTarjetas = document.getElementById("contenedorTarjetas") /* Esta variable es la ID del div en donde alamcenamos las tarjetas de personaje */
let imputUribe 
let imputMomoperro 
let imputVene
let mascotaJugador
const contenedorAtaques = document.getElementById("contenedorAtaques")
let ataquesChimpokomon
let ataquesChimpokomonEnemigo

let botonFuego 
let botonAgua 
let botonTierra 
let botones = [] /* Arreglo hecho en CLASE 56 */
let ataqueJugador = []
let ataquePC = []

let indexAtaqueJugador
let indexAtaquePC
let victoriasJugador = 0 /* Clase 69 */
let victoriasPC = 0

let vidasJugador = 3
let vidasPC = 3
/* ---------------------------------------------------------------------------------------------- */
let chimpokomones = [] /* Esta es la manera de definir un arreglo */

class Chimpokomon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida 
        this.ataques = [] 
    }
}

let UribeCop = new Chimpokomon("UribeCop", "./assets/uribecop.png", 5) /* Aqui estamos definiendo los OBJETOS pertenecientes a la clase Chimpokomon */

let Momoperro = new Chimpokomon("Momoperro", "./assets/momoperro.jpeg", 5)

let Venecosaurio = new Chimpokomon("Venecosaurio", "./assets/venecosaurio.jpg", 5)

UribeCop.ataques.push( /* Inyecta los ataques en el arreglo interno de la clase */
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

Venecosaurio.ataques.push(
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
    sectionReinicio.style.display = "none"

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

}

function seleccionarMascota() {

        sectionSeleccionarM.style.display = "none"
        sectionAtaque.style.display = "flex"
       
        if (imputUribe.checked) {
        spanmascota.innerHTML=imputUribe.id
        mascotaJugador = imputUribe.id} 
        else if (imputMomoperro.checked) {spanmascota.innerHTML=imputMomoperro.id
        mascotaJugador = imputMomoperro.id} 
        else if (imputVene.checked) {spanmascota.innerHTML=imputVene.id
        mascotaJugador = imputVene.id} /* Con esto guardamos el nombre de la mascota seleccionada en la variable para poder utilizarla mas adelante*/
    
        extraerAtaques(mascotaJugador) /* Esta función traerá los ataques específicos de la mascota seleccionada */
        seleccionarPC()
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

function seleccionarPC() {
    let mascotaPC = aleatorio(0, chimpokomones.length -1) /* De esta manera, tendremos un numero aleatorio entre 1 y la longitud del arreglo de Chimpokomones nuevos que hayamos agregado, de tal forma, la PC seleccionará sin excluir a ningún nuevo personaje */ 
    /* chimpokomones.lenght - 1 es para evitar contar un elemento de mas que no existe, pues el arreglo ya contiene 3 elementos (por ahora) */

    spanPC.innerHTML = chimpokomones[mascotaPC].nombre
    ataquesChimpokomonEnemigo = chimpokomones[mascotaPC].ataques
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

    if (victoriasJugador === 3 || victoriasPC === 3) {
        let sectionReinicio = document.getElementById("reinicio")
        sectionReinicio.style.display = "block"
    }
}

function final(resultado) {
    
    let parrafo = document.createElement("p")
    parrafo.innerHTML = resultado
    sectionMensaje.appendChild(parrafo)

}

function reinicioJuego() {
    location.reload()
}

window.addEventListener("load", iniciarJuego)
