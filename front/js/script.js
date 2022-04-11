const url = "http://localhost:3000/api/products";
fetch(url)
  .then((response) => response.json())
  .then((data) => addProducts(data));

function addProducts(data) {
  const imageUrl = data[0].imageUrl;

  const link = document.createElement("a");
  link.href = imageUrl;

  const items = document.getElementById("items");
  if (items != null) {
    items.appendChild(link);
  }
}
