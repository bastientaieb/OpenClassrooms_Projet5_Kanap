const url = "http://localhost:3000/api/products";
fetch(url)
  .then((response) => response.json())
  .then((kanaps) => addProducts(kanaps))
  .catch((err) => console.error(err));
// Récupération des données de l'API (données et descriptifs des canapés)

function addProducts(kanaps) {
  kanaps.forEach((kanap) => {
    let { _id, imageUrl, altTxt, name, description } = kanap;
    // Array regroupant les données récupérés de l'API

    let image = makeImage(imageUrl, altTxt);
    let anchor = makeAnchor(_id);
    let article = document.createElement("article");
    let h3 = makeH3(name);
    let p = makeP(description);

    appendElement(article, image, h3, p);
    makeChild(anchor, article);
  });
}
// Fonction principal sous forme de boucle pour créer chacun des articles sur la page d'accueil

function appendElement(article, image, h3, p) {
  article.appendChild(image);
  article.appendChild(h3);
  article.appendChild(p);
}
// Fonction qui relis les "arrières petits enfants"créés à leurs parents pour les faire apparaître à l'écran

function makeAnchor(_id) {
  let anchor = document.createElement("a");
  anchor.href = "./product.html?id=" + _id;
  return anchor;
}
// Fonction qui créé le lien entre un produit de la page d'accueil et sa page produit. (Parent principal)
// Paramètrage du lien pour rediriger vers le bon URL en ajoutant l'ID du produit dans l'URL

function makeChild(anchor, article) {
  let items = document.getElementById("items");
  items.appendChild(anchor);
  anchor.appendChild(article);
}
// Fonction qui va relié les enfants "principaux" créés à leurs arrières petits-enfants vu plus haut.

function makeArticle() {
  return document.createElement("article");
}
// fonction qui crée l'article qui contient les éléments des canapés. (Enfant principal)

function makeImage(imageUrl, altText) {
  let image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altText;
  return image;
}
// fonction qui va créer l'image et ses attributs pour l'afficher

function makeH3(name) {
  let h3 = document.createElement("h3");
  h3.textContent = name;
  h3.classList.add("productName");
  return h3;
}
// Fonction qui va créer et afficher le nom du produit sous forme de titre de niveau 3

function makeP(description) {
  let p = document.createElement("p");
  p.textContent = description;
  p.classList.add("productDescription");
  return p;
}
// Fonction qui créer le paragraphe descriptif de l'annonce et qui va l'afficher en lui ajoutant une class
