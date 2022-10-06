//Texto Bienvenida
let container = document.getElementById("head");
container.innerHTML = `<h1>Bienvenido a CompraOnline</h1><p>Aprovecha nuestas Ofertas</p>`;

const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarro = document.getElementById("cantidadCarro");
const shopContent = document.getElementById("shopContent");
//Productos
let carro = [];

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("carro")) {
    carro = JSON.parse(localStorage.getItem("carro"));
    carritoCounter();
  }
});

listaProductos.forEach((producto) => {
  const content = document.createElement("div");
  content.className = "card";
  content.innerHTML = `
    <img src="${producto.img}" class="card-img" alt="">
    <h3> Item: ${producto.id}</h3>
    <p>  Producto:  ${producto.tipo} ${producto.nombre}</p>
    <p class='price'> $ ${producto.precio}</p>
    `;

  shopContent.appendChild(content);
  let comprar = document.createElement("button");
  comprar.className = "comprar";
  comprar.innerText = "Comprar";
  content.appendChild(comprar);

  comprar.addEventListener("click", () => {
    const repeat = carro.some(
      (repeatProduct) => repeatProduct.id === producto.id
    );

    if (repeat) {
      carro.map((prod) => {
        if (prod.id === producto.id) {
          prod.cantidad++;
        }
      });
    } else {
      carro.push({
        id: producto.id,
        img: producto.img,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: producto.cantidad,
      });
    }
    console.log(carro);
    carritoCounter();
  });
});
