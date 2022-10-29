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

const pintarCarro = () => {
  modalContainer.innerHTML = "";
  modalContainer.style.display = "flex";
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `
  <h1 class='modal-header-title'>Carrito</h1>
  `;
  modalContainer.appendChild(modalHeader);

  const modalVaciar = document.createElement("button");
  modalVaciar.innerText = "Vaciar carrito";
  modalVaciar.className = "modal-btn-vaciarCarrito";

  modalVaciar.addEventListener("click", () => {
    carro = [];
    cantidadCarro.innerText = carro.length;
    pintarCarro();
  });
  modalHeader.appendChild(modalVaciar);
  const modalButton = document.createElement("h1");
  modalButton.innerHTML = "x";
  modalButton.className = "modal-header-button";

  modalButton.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  modalHeader.append(modalButton);

  carro.forEach((producto) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
     <img src='${producto.img}'>
     <h3>${producto.nombre}</h3>
     <p>${producto.precio}$</p>
     <p>Cantidad: ${producto.cantidad}</p>
     <p>Total: ${producto.cantidad * producto.precio}</p>`;
    modalContainer.appendChild(carritoContent);

    console.log(carro.length);

    let eliminar = document.createElement("span");
    eliminar.innerText = "❌";
    eliminar.className = "delete-product";
    carritoContent.appendChild(eliminar);

    eliminar.addEventListener("click", (e) => {
      e.stopPropagation();

      if (e.target.classList.contains("delete-product")) {
        Swal.fire({
          title: "Esta seguro?",
          text: "Va a eliminar el producto!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Eliminar",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            eliminarProducto(e.target.value);
            Swal.fire(
              "Eliminado!",
              "El producto ha sido eliminado.",
              "success"
            );
          }
        });
      }
    });
  });

  const total = carro.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

  const totalBuying = document.createElement("div");
  totalBuying.className = "total-content";
  totalBuying.innerHTML = `Total a Pagar: ${total}$`;
  if (carro.length > 0) {
    const comprar = document.createElement("button");
    comprar.className = "comprarProducto";
    comprar.innerHTML = "Comprar";
    modalContainer.appendChild(comprar);
    comprar.addEventListener("click", terminarCompra);
  }
  modalContainer.appendChild(totalBuying);
  localStorage.setItem("carro", JSON.stringify(carro));
};

function terminarCompra() {
  // location.href = "./src/compra.html";
  Swal.fire({
    title: "Compra Realizada",
    icon: "success",
  });
  carro = [];
  cantidadCarro.innerText = carro.length;
  pintarCarro();
  console.log(carro);
}

verCarrito.addEventListener("click", pintarCarro);
const eliminarProducto = () => {
  const foundId = carro.find((element) => element.id);
  carro = carro.filter((carroId) => {
    return carroId !== foundId;
  });

  carritoCounter();
  pintarCarro();
};
