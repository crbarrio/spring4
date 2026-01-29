
import { fetchData } from "../api/apiService";
import { printWeather } from "../ui/ui";
import { errors } from "../api/errors";


function locationSuccess(position: GeolocationPosition) {
    const coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    }
    return { status: 'ok', coords: coords}
}

function locationError(error: GeolocationPositionError) {

    let errorText = ''
    switch(error.code) {
        case error.PERMISSION_DENIED:
        errorText = errors.locationErrors.permisonDenied
        break;
        case error.POSITION_UNAVAILABLE:
        errorText = errors.locationErrors.positionUnavailable
        break;
        case error.TIMEOUT:
        errorText = errors.locationErrors.timeout
        break;
    }

    return {status: 'error', error: errorText}
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
    } else {
        return {status: 'error', error: errors.getLocationError}
    }
}

export async function getWeather() {

    const apiOptions = getLocation();

    if (apiOptions?.status === 'ok') {

        const apiResult = await fetchData('weather', apiOptions)

        if (apiResult.status == 'ok') {
            printWeather(
                apiResult.data.currentConditions.icon,
                apiResult.data.days[0].tempmax,
                apiResult.data.days[0].tempmin
            )
        }
    }
}

