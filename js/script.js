

function processWeatherData(data) {
    // Extracting only the data you need for the app
    const { resolvedAddress, currentConditions } = data;
    
    if (currentConditions) {

        const tempCelsius = currentConditions.temp;
        const tempFahrenheit = (tempCelsius * 9/5) + 32;

        return {
            location: resolvedAddress,
            temperature: currentConditions.temp,
            temperatureF: tempFahrenheit.toFixed(2),  // Fahrenheit temperature rounded to 2 decimal places
            conditions: currentConditions.conditions,
            humidity: currentConditions.humidity,
        };
    } else {
        return null; // Or handle cases where data is not available
    }
}

const form = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const conditionsElement = document.getElementById('conditions');
const humidityElement = document.getElementById('humidity');
const weatherIndicator = document.getElementById('weather-indicator');

form.addEventListener('submit', async function(event) {
    event.preventDefault();

    weatherIndicator.textContent = 'Loading...';

    locationElement.textContent = '';
    temperatureElement.textContent = '';
    conditionsElement.textContent = '';
    humidityElement.textContent = '';

    const query = searchInput.value.trim();
    try{
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(query)}?unitGroup=metric&key=YKVTXC5ETE3GFMVLDMURZRNVH&contentType=json`, { mode: 'cors' });
    const data = await response.json();

        console.log(data)

        const processedData = processWeatherData(data); 

        if(processedData) {
            console.log(processedData)
            
            weatherIndicator.textContent = '';

            locationElement.textContent = `Location: ${processedData.location}`;
            temperatureElement.textContent = `Temperature: ${processedData.temperatureF} °F`;
            conditionsElement.textContent = `Conditions: ${processedData.conditions}`;
            humidityElement.textContent = `Humidity: ${processedData.humidity}%`;

            if(processedData.conditions === "Clear"){
                weatherIndicator.textContent = '';
                console.log(`Condition from API: "${processedData.conditions}"`);
                weatherIndicator.textContent = 'Clear Skies'
            } else if(processedData.conditions === "Partially cloudy"){
                weatherIndicator.textContent = '';
                weatherIndicator.textContent = 'Partially cloudy'
            }

        } else {
            alert('No Weather found for that location.');
            weatherIndicator.textContent = '';
            locationElement.textContent = '';
            temperatureElement.textContent = '';
            conditionsElement.textContent = '';
            humidityElement.textContent = '';
        }

    
    } catch(error) {
        console.error('Error fetching the Weather:', error);
        weatherIndicator.textContent = '';
        locationElement.textContent = '';
        temperatureElement.textContent = '';
        conditionsElement.textContent = '';
        humidityElement.textContent = '';
    };
});