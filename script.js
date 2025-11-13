// ==== Referencias a los botones ====
const btnguardar = document.getElementById("btnguardar");
const btnver = document.getElementById("btnver");
const btnlimpiar = document.getElementById("btnlimpiar");
const btnborrar = document.getElementById("btnborrar");

// ==== Función para limpiar el formulario ====
function limpiarFormulario() {
  document.getElementById("nombre").value = "";
  document.getElementById("email").value = "";
  document.getElementById("edad").value = "";
  document.getElementById("nombreError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("edadError").textContent = "";
}

// ==== Guardar datos ====
btnguardar.addEventListener("click", () => {
  // Obtener valores del formulario
  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const edad = document.getElementById("edad").value.trim();

  let valido = true;

  // ==== Validaciones ====
  if (nombre === "") {
    document.getElementById("nombreError").textContent = "El nombre es obligatorio.";
    valido = false;
  } else {
    document.getElementById("nombreError").textContent = "";
  }

  if (email === "" || !email.includes("@")) {
    document.getElementById("emailError").textContent = "Ingrese un correo válido.";
    valido = false;
  } else {
    document.getElementById("emailError").textContent = "";
  }

  if (edad === "" || isNaN(edad) || edad < 1 || edad > 120) {
    document.getElementById("edadError").textContent = "Ingrese una edad válida.";
    valido = false;
  } else {
    document.getElementById("edadError").textContent = "";
  }

  // ==== Si todo está bien, guardar en localStorage ====
  if (valido) {
    const usuario = { nombre, email, edad };
    localStorage.setItem("usuario", JSON.stringify(usuario));
    alert("Datos guardados correctamente");
    limpiarFormulario();
  }
});

// ==== Ver datos guardados ====
btnver.addEventListener("click", () => {
  const usuarioGuardado = localStorage.getItem("usuario");

  if (usuarioGuardado) {
    const usuario = JSON.parse(usuarioGuardado);
    document.getElementById("resultado").innerHTML = `
      <p><strong>Nombre:</strong> ${usuario.nombre}</p>
      <p><strong>Email:</strong> ${usuario.email}</p>
      <p><strong>Edad:</strong> ${usuario.edad}</p>
    `;
  } else {
    alert("No hay datos guardados.");
  }
});

// ==== Limpiar formulario ====
btnlimpiar.addEventListener("click", limpiarFormulario);

// ==== Borrar datos de localStorage ====
btnborrar.addEventListener("click", () => {
  localStorage.removeItem("usuario");
  document.getElementById("resultado").innerHTML = "";
  alert("Datos borrados correctamente");
});
