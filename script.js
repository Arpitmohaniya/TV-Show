
const searchButton = document.getElementById('search-button');
const showInput = document.getElementById('show-input');
const resultsContainer = document.getElementById('results');


searchButton.addEventListener('click', async () => {
    const query = showInput.value.trim();
    if (!query) {
        alert('Please enter a TV show name.');
        return;
    }

    try {
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data from API');
        }
        
        const data = await response.json();
        displayResults(data);
    } catch (error) {
        console.error(error);
        alert('An error occurred while fetching data.');
    }
});

function displayResults(data) {
    resultsContainer.innerHTML = ''; // Clear previous results

    if (data.length === 0) {
        resultsContainer.innerHTML = '<p>No shows found. Try a different query.</p>';
        return;
    }

    data.forEach(item => {
        const { show } = item;
        const resultCard = document.createElement('div');
        resultCard.classList.add('result-card');

        resultCard.innerHTML = `
            <img src="${show.image?.medium || 'https://via.placeholder.com/210x295'}" alt="${show.name}">
            <h2>${show.name}</h2>
            <p>${show.summary ? show.summary.replace(/<[^>]*>/g, '') : 'No summary available.'}</p>
        `;

        resultsContainer.appendChild(resultCard);
    });
}
