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
    carro.length = 0;
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

    eliminar.addEventListener("click", eliminarProducto);
  });

  const total = carro.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
  const totalBuying = document.createElement("div");
  totalBuying.className = "total-content";
  totalBuying.innerHTML = `Total a Pagar: ${total}$`;
  modalContainer.appendChild(totalBuying);
  localStorage.setItem("carro", JSON.stringify(carro));
};

verCarrito.addEventListener("click", pintarCarro);

const eliminarProducto = () => {
  const foundId = carro.find((element) => element.id);

  carro = carro.filter((carroId) => {
    return carroId !== foundId;
  });
  carritoCounter();
  pintarCarro();
};

const carritoCounter = () => {
  cantidadCarro.style.display = "block";
  cantidadCarro.innerText = carro.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
};
