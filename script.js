// ====== REFERENCIAS A LOS BOTONES ======
const btnGuardar = document.getElementById("btnGuardar");
const btnVer = document.getElementById("btnVer");
const btnLimpiar = document.getElementById("btnLimpiar");
const btnBorrar = document.getElementById("btnBorrar");

// ==== FUNCION PARA LIMPIAR FORMULARIO ====
function limpiarFormulario() {
  document.getElementById("nombre").value = "";
  document.getElementById("email").value = "";
  document.getElementById("edad").value = "";
}

// ==== GUARDAR DATOS ====
btnGuardar.addEventListener("click", () => {
  document.querySelectorAll(".error").forEach((e) => (e.textContent = ""));

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const edad = document.getElementById("edad").value.trim();

  let valido = true;

  if (nombre === "") {
    document.getElementById("error-nombre").textContent =
      "El nombre es obligatorio.";
    valido = false;
  }

  if (email === "") {
    document.getElementById("error-email").textContent =
      "El email es obligatorio.";
    valido = false;
  } else if (!email.includes("@") || !email.includes(".")) {
    document.getElementById("error-email").textContent =
      "Ingrese un email válido.";
    valido = false;
  }

  if (edad === "") {
    document.getElementById("error-edad").textContent =
      "La edad es obligatoria.";
    valido = false;
  } else if (isNaN(edad) || edad <= 0) {
    document.getElementById("error-edad").textContent =
      "Ingrese una edad válida.";
    valido = false;
  }

  if (valido) {
    const usuario = { nombre, email, edad };
    let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    listaUsuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
    alert("✅ Datos guardados correctamente en LocalStorage.");
    limpiarFormulario();

    // Si la lista de usuarios está visible, refrescarla automáticamente
    const resultado = document.getElementById("resultado");
    if (resultado.style.display === "block") {
      mostrarUsuarios(); // función que actualiza el DOM
    }
  }
});

// ==== FUNCIÓN PARA MOSTRAR USUARIOS ====
function mostrarUsuarios() {
  const resultado = document.getElementById("resultado");
  const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];

  if (usuariosGuardados.length === 0) {
    alert("No hay usuarios guardados.");
    resultado.style.display = "none";
    resultado.innerHTML = "";
    btnVer.textContent = "Ver Datos";
    return;
  }

  let html = "<h3>Usuarios Guardados:</h3>";
  usuariosGuardados.forEach((u, i) => {
    html += `
            <div class="usuario" data-index="${i}">
                <p><strong>Usuario #${i + 1}</strong></p>
                <p><strong>Nombre:</strong> ${u.nombre}</p>
                <p><strong>Email:</strong> ${u.email}</p>
                <p><strong>Edad:</strong> ${u.edad}</p>
                <button class="btn-borrar-individual" data-index="${i}">Borrar Usuario</button>
            </div>
            <hr>
        `;
  });

  resultado.innerHTML = html;
  resultado.style.display = "block";
  btnVer.textContent = "Ocultar Datos";

  // Botones de borrar individual
  const botonesBorrar = document.querySelectorAll(".btn-borrar-individual");
  botonesBorrar.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = parseInt(e.target.getAttribute("data-index"));
      usuariosGuardados.splice(index, 1);
      localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));
      mostrarUsuarios(); // refresca la lista automáticamente
      alert("✅ Usuario eliminado.");
    });
  });
}

// ==== BOTÓN VER/OCULTAR DATOS ====
btnVer.addEventListener("click", () => {
  const resultado = document.getElementById("resultado");

  if (resultado.style.display === "block") {
    // Ocultar lista
    resultado.style.display = "none";
    resultado.innerHTML = "";
    btnVer.textContent = "Ver Datos";
  } else {
    mostrarUsuarios(); // Mostrar lista
  }
});

// ==== LIMPIAR FORMULARIO ====
btnLimpiar.addEventListener("click", () => {
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const edad = document.getElementById("edad").value;

  const errores = [...document.querySelectorAll(".error")];
  const hayErrores = errores.some((e) => e.textContent.trim() !== "");

  const todoVacio =
    nombre.trim() === "" &&
    email.trim() === "" &&
    edad.trim() === "" &&
    !hayErrores;

  if (todoVacio) {
    alert("No hay nada que limpiar.");
    return;
  }

  limpiarFormulario();
  errores.forEach((e) => (e.textContent = ""));
  alert("Formulario limpiado.");
});

// ==== BORRAR TODOS LOS DATOS DE LOCALSTORAGE ====
btnBorrar.addEventListener("click", () => {
  const usuarios = JSON.parse(localStorage.getItem("usuarios"));

  if (!usuarios || usuarios.length === 0) {
    alert("⚠ No hay datos para borrar.");
    return;
  }

  localStorage.removeItem("usuarios");
  document.getElementById("resultado").innerHTML = "";
  document.getElementById("resultado").style.display = "none";
  btnVer.textContent = "Ver Datos";
  alert("✅ Datos borrados del LocalStorage.");
});