let queryString = window.location.search;
let searchParams = new URLSearchParams(queryString);
let id = searchParams.get("id");

fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((res) => manageData(res));

function manageData(kanap) {
  let { imageUrl, altTxt, name, description, colors, price } = kanap;
  itemPrice = price;
  lsImageURL = imageUrl;
  lsAltTxt = altTxt;
  ItemName = name;
  makeImage(imageUrl, altTxt);
  makeTitle(name);
  makePrice(price);
  makeDescription(description);
  makeColors(colors);
}

function makeImage(imageUrl, altTxt) {
  let image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  let parent = document.querySelector(".item__img");
  parent.appendChild(image);
}

function makeTitle(name) {
  let title = document.getElementById("title");
  title.textContent = name;
}

function makePrice(price) {
  let spanPrice = document.getElementById("price");
  spanPrice.textContent = price;
}

function makeDescription(description) {
  let textDescription = document.getElementById("description");
  textDescription.textContent = description;
}

function makeColors(colors) {
  let selectColors = document.getElementById("colors");
  colors.forEach((color) => {
    let option = document.createElement("option");
    option.value = color;
    option.textContent = color;
    selectColors.appendChild(option);
  });
}

let button = document.getElementById("addToCart");
button.addEventListener("click", (addProducts) => {
  let color = document.getElementById("colors").value;
  let quantity = document.getElementById("quantity").value;
  if (color == null || color === "" || quantity == 0 || quantity == null) {
    alert("Veuillez sélectionner une couleur et une quantité");
    return; /* Pour qu'une fonction s'arrête */
  }
  let keyIdColor = `${id}-${color}`;
  let dataCart = {
    id: id,
    color: color,
    price: itemPrice,
    quantity: Number(quantity),
    imageUrl: lsImageURL,
    altTxt: lsAltTxt,
    name: ItemName,
  };
  /* Vérifier si le produit n'est pas déjà présent dans le panier */
  localStorage.setItem(keyIdColor, JSON.stringify(dataCart));
  window.location.href = "cart.html";
});

itemPrice = 0;
let lsImageURL, lsAltTxt, ItemName;
