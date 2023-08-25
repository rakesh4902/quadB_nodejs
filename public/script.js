const loader = document.getElementById('loader');
const table = document.getElementById('table');

async function fetchData() {
    try {
        const response = await fetch('/api/tickers', { method: 'GET' });
        const data = await response.json();
        populateTable(data.tickers);
    } catch (error) {
        console.error(error);
    } finally {
        loader.classList.add('hidden');
    }
}

function populateTable(tickers) {
    const tableBody = document.querySelector('#table tbody');
    table.classList.remove('hidden');
    tableBody.innerHTML = '';

    tickers.forEach(ticker => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${ticker.name}</td>
            <td>${ticker.last}</td>
            <td>${ticker.buy}</td>
            <td>${ticker.sell}</td>
            <td>${ticker.volume}</td>
            <td>${ticker.base_unit}</td>
        `;
        tableBody.appendChild(row);
    });
}

window.onload = function () {
    loader.classList.remove('hidden');
    table.classList.add('hidden');
    fetchData();

    setInterval(() => {
        fetchData();
    }, 2000);
};
    
