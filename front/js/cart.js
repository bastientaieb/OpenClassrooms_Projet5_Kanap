let cart = [];

getCartItems();
cart.forEach((item) => displayItem(item));
// Fonction boucle à appliquer pour chaque item

let orderButton = document.getElementById("order");
orderButton.addEventListener("click", (event) => submitForm(event));

function getCartItems() {
  let numberOfItems = localStorage.length;
  for (let i = 0; i < numberOfItems; i++) {
    let keyItems = localStorage.getItem(localStorage.key(i));
    let item = JSON.parse(keyItems);
    cart.push(item);
  }
}
// Récupération des données du local storage + conversion en objet et push dans l'array cart

function displayItem(item) {
  let article = makeArticle(item);
  let divImage = makeImage(item);
  article.appendChild(divImage);

  let divDescription = makeCartContent(item);
  article.appendChild(divDescription);
  displayArticle(article);
  displayTotalQuantity();
  displayTotalPrice();
}
// Fonction "racine" qui indique quelles sont les fonctions principales à appliquer pour le display item + appendChild des enfants directs

function displayTotalQuantity() {
  let total = 0;
  let totalQuantity = document.getElementById("totalQuantity");
  cart.forEach((item) => {
    let numberOfItemsInCart = item.quantity;
    total = total + numberOfItemsInCart;
  });
  totalQuantity.textContent = total;
}
// fonction qui calcule le nombre total de produits dans le panier

function displayTotalPrice() {
  let total = 0;
  let totalCartPrice = document.getElementById("totalPrice");
  cart.forEach((item) => {
    let totalPrice = item.price * item.quantity;
    total = total + totalPrice;
  });
  totalCartPrice.textContent = total;
}
// fonction qui calcule le prix total du panier

function makeCartContent(item) {
  let divCartContent = document.createElement("div");
  divCartContent.classList.add("cart__item__content");

  let description = makeDescription(item);
  let settings = makeSettings(item);

  divCartContent.appendChild(description);
  divCartContent.appendChild(settings);

  return divCartContent;
}
// Création du premier petit enfant avec ses fonctions et ses enfants

function makeSettings(item) {
  let settings = document.createElement("div");
  settings.classList.add("cart__item__content__settings");

  makeSettingsQuantity(settings, item);
  DeleteSetting(settings, item);

  return settings;
}

function DeleteSetting(settings, item) {
  let div = document.createElement("div");
  div.classList.add("cart__item__content__settings__delete");
  div.addEventListener("click", () => deleteItem(item));

  let p = document.createElement("p");
  p.classList.add("deleteItem");
  p.textContent = "Supprimer";

  div.appendChild(p);
  settings.appendChild(div);
}
function deleteItem(item) {
  let itemToDelete = cart.findIndex(
    (product) => product.id === item.id && product.color === item.color
  );
  cart.splice(itemToDelete, 1);
  displayTotalPrice();
  displayTotalQuantity();
  deleteDataFromCache(item);
  deleteImageFromPage(item);
}

function deleteImageFromPage(item) {
  let itemToDelete = document.querySelector(
    `article[data-id="${item.id}"][data-color="${item.color}"]`
  );
  itemToDelete.remove();
}

function deleteDataFromCache(item) {
  let key = `${item.id}-${item.color}`;
  localStorage.removeItem(key);
}

function makeSettingsQuantity(settings, item) {
  let settingsQuantity = document.createElement("div");
  settingsQuantity.classList.add("cart__item__content__settings__quantity");

  let p = document.createElement("p");
  p.textContent = "Qté : ";
  settingsQuantity.appendChild(p);

  let input = document.createElement("input");
  input.type = "number";
  input.classList.add("itemQuantity");
  input.name = "itemQuantity";
  input.min = "1";
  input.max = "100";
  input.value = item.quantity;
  input.addEventListener("input", () => updateCart(item.id, input.value, item));

  settingsQuantity.appendChild(input);
  settings.appendChild(settingsQuantity);
}

function updateCart(id, newValue, item) {
  let updatedItem = cart.find((item) => item.id === id);
  updatedItem.quantity = Number(newValue);
  displayTotalQuantity();
  displayTotalPrice();
  saveNewCart(item);
}

function saveNewCart(item) {
  let data = JSON.stringify(item);
  let keyIdColor = `${item.id}-${item.ccolor}`;
  localStorage.setItem(keyIdColor, data);
}

function makeDescription(item) {
  let divDescription = document.createElement("div");
  divDescription.classList.add("cart__item__content__description");

  let h2 = document.createElement("h2");
  h2.textContent = item.name;

  let pColor = document.createElement("p");
  pColor.textContent = item.color;

  let pPrice = document.createElement("p");
  pPrice.textContent = item.price + " €";

  divDescription.appendChild(h2);
  divDescription.appendChild(pColor);
  divDescription.appendChild(pPrice);

  return divDescription;
}
// Fonction qui gère la création des descriptions des produits affichés dans le panier

function makeArticle(item) {
  let article = document.createElement("article");
  article.classList.add("cart__item");
  article.dataset.id = item.id;
  article.dataset.color = item.color;
  return article;
}
// fonction de création de l'article principal avec ses données et son contenu

function displayArticle(article) {
  document.getElementById("cart__items").appendChild(article);
}
// Article rattaché à la section principal du panier

function makeImage(item) {
  let div = document.createElement("div");
  div.classList.add("cart__item__img");
  let image = document.createElement("img");
  image.src = item.imageUrl;
  image.alt = item.altTxt;
  div.appendChild(image);
  return div;
}
// Création de l'image des produits dans le paniers avec le rattachement à sa div

function submitForm(event) {
  event.preventDefault();
  if (cart.length === 0) {
    alert("Veuillez choisir un canapé");
    return;
  }

  if (validationOfForm()) return;
  // arrêt de la fonction de validation, si le formulaire est vide

  if (emailValidation()) return;

  let requestToApi = makeRequestToApi();
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(requestToApi),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      let orderId = data.orderId;
      window.location.href = "/front/html/confirmation.html?orderId=" + orderId;
    })
    .catch((err) => console.error(err));
}

function emailValidation() {
  let emailInput = document.getElementById("email").value;
  let regex = /^[A-Za-z0-9+_.-]+@(.+)$/;
  if (regex.test(emailInput) === false) {
    alert("Veuillez entrez un email valide");
    return true;
  }
  return false;
}

function validationOfForm() {
  let form = document.querySelector(".cart__order__form");
  let inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.value === "") {
      alert("Veuillez remplir tous les champs du formulaire");
      return true;
    }
    return false;
  });
}

function makeRequestToApi() {
  let form = document.querySelector(".cart__order__form");
  let firstName = form.elements.firstName.value;
  let lastName = form.elements.lastName.value;
  let address = form.elements.address.value;
  let city = form.elements.city.value;
  let email = form.elements.email.value;
  let arrayApi = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    },
    products: getIdFromLocalStorage(),
  };

  return arrayApi;
}

function getIdFromLocalStorage() {
  let itemsBought = localStorage.length;
  let idOfItems = [];
  for (let i = 0; i < itemsBought; i++) {
    let key = localStorage.key(i);
    let id = key.split("-")[0];
    idOfItems.push(id);
  }
  return idOfItems;
}
