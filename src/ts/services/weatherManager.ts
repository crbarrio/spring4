
import { fetchData } from "../api/apiService";
import { printWeather } from "../ui/ui";
import { errors } from "../api/errors";
import { debug } from "../api/config";

type LocationOk = { status: "ok"; coords: { latitude: number; longitude: number } };
type LocationError = { status: "error"; error: string };
type LocationResult = LocationOk | LocationError;

function locationSuccess(position: GeolocationPosition): LocationOk {
    const coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    }
    return { status: 'ok', coords: coords}
}

function locationError(error: GeolocationPositionError): LocationError {

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

function getLocation(): Promise<LocationResult> {
    return new Promise((resolve) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (coords) => resolve(locationSuccess(coords)), 
                (error) => resolve(locationError(error))
            );
        } else {
            resolve({status: 'error', error: errors.getLocationError})
        }
    })
    
}

export async function getWeather() {

    const apiOptions = await getLocation();

    if (apiOptions?.status === 'ok') {

        const apiResult = await fetchData('weather', apiOptions.coords)

        if (apiResult.status == 'ok') {
            printWeather(
                apiResult.data.currentConditions.icon,
                apiResult.data.days[0].tempmax,
                apiResult.data.days[0].tempmin
            )
        } else {
            if (debug) console.log(apiResult.error)           
        }
    } else {
        if (debug) console.log(apiOptions?.error)
    }
}

