let tof = true;
class Producto {
    constructor(nombre, precio, cantidad) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }

    obtenerInformacion() {
        return `Nombre: ${this.nombre}, Precio: $${this.precio}, Cantidad: ${this.cantidad}`;
    }
}

const productos = [];

function agregarProducto() {
    const nombre = prompt('Ingrese el nombre del producto:');
    const precio = parseFloat(prompt('Ingrese el precio del producto:'));
    const cantidad = parseInt(prompt('Ingrese la cantidad del producto:'));

    const producto = new Producto(nombre, precio, cantidad);
    productos.push(producto);
}

function mostrarProductos() {
    console.log('Lista de productos:');
    productos.forEach((producto, index) => {
        console.log(`${index + 1}. ${producto.obtenerInformacion()}`);
    });
}

function ordenarProductos() {
    productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
}

while (tof) {
    const opcion = prompt(
        'Seleccione una opción:\n1. Agregar producto\n2. Mostrar productos\n3. Ordenar productos por nombre\n4. Salir'
    );

    switch (opcion) {
        case '1':
            agregarProducto();
            console.log('Producto agregado.');
            break;
        case '2':
            mostrarProductos();
            console.log('Productos mostrados.');
            break;
        case '3':
            ordenarProductos();
            console.log('Productos ordenados por nombre.');
            break;
        case '4':
            console.log('Saliendo del programa.');
            alert('Gracias por usar el programa.');
            tof = false;
            // Puedes agregar más opciones o funcionalidades aquí si lo deseas.
            break;
        default:
            console.log('Opción no válida. Por favor, seleccione una opción válida.');
    }
}
