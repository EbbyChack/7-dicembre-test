const addProductButton = document.getElementById("addProduct");

addProductButton.addEventListener("click", (e) => {
  e.preventDefault();

  const newProduct = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("image").value,
    price: parseFloat(document.getElementById("price").value),
  };
  console.log(newProduct);

  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    method: "POST",
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZDU5NDBkOGEyMDAwMThhNDhhNWQiLCJpYXQiOjE3MDE5NTkwNjEsImV4cCI6MTcwMzE2ODY2MX0.HkHuUmqfVAQd68YH-ID1hllSjmnTjElAkbQFw0PHXgU",
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
});

window.addEventListener("DOMContentLoaded", () => {
  const myForm = document.querySelector("#myForm");

  const resetBtn = document.querySelector("#reset");

  resetBtn.addEventListener("click", () => {
    const hasConfirmedReset = confirm("Are you sure you want to reset the form?");
    if (hasConfirmedReset) {
      myForm.reset();
    }
  });
});
