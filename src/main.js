//Texto Bienvenida
let container = document.getElementById("head");
container.innerHTML = `<h1>Bienvenido a CompraOnline</h1><p>Aprovecha nuestas Ofertas</p>`;
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarro = document.getElementById("cantidadCarro");
let carro = [];
document.addEventListener("DOMContentLoaded", () => {
  fetchData();
  if (localStorage.getItem("carro")) {
    carro = JSON.parse(localStorage.getItem("carro"));
    pintarCarro();
  }
});

const fetchData = async () => {
  try {
    const response = await fetch("./src/data/productos.json");
    const data = await response.json();
    mostrarProductos(data);
  } catch (error) {
    console.log(error);
  }
};

const mostrarProductos = (data) => {
  data.forEach((producto) => {
    const content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
    <img src="${producto.img}" class="card-img" alt="">
    <h3> Item: ${producto.id}</h3>
    <p>  Producto:  ${producto.tipo} ${producto.nombre}</p>
    <p class='price'> $ ${producto.precio}</p>
    `;

    shopContent.appendChild(content);
    let agregar = document.createElement("button");
    agregar.className = "agregar";
    agregar.innerText = "agregar";
    content.appendChild(agregar);
    agregar.addEventListener("click", () => agregarCarrito(producto));
  });
};

function agregarCarrito(producto) {
  Swal.fire({
    title: "Producto Agregado al Carrito",
    icon: "success",
  });

  const repeat = carro.some(
    (repeatProduct) => repeatProduct.id === producto.id
  );
  //OR
  repeat
    ? carro.map((prod) => {
        prod.id === producto.id && prod.cantidad++;
      })
    : carro.push({
        id: producto.id,
        img: producto.img,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: producto.cantidad,
      });
  localStorage.setItem("carro", JSON.stringify(carro));
  console.log(carro);
  carritoCounter();
}

const carritoCounter = () => {
  cantidadCarro.style.display = "block";
  cantidadCarro.innerText = carro.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
};
