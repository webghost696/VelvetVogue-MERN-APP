const apiURL = "https://api.coincap.io/v2/assets";
const apiKey = "a93b7e8e-cfe3-42db-b85c-3d88f8b78310";
const cryptoInfo = document.querySelector(".cryptoInfo");
const form = document.querySelector("form");
const loader = document.querySelector(".loader");
const content = document.getElementById('content');

let cachedData = null;

window.addEventListener('load', () => {
  setTimeout(() => {
    loader.style.display = 'none';
    content.style.display = 'block';
  }, 3000);
});

const fetchData = async () => {
  try {
    const response = await fetch(apiURL, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    const data = await response.json();
    cachedData = data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = document.querySelector(".input");
  const user = input.value.toUpperCase();

  if (user === '') {
    cryptoInfo.classList.remove('visible');
    cryptoInfo.style.display = 'none';
    return;
  }

  if (cachedData) {
    const crypto = cachedData.find(crypto => crypto.symbol === user);
    if (crypto) {
      cryptoInfo.innerHTML = `
        <h2>${crypto.name}</h2><br>
        <div class="horLine"></div>
        <p>Symbol: ${crypto.symbol}</p>
        <p>Price: $${parseFloat(crypto.priceUsd).toFixed(2)}</p>
        <p>Market Cap: $${(parseFloat(crypto.marketCapUsd) / 1e9).toFixed(2)}B</p>
        <p>24h Change: ${parseFloat(crypto.changePercent24Hr).toFixed(2)}%</p>
      `;
      cryptoInfo.style.display = 'block';
      setTimeout(() => {
        cryptoInfo.classList.add('visible');
      }, 10);
    } else {
      cryptoInfo.innerHTML = `<p>Cryptocurrency not found.</p>`;
      cryptoInfo.style.display = 'block';
      setTimeout(() => {
        cryptoInfo.classList.add('visible');
      }, 10);
    }
  }
});

fetchData();
