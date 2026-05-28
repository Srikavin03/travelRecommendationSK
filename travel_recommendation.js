let travelData = {};

// Fetch API Data
fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {

        travelData = data;

        console.log(data);

    })
    .catch(error => {

        console.log("Error fetching JSON:", error);

    });


// Search Function
function searchRecommendations() {

    const input = document.getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();

    const resultsContainer = document.getElementById("results");

    resultsContainer.innerHTML = "";

    // BEACHES
    if (input === "beach" || input === "beaches") {

        displayResults(travelData.beaches);

    }

    // TEMPLES
    else if (input === "temple" || input === "temples") {

        displayResults(travelData.temples);

    }

    // COUNTRIES
    else {

        let matched = false;

        travelData.countries.forEach(country => {

            if (
                input === "country" ||
                input === "countries" ||
                country.name.toLowerCase() === input
            ) {

                displayResults(country.cities);

                matched = true;
            }
        });

        if (!matched &&
            input !== "country" &&
            input !== "countries") {

            resultsContainer.innerHTML = `
                <h2>No recommendations found.</h2>
            `;
        }
    }
}


// Display Results
function displayResults(results) {

    const resultsContainer = document.getElementById("results");

    results.forEach(place => {

        const card = document.createElement("div");

        card.classList.add("card");

        card.innerHTML = `

            <img src="${place.imageUrl}" alt="${place.name}">

            <div class="card-content">

                <h3>${place.name}</h3>

                <p>${place.description}</p>

            </div>
        `;

        resultsContainer.appendChild(card);

    });

}


// Clear Results
function clearResults() {

    document.getElementById("results").innerHTML = "";

    document.getElementById("searchInput").value = "";

}