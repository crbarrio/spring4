
import { fetchData } from "./apiService";

export function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function success(position: GeolocationPosition) {
    const coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    }
    getWeather(coords)
}

function error(error: GeolocationPositionError) {

    switch(error.code) {
        case error.PERMISSION_DENIED:
        console.log( "User denied the request for Geolocation.")
        break;
        case error.POSITION_UNAVAILABLE:
        console.log( "Location information is unavailable.")
        break;
        case error.TIMEOUT:
        console.log( "The request to get user location timed out.")
        break;

    }
}

async function getWeather(apiOpions: {}) {

    const apiResult = await fetchData('weather', apiOpions)

    console.log(apiResult.data.currentConditions.icon, apiResult.data.days[0].tempmax, apiResult.data.days[0].tempmin)
}

