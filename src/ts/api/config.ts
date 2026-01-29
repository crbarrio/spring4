
const options: RequestInit = {
  method: "GET",
  headers: {
    "Accept": "application/json",
  }
};

export type ApiEndpointConfig = {
  name: string,
  type: string,
  url: string,
  apiKey?: string,
  apiOptions?: string[],
  joke?: string,
  requestOptions: RequestInit
};

export const apiData = [
  {
    name: 'dadJoke',
    type: 'joke',
    url: "https://icanhazdadjoke.com/",
    joke: 'joke',
    requestOptions: options,
  },
  {
    name: 'chucNorris',
    type: 'joke',
    url: "https://api.chucknorris.io/jokes/random",
    joke: 'value',
    requestOptions: options,
  },
  {
    name: 'weather',
    type: 'weather',
    url: "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{{latitude}}%2C{{longitude}}/today?unitGroup=metric&elements=conditions,icon,name,tempmax,tempmin&key={{api_key}}&contentType=json",
    apiKey: import.meta.env.VITE_WEATHER_API_KEY,
    apiOptions: ['latitude', 'longitude'],
    requestOptions: options,
  },
] satisfies ApiEndpointConfig[]
