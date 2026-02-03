export const errors = {
  userJokeError: "We couldn't find any jokes at this moment, try again later",
  apiOptionsError: "checkApiCall error: Parameters missing for the api request",
  apiNameError: "The API does not exist in the config file",
  apiKeyError: "API Key Error",
  apiUrlError: "API URL Error",
  fetchDataError: "fetchData error: The API did not send a successfull answer ",
  getLocationError: "Geolocation is not supported by the browser",
  locationErrors : {
    permisonDenied: "User denied the request for Geolocation",
    positionUnavailable: "Location information is unavailable",
    timeout: "The request to get user location timed out."
  }
}