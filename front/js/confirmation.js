let orderId = getOrderId();
displayOrderId(orderId);
removeLocalStorage();

function getOrderId() {
  let queryString = window.location.search;
  let searchParams = new URLSearchParams(queryString);
  let itemBought = searchParams.get("orderId");
  return itemBought;
}
// Permet d'aller chercher les données de la commande dans les Search Params pour retourner l'orderId et la donner à la fonction suivante.

function displayOrderId(orderId) {
  let spanId = document.getElementById("orderId");
  spanId.textContent = orderId;
}
// Permet de faire apparaître l'élément avec l'orderId de la commande.

function removeLocalStorage() {
  let orderLocalStorage = window.localStorage;
  orderLocalStorage.clear();
}
// Vide le local storage après commande.
