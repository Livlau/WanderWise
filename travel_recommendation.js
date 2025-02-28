const searchInput = document.getElementById(searchInput).value;
const input = searchInput.trim();

const btnSearch = document.getElementById("btnSearch");
btnSearch.addEventListener("click", search);

const btnClear = document.getElementById("btnClear");
btnClear.addEventListener("click", clear);

function thankyou() {
  alert('Thank you for contacting us!')
}

function search() {
  alert("search");
}

function clear() {
  searchInput = ""; 
}
