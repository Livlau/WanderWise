// get references to input field, buttons, and search results div
const searchInput = document.getElementById("searchInput");
const btnSearch = document.getElementById("btnSearch");
const btnClear = document.getElementById("btnClear");
const result = document.querySelector("#result");


// fetch data  
const fetchData = async () => {
    const res = await fetch("./travel_recommendation_api.json");
    const data = await res.json();
    return data
}


// get user search input and display results
const searchAndDisplay = async () => {
    const storedData = await fetchData(); // fetch json data
    
    // change user input value to lower case
    const searchKey = searchInput.value.trim().toLowerCase();

    if (searchKey === "") {
        result.innerHTML = `<p class="error-message">Please enter a destination or keyword.</p>`;
        return;
    }
    // store matching results
    let matchedResults = [];

    // check for category search (countries, beaches, temples)
    if (searchKey.includes("country") || searchKey.includes("countries")) {
        matchedResults = storedData.countries.flatMap(country => country.cities); // show only cities
    } else if (searchKey.includes("temple") || searchKey.includes("temples")) {
        matchedResults = storedData.temples; 
    } else if (searchKey.includes("beach") || searchKey.includes("beaches")) {
        matchedResults = storedData.beaches; 
    } else {
        // general search (search for a country, city, beach, or temple)
        matchedResults = storedData.countries.flatMap(country =>
            country.name.toLowerCase().includes(searchKey)
                ? country.cities // show cities if country name matches
                : country.cities.filter(city => city.name.toLowerCase().includes(searchKey)) // show matching cities
        );

        matchedResults = matchedResults.concat(
            storedData.temples.filter(temple => temple.name.toLowerCase().includes(searchKey)),
            storedData.beaches.filter(beach => beach.name.toLowerCase().includes(searchKey))
        );
    }

    if (matchedResults.length === 0) {
        result.innerHTML = `<p class="error-message">No results found for "${searchKey}".</p>`;
        return;
    }

    // generate HTML for results
    result.innerHTML = matchedResults
        .map(item => {
            return `
                <div class="card-result">
                    <img class="img-result" src="${item.imageUrl || 'default.jpg'}">
                    <h3 class="h3-result">${item.name}</h3>
                    <p class="p-result">${item.description || 'No description available.'}</p>
                    <button class="btn-result">Visit</button>
                </div>
            `;
        }).join('');
};


// clear search result function
function clear() {
  searchInput.value = ""; 
  result.innerHTML = "";
}

// thank you message function 
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

// add eventlisteners to buttons
btnSearch.addEventListener("click", searchAndDisplay);
btnClear.addEventListener("click", clear);