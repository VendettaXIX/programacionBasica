/* -------------------------------------Variables de iniciarJuego---------------------------- */
const sectionAtaque = document.getElementById("seleccion-ataque")
const sectionReinicio = document.getElementById("reinicio")
const botonMascotaJugador = document.getElementById("boton-mascota")
const botonReinicio = document.getElementById("boton-reinicio")
/* ---------------------------------------Variables de seleccionarMascota---------------------- */
const sectionSeleccionarM = document.getElementById("seleccion-mascota")

const spanmascota = document.getElementById("nombre-mascota-jugador")

/* -------------------------------------Variables seleccionar PC------------------------------------------------ */
const spanPC = document.getElementById("nombre-mascota-pc")
/* ------------------------------------Variables resultadoVictoria---------------------------- */
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
let botonFuego 
let botonAgua 
let botonTierra 
let botones = [] /* Arreglo hecho en CLASE 56 */

let ataqueJugador
let ataquePC
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
        <button id=${ataque.id} class="botonAtaque BAtaque"> ${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesChimpokomon
    });
    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botonTierra = document.getElementById("boton-tierra")
    botones = document.querySelectorAll(".BAtaque") /* Selecciona a todos los elementos que coincidan con la descripción del paréntesis */ /* ------------- CLASE 56----------------------------------- */


    botonFuego.addEventListener("click", ataqueFuego)
    botonAgua.addEventListener("click", ataqueAgua)
    botonTierra.addEventListener("click", ataqueTierra)

}
/* ---------------------------------CLASE 56------------------------------------------- */
function secuenciaAtaque() {
    botones.forEach((boton) => boton.addEventListener("click", (e)=>console.log(e))) /* De esta manera cada boton tiene asociado el evento de click, "e" significa el evento mismo, el cual queremos visualizar en la consola mendiante el console.log. El propósito de esto es poder acceder al "text-content" del boton seleccionado */
}


/* ---------------------------------CLASE 56------------------------------------------- */

function aleatorio(min, max) {
     return Math. floor(Math.random()*(max-min+1)+min)}

function seleccionarPC() {
    let mascotaPC = aleatorio(1, chimpokomones.length -1) /* De esta manera, tendremos un numero aleatorio entre 1 y la longitud del arreglo de Chimpokomones nuevos que hayamos agregado, de tal forma, la PC seleccionará sin excluir a ningún nuevo personaje */ 
    /* chimpokomones.lenght - 1 es para evitar contar un elemento de mas que no existe, pues el arreglo ya contiene 3 elementos (por ahora) */

    spanPC.innerHTML = chimpokomones[mascotaPC].nombre

    secuenciaAtaque() /* ---------------------CLASE 56----------------------------------- */
}

function ataqueFuego() {
    ataqueJugador = "Fuego", alert("Has seleccionado " + ataqueJugador)
    seleccionAtaquePC()
}

function ataqueAgua() {
    ataqueJugador = "Agua", alert("Has seleccionado " + ataqueJugador)
    seleccionAtaquePC()
}

function ataqueTierra() {
    ataqueJugador = "Tierra", alert("Has seleccionado " + ataqueJugador)
    seleccionAtaquePC()
}

function resultadoVictoria() {
    
    if(ataqueJugador == ataquePC) {crearMensaje("Empate de ronda")} else if(ataqueJugador == "Fuego" && ataquePC == "Tierra") {crearMensaje("Ganaste la ronda") 
            vidasPC--
            spanVidasPc.innerHTML=vidasPC
    } else if(ataqueJugador=="Tierra" && ataquePC =="Agua") {
        crearMensaje("Ganaste la ronda") 
        vidasPC--
        spanVidasPc.innerHTML=vidasPC
    } else if(ataqueJugador=="Agua" && ataquePC=="Fuego") {
        crearMensaje("Ganaste la ronda") 
        vidasPC--
        spanVidasPc.innerHTML=vidasPC
    } else {crearMensaje("Perdiste la ronda") 
            vidasJugador--
            spanVidasJugador.innerHTML=vidasJugador
    }

    revisarVida()
}


function seleccionAtaquePC() {
    ataqueAleatorio = aleatorio(1,3)

    if (ataqueAleatorio == 1) {ataquePC="Fuego",alert("Tu rival ha seleccionado Fuego")} else if (ataqueAleatorio == 2) {ataquePC="Agua",alert("Tu rival ha seleccionado agua")} else {ataquePC="Tierra",alert("Tu rival ha seleccionado Tierra")}

    resultadoVictoria()
}


function crearMensaje(resultado) {

    let nuevoAtaquesJugador = document.createElement("p")
    let nuevoAtaquesEnemigo = document.createElement("p")

    sectionMensaje.innerHTML= resultado
    nuevoAtaquesJugador.innerHTML = ataqueJugador
    nuevoAtaquesEnemigo.innerHTML = ataquePC

    ataquesJugador.appendChild(nuevoAtaquesJugador)
    ataquesEnemigo.appendChild(nuevoAtaquesEnemigo)
   /*  let parrafo = document.createElement("p") */
    /* parrafo.innerHTML = "Tu chimpokomon atacó con " + ataqueJugador + " y el chimpokomon enemigo respondió con " + ataquePC + ". " + resultado
    sectionMensaje.appendChild(parrafo */
}

function revisarVida() {
    if (vidasJugador==0){final("Has perdido el combate. El chimpokomon enemigo se comió tu pene")}
    else if (vidasPC==0){final("Has ganado el combate, el PC no tiene pene :c ")} 
    if (vidasJugador==0 || vidasPC==0) {
        let sectionReinicio = document.getElementById("reinicio")
        sectionReinicio.style.display = "block"
    }
}

function final(resultado) {
    
    let parrafo = document.createElement("p")
    parrafo.innerHTML = resultado
    sectionMensaje.appendChild(parrafo)

    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true
}

function reinicioJuego() {
    location.reload()
}

window.addEventListener("load", iniciarJuego) 


