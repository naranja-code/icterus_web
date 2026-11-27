// Inicialización de iconos Lucide
lucide.createIcons();

// Control del Menú Móvil
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("mobile-menu--open");
});

// Cambio de estilo del Header al hacer Scroll
const header = document.getElementById("main-header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    header.classList.add("header--scrolled");
  } else {
    header.classList.remove("header--scrolled");
  }
});

// Manejo del Formulario de Diagnóstico Gratuito
function handleFormSubmit(event) {
  event.preventDefault();
  const formContainer = document.getElementById("form-container");
  const successMsg = document.getElementById("success-message");
  const submitBtn = document.getElementById("submit-btn");

  // Simular estado de carga
  submitBtn.disabled = true;
  submitBtn.innerHTML =
    '<i data-lucide="loader-2"></i><span>Procesando solicitud...</span>';
  lucide.createIcons();

  setTimeout(() => {
    formContainer.style.display = "none";
    successMsg.classList.remove("success-box--hidden");
    lucide.createIcons();
  }, 1200);
}

function resetForm() {
  const formContainer = document.getElementById("form-container");
  const form = document.getElementById("diagnostic-form");
  const successMsg = document.getElementById("success-message");
  const submitBtn = document.getElementById("submit-btn");

  form.reset();
  submitBtn.disabled = false;
  submitBtn.innerHTML =
    '<i data-lucide="send"></i><span>Solicitar Diagnóstico Gratuito Ahora</span>';

  successMsg.classList.add("success-box--hidden");
  formContainer.style.display = "block";
  lucide.createIcons();
}

// funcion para cambiar el logo en hover

const logo = document.getElementById("logo_imagen");
// 2. Definimos las rutas de las imágenes
const imagenOriginal = "imagen-original.jpg";
const imagenHover = "imagen-cambiada.jpg";

// 3. Evento cuando el cursor entra en la imagen (mouseenter)
logo.addEventListener("mouseenter", () => {
  elementoImagen.src = imagenHover;
  console.log("hola");
});
// 4. Evento cuando el cursor sale de la imagen (mouseleave)
logo.addEventListener("mouseleave", () => {
  elementoImagen.src = imagenOriginal;
});
