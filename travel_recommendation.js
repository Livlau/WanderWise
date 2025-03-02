// Get references to input field, buttons, and search results div
const searchInput = document.getElementById("searchInput");
const btnSearch = document.getElementById("btnSearch");
const btnClear = document.getElementById("btnClear");
const result = document.getElementById("result");


// sanitize user input 
// function sanitizeInput(input) {
//     const sanitizeDiv = document.createElement("div");
//     sanitizeDiv.textContent = input;
//     return sanitizeDiv.innerHTML.trim().toLowerCase();
// }


// fetch data and search user input 
function fetchDataAndSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm === '') {
        return result.innerHTML = `<p style="color:red;">Please enter a destination or keyword</p>`;
    }

    result.innerHTML = ''; // Loading message

    fetch("travel_recommendation_api.json") // Fetch JSON file
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const results = searchData(data, searchTerm);
            displayResults(results);
        })
        .catch(error => {
            result.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        });
}


// search 
function searchData(data, searchTerm) {
    let results = [];
    searchTerm = searchTerm.toLowerCase(); // Ensure case-insensitivity

    if (["country", "countries"].includes(searchTerm)) {
        results = data.countries.map(country => ({
            type: "Country",
            name: country.name,
            description: `Country: ${country.name}`,
            imageUrl: country.cities.imageUrl 
        }));
    } 
    else if (["beach", "beaches"].includes(searchTerm)) {
        results = data.beaches.map(beach => ({
            type: "Beach",
            name: beach.name,
            description: beach.description,
            imageUrl: beach.imageUrl
        }));
    } 
    else if (["temple", "temples"].includes(searchTerm)) {
        results = data.temples.map(temple => ({
            type: "Temple",
            name: temple.name,
            description: temple.description,
            imageUrl: temple.imageUrl
        }));
    }

    return results;
}



// display search results
function displayResults(results) {
    // const result = document.getElementById("result");
    result.innerHTML = ''; // Clear previous results

    if (results.length === 0) {
        result.innerHTML = '<p>No results found.</p>';
        return;
    }

    results.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}">
            <strong>${item.name}</strong>
            <p>${item.description}</p>
        `;
        result.appendChild(card);
    });
}


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
btnSearch.addEventListener("click", fetchDataAndSearch);
btnClear.addEventListener("click", clear);