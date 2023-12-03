// import fetchData from "./pintarCard.js";
jQuery.noConflict();
let carrito = {};
let hitems = 0;
let total = 0;
let bloqueo = false;
const cards = document.getElementById('cards')
const templateCard = document.getElementById('template-card').content
const templateCarrito = document.getElementById('template-carrito').content
const templateFooter = document.getElementById("template-footer").content;
const mDatDes = document.getElementById('mDatDes')
const fragment = document.createDocumentFragment()
const formDatDes = document.getElementById('datosDespacho');

const items = document.getElementById('items');

let id;
let nombre;
let precio;
let precio_costo;
let existencias;
const datosDespacho = document.getElementById("datosDespacho");
let transferencia;
let efectivo;
let costo = 0;
let cambio = 0;
let phone = '';
// const tel = '';


document.addEventListener("DOMContentLoaded", () => {
  fetchData();
  const mostrarDatosDespacho = () => {
    datosDespacho.classList.remove("d-none");
    let compra = { carrito };
    for (let key in compra.carrito) {
      // Multiplicamos el precio por la cantidad y lo sumamos al total
      total += compra.carrito[key].precio * compra.carrito[key].cantidad;
    }
  };

  const button = document.getElementById('mDatDes');
  button.addEventListener('click', mostrarDatosDespacho);

  document.querySelector(".btn-close").addEventListener("click", () => document.querySelector(".modal").style.display = 'none');
  
  items.addEventListener("click", (e) => {
    btnAccion(e);
  });

});



mDatDes.addEventListener("click", (e) => {
    bloqueo = true;
    document.querySelectorAll('.sumaResta').forEach(function (element) {
        element.style.backgroundColor = 'rgb(240, 240, 240)';
    });
  });

const btnAccion = (e) => {
    if (e.target.classList.contains("btn-success") && bloqueo == false) {
      const producto = carrito[e.target.dataset.id];

        producto.cantidad = carrito[e.target.dataset.id].cantidad + 1;
        carrito[e.target.dataset.id] = { ...producto };
        toggleItemsCount();
        pintarCarrito();

    }
  
    if (e.target.classList.contains("btn-outline-success") && bloqueo == false) {
      const producto = carrito[e.target.dataset.id];
  
      producto.cantidad--;

      if (producto.cantidad == 0) {
        delete carrito[e.target.dataset.id];
        let productId = e.target.dataset.id;
        document.querySelector(`[data-id=card${productId}]`).style.opacity = 1;

        
      }
      toggleItemsCount();
      pintarCarrito();
    }
  
    e.stopPropagation();
  };


const pintarFooter = () => {
    footer.innerHTML = "";
    if (Object.keys(carrito).length === 0) {
      footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
        `;
      return;
    }
    const nCantidad = Object.values(carrito).reduce(
      (acc, { cantidad }) => acc + cantidad,
      0
    );
    const nPrecio = Object.values(carrito).reduce(
      (acc, { cantidad, precio }) => acc + cantidad * precio,
      0
    );
  
    templateFooter.querySelectorAll("td")[0].textContent = nCantidad;
    templateFooter.querySelector("span").textContent = nPrecio;
  
    const clone = templateFooter.cloneNode(true);
    fragment.appendChild(clone);
    footer.appendChild(fragment);
  };

      // Muestra el modal 
document.getElementById("shoppingcar").addEventListener("click", function () {
    if (Object.keys(carrito).length > 0) {
      var modalElement = document.querySelector(".modal");
      if (modalElement) {
        modalElement.style.display = "block"; // Ajusta según el estilo/modal real
      }
    } else {
      alert("Su carrito aún está vacío");
    }
  });

const fetchData = async () => {
  try {
    const res = await fetch("./db/980clean.json");
    const telf = await fetch("./db/835.txt");
    phone = await telf.text();
    const data = await res.json();
    pintarCards(data);
  } catch (error) {
    console.log(error);
  }
};
const pintarCards = (data) => {

data.forEach((producto, i) => {
    templateCard.querySelector('.col-md-3').dataset.id = `card${producto.id}`
    templateCard.querySelector('h5').textContent = producto.title
    templateCard.querySelector('p').textContent = producto.precio
    templateCard.querySelector('img').setAttribute ("src", producto.thumbnailUrl)
    templateCard.querySelector('.btn-dark').dataset.id = producto.id
    templateCard.querySelector('.btn-dark').dataset.index = i; // Agrega el índice como data-index

    // templateCard.classList.add('product-card');
    const clone = templateCard.cloneNode(true)


    fragment.appendChild(clone)
})
cards.appendChild(fragment)
};


const toggleItemsCount = () => {
    hitems = Object.keys(carrito).length;
    const shoppingCarItems = document.getElementById("shoppingcaritems");
  
    if (hitems > 0) {
      shoppingCarItems.textContent = hitems;
      shoppingCarItems.style.display = "block";
    } else {
      shoppingCarItems.style.display = "none";
    }
  };

  const pintarCarrito = () => {
    items.innerHTML = ''
    Object.values(carrito).forEach(producto => {

      templateCarrito.querySelector('th').textContent = producto.id
      templateCarrito.querySelectorAll('td')[0].textContent = producto.nombre
      templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
      templateCarrito.querySelector('.btn-success').dataset.id = producto.id
      templateCarrito.querySelector('.btn-outline-success').dataset.id = producto.id
      templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio

      const clone = templateCarrito.cloneNode(true)
      fragment.appendChild(clone)

    })
    items.appendChild(fragment)

    pintarFooter()
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }
document.addEventListener('click', function (event) {
    const button = event.target.closest('.btn-dark');
    let producto = {};
  if (button) {
    const cardBody = button.closest('.card-body');
    const h5Value = cardBody ? cardBody.querySelector('h5').textContent : null;
    const pValue = cardBody ? cardBody.querySelector('p').textContent : null;
    const productId = button.dataset.id;
    const productIndex = button.dataset.index;
     producto = {
        id: productId,
        nombre: h5Value,
        precio: parseFloat(pValue),
        cantidad: 1,
      };
      document.querySelector(`[data-id=card${productId}]`).style.opacity = 0.5;

      if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1;
      }
      carrito[producto.id] = { ...producto };
      toggleItemsCount();
      pintarCarrito();
  }

  });


  
  let campoBanco = document.getElementById("campos-banco");
  let camposEfectivo = document.getElementById("campos-efectivo");
  let camposCambio = document.getElementById("campos-cambio");


document.getElementById('pago-transferencia').addEventListener('click', function() {
  if (document.getElementById('pago-transferencia').checked) {
    mostrarCamposBanco();
  } else {
    esconderCamposBanco();
  }
});
  const mostrarCamposBanco = () => {
    campoBanco.classList.remove("d-none");
    transferencia = true;
    efectivo = false;
  };
  const esconderCamposBanco = () => {
    campoBanco.classList.add("d-none");
    transferencia = false;
    efectivo = true;
  };
  
  document.getElementById('pago-efectivo').addEventListener('click', function() {
    if (document.getElementById('pago-efectivo').checked) {
      mostrarPagoEfectivo();
    } else {
      esconderPagoEfectivo();
    }
  });

  const mostrarPagoEfectivo = () => {
    camposEfectivo.classList.remove("d-none");
    camposCambio.classList.remove("d-none");
    transferencia = false;
    efectivo = true;
  };
  const esconderPagoEfectivo = () => {
    camposEfectivo.classList.add("d-none");
    camposCambio.classList.add("d-none");
    transferencia = true;
    efectivo = false;
  };
  
  // Obtener los elementos HTML
  let montoPagoInput = document.getElementById("monto-pago");
  let cambioInput = document.getElementById("cambio");
  
  // Definir la función que se ejecutará cuando se modifique el valor de monto-pago
  function calcularCambio() {
    let montoPago = parseFloat(montoPagoInput.value);
    let cambio = montoPago - total;
    cambioInput.value = cambio.toFixed(2);
  }
  
  // Asignar la función al evento "input" de monto-pago
  montoPagoInput.addEventListener("input", calcularCambio);



  document.querySelector("#comprar").addEventListener("click", (e) => {
    //jQuery('#loader').modal('show');
  
    e.preventDefault();
  
    let nom = datosDespacho.nombre.value;
    let dir = datosDespacho.direccion.value;
    let dep = datosDespacho.departamento.value;
    let cel = datosDespacho.celular.value;
    let emai = datosDespacho.mail.value;
    let pTran = datosDespacho["transferencia"]["value"];
    let pEfe = datosDespacho["efectivo"]["value"];
    let mPag = datosDespacho["monto-pago"]["value"];
    let wspMessage = "";
    let fecha = new Date();
    let codigo = codigoFecha(fecha);
    let fechaHora = fechaCompleta(fecha);
    function codigoFecha(fecha) {
      let dia = fecha.getDate().toString().padStart(2, "0");
      let mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
      let anio = fecha.getFullYear().toString();
      let hora = fecha.getHours().toString().padStart(2, "0");
      let minutos = fecha.getMinutes().toString().padStart(2, "0");
      let segundos = fecha.getSeconds().toString().padStart(2, "0");
      return `${anio}${mes}${dia}${hora}${minutos}${segundos}`;
    }
    function fechaCompleta(fecha) {
      let dia = fecha.getDate().toString().padStart(2, "0");
      let mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
      let anio = fecha.getFullYear().toString();
      let hora = fecha.getHours().toString().padStart(2, "0");
      let minutos = fecha.getMinutes().toString().padStart(2, "0");
      let segundos = fecha.getSeconds().toString().padStart(2, "0");
      return `${anio}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;
    }
  
    if (!nom || !dir || !dep || !cel || !emai) {
      alert("Por favor complete todos los campos.");
      return false;
    }
  
    if (!pTran && !pEfe) {
      alert("Por favor seleccione una forma de pago.");
      return false;
    }
  
    if (efectivo && (!mPag || mPag <= 0)) {
      alert("Por favor ingrese un monto de pago válido.");
      return false;
    }
  let desgloce = '';
    if (datosDespacho.cambio.value < 0) {
      alert("Su pago está incompleto");
    } else {
      // Definimos el objeto compra
      let compra = { carrito };
      // Recorremos el objeto compra con un bucle for
      for (let key in compra.carrito) {
        // Multiplicamos el precio por la cantidad y lo sumamos al total
        costo += compra.carrito[key].precio * compra.carrito[key].cantidad;
        desgloce += `%0A${compra.carrito[key].cantidad} ${compra.carrito[key].nombre} $${compra.carrito[key].precio * compra.carrito[key].cantidad}`
      }
      //      desgloce += `%0ATOTAL ${total}`

      if (efectivo == false) {
        wspMessage = `https://api.whatsapp.com/send?phone=${phone}&text=%5B504clean_t%5D%20Que%20tal%20vecino,%20soy%20${datosDespacho.nombre.value}%20acabo%20de%20hacer%20mi%20pedido%20compuesto%20de%20${desgloce}%20por%20un%20Total%20de%20${total}%20`;
      } else {
        wspMessage = `https://api.whatsapp.com/send?phone=${phone}&text=%5B504clean_e%5D%20Que%20tal%20vecino,%20soy%20${datosDespacho.nombre.value}%20acabo%20de%20hacer%20mi%20pedido%20compuesto%20de%20${desgloce}%20por%20un%20Total%20de%20${total}%20`;
      }
//  `%20pedido%0A2 Limpiavidrios 1234%0A3 Servilletas 1234%0A5 Papel%20Higi%C3%A9nico 1234`
      if (efectivo == true) {
        cambio = parseInt(datosDespacho.cambio.value);
      }
      const payload = {
        nombre: datosDespacho.nombre.value,
        direccion: datosDespacho.direccion.value,
        departamento: datosDespacho.departamento.value,
        celular: datosDespacho.celular.value.replace(/[-\s+]/g, ""),
        email: datosDespacho.mail.value,
        compra: carrito,
        total: total,
        transferencia: transferencia,
        efectivo: efectivo,
        cambio: cambio,
        diferencia: total - costo,
        fechaPed: fechaHora,
        idPed: codigo,
        linkW: wspMessage,
      };
      //creaVen(payload);
      window.location.href = wspMessage;
      //window.location.href = `https://api.whatsapp.com/send?phone=56962118510&text=%5B504Clean_E%5D%20Que%20tal%20vecino,%20soy%2012356%20acabo%20de%20hacer%20mi%20pedido%20$Zgu3561%20por%20un%20total%20de%20$112346%20en%20efectivo.%20Me%20gustar%C3%ADa%20%20agendar%20mi%20pedido%0A2 Limpiavidrios 1234%0A3 Servilletas 1234%0A5 Papel%20Higi%C3%A9nico 1234`;
      console.log(payload);
    }
  });
