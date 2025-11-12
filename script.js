//  ➤  Reemplaza con tu propia API key de OpenWeatherMap (https://openweathermap.org/api) 

const API_KEY = "add48a8d2a2908bd44e07057392e20be";

// Referencias a los elementos HTML 

const locationEl = document.getElementById("location"); 
const weatherEl = document.getElementById("weather"); 
const lightEl = document.getElementById("light");

// ---  📖 Geolocation API --- 

if ("geolocation" in navigator) {    
    navigator.geolocation.getCurrentPosition(success, error); 
} else {   
    locationEl.textContent = "La geolocalización no es compatible en este navegador."; 
}

function success(position) {    
    const lat = position.coords.latitude;    
    const lon = position.coords.longitude;

locationEl.textContent = `Latitud: ${lat.toFixed(4)}, Longitud: ${lon.toFixed(4)}`;

// Obtener datos del clima 

getWeather(lat, lon);

}

function error() {    
    locationEl.textContent = "No se pudo obtener la ubicación."; 
}

// --- OpenWeatherMap API ---
async function getWeather(lat, lon) {
    try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${API_KEY}`;;
    const response = await fetch(url);
    const data = await response.json();

    const temp = data.main.temp;
    const desc = data.weather[0].description;
    const city = data.name;

    weatherEl.textContent = `${city}: ${temp}°C, ${desc}`;
    } catch (err) {
    weatherEl.textContent = "Error al obtener los datos del clima.";
    }
}

// ---  Ambient Light API ---
if ("AmbientLightSensor" in window) {
    try {
    const sensor = new AmbientLightSensor();
    sensor.addEventListener("reading", () => {
        lightEl.textContent = `${sensor.illuminance} lux`;
        document.body.style.backgroundColor = sensor.illuminance < 50 ? "#2c3e5f" : "#ffefefe";
    });

    sensor.start();

    } catch (err) {
    lightEl.textContent = "Error al iniciar el sensor de luz.";
    }
    } else {
    // Fallback si el navegador no soporta la API
    lightEl.textContent = "Sensor de luz no compatible (solo en algunos móviles o Firefox).";
}