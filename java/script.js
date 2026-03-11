/* ================= ANIMACIONES AL HACER SCROLL ================= */

const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

sections.forEach(section => observer.observe(section));


/* ================= FORMULARIO DE CONTACTO (SIMULACIÓN) ================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

  const message = document.createElement("div");
  message.classList.add("form-message");

  contactForm.appendChild(message);

  contactForm.addEventListener("submit", e => {

    e.preventDefault();

    const fakeDB = {
      nombre: contactForm.querySelector("input[type='text']").value,
      correo: contactForm.querySelector("input[type='email']").value,
      mensaje: contactForm.querySelector("textarea").value,
      fecha: new Date().toLocaleString()
    };

    console.log("Registro guardado (simulado):", fakeDB);

    message.textContent = "✔ Registro enviado correctamente. Gracias por escribir.";
    message.classList.add("show");

    contactForm.reset();

    setTimeout(() => {
      message.classList.remove("show");
    }, 4000);

  });

}

