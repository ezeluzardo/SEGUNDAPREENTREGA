let nombre = "";

while (!nombre) {
    nombre = prompt("Bienvenido, ¿Cuál es tu nombre?");

    if (nombre === null) {
        alert("Debes ingresar un nombre válido para continuar.");
    } else if (!isNaN(nombre)) {
        nombre = "";
        alert("Por favor, ingresa un nombre válido (no números).");
    } else {
        nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
    }
}

alert(`¡Hola, ${nombre}! Bienvenido a nuestro simulador de préstamos.`);

// Formulario
const formularioCotizacion = document.querySelector('#formularioCotizacion');
const monto = document.querySelector('#monto');
const plazo = document.querySelector('#plazo');
const tasa = document.querySelector('#tasa');
const btnCotizar = document.querySelector('#btnCotizar');

// Resultados
const resultado = document.querySelector('#resultado');
const resultadoTexto = document.querySelector('#resultadoTexto');
const btnSi = document.querySelector('#btnSi');
const btnNo = document.querySelector('#btnNo');

btnSi.addEventListener('click', () => {
    resultado.classList.add('disable');
    formularioCotizacion.reset();
    if (!ultimoFormulario.classList.contains('disable')) {
        ultimoFormulario.classList.add('disable');
    }
});

btnNo.addEventListener('click', () => {
    formularioCotizacion.reset();
    ultimoFormulario.classList.remove('disable');
});

// Formulario Final
const ultimoFormulario = document.querySelector('#ultimoFormulario');
const btnFormFin = document.querySelector('#btnFormFin');
const inputsFormularioFin = document.querySelectorAll('.simulador__formularioFin-form-input');
const documentType = document.querySelector('#documentType');
const error = document.querySelector('.error');
const formularioFin = document.querySelector('#formulario2');
const calculoArr = [];

function calcularPrestamo() {
    const montoValor = parseFloat(monto.value);
    const plazoValor = parseFloat(plazo.value);
    const tasaValor = parseFloat(tasa.value) / 100;

    const cuota = (montoValor * tasaValor / (1 - Math.pow(1 + tasaValor, -plazoValor))).toFixed(2);

    const totalIntereses = (cuota * plazoValor - montoValor).toFixed(2);

    resultado.classList.remove('disable');
    resultadoTexto.innerHTML = `Cuota mensual: U$S ${cuota} <br> Intereses totales: U$S ${totalIntereses}`;
    
    calculoArr.push({
        monto: montoValor,
        plazo: plazoValor,
        tasa: tasaValor,
        cuota: cuota,
        totalIntereses: totalIntereses
    });
}
// Validar formulario de cotización
function validarFormularioCotizacion() {
    return monto.value && plazo.value;
}

// Evento al hacer clic en el botón "Calcular"
formularioCotizacion.addEventListener('submit', (e) => {
    e.preventDefault(); 
    if (validarFormularioCotizacion()) {
        calcularPrestamo();
    }
});

// Validar formulario final
function validarFormularioFinal() {
    const [nombre, apellido, email, tipoDocumento, ci, telefono] = inputsFormularioFin;
    const isCI = documentType.value === "CI";
    const isPasaporte = documentType.value === "Pasaporte";

    const isFormValid = nombre.value && apellido.value && email.value && tipoDocumento.value && ci.value && telefono.value;

    btnFormFin.classList.toggle('buttonDisable', !isFormValid);
    
    if (tipoDocumento.value && (isCI || isPasaporte)) {
        const validLength = isCI ? ci.value.length === 8 : (isPasaporte && ci.value.length === 10);
        error.classList.toggle('disable', validLength);
    } else {
        error.classList.remove('disable');
    }

    return isFormValid; // Devuelve el estado de la validación
}

// Evento al enviar el formulario final
formularioFin.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validarFormularioFinal()) {
        enviarFormulario();
    }
});

documentType.addEventListener('change', validarFormularioFinal);

function enviarFormulario() {
    const [nombre, apellido, email, tipoDocumento, ci, telefono] = inputsFormularioFin;
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth();
    const año = fechaActual.getFullYear() + 1;
    const fechaVencimiento = `${dia}/${mes + 1}/${año}`;
    const calculo = calculoArr[0];

    const datos = {
        nombre: nombre.value,
        apellido: apellido.value,
        ci: ci.value,
        email: email.value,
        telefono: telefono.value,
        tipoDocumento: tipoDocumento.value,
        fechaActual: fechaActual,
        fechaVencimiento: fechaVencimiento,
        calculo: calculo
    };

    console.log(datos);

    formularioFin.reset();
    ultimoFormulario.classList.add('disable');
    resultado.classList.add('disable');
    btnFormFin.classList.add('buttonDisable');
}

ultimoFormulario.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validarFormularioFinal()) {
        enviarFormulario();
    }
});

document.addEventListener('keypress', (e) => {
    if (e.keyCode === 13 && validarFormularioFinal()) {
        enviarFormulario();
    }
});

// Eventos para validación de formularios
inputsFormularioFin.forEach(input => {
    input.addEventListener('input', validarFormularioFinal);
});

formularioCotizacion.addEventListener('submit', (e) => {
    e.preventDefault();
    if (monto.value && plazo.value) {
        calcularPrestamo();
    }
});