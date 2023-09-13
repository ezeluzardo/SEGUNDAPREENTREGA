
const resultados = [];


function realizarOperacion(operacion) {
    const numero1 = parseFloat(prompt('Ingrese el primer número:'));
    const numero2 = parseFloat(prompt('Ingrese el segundo número:'));

    let resultado;

    switch (operacion) {
        case 'suma':
            resultado = numero1 + numero2;
            break;
        case 'resta':
            resultado = numero1 - numero2;
            break;
        case 'multiplicacion':
            resultado = numero1 * numero2;
            break;
        case 'division':
            resultado = numero1 / numero2;
            break;
        case 'porcentaje':
            resultado = (numero1 * numero2) / 100;
            break;
        default:
            console.log('Operación no válida.');
            return;
    }


    resultados.push(resultado);


    console.log(`Resultado de ${operacion}: ${resultado}`);
}


const resultadoMayorA10 = resultados.filter(resultado => resultado > 10);
console.log('Resultados mayores a 10:', resultadoMayorA10);
