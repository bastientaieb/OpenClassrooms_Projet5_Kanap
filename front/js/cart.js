let cart = [];
getCartItems();

function getCartItems() {
  let numberOfItems = localStorage.length;
  for (let i = 0; i < numberOfItems; i++) {
    let keyItems = localStorage.getItem(localStorage.key(i));
    let item = JSON.parse(keyItems);
    cart.push(item);
  }
}
// Récupération des données mises dans le local storage + conversion en objet (Javascript) et push dans l'array cart défini plus haut.

cart.forEach((item) => displayItem(item));
// Boucle qui applique pour chaque item la fonction displayItem.

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
// Fonction "racine" qui appelle les fonctions principales pour le display item et lie les principaux éléments à leurs parents.

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
// fonction qui calcule le prix total du panier.

function makeCartContent(item) {
  let divCartContent = document.createElement("div");
  divCartContent.classList.add("cart__item__content");

  let description = makeDescription(item);
  let settings = makeSettings(item);

  divCartContent.appendChild(description);
  divCartContent.appendChild(settings);

  return divCartContent;
}
// Création du premier petit enfant avec ses "fonctions enfants" et ses éléments enfants.

function makeSettings(item) {
  let settings = document.createElement("div");
  settings.classList.add("cart__item__content__settings");

  makeSettingsQuantity(settings, item);
  DeleteSetting(settings, item);

  return settings;
}
// Création de la div des paramètres et de ses fonctions enfants pour gérer la quantité et la suppression des éléments dans le panier.

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
//Fonction qui donne une classe à la div de la suppression à laquelle on ajoute un eventListener pour supprimer les éléments du panier grâce à sa fonction.

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
// itemToDelete permet de trouver le premier index dont le product Id est strictement égal à l'id de l'item et dont la couleur du produit est strictement égal à la couleur de l'item.
// On applique ensuite la méthode splice à cet item et on supprime les données des index 0 à 1 (la totalité);
// On appelle ensuite les fonctions totalPrice et totalQuantity pour réactualiser le montant total du panier et appelle les dernières fonctions de suppression.

function deleteImageFromPage(item) {
  let itemToDelete = document.querySelector(
    `article[data-id="${item.id}"][data-color="${item.color}"]`
  );
  itemToDelete.remove();
}
// Supprime l'article dont les attributs sont égaux à l'id et à la couleur de l'item concerné par la suppression.

function deleteDataFromCache(item) {
  let key = `${item.id}-${item.color}`;
  localStorage.removeItem(key);
}
// Fonction qui supprime du localStorage l'id précis (id + couleur) de l'item qui a été enlevé du panier.

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
// Création des éléments de la div settings avec son contenu en les rattachant à son parent.
// Défini les paramètres des inputs du panier avec son contenu.
// Défini l'eventListener updateCart à chaque fois que l'input est modifié pour appeler la fonction qui actualise la valeur du panier.

function updateCart(id, newValue, item) {
  let updatedItem = cart.find((item) => item.id === id);
  updatedItem.quantity = Number(newValue);
  displayTotalQuantity();
  displayTotalPrice();
  saveNewCart(item);
}
// updateItem défini l'item modifié avec son id strictement identique à l'id de l'item modifié.
// On indique sa nouvelle quantité en tant que valeur puis on appelle les fonctions qui calculent le montant total du panier. On envoi les données finales dans le localStorage.

function saveNewCart(item) {
  let data = JSON.stringify(item);
  let keyIdColor = `${item.id}-${item.ccolor}`;
  localStorage.setItem(keyIdColor, data);
}
// On envoi les Id précis des canapés commandés dans le localStorage pour les récupérer pour la confirmation de commande.

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
// Fonction qui gère la création des descriptions des produits affichés dans le panier.

function makeArticle(item) {
  let article = document.createElement("article");
  article.classList.add("cart__item");
  article.dataset.id = item.id;
  article.dataset.color = item.color;
  return article;
}
// fonction de création de l'article principal avec ses données et son contenu.

function displayArticle(article) {
  document.getElementById("cart__items").appendChild(article);
}
// Article rattaché à la section principal du panier.

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

let orderButton = document.getElementById("order");
orderButton.addEventListener("click", (event) => submitForm(event));
// Permet d'appliquer la fonction submitForm à chaque clique sur le bouton commander. Passe le paramètre de l'évènement pour empêcher l'actualisation automatique.

function submitForm(event) {
  event.preventDefault();
  if (cart.length === 0) {
    alert("Veuillez choisir un canapé");
    return;
  }

  if (validationOfForm()) return;
  // arrêt de la fonction de validation, si le formulaire est vide avec message d'erreur.

  if (emailValidation()) return;
  // arrêt du formulaire avec message d'erreur si le format de l'émail est invalide.

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
// Envoi des données de la commande au serveur avec méthode Post.
// Définition de l'id de la commande et renvoi vers le lien html de la commande avec le bon numéro.

function emailValidation() {
  let emailInput = document.getElementById("email").value;
  let regex = /^[A-Za-z0-9+_.-]+@(.+)$/;
  if (regex.test(emailInput) === false) {
    alert("Veuillez entrez un email valide");
    return true;
  }
  return false;
}
// Vérification du format de l'émail renseigné par l'utilisateur.

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
// Vérification que l'on n'envoie pas au serveur un forumlaire vide.

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
// Envoi des données au serveur avec le contenu du formulaire rempli par le client.
// Définition de la variable products qui contient les Id des produits achetés.

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
// Défini le nombre de canapés achetés et push l'id de chaque article dans l'array idOfItems qui sera ensuite affiché.
// split est utilisé pour séparer l'id et la couleur de l'id précis que l'on a créé précédemment.
