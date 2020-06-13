let submitBtn = document.querySelector(".submit");
let formContainer = document.querySelector(".form-container");
let modalBox = document.querySelector(".modal");
submitBtn.addEventListener("click", showModal);
function showModal() {
  modalBox.style.display = "block";
}
