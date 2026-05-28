let travelData = {};

// Fetch JSON data
fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        travelData = data;
        console.log(data);
    })
    .catch(error => {
        console.log('Error fetching data:', error);
    });

// Search Recommendations
function searchRecommendations() {

    const input = document.getElementById('searchInput').value.toLowerCase();

    const resultsContainer = document.getElementById('results');

    resultsContainer.innerHTML = '';

    // Beaches
    if (input === 'beach' || input === 'beaches') {

        displayResults(travelData.beaches);

    }

    // Temples
    else if (input === 'temple' || input === 'temples') {

        displayResults(travelData.temples);

    }

    // Countries
    else if (
        input === 'country' ||
        input === 'countries' ||
        input === 'australia' ||
        input === 'japan' ||
        input === 'brazil'
    ) {

        let countryResults = [];

        travelData.countries.forEach(country => {

            if (
                input === 'country' ||
                input === 'countries' ||
                country.name.toLowerCase() === input
            ) {

                country.cities.forEach(city => {
                    countryResults.push(city);
                });
            }
        });

        displayResults(countryResults);

    }

    else {

        resultsContainer.innerHTML = `
            <h2>No recommendations found.</h2>
        `;
    }
}

// Display Results
function displayResults(results) {

    const resultsContainer = document.getElementById('results');

    results.forEach(item => {

        const card = document.createElement('div');

        card.classList.add('card');

        card.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}">

            <div class="card-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            </div>
        `;

        resultsContainer.appendChild(card);
    });
}

// Clear Results
function clearResults() {

    document.getElementById('results').innerHTML = '';

    document.getElementById('searchInput').value = '';
}