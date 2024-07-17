// Obtener referencias a los elementos del DOM
const shopContent = document.getElementById('shopContent');
const categoriaSelect = document.getElementById('categoriaSelect');
const quitarFiltro = document.getElementById('quitarFiltro');

// Función para cargar y mostrar los juegos
const cargarJuegos = async () => {
    try {
        // Leer el archivo JSON
        const data = await fetch('./recursos/data/juegos.json');
        const juegos = await data.json();

        // Función para mostrar los juegos
        const mostrarJuegos = (juegosFiltrados) => {
            shopContent.innerHTML = '';
            juegosFiltrados.forEach(juego => {
                const { nombreJuego, desc, imagen, categoria, precio } = juego;
                const juegoHTML = `
                    <div class="card">
                        <img src="${imagen}" alt="${nombreJuego}">
                        <h2>${nombreJuego}</h2>
                        <p>${desc}</p>
                        <p class="price">$${precio}</p>
                        <button>Agregar al carrito</button>
                    </div>
                `;
                shopContent.innerHTML += juegoHTML;
            });
        };

        // Mostrar todos los juegos inicialmente
        mostrarJuegos(juegos);

        // Filtrar juegos por categoría
        categoriaSelect.addEventListener('change', () => {
            const categoria = categoriaSelect.value;
            if (categoria) {
                const juegosFiltrados = juegos.filter(juego => juego.categoria === categoria);
                mostrarJuegos(juegosFiltrados);
            } else {
                mostrarJuegos(juegos);
            }
        });

        // Quitar filtro y mostrar todos los juegos
        quitarFiltro.addEventListener('click', () => {
            categoriaSelect.value = '';
            mostrarJuegos(juegos);
        });
    } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
    }
};

// Cargar los juegos al cargar la página
window.addEventListener('DOMContentLoaded', cargarJuegos);