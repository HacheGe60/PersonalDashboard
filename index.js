/* BACKGROUND IMAGE AND AUTHOR */
const bodyEl = document.querySelector('body');
const authorEl = document.querySelector('#author');

/* CRYPTO DATA */
const cryptoTopEl = document.querySelector('#crypto-top');
const cryptoEndEl = document.querySelector('#crypto-end');

/* TIME */
const timeEl = document.querySelector('#time');

/* WEATHER */
const weatherEl = document.querySelector('#weather');

/* GET BACKGROUND IMAGE */
async function getBackgroundImage() {
    try {
        const res = await fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=sailboat');
        const data = await res.json();
        bodyEl.style.backgroundImage = `url(${data.urls.regular})`;
        authorEl.textContent = `By ${data.user.name}`;
    } catch (error) {
        console.log('Failed to fetch image');
        bodyEl.style.backgroundImage = `url(./images/ivan-f-UH2AoKrvbcE-unsplash.jpg)`;
        authorEl.textContent = `By Ivan F`;
    };
}

getBackgroundImage();

/* GET CURRENT DATA ON A CRYPTOCURRENCY */
async function getCryptoData() {
    try {
        const res = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin');
        if (!res.ok) {
            const statusText = res.statusText || "No description available";
            throw new Error(`Error ${res.status} - ${statusText}`);
        }
        const data = await res.json();
        cryptoTopEl.innerHTML = `
            <img src="${data.image.small}"><p>${data.name}</p>`;
        cryptoEndEl.innerHTML = `
        <p class="crypto">🎯 Price: $${data.market_data.current_price.ars}</p>
        <p class="crypto">📈 High: $${data.market_data.high_24h.ars}</p>
        <p class="crypto">📉 Low: $${data.market_data.low_24h.ars}</p>
        `;
    } catch (error) {
        cryptoTopEl.innerHTML = `
            <p p class="crypto" >❌ ${error.message}</p> `;
    }

}

getCryptoData();

/* GET TIME */
setInterval(updateTime, 1000);
function updateTime() {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('ar-ES', {
        timeStyle: 'short',
        hour12: false
    });

    timeEl.textContent = formattedTime;
}

navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    async function getWeatherData() {
        try {
            const res = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${lat}&lon=${long}&units=metric`);
            /* if (!res.ok) {
                throw Error("Weather data not available");
            } */
            const data = await res.json();
            console.log(data);
            weatherEl.innerHTML = `
                <div class="weather">
                <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
                <p class="temp">${Math.round(data.main.temp)}°C</p>
                </div>
                <p class="city">${data.name}</p>

            `;
        } catch (error) {
            console.log('Failed to fetch weather data');
        }
    }

    getWeatherData();
});
