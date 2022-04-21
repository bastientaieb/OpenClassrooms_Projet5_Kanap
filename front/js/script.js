const url = "http://localhost:3000/api/products";
fetch(url)
  .then((response) => response.json())
  .then((kanaps) => addProducts(kanaps));

function addProducts(kanaps) {
  kanaps.forEach((kanap) => {
    let { _id, imageUrl, altTxt, name, description } = kanap;

    let image = makeImage(imageUrl, altTxt);
    let anchor = makeAnchor(_id);
    let article = document.createElement("article");
    let h3 = makeH3(name);
    let p = makeP(description);

    appendElement(article, image, h3, p);
    makeChild(anchor, article);
  });
}

function appendElement(article, image, h3, p) {
  article.appendChild(image);
  article.appendChild(h3);
  article.appendChild(p);
}

function makeAnchor(_id) {
  let anchor = document.createElement("a");
  anchor.href = "./product.html?id=" + _id;
  return anchor;
}

function makeChild(anchor, article) {
  let items = document.getElementById("items");
  items.appendChild(anchor);
  anchor.appendChild(article);
}

function makeArticle() {
  return document.createElement("article");
}

function makeImage(imageUrl, altText) {
  let image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altText;
  return image;
}

function makeH3(name) {
  let h3 = document.createElement("h3");
  h3.textContent = name;
  h3.classList.add("productName");
  return h3;
}

function makeP(description) {
  let p = document.createElement("p");
  p.textContent = description;
  p.classList.add("productDescription");
  return p;
}
