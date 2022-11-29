// clase productos

class Producto {
    constructor(id, nombre, precio, imagen) {
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.imagen = imagen
    }
}

// productos
const producto1 = new Producto(1, 'Puercoespín azul con cuernos', 900,"https://images.squarespace-cdn.com/content/v1/5a8f81575ffd203a470a543e/1662497534212-Q3I8A7G6XJHXBSEMZX26/arte-mexicano-alebrije-erizo-azul-barro-CU034.jpg?format=1000w")
const producto2 = new Producto(2, 'Mapache alebrije con salamandra',1200, 'https://images.squarespace-cdn.com/content/v1/5a8f81575ffd203a470a543e/1606590221043-Y8YF4BKU3A4IMF58BYC3/arte-mexicano-mapache-salamandra-LG002.jpg?format=1000w')
const producto3 = new Producto(3, 'Candelabro danzas y máscaras',1300,'https://images.squarespace-cdn.com/content/v1/5a8f81575ffd203a470a543e/1627404222444-IKMB8FU73UMSTUGO9UCE/arte-mexicano-candelabro-danza-mascaras-DO010.jpg?format=1000w')
const producto4 = new Producto(4, 'Elefante alebrije azul', 850,'https://images.squarespace-cdn.com/content/v1/5a8f81575ffd203a470a543e/1664314206258-ZVX3AP7UGIOAIXH3D1MR/arte-mexicano-elefante-alebrije-azul-JC008.jpg?format=1000w')


// array Productos
const Productos = [
     producto1,
     producto2, 
     producto3, 
     producto4, 
    ]

// buscar elementos en el dom
const divProductos = document.getElementById('divProductos')
Productos.forEach(producto=>{
    divProductos.innerHTML += `
    <div id="${producto.id}" class="card cardProd">
    <img src="${producto.imagen}" class="card-img-top" alt="producto1">
    <div class="card-body">
    <h4 class="card-title">${producto.nombre}</h4>
    <p class="cars-text">${producto.precio}</p>
    <button id=${producto.id} class="btn btn-primary">Agregar</button>
    
    
    </div>
    </div>
    `
})

// carrito de compras
const carrito = JSON.parse(localStorage.getItem('carrito')) || []
const botonesAgregar = document.querySelectorAll('.btn-primary')

botonesAgregar.forEach(boton=>{
    boton.onclick = () => {
        const productoSeleccionado = Productos.find(prod=>prod.id===parseInt(boton.id))
        //console.log(productoSeleccionado)

        const productoCarrito = {...productoSeleccionado,cantidad:1}
        //console.log(productoSeleccionado,productoCarrito)

        const indexCarrito = carrito.findIndex(prod=>prod.id === productoCarrito.id)
        if (indexCarrito === -1){
            carrito.push(productoCarrito)
        } else{
            carrito[indexCarrito].cantidad++
        }

        // agregar carrito a storage
        localStorage.setItem('carrito',JSON.stringify(carrito))

        console.log(carrito)
    }
})

// finalizar compra 
const botonFinaizar = document.querySelector('#finalizar')
botonFinaizar.onclick = () => {
    const valores = carrito.map(prod=>prod.precio * prod.cantidad)
    let totaCompra = 0
    valores.forEach(valor=>{
        totaCompra += valor
    })
    alert(`El total es de ${totaCompra} Pesos\nMuchas  Vuelve Pronto`);
}

