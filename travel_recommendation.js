// Get references to input field, buttons, and search results div
const btnSearch = document.getElementById("btnSearch");
const btnClear = document.getElementById("btnClear");
const result = document.querySelector("#result");


// fetch data and search user input 
const fetchData = async () => {
    const res = await fetch("./travel_recommendation_api.json");
    const data = await res.json();
    return data
}


// display search results
const searchAndDisplay = async (searchTerm) => {
    const storedData = await fetchData(); // Fetch JSON data
    // console.log(storedData.temples)
    // console.log(`This is search term: ${searchTerm}`)
    const searchKey = searchTerm.toLowerCase(); // Convert user input to lowercase
    // console.log(`This is search key: ${searchKey}`)
    let matchedCategory = null;

    // Check which category contains the search term
    if (searchKey.includes("country") || searchKey.includes("countries")) {
        matchedCategory = "countries";
    } else if (searchKey.includes("temple") || searchKey.includes("temples")) {
        matchedCategory = "temples";
    } else if (searchKey.includes("beach") || searchKey.includes("beaches")) {
        matchedCategory = "beaches";
    }

    if (!matchedCategory || !storedData[matchedCategory]) {
        result.innerHTML = `<p>No results found for "${searchTerm}".</p>`;
        return;
    }

    // Filter data based on user input
    let displayData = storedData[matchedCategory]
        .map(item => {
            return `
                <div class="card-result">
                    <img class="img-result" src="${item.imageUrl ? item.imageUrl : (item.cities && item.cities[0] ? item.cities[0].imageUrl : 'default.jpg')}">
                    <h3 class="h3-result">${item.name}</h3>
                    <p class="p-result">${item.description || 'No description available.'}</p>
                    <button class="btn-result">Visit</button>
                </div>
            `;
        }).join('');

    // If no matches found within the category
    if (displayData === "") {
        displayData = `<p>No matching results in ${matchedCategory}.</p>`;
    }
    //display in HTML
    result.innerHTML = displayData;
};


// clear search result function
function clear() {
  searchInput.value = ""; 
  result.innerHTML = "";
}

// Thank you message function 
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

// Add eventlisteners to buttons
btnSearch.addEventListener("click", () => {
    const searchInput = document.getElementById("searchInput").value;
    const searchTerm = searchInput.toLowerCase();
    searchAndDisplay(searchTerm);
});
btnClear.addEventListener("click", clear);