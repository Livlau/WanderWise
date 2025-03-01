// Get references to input field, buttons, and search results div
const searchInput = document.getElementById("searchInput");
const btnSearch = document.getElementById("btnSearch");
const btnClear = document.getElementById("btnClear");
const result = document.getElementById("result");

// Add eventlisteners to buttons
btnSearch.addEventListener("click", search);
btnClear.addEventListener("click", clear);

function search() {
    const query = searchInput.value.trim();
    alert(`search: ,${query}`);
}

function clear() {
  searchInput.value = ""; 
  result.value = "";
}

function thankyou() {
  alert('Thank you for contacting us!');
}