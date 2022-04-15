/* let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let id = urlParams.get("id");
console.log(id);

fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((res) => console.log(res)); */

/* Version 2

let queryString = window.location.href;
let urlParams = new URLSearchParams(queryString);
let id = urlParams.get("id");
console.log(id);

fetch(queryString)
  .then((response) => response.json())
  .then((res) => console.log(res)); */

/*  Version 3 /* 

/* let currentUrl = window.location.href;
let url = new URL(currentUrl);
let id = url.searchParams.get("id");
console.log(id);

fetch(currentUrl)
  .then((response) => response.json())
  .then((res) => console.log(res));
/* 
/* 
let params = new URLSearchParams(document.location.search);
let id = params.get("_id");
console.log(id);

fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((dataProduit) => console.log(dataProduit)); */

/*  J'ai essayé aussi de remplacer l'intérieur des () par ("http://localhost:3000/api/products") + id) ou + querySelector = window.location.search pour avoir justement l'ID mais cela ne marche pas, j'ai toujours un console.log qui me dit que l'ID est null qu'il n'existe pas. Lorsque je vais voir dans les params dans l'onglet network j'ai l'ID dans le payload mais j'ai juste le numéro par la clé qui indique que c'est un ID.
 */
