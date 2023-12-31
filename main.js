document.addEventListener('DOMContentLoaded', function () {
  const filterSelect = document.getElementById('filter-select');
  const consultasContainer = document.getElementById('consultas-container');
  const cartItems = document.getElementById('cart-items');
  const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
  const comprarBtn = document.getElementById('comprar');
  const requestBtn = document.getElementById('request-btn');
  const responseContainer = document.getElementById('response-container');

  function mostrarData(data) {
    let body = "";
    for (var i = 0; i < data.length; i++) {
      body += `
        <div class="consulta">          
          <img src="./images/${data[i].Image}" alt="Imagen del producto" style="width: 80%;">
          <button data-product-id="${data[i].id}">Agregar al Carrito</button>
          <p>Precio: ${data[i].price}</p>
        </div>
      `;
    }
    consultasContainer.innerHTML = body;
  }

  requestBtn.addEventListener('click', function () {
    let url = 'https://jsonplaceholder.typicode.com/users/';
    fetch(url)
      .then(response => response.json())
      .then(data => mostrarData(data))
      .catch(error => console.log(error));
  });

  const products = [
    {
      id: 1,
      type: 'simple',
      price: 2750,
      Image: 'images/1.jpeg',
    },
    {
      id: 2,
      name: 'Consulta telefónica',
      type: 'simple',
      price: 5500,
      Image: 'images/2.jpeg',
    },
    {
      id: 3,
      name: 'Consulta personal',
      type: 'simple',
      price: 5500,
      Image: 'images/3.jpg',
    },
    {
      id: 4,
      name: 'Consulta de Expediente (con asesoramiento sin intervención)',
      type: 'compleja',
      price: 5500,
      Image: 'images/4.jpg',
    },
    {
      id: 5,
      name: 'Consulta de Expediente (con asesoramiento con intervencion)',
      type: 'compleja',
      price: 5500,
      Image: 'images/5.jpg',
    },
    {
      id: 6,
      name: 'Contestacion de demanda (con intervencion en audiencias)',
      type: 'compleja',
      price: 5500,
      Image: 'images/6.jpg',
    },
  ];

  const cart = {
    items: [],

    addToCart: function (productId) {
      const product = products.find((item) => item.id === productId);
      if (product) {
        this.items.push(product);
        this.saveCart();
        renderCart();
      }
    },

    removeFromCart: function (productId) {
      const index = this.items.findIndex((item) => item.id === productId);
      if (index !== -1) {
        this.items.splice(index, 1);
        this.saveCart();
        renderCart();
      }
    },

    clearCart: function () {
      this.items = [];
      this.saveCart();
      renderCart();
    },

    saveCart: function () {
      localStorage.setItem('cart', JSON.stringify(this.items));
    },

    loadCart: function () {
      const cartData = localStorage.getItem('cart');
      if (cartData) {
        this.items = JSON.parse(cartData);
        renderCart();
      }
    },

    calculateTotal: function () {
      return this.items.reduce((total, item) => total + item.price, 0);
    }
  };

  function renderConsultas(consultas) {
    consultasContainer.innerHTML = '';

    consultas.forEach((consulta, index) => {
      const consultaDiv = document.createElement('div');
      consultaDiv.className = 'consulta';
      consultaDiv.innerHTML = `
         <p>Precio: ${consulta.price}</p>
        <img src="${consulta.Image}" alt="Imagen del producto" style="width: 80%;">
        <button data-product-id="${consulta.id}">Agregar al Carrito</button>
      `;

      consultasContainer.appendChild(consultaDiv);
    });
  }

  function renderCart() {
    cartItems.innerHTML = '';

    cart.items.forEach((item) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${item.name} - $${item.price}</span>
        <button data-product-id="${item.id}">Eliminar</button>
      `;

      cartItems.appendChild(li);
    });

    const totalElement = document.getElementById('total');
    totalElement.textContent = `Total: $${cart.calculateTotal()}`;
  }

  // Cargar las consultas desde el archivo JSON
  renderConsultas(products);

  // Filtrar consultas por tipo
  filterSelect.addEventListener('change', function () {
    const tipoSeleccionado = this.value;
    let consultasFiltradas = [];

    if (tipoSeleccionado === 'todos') {
      consultasFiltradas = products;
    } else if (tipoSeleccionado === 'simples') {
      consultasFiltradas = products.filter(consulta => consulta.type === 'simple');
    } else if (tipoSeleccionado === 'complejos') {
      consultasFiltradas = products.filter(consulta => consulta.type === 'compleja');
    }

    renderConsultas(consultasFiltradas);
  });

  // Agregar consultas al carrito
  consultasContainer.addEventListener('click', function (event) {
    const target = event.target;
    if (target.tagName === 'BUTTON') {
      const productId = parseInt(target.getAttribute('data-product-id'));
      cart.addToCart(productId);
    }
  });

  // Comprar consultas
  comprarBtn.addEventListener('click', function () {
    const montoTotal = cart.calculateTotal();
    const urlMercadoPago = `https://link.mercadopago.com.ar/abogadamalvinaramayo`;

    // Redireccionar a la página de Mercado Pago
    window.location.href = urlMercadoPago;
  });


  // Vaciar el carrito
  vaciarCarritoBtn.addEventListener('click', function () {
    cart.clearCart();
  });

  // Cargar el carrito desde el Local Storage al cargar la página
  cart.loadCart();
});

 // Fetch data from URL
    let url = 'https://jsonplaceholder.typicode.com/users/';
        fetch(url)
            .then( response => response.json() )
            .then( data => mostrarData(data) )
            .catch( error => console.log(error) )

        const mostrarData = (data) => {
            console.log(data)
            let body = ""
            for (var i = 0; i < data.length; i++) {      
               body+=`<tr><td>${data[i].id}</td><td>${data[i].name}</td><td>${data[i].email}</td></tr>`
            }
            document.getElementById('data').innerHTML = body
            //console.log(body)
        }
  
// Obtener referencias a los elementos del DOM
const requestBtn = document.getElementById('request-btn');
const responseContainer = document.getElementById('response-container');

// Función para solicitar los datos de la API
const requestData = () => {
  const apiUrl = 'https://jsonplaceholder.typicode.com/users/';

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayResponse(data))
    .catch(error => console.log(error));
};

// Función para mostrar la respuesta en el contenedor
const displayResponse = (data) => {
  responseContainer.innerHTML = '';

  const responseText = document.createElement('p');
  responseText.textContent = JSON.stringify(data);
  responseContainer.appendChild(responseText);
};

// Agregar el evento click al botón de entrada
requestBtn.addEventListener('click', requestData);