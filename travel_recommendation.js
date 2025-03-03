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

    if (searchTerm === "") {
        result.innerHTML = `<p class="error-message">Please enter a destination or keyword.</p>`;
        return;
    }

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
        result.innerHTML = `<p class="error-message">No results found for "${searchTerm}".</p>`;
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
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const messageDiv = document.getElementById("submit-message");

    if ( name.value === "" || email.value === "" || message.value === "") {
        messageDiv.innerHTML = "Please provide infomation."
    } else {
        messageDiv.innerHTML = "Thank you for contacting us!";
        messageDiv.style.display = "block"; 
        name.value = "";
        email.value = "";
        message.value = "";

    }
    
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