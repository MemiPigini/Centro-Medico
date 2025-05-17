const especialidades = [
    { nombre: "Clínica general", doctor: "Dr. Rodriguez" },
    { nombre: "Cardiología", doctor: "Dr. Piazza" },
    { nombre: "Dermatología", doctor: "Dra. Martínez" },
    { nombre: "Odontología", doctor: "Dr. León" },
    { nombre: "Pediatría", doctor: "Dra. Rossi" },
    { nombre: "Ginecología", doctor: "Dr. Agote" },
];

const fechasDisponibles = [
    "20/05/2025 - 9:00 AM",
    "21/05/2025 - 10:30 AM",
    "22/05/2025 - 12:00 PM",
    "23/05/2025 - 3:00 PM",
    "24/05/2025 - 4:30 PM",
];

const obrasSociales = ["OSDE", "Swiss Medical", "Galeno", "Particular"];

const especialidadSelect = document.getElementById("especialidadSelect");
const obraSocialSelect = document.getElementById("obraSocialSelect");
const fechaSelect = document.getElementById("fechaSelect");
const formTurno = document.getElementById("formTurno");
const nombreInput = document.getElementById("nombreInput");
const nombreConsulta = document.getElementById("nombreConsulta");
const consultarBtn = document.getElementById("consultarBtn");
const resultadoDiv = document.getElementById("resultado");

function inicializarSelects() {
    for (let especialidad of especialidades) {
        const option = document.createElement("option");
        option.value = especialidad.nombre;
        option.textContent = `${especialidad.nombre} - ${especialidad.doctor}`;
        especialidadSelect.appendChild(option);
    }

    for (let obra of obrasSociales) {
        const option = document.createElement("option");
        option.value = obra;
        option.textContent = obra;
        obraSocialSelect.appendChild(option);
    }

    for (let fecha of fechasDisponibles) {
        const option = document.createElement("option");
        option.value = fecha;
        option.textContent = fecha;
        fechaSelect.appendChild(option);
    }
}

function obtenerTurnos() {
    return JSON.parse(localStorage.getItem("turnos")) || [];
}

function guardarTurnos(turnos) {
    localStorage.setItem("turnos", JSON.stringify(turnos));
}

function mostrarMensaje(html) {
    resultadoDiv.innerHTML = html;
}

formTurno.addEventListener("submit", (e) => {
    e.preventDefault();

    const especialidadSeleccionada = especialidadSelect.value;
    const obraSocialSeleccionada = obraSocialSelect.value;
    const fechaSeleccionada = fechaSelect.value;
    const nombrePaciente = nombreInput.value.trim();

    if (!nombrePaciente) {
        mostrarMensaje("<p>❌ Por favor, ingrese el nombre del paciente.</p>");
        return;
    }

    const doctorAsignado = especialidades.find(
        (e) => e.nombre === especialidadSeleccionada).doctor;

    const nuevoTurno = {
        especialidad: especialidadSeleccionada,
        doctor: doctorAsignado,
        obraSocial: obraSocialSeleccionada,
        fecha: fechaSeleccionada,
        paciente: nombrePaciente,
    };

    const turnos = obtenerTurnos();
    turnos.push(nuevoTurno);
    guardarTurnos(turnos);

    mostrarMensaje(`
        <p><strong>✅ Turno reservado con éxito:</strong></p>
        <ul>
            <li>Especialidad: ${nuevoTurno.especialidad}</li>
            <li>Doctor: ${nuevoTurno.doctor}</li>
            <li>Obra Social: ${nuevoTurno.obraSocial}</li>
            <li>Fecha: ${nuevoTurno.fecha}</li>
            <li>Paciente: ${nuevoTurno.paciente}</li>
        </ul>
    `);

    formTurno.reset();
});

consultarBtn.addEventListener("click", () => {
    const nombreBuscado = nombreConsulta.value.trim().toLowerCase();

    if (!nombreBuscado) {
        mostrarMensaje("<p>❌ Por favor, ingrese un nombre valido para consultar.</p>");
        return;
    }

const turnos = obtenerTurnos();
const turnoEncontrado = turnos.find( 
    (t) => t.paciente.toLowerCase() === nombreBuscado
);

    if (turnoEncontrado) {
        mostrarMensaje(`
            <p><strong>📋 Turno encontrado:</strong></p>
            <ul>
                <li>Especialidad: ${turnoEncontrado.especialidad}</li>
                <li>Doctor: ${turnoEncontrado.doctor}</li>
                <li>Obra Social: ${turnoEncontrado.obraSocial}</li>
                <li>Fecha: ${turnoEncontrado.fecha}</li>
                <li>Paciente: ${turnoEncontrado.paciente}</li>
            </ul>
        `);
    } else {
        mostrarMensaje("<p>❌ No se encontró ningún turno con ese nombre.</p>");
    }

    nombreConsulta.value = "";
});

document.addEventListener("DOMContentLoaded", () => {
    inicializarSelects();
});






// ⚠️⚠️⚠️⚠️ PRIMERA ENTREGA EN COMENTARIOS:

// let turno = {}; 

// let especialidades = [  
//     {nombre: "Clínica general", doctor: "Dr. Rodriguez"},
//     {nombre: "Cardiología", doctor: "Dr. Piazza"},
//     {nombre: "Dermatología", doctor: "Dra. Martínez"},
//     {nombre: "Odontología", doctor: "Dr. León"},
//     {nombre: "Pediatría", doctor: "Dra. Rossi"},
//     {nombre: "Ginecología", doctor: "Dr. Agote"},
// ];

// let fechasDisponibles = [ "20/05/2025 - 9:00 AM", "21/05/2025 - 10:30 AM", "22/05/2025 - 12:00 PM",
//     "23/05/2025 - 3:00 PM", "24/05/2025 - 4:30 PM" ];

// let obrasSociales = ["OSDE", "Swiss Medical", "Galeno", "Particular"];

// let elegirOpcion = prompt ("🏥🩺 Te damos la bienvenida a nuestro centro médico \n ¿Qué desea hacer?\n 1 - Sacar turno \n 2 - Consultar turno")

// while (elegirOpcion !== "1" && elegirOpcion !== "2"){
//     elegirOpcion = prompt ("❌ Opción inválida. Por favor, elija 1 o 2:\n 1 - Sacar turno\n 2 - Consultar turno");
// }

// if (elegirOpcion === "1") {

//     //ESPECIALIDAD
//     let mensaje = "🏥 ¿Para qué especialidad desea sacar un turno?\n Elija un número:\n";
//     let i = 1; //Profe, no se si esto está bien pero no me salió enumerar la lista de otra forma

//     for (let especialidad of especialidades) {
//         mensaje += `${i++}. ${especialidad.nombre}\n`;
//     }

//     let numeroElegido = prompt (mensaje);

//     while (numeroElegido < 1 || numeroElegido > 6) {
//         numeroElegido = prompt (`❌ Opción inválida. Ingrese un número entre 1 y 6:\n` + mensaje);
//     }

//     let especialidadSeleccionada = especialidades [numeroElegido - 1] ; //aquí tambien resté 1 porque sino me daba otra cosa

//     turno.especialidad = especialidadSeleccionada.nombre ;
//     turno.doctor = especialidadSeleccionada.doctor;

//     //OBRA SOCIAL DEL PACIENTE
//     let mensajeObraSocial = "🪪 Elija su obra social:\n";
//     i = 1;

//     for (let obraDelPaciente of obrasSociales) {
//         mensajeObraSocial += `${i++}. ${obraDelPaciente}\n`;
//     }

//     let obraSocialElegida = prompt (mensajeObraSocial);

//     while (obraSocialElegida < 1 || obraSocialElegida > 4) {
//         obraSocialElegida = prompt (`❌ Opción inválida. Ingrese un número entre 1 y 4:\n` + mensajeObraSocial);
//     }

//     turno.obraSocial =obrasSociales [obraSocialElegida - 1];

//     //FECHA DEL TURNO
//     let mensajeFecha = "📆 Elija una fecha disponible para su cita: \n";
//     i = 1;

//     for (let fecha of fechasDisponibles) {
//         mensajeFecha += `${i++}. ${fecha}\n`;
//     }

//     let fechaSeleccionada = prompt (mensajeFecha);

//     while (fechaSeleccionada < 1 || fechaSeleccionada > 5) {
//         numeroElegido = prompt (`❌ Opción inválida. Ingrese un número entre 1 y 5:\n` + mensajeFecha);
//     }

//     turno.fecha = fechasDisponibles [fechaSeleccionada - 1];

//     //DATOS DEL PACIENTE
//     turno.paciente = prompt ("👩🏻‍🦱 Ingrese el nombre y apellido del paciente:")

//     let mensajeConfirmacion = alert (`✅ Su cita se reservó con éxito: \n Detalles del turno : \n
//         🩺Especialidad: ${turno.especialidad}
//         👩🏻‍⚕️Doctor: ${turno.doctor}
//         🪪Obra Social: ${turno.obraSocial}
//         📆Fecha: ${turno.fecha}
//         👩🏻‍🦱Paciente: ${turno.paciente}`);
        
// } else {
//     let ingreso = prompt ("Ingrese el nombre y apellido de la persona de la reserva");
    
//     if (ingreso === turno.paciente) {
//         alert ( `Tu cita es para ${turno.especialidad} con ${turno.doctor} el ${turno.fecha} .`);
//     } else {
//         alert ("No se encontró ninguna cita con ese nombre.");
//     }
// }











