let cart = [];
getCartItems();
cart.forEach((item) => displayItem(item));
// Fonction boucle à appliquer pour chaque item

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
  displayTotalQuantity(item);
  displayTotalPrice(item);
}
// Fonction "racine" qui indique quelles sont les fonctions principales à appliquer pour le display item + appendChild des enfants directs

function displayTotalPrice(item) {
  let totalPrice = document.getElementById("totalPrice");
  totalPrice.textContent = item.price;
}

function displayTotalQuantity(item) {
  let totalQuantity = document.getElementById("totalQuantity");
  totalQuantity.textContent = item.quantity;
}

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

function DeleteSetting(settings) {
  let div = document.createElement("div");
  div.classList.add("cart__item__content__settings__delete");

  let p = document.createElement("p");
  p.classList.add("deleteItem");
  p.textContent = "Supprimer";

  div.appendChild(p);
  settings.appendChild(div);
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
  settingsQuantity.appendChild(input);
  settings.appendChild(settingsQuantity);
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
