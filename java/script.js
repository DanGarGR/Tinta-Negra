/* ---------- ANIMACIONES AL HACER SCROLL ---------- */
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

/* ---------- FORMULARIO (SIMULACIÓN DE BD) ---------- */
const form = document.getElementById("contactForm");

const message = document.createElement("div");
message.classList.add("form-message");
form.appendChild(message);

form.addEventListener("submit", e => {
  e.preventDefault();

  const fakeDB = {
    nombre: form.querySelector("input[type='text']").value,
    correo: form.querySelector("input[type='email']").value,
    mensaje: form.querySelector("textarea").value,
    fecha: new Date().toLocaleString()
  };

  console.log("Registro guardado (simulado):", fakeDB);

  message.textContent = "✔ Registro enviado correctamente. Gracias por escribir.";
  message.classList.add("show");

  form.reset();

  setTimeout(() => {
    message.classList.remove("show");
  }, 4000);
});
