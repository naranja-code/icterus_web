/**
 * ICTERUS - SERVICIOS TÉCNICOS E INFRAESTRUCTURA IT
 * JavaScript Principal de Alta Conversión e Interactividad
 * Autor: José Rodríguez / Icterus
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Número oficial de WhatsApp de Icterus (Configurable)
  const WHATSAPP_PHONE = "584241790942"; // Reemplazar con el número real de WhatsApp de José Rodríguez

  // 2. Control de Header Navbar al hacer Scroll
  const navbar = document.getElementById("mainNavbar");
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        navbar.classList.add("header-navbar--scrolled");
      } else {
        navbar.classList.remove("header-navbar--scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Chequeo inicial
  }

  // 3. Cerrar Menú Móvil al hacer clic en un enlace
  const navLinks = document.querySelectorAll(".header-navbar .nav-link, .header-navbar .btn");
  const navbarCollapse = document.getElementById("navbarCollapse");
  if (navbarCollapse) {
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navbarCollapse.classList.contains("show")) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) {
            bsCollapse.hide();
          }
        }
      });
    });
  }

  // 4. Animación Interactiva de la Terminal Tecnológica (Hero Section)
  const terminalInput = document.getElementById("terminal-typing-text");
  if (terminalInput) {
    const diagnosticPhases = [
      "verificando_infraestructura.sh --la-guaira",
      "laser_printers: FUSOR_OK | RODILLOS_OK",
      "pos_cajas: ONLINE | PROTECCION_DATOS_ACTIVA",
      "tiempo_respuesta: CATIA_LA_MAR < 30 MIN",
      "estado_operativo: 100% GARANTIZADO"
    ];

    let phaseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeTerminalLoop() {
      const currentText = diagnosticPhases[phaseIndex];

      if (!isDeleting) {
        terminalInput.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentText.length) {
          isDeleting = true;
          setTimeout(typeTerminalLoop, 2200); // Pausa para lectura
          return;
        }
      } else {
        terminalInput.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          phaseIndex = (phaseIndex + 1) % diagnosticPhases.length;
          setTimeout(typeTerminalLoop, 400);
          return;
        }
      }

      const speed = isDeleting ? 30 : 60;
      setTimeout(typeTerminalLoop, speed);
    }

    setTimeout(typeTerminalLoop, 1000);
  }

  // 5. Scroll Reveal Observer (Aparición suave de secciones)
  const revealElements = document.querySelectorAll(".reveal-section");
  if ("IntersectionObserver" in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback si no hay soporte para IntersectionObserver
    revealElements.forEach((el) => el.classList.add("visible"));
  }

  // 6. Selección Inteligente de Planes -> Relleno Automático del Formulario
  const planSelectBtns = document.querySelectorAll("[data-select-plan]");
  const formPlanSelect = document.getElementById("formServicio");
  const formDetalle = document.getElementById("formDetalle");

  planSelectBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const planName = btn.getAttribute("data-select-plan");
      if (formPlanSelect) {
        formPlanSelect.value = planName;
      }
      if (formDetalle && !formDetalle.value) {
        formDetalle.value = `Deseo cotizar el ${planName} para los equipos de mi negocio.`;
      }
    });
  });

  // 7. Formulario de Captación de Leads y Conexión Directa con WhatsApp
  const diagnosticForm = document.getElementById("diagnosticForm");
  const formCard = document.getElementById("formCard");
  const successBox = document.getElementById("formSuccessBox");
  const waDirectBtn = document.getElementById("waDirectLaunchBtn");
  const resetFormBtn = document.getElementById("resetFormBtn");

  if (diagnosticForm) {
    diagnosticForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Recolección de datos
      const nombre = document.getElementById("formNombre")?.value.trim() || "";
      const negocio = document.getElementById("formNegocio")?.value.trim() || "";
      const zona = document.getElementById("formZona")?.value || "";
      const servicio = document.getElementById("formServicio")?.value || "";
      const detalle = document.getElementById("formDetalle")?.value.trim() || "";

      // Construcción del mensaje profesional para WhatsApp
      const waMessage = 
`*SOLICITUD TÉCNICA - ICTERUS LA GUAIRA*
━━━━━━━━━━━━━━━━━━━━
👤 *Contacto:* ${nombre}
🏢 *Comercio / Empresa:* ${negocio}
📍 *Ubicación:* ${zona}
⚙️ *Servicio Solicitado:* ${servicio}
📝 *Detalle de Falla / Requerimiento:*
${detalle}
━━━━━━━━━━━━━━━━━━━━
_Enviado desde la web de Icterus - Atención directa José Rodríguez_`;

      const encodedMessage = encodeURIComponent(waMessage);
      const fullWaUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;

      // Configurar enlace del botón de lanzamiento directo
      if (waDirectBtn) {
        waDirectBtn.setAttribute("href", fullWaUrl);
      }

      // Animación de estado de éxito
      const submitBtn = diagnosticForm.querySelector("button[type='submit']");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          <span>Generando Ticket Técnico...</span>
        `;
      }

      setTimeout(() => {
        if (formCard) formCard.style.display = "none";
        if (successBox) successBox.classList.add("show");

        // Abrir WhatsApp en nueva pestaña de forma natural
        window.open(fullWaUrl, "_blank", "noopener,noreferrer");

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span>Solicitar Diagnóstico y Contacto Prioritario</span>`;
        }
      }, 700);
    });
  }

  // Botón para resetear formulario
  if (resetFormBtn) {
    resetFormBtn.addEventListener("click", () => {
      if (diagnosticForm) diagnosticForm.reset();
      if (successBox) successBox.classList.remove("show");
      if (formCard) formCard.style.display = "block";
    });
  }
});
