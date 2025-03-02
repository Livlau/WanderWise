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

    // fetch("travel_recommendation.json")
    // .then(Response)




    alert(`search: ,${query}`);
}

function clear() {
  searchInput.value = ""; 
  result.value = "";
}

function thankyou() {   
    const messageDiv = document.getElementById("submit-message");
    messageDiv.innerHTML = "Thank you for contacting us!";
    messageDiv.style.display = "block"; 
        
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";

    setTimeout(() => {
            messageDiv.style.display = "none";
    }, 5000);

}