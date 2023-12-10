fetch("https://striveschool-api.herokuapp.com/api/product/", {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZDU5NDBkOGEyMDAwMThhNDhhNWQiLCJpYXQiOjE3MDE5NTkwNjEsImV4cCI6MTcwMzE2ODY2MX0.HkHuUmqfVAQd68YH-ID1hllSjmnTjElAkbQFw0PHXgU",
  },
})
  .then((response) => response.json())
  .then((products) => {
    console.log(products);
    const productsContainer = document.getElementById("products");
    let productsHTML = "";

    products.forEach((element) => {
      productsHTML += `<div class="col-12 col-md-6 col-lg-3 g-5 ">
      <div class="card h-100 shadow-sm">
      <div class="position-relative">
        <img
          src="${element.imageUrl}"
          class="card-img-top"
          alt="${element.name} "
          style="max-width: auto; height: 17em; object-fit: cover"
        />
        <button class="btn btn-light position-absolute top-0 end-0 px-2 py-1 m-1 rounded-circle pencil" ><i class="fa-solid fa-pencil" style="color: #000000;"></i></button>
        </div>
        
        <div class="card-body d-flex flex-column flex-wrap justify-content-between">
          <div class="d-flex justify-content-between">
          
            <h5 class="card-title">${element.name}</h5>
            <p class="card-text">${element.price} $</p>
          </div>
          <a href="./details.html?resourceId=${element._id} " class="text-decoration-none text-dark d-flex justify-content-center findOut"><button class="btn btn-light"> Find out more  </button></a>
        </div>
      </div>
    </div>`;
    });
    productsContainer.innerHTML = productsHTML;

    const pencils = document.querySelectorAll(".pencil");

    pencils.forEach((pencil) => {
      pencil.addEventListener("click", (e) => {
        const fO = pencil.parentNode.parentNode.childNodes[3].childNodes[3];
        fO.click();
      });
    });
  })
  .catch((error) => console.log(error));
