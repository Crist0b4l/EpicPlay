$(document).ready(function () {
    $("#btnRegistrar").click(function () {
      let valido = true;
  
      // Limpiar clases previas
      $(".form-control").removeClass("is-invalid is-valid");
  
      const nombre = $("#nombre").val().trim();
      const usuario = $("#usuario").val().trim();
      const email = $("#email").val().trim();
      const password = $("#password").val();
      const repassword = $("#repassword").val();
      const fecha = $("#fecha").val();
  
      // Validación nombre
      if (!nombre) {
        $("#nombre").addClass("is-invalid");
        valido = false;
      } else {
        $("#nombre").addClass("is-valid");
      }
  
      // Validación usuario
      if (!usuario) {
        $("#usuario").addClass("is-invalid");
        valido = false;
      } else {
        $("#usuario").addClass("is-valid");
      }
  
      // Validación email
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        $("#email").addClass("is-invalid");
        valido = false;
      } else {
        $("#email").addClass("is-valid");
      }
  
      // Validación contraseña
      const passRegex = /^(?=.*[A-Z])(?=.*\d).{6,18}$/;
      if (!password || !passRegex.test(password)) {
        $("#password").addClass("is-invalid");
        valido = false;
      } else {
        $("#password").addClass("is-valid");
      }
  
      // Validación repetir contraseña
      if (password !== repassword || !repassword) {
        $("#repassword").addClass("is-invalid");
        valido = false;
      } else {
        $("#repassword").addClass("is-valid");
      }
  
      // Validación edad mínima
      if (!fecha || !tieneEdadMinima(fecha, 13)) {
        $("#fecha").addClass("is-invalid");
        valido = false;
      } else {
        $("#fecha").addClass("is-valid");
      }
  
      if (valido) {
        alert("¡Formulario válido!");
        const modal = bootstrap.Modal.getInstance(document.getElementById("registroModal"));
        modal.hide();
      }
    });
  
    // Calcular edad
    function tieneEdadMinima(fecha, edadMin) {
      const nacimiento = new Date(fecha);
      const hoy = new Date();
      let edad = hoy.getFullYear() - nacimiento.getFullYear();
      const m = hoy.getMonth() - nacimiento.getMonth();
      if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) edad--;
      return edad >= edadMin;
    }
  
    // Limpiar clases cuando el usuario escribe
    $(".form-control").on("input change", function () {
      $(this).removeClass("is-invalid is-valid");
    });
  
    // Limpiar al abrir el modal
    $("#registroModal").on("show.bs.modal", function () {
      $("#registroForm")[0].reset();
      $(".form-control").removeClass("is-invalid is-valid");
    });
  });