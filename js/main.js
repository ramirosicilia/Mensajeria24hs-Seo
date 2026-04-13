/*DESPLEGABLE*/ 

const enlaceActivo = document.querySelector('.enlace-activo');
const menu = document.querySelector('.header__menu-adicionales');

enlaceActivo.addEventListener('click', (e) => {
    e.preventDefault(); // Previene la recarga de la página
    menu.classList.toggle('enlace-activo-show');
    menu.classList.toggle('adicional-active')
});

// Agrega un event listener al documento para cerrar el menú al hacer clic fuera de él
document.addEventListener('click', (e) => {
    // Comprueba si el objetivo del clic no es el enlace activo ni el menú
    if (e.target !== enlaceActivo && e.target !== menu) {
        menu.classList.remove('enlace-activo-show');
  
    }
});


/*EFECTO-IMAGENES*/ 

const imagenes = document.querySelectorAll('.Servicio__imagen');
const numImagenes = imagenes.length;
let index = 0;

function PasarImagenes() {
    imagenes[index].classList.remove('active');
    imagenes[index].style.opacity = 0;
    index = (index + 1) % numImagenes;
    imagenes[index].classList.add('active');
    setTimeout(() => {
        imagenes[index].style.opacity = 1;
    }, 100);
}

document.addEventListener('DOMContentLoaded', () => {
    imagenes[index].classList.add('active');
    imagenes[index].style.opacity = 1;
    
    // Configura un temporizador para cambiar automáticamente las imágenes
    setInterval(PasarImagenes, 3000); // Cambia cada 3 segundos
});


/*EFECTO DE ESCRITURA*/

const titulo=document.querySelector('.header__subtitulo')
const escritura=titulo.textContent
titulo.textContent=''

let i=0

const id=setInterval(() => {

  titulo.textContent+=escritura[i];i++ 

  if(i===escritura.length){
    clearInterval(id)
  }
  
}, 100);




/*EFECTO LUMINOSIDAD*/  

  
 document.addEventListener("DOMContentLoaded", () =>{

    const engranaje = document.getElementById("engranaje");
    const body=document.body
    const titulo=document.querySelector('.header__titulo')
   
  
    engranaje.addEventListener("click", ()=> {
      // Aplicar la rotación al engranaje (360 grados)
      engranaje.classList.toggle("rotate");
      titulo.classList.toggle('sombras')
  
      // Alternar la clase 'body--show' en el body
      if(body.classList.contains('body--show')){
        body.classList.remove('body--show')
      } 

      else{
        body.classList.add('body--show')

      }
     
    
    });


 }) 


 /*BUSCADOR DE ZONAS*/ 



  const valorProvinciaButton = document.querySelector('.btN');

  valorProvinciaButton.addEventListener('click', function() {
    Swal.fire({
      title: 'Por favor, indique su destino (barrio):',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return 'Debes ingresar un destino';
        } else {
          // Convierte la primera letra de la primera y segunda palabra en mayúsculas y quita los acentos
          const palabras = value.toLowerCase().split(' ');
          const corregido = palabras.map(palabra => {
            return palabra.charAt(0).toUpperCase() + palabra.slice(1);
          }).join(' ');
          const corregidoSinAcentos = quitarAcentos(corregido);
          obtenerValorViaje(corregidoSinAcentos);
        }
      }
    });
  });

  async function obtenerValorViaje(destino) {
    try {
      const response = await fetch('./js/barrios.json'); // Reemplaza con la ruta correcta a tu archivo JSON.
      const jsonData = await response.json();
      const zona = buscarZona(destino, jsonData);
      if (zona) {
        const valorKm = jsonData[zona][destino];
        if (valorKm !== null) {
          const precioKm = 780;
          const valorViaje = (valorKm * precioKm).toLocaleString(); // Formatea con separador de miles
          Swal.fire({
            icon: 'success',
            title: 'Valor del Viaje',
            text: `El valor del viaje a ${destino} en la zona ${zona} es $${valorViaje}`,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Destino no encontrado',
            text: `Destino "${destino}" no encontrado en la zona ${zona}`,
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Destino no encontrado',
          text: `No se encontró el destino "${destino}" en ninguna zona.`,
        });
      }
    } catch (error) {
      console.error('Error al obtener el archivo JSON:', error);
    }
  }

  function buscarZona(barrio, data) {
    for (const zona in data) {
      for (const barrioName in data[zona]) {
        if (compareIgnoreCase(barrioName, barrio)) {
          return zona;
        }
      }
    }
    return null;
  }

  function compareIgnoreCase(a, b) {
    return quitarAcentos(a).localeCompare(quitarAcentos(b), undefined, { sensitivity: 'base' }) === 0;
  }

  function quitarAcentos(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }



/*  MENU HAMBURGUESA*/ 

document.addEventListener("DOMContentLoaded", function() {
  const menuBars = document.querySelector(".menu-bars");
  const headerNav = document.querySelector(".header__nav");
  const enlaces = headerNav.querySelectorAll("a");
  const serviciosSubMenu = headerNav.querySelector(".servicios-submenu");
  const header = document.querySelector('.header');

  menuBars.addEventListener("click", function() {
    headerNav.classList.toggle("active-nav");
  });

  enlaces.forEach(function(enlace) {
    enlace.addEventListener("click", function(e) {
      if (e.target.textContent !== "Servicios") {
        headerNav.classList.remove("active-nav");
      }
      if (e.target.textContent === "Adicionales" || e.target.textContent === "Promociones") {
        menu.classList.toggle('adicional-active');
      }
    });
  });

  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;


    if (headerNav.classList.contains("active-nav") && scrollPosition > 0) {
      headerNav.classList.remove("active-nav");
    }


    headerNav.classList.toggle('scrolled', scrollPosition > 0);
  });
});
