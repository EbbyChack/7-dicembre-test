const params = new URLSearchParams(window.location.search); // oggetto costruito a partire dai parametri nella URL es. ?resourceId=2938123
const id = params.get("resourceId");
fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZDU5NDBkOGEyMDAwMThhNDhhNWQiLCJpYXQiOjE3MDE5NTkwNjEsImV4cCI6MTcwMzE2ODY2MX0.HkHuUmqfVAQd68YH-ID1hllSjmnTjElAkbQFw0PHXgU",
  },
})
  .then((response) => response.json())
  .then((productDetails) => {
    const productDetailsContainer = document.getElementById("products");

    productDetailsContainer.innerHTML = `<div class="col-10 col-md-10 col-lg-12 g-5">
         <div class="card mb-3 shadow-sm">
         <div class="row g-0">
           <div class="col-md-6">
             <img src="${productDetails.imageUrl}" class="img-fluid rounded-start" alt="${productDetails.name}" style="width: auto; min-height: 17em; object-fit: cover">
           </div>
           <div class="col-md-6 text-center mt-auto mb-auto">
             <div class="card-body">
               <h5 class="card-title display-6">${productDetails.name} </h5>
               
               <p class="card-text"><b>Price:</b> ${productDetails.price} $</p>
               <p class="card-text"><b>Brand:</b> ${productDetails.brand}</p>
               
               <p class="card-text"><b>Description:</b></p>
               <p class="card-text"><small>${productDetails.description}</small></p>
               <p class="card-text"><small><b>Product id: </b>${productDetails._id}</small></p>
             </div>
             <div class=" d-flex justify-content-evenly mb-5">
         <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#myModal" id="edit">Edit</button>
         <button class="btn btn-light" id="delete-button">Delete</button>
      </div>
      <div id="delAlert"></div>
           </div>
         </div>
       </div>
         </div>
         `;

    const deleteButton = document.querySelector("#delete-button");

    deleteButton.addEventListener("click", (e) => {
      const hasConfirmed = confirm("Are you sure you want to delete this product?");

      if (hasConfirmed) {
        fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZDU5NDBkOGEyMDAwMThhNDhhNWQiLCJpYXQiOjE3MDE5NTkwNjEsImV4cCI6MTcwMzE2ODY2MX0.HkHuUmqfVAQd68YH-ID1hllSjmnTjElAkbQFw0PHXgU",
          },
          method: "DELETE",
        }).then((response) => {
          const delAlert = document.getElementById("delAlert");
          delAlert.innerHTML = `<div class="alert alert-danger" role="alert"><p class="m-0">The product has been deleted.</p></div>`;

          setTimeout(function () {
            window.location.href = "../index.html";
          }, 2000);
        });
      }
    });
    const editButton = document.getElementById("edit");
    const saveChanges = document.getElementById("saveChanges");
    const myForm = document.getElementById("myForm");

    editButton.addEventListener("click", () => {
      myForm[0].value = productDetails.name;
      myForm[1].value = productDetails.description;
      myForm[2].value = productDetails.brand;
      myForm[3].value = productDetails.imageUrl;
      myForm[4].value = productDetails.price;

      saveChanges.addEventListener("click", () => {
        const modifiedProd = {
          name: document.getElementById("name").value,
          description: document.getElementById("description").value,
          brand: document.getElementById("brand").value,
          imageUrl: document.getElementById("image").value,
          price: parseFloat(document.getElementById("price").value),
        };
        console.log(modifiedProd);
        fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
          method: "PUT",
          body: JSON.stringify(modifiedProd),
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZDU5NDBkOGEyMDAwMThhNDhhNWQiLCJpYXQiOjE3MDE5NTkwNjEsImV4cCI6MTcwMzE2ODY2MX0.HkHuUmqfVAQd68YH-ID1hllSjmnTjElAkbQFw0PHXgU",
          },
        }).then((response) => {
          const modAlert = document.getElementById("modAlert");
          modAlert.innerHTML = `<div class="alert alert-primary" role="alert"><p class="m-0">The product has been modified.</p></div>`;
          setTimeout(function () {
            window.location.href = "../index.html";
          }, 2000);
        });
      });
    });
  });
