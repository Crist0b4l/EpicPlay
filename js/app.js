// Variables
const carrito = document.querySelector('#carrito');
const listaJuegos = document.querySelector('#lista-juegos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
let articulosCarrito = [];

// Listeners
cargarEventListeners();

function cargarEventListeners() {
     // Dispara cuando se presiona "Agregar Carrito"
     listaJuegos.addEventListener('click', agregarJuego);

     // Cuando se elimina un curso del carrito
     carrito.addEventListener('click', eliminarJuegos);

     // Al Vaciar el carrito
     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);


     // NUEVO: Contenido cargado
     document.addEventListener('DOMContentLoaded', () => {
          articulosCarrito = JSON.parse( localStorage.getItem('carrito') ) || []  ;
          // console.log(articulosCarrito);
          carritoHTML();
     });
}


// Función que añade el juego al carrito
function agregarJuego(e) {
     e.preventDefault();
     // Delegation para agregar-carrito
     if(e.target.classList.contains('agregar-carrito')) {
          const juego = e.target.closest('.row');
          // Enviamos el curso seleccionado para tomar sus datos
          leerDatosJuego(juego);
     }
}

// Lee los datos del juego
function leerDatosJuego(juego) {
     const infoJuegos = {
          imagen: juego.querySelector('img').src,
          titulo: juego.querySelector('h2').textContent,
          precio: juego.querySelector('.precio span').textContent,
          id: juego.querySelector('.agregar-carrito').getAttribute('data-id'), 
          cantidad: 1
     }

     if (articulosCarrito.some(j => j.id === infoJuegos.id)) {
          const juegos = articulosCarrito.map(j => {
               if (j.id === infoJuegos.id) {
                    j.cantidad++; // Aumentamos directamente
                    return j;
               } else {
                    return j;
               }
          });
          articulosCarrito = [...juegos];
     } else {
          articulosCarrito = [...articulosCarrito, infoJuegos];
     }

     carritoHTML();
}


// Elimina el curso del carrito en el DOM
function eliminarJuegos(e) {
     e.preventDefault();
     if(e.target.classList.contains('borrar-juegos') ) {
          // e.target.parentElement.parentElement.remove();
          const juegos = e.target.parentElement.parentElement;
          const juegosId = juegos.querySelector('a').getAttribute('data-id');
          
          // Eliminar del arreglo del carrito
          articulosCarrito = articulosCarrito.filter(juego => juego.id !== juegosId);

          carritoHTML();
     }
}


// Muestra el curso seleccionado en el Carrito
function carritoHTML() {

     vaciarCarrito();

     articulosCarrito.forEach(juego => {
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>  
                    <img src="${juego.imagen}" width=100>
               </td>
               <td>${juego.titulo}</td>
               <td>${juego.precio}</td>
               <td>${juego.cantidad} </td>
               <td>
                    <a href="#" class="borrar-juegos" data-id="${juego.id}">X</a>
               </td>
          `;
          contenedorCarrito.appendChild(row);
     });

     // NUEVO:
     sincronizarStorage();

}


// NUEVO: 
function sincronizarStorage() {
     localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
     // forma rapida (recomendada)
     while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
      }
}
