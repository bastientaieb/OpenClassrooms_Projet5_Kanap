itemPrice = 0;
let lsImageURL, lsAltTxt, ItemName;

let queryString = window.location.search;
// Permet de sélectionner uniquement ce qu'il y'a au niveau du "?" dans l'URL, que l'on a défini dans la page script dans la fonction makeAnchor.

let searchParams = new URLSearchParams(queryString);
// Récupère les données de l'URL du produit précédemment sélectionné pour qu'elle puisse reconnaître quel produit affiché

let id = searchParams.get("id");
// récupère l'id du produit cliqué dans la page d'accueil

fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((res) => manageData(res))
  .catch((err) => console.error(err));
// Utilise l'ID précédemment recherché depuis l'URLSearchParams pour aller chercher dans l'API les données du canapé correspondant à cet Id uniquement.
// Une fois l'ID récupéré, on transforme les données en format JSON.
// Les données sont ensuite données à la fonction manageData qui sera la fonction principale.

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
// Fonction qui définit les éléments de données du canapé qui seront affichées. Elle appelle ensuite les petites fonctions qui vont créer la structure du produit affiché.

function makeImage(imageUrl, altTxt) {
  let image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  let parent = document.querySelector(".item__img");
  parent.appendChild(image);
}
// Fonction qui créé l'image, ses attributs et qui le relie à son parent.

function makeTitle(name) {
  let title = document.getElementById("title");
  title.textContent = name;
}
// Fonction qui créé le titre du produit en affichant son nom.

function makePrice(price) {
  let spanPrice = document.getElementById("price");
  spanPrice.textContent = price;
}
// Fonction qui créé l'élément prix et qui l'affiche.

function makeDescription(description) {
  let textDescription = document.getElementById("description");
  textDescription.textContent = description;
}
// Fonction qui crée l'élément description et qui l'affiche.

function makeColors(colors) {
  let selectColors = document.getElementById("colors");
  colors.forEach((color) => {
    let option = document.createElement("option");
    option.value = color;
    option.textContent = color;
    selectColors.appendChild(option);
  });
}
// Fonction qui créé la liste déroulante des couleurs disponibles par canapé.
// Séléctionne la liste et applique une boucle à chaque couleur pour créér une option de choix html avec son attribut valeur, son contenu puis le rattache à son parent.

let button = document.getElementById("addToCart");
button.addEventListener("click", addProducts);
// Permet d'appliquer la fonction addProducts dès que l'on clique que le bouton "Ajouter au panier"

function addProducts() {
  let color = document.getElementById("colors").value;
  let quantity = document.getElementById("quantity").value;
  if (color == null || color === "" || quantity == 0 || quantity == null) {
    alert("Veuillez sélectionner une couleur et une quantité");
    return;
  }
  // Permet de ne pas pouvoir valider un panier incorrect ou vide et d'afficher un message d'erreur en conséquence.
  let keyIdColor = `${id}-${color}`;
  // Défini un ID précis qui prend en compte la couleur du produit en plus de son Id pour éviter que deux canapés du même type mais d'une couleur différente ait le même Id.
  let dataCart = {
    id: id,
    color: color,
    price: itemPrice,
    quantity: Number(quantity),
    imageUrl: lsImageURL,
    altTxt: lsAltTxt,
    name: ItemName,
  };
  // Défini les données des items présents dans le panier sous forme d'array

  localStorage.setItem(keyIdColor, JSON.stringify(dataCart));
  // Envoi l'ID précis et l'array des données des items sous format JSON dans le LocalStorage.
  window.location.href = "cart.html";
  // Envoi vers la page du panier.
}
