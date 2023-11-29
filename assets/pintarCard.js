const cardsProducts = document.getElementById("cardsProducts");
const fetchData = async () => {
    try {
        const res = await fetch('./db/980clean.json')
        const data = await res.json()
        console.log('data ',data)
        pintaCard();
        pintarCards(data)
    } catch (error) {
        console.log(error)
    }
}
const pintarCards = data => {
    let html = "";

    // data.forEach(producto => {

    data.forEach((element, i) => {
            html += `
                  <div id="${ element.id }" class="card product-card">
                  <img class="card-img-top img-opacity" src=${ element.thumbnailUrl } alt="">
                  <div class="card-body text-center">
                    <h5 class="card-title">${ element.title }</h5>
                    <p class="card-title">${ element.precio }</p>
                </div>
                `;
    
            })
        // templateCard.querySelector('h5').textContent = producto.title
        // templateCard.querySelector('p').textContent = producto.precio
        // templateCard.querySelector('img').setAttribute ("src", producto.thumbnailUrl)
        // templateCard.querySelector('.btn-dark').dataset.id = producto.id
        cardsProducts.innerHTML = html;
        // const clone = templateCard.cloneNode(true)
        // fragment.appendChild(clone)
    // })
    // cards.appendChild(fragment)
}
  let pintaCard = () => {

     alert('hay conexion');
//      <div id="{{ products.id }}" class="card product-card">
//      <img class="card-img-top img-opacity" src={{ products.urlimg }} alt="">
//      <div class="card-body text-center">
//        <h5 class="card-title">{{ products.nombre }}</h5>
//        <p class="card-title">${{ products.precio }}</p>
//      </div>
//      <input type="hidden" value=${{ products.precio_costo }} name="precio_costo" id="precio_costo">
//      <input type="hidden" value=${{ products.existencias }} name="existencias" id="existencias">
//    </div>
};


// const mostrarFotos = async (url) => {
//     try {
//       const marteFotos = document.getElementById("marteFotos");
//       const results = await fetch(url);
//       const response = await results.json();
//       console.log(response.photos);
//       arrMarsPics = response.photos;
//       console.log(arrMarsPics);
  
//       let html = "";
  
//       if (arrMarsPics) {
//           // const sal = arrMarsPics.map(({id}) => {
//           //     return id
//           //   })
//           //   console.log(sal)
//         arrMarsPics.forEach((element, i) => {
//           html += `
//         <div class="col-sm-1 col-md-6 col-lg-3 mx-auto">
//           <div class="card mx-auto mt-5" data-id = "${element.id}">
//             <img src="${element.img_src}" onclick="marsPicModal('${i}')" data-toggle="modal" data-target="#imgCard" class="card-img-top" alt="...">
//             <div class="card-body">
//               <h5 class="card-title fs-3 mb-3">Cámara: ${element.camera.full_name}</h5>
//               <div class="dropdown-divider ms-3 me-3 "> </div>
//               <h6 class="card-text fs-5">Fecha Tierra: ${element.earth_date}</h6>
//             </div>
//           </div>
//         </div>
//               `;
  
//           });
  
//       } 
//       if (response.photos.length == 0) {
//           html = '<div class="text-center"><h3>Lo siento, no hay información para ese día!<br> Probablemente la misión sea más corta.<h3></div>';
//           marteFotos.classList.add('notFound');
//       }
      
//       marteFotos.innerHTML = html;
//     } catch (err) {
//       console.log(err);
//     }
//   };
  

// export default fetchData;