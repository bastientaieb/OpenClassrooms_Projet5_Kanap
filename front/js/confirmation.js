let orderId = getOrderId();
displayOrderId(orderId);
removeLocalStorage();

function getOrderId() {
  let queryString = window.location.search;
  let searchParams = new URLSearchParams(queryString);
  let itemBought = searchParams.get("orderId");
  return itemBought;
}

function displayOrderId(orderId) {
  let spanId = document.getElementById("orderId");
  spanId.textContent = orderId;
}

function removeLocalStorage() {
  let orderLocalStorage = window.localStorage;
  orderLocalStorage.clear();
}
