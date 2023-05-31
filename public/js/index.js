const addToCart = document.querySelector("#addToCart");
const cart = document.querySelector("#cart");
const modalBody = document.querySelector(".modal-body");

addToCart.addEventListener("click", () => {
  modalBody.appendChild(cart);
});
