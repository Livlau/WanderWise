// Get references to input field, buttons, and search results div
const searchInput = document.querySelector("#searchInput");
const btnSearch = document.getElementById("btnSearch");
const btnClear = document.getElementById("btnClear");
const result = document.querySelector("#result");


// fetch data and search user input 
const fetchData = async () => {
    const res = await fetch("./travel_recommendation_api.json");
    const data = await res.json();
    console.log(`data`, data)
    return data
}


// display search results
const searchAndDisplay = async () => {
    let query = searchInput.value.toLowerCase().trim();
    console.log(`Query:`, query);

    if (!query) {
        result.innerHTML = `Please enter a destination or keyword.`;
        return;
    }

    const storedData = await fetchData(); // Fetch JSON data
    console.log(`Stored Data:`, storedData);

    let results = [];

    //Search in categories (countries, beaches, temples)
    if ("countries".includes(query) || "country".includes(query)) {
        results.push(...storedData.countries);
    }
    if ("beaches".includes(query) || "beach".includes(query)) {
        results.push(...storedData.beaches);
    }
    if ("temples".includes(query) || "temple".includes(query)) {
        results.push(...storedData.temples);
    }

    //Search in country names
    results.push(
        ...storedData.countries.filter(country =>
            country.name.toLowerCase().includes(query)
        )
    );

    //Search in cities inside matching countries
    results.push(
        ...storedData.countries.flatMap(country =>
            country.cities.filter(city => city.name.toLowerCase().includes(query))
        )
    );

    //Search in beaches
    results.push(
        ...storedData.beaches.filter(beach =>
            beach.name.toLowerCase().includes(query)
        )
    );

    //Search in temples
    results.push(
        ...storedData.temples.filter(temple =>
            temple.name.toLowerCase().includes(query)
        )
    );

    //If no results, display "Not found"
    if (results.length === 0) {
        result.innerHTML = `Not found`;
        return;
    }

    // Display results
    const displayResult = results.map(item => {
        return `
            <div class="card-result">
                <img class="img-result" src="${item.imageUrl ? item.imageUrl : (item.cities && item.cities[0] ? item.cities[0].imageUrl : 'default.jpg')}" alt="${item.name}">
                <h3 class="h3-result">${item.name}</h3>
                <p class="p-result">${item.description || 'No description available.'}</p>
                <button class="btn-result">Visit</button>
            </div>
        `;
    }).join('');

    result.innerHTML = displayResult;
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
    searchAndDisplay();
});
btnClear.addEventListener("click", clear);