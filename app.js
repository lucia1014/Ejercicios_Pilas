//1.- Hacer una función que reciba como parámetros una pila, y un número. 
//La función debe retornar tantos elementos como diga el número (segundo parámetro).
//Entrada : mifuncion([‘Manzana’,‘Cebolla’,‘Apio’,‘Naranja’,‘Papaya’,‘Sandía’,‘Melón’],4)
//Salida: [‘Manzana’,‘Cebolla’,‘Apio’,‘Naranja’].

console.log('Ejercicio 1.1');

class Pila {
    constructor() {
        this.elementos = [];
    }

    agregar(nuevoValor) {
        this.elementos.push(nuevoValor);
    }
}

function mifuncion(pila, numero) {
    if (pila.elementos.length < numero) {
        console.log('El número es mayor que la longitud de la pila')
        return undefined;
    }
    return pila.elementos.slice(0, numero);
}

let pilaDeProductos = new Pila();
pilaDeProductos.agregar('Manzana');
pilaDeProductos.agregar('Cebolla');
pilaDeProductos.agregar('Apio');
pilaDeProductos.agregar('Naranja');
pilaDeProductos.agregar('Papaya');
pilaDeProductos.agregar('Sandía');
pilaDeProductos.agregar('Melón');

console.log(mifuncion(pilaDeProductos, 4));


//2.- Escribe una función “reemplazar” que tenga como parámetros una pila de 
//elementos de tipo Number, y dos valores también de tipo Number “nuevo” y “viejo”, 
//de forma que si el segundo valor aparece en algún lugar de la pila, sea reemplazado 
//por el primero (Solo la primera vez), y hará pop de los elementos más nuevos.
//Entrada: reemplazar([3,2,3,4,6,8,1,2,5,5], 7, 2)
//Salida: [3,2,3,4,6,8,1,7]

console.log('Ejercicio 1.2');

class Stack {
    constructor(elementos) {
        this.elementos = elementos || [];
    }

    agregarElemento(item) {
        this.elementos.push(item);
    }

    quitarElemento() {
        return this.elementos.pop();
    }

    longitud() {
        return this.elementos.length;
    }

    toString() {
        return this.elementos.join(', ');
    }
}

function reemplazar(pila, nuevo, viejo) {
    let reemplazado = false;
    let temporal = [];

    // Sacar los elementos de la pila original y guardarlos en 'temporal'
    while (pila.longitud() > 0) {
        let elemento = pila.quitarElemento();
        if (elemento === viejo && !reemplazado) {
            temporal.push(nuevo);
            reemplazado = true;
        } else {
            temporal.push(elemento);
        }
    }

    // Crear una nueva pila con los elementos de 'temporal' en el orden correcto sin agregar los elementos despues del numero reemplazado
    let nuevaPila = new Stack();
    while (temporal.length > 0) {
        let elemento = temporal.pop();
        nuevaPila.agregarElemento(elemento);
        if(elemento === nuevo){
            break;
        } 
    }
    return nuevaPila;
}

let pila = new Stack([3, 2, 3, 4, 6, 8, 1, 2, 5, 5]);
let nuevo = 7;
let viejo = 2;

console.log("Pila original: " + pila.toString());
let pilaModificada = reemplazar(pila, nuevo, viejo);
console.log("Pila modificada: " + pilaModificada.toString());


//3.- Un conductor maneja de un pueblo origen a un pueblo destino, pasando por varios pueblos. 
//Una vez en el pueblo destino, el conductor debe regresar a casa por el mismo camino. 
//Muestre el camino recorrido tanto de ida como de vuelta.
//Recorrido: Pueblo Origen → pueblo 1 → pueblo 2 → destino
//Regreso: destino → pueblo 2 → pueblo 1 → Pueblo Origen

console.log('Ejercicio 1.3');

class Ruta {
    constructor(origen, destino) {
        this.origen = origen;
        this.destino = destino;
        this.pueblos = [];
    }

    agregarPueblo(pueblo) {
        this.pueblos.push(pueblo);
    }

    obtenerCaminoIda() {
        let camino = [this.origen, ...this.pueblos, this.destino];
        return camino.join(' → ');
    }

    obtenerCaminoRegreso() {
        let camino = [this.destino, ...this.pueblos.reverse(), this.origen];
        return camino.join(' → ');
    }

    mostrarRecorrido() {
        console.log("Recorrido de ida:");
        console.log(this.obtenerCaminoIda());
        console.log("Recorrido de regreso:");
        console.log(this.obtenerCaminoRegreso());
    }
}

let ruta = new Ruta("Pueblo Origen", "Destino");
ruta.agregarPueblo("Pueblo 1");
ruta.agregarPueblo("Pueblo 2");

ruta.mostrarRecorrido();


//4.- Un almacén tiene capacidad para apilar “n” contenedores. 
//Cada contenedor tiene un número de identificación. 
//Cuando se desea retirar un contenedor específico, 
//deben retirarse primero los contenedores que están encima de él y
//colocarlos en otra pila, efectuar el retiro y regresarlos a su respectivo lugar.

console.log('Ejercicio 1.4');

class Almacen {
    constructor(capacidad) {
        this.capacidad = capacidad;
        this.pila = [];
    }

    agreagarContenedor(id) {
        if (this.pila.length < this.capacidad) {
            this.pila.push(id);
            console.log(`Se ha apilado el contenedor ${id}`);
        } else {
            console.log('El almacen esta lleno, no se pueden apilar mas contenedores');
        }
    }

    retirarContenedor(id) {
        let temporal = [];

        // Sacar los contenedores encima del contenedor específico y guardarlos en 'temporal'
        while (this.pila.length > 0 && this.pila[this.pila.length - 1] !== id) {
            temporal.push(this.pila.pop());
        }
        // Si se encontró el contenedor específico
        if (this.pila.length > 0 && this.pila[this.pila.length - 1] === id) {
            this.pila.pop(); // Retirar el contenedor específico

            // Regresar los contenedores de 'temporal' a 'pila'
            while (temporal.length > 0) {
                this.pila.push(temporal.pop());
            }

            console.log(`Se ha retirado el contenedor ${id}`);
        } else {
            console.log(`El contenedor ${id} no está en la parte superior de la pila`);
        }

    }

    mostrarPila() {
        console.log(`Estado actual de la pila: ${this.pila.join(', ')}`);
    }
}


let almacen = new Almacen(5);

almacen.agreagarContenedor(1);
almacen.agreagarContenedor(2);
almacen.agreagarContenedor(3);
almacen.agreagarContenedor(4);
almacen.agreagarContenedor(5);

almacen.mostrarPila();

almacen.retirarContenedor(3); 
almacen.mostrarPila(); 

almacen.retirarContenedor(1);
almacen.mostrarPila(); 

almacen.retirarContenedor(5);
almacen.mostrarPila(); 

almacen.agreagarContenedor(6); 
almacen.mostrarPila(); 