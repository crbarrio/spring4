
const optionsGET: RequestInit = {
  method: "GET",
  headers: {
    "Accept": "application/json",
  }
};

const optionsPOST: RequestInit = {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: ""
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
    requestOptions: optionsGET,
  },
  {
    name: 'chucNorris',
    type: 'joke',
    url: "https://api.chucknorris.io/jokes/random",
    joke: 'value',
    requestOptions: optionsGET,
  },
  {
    name: 'weather',
    type: 'weather',
    url: "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{{latitude}}%2C{{longitude}}/today?unitGroup=metric&elements=conditions,icon,name,tempmax,tempmin&key={{api_key}}&contentType=json",
    apiKey: import.meta.env.VITE_WEATHER_API_KEY,
    apiOptions: ['latitude', 'longitude'],
    requestOptions: optionsGET,
  },
  {
    name: 'translate',
    type: 'translate',
    url: "http://localhost:5000/translate",
    apiKey: "",
    apiOptions: ['q', 'source', 'target'],
    requestOptions: optionsPOST,
  }
] satisfies ApiEndpointConfig[]

export const debug = import.meta.env.VITE_DEBUG;

export const language = ['EN-US', 'ES', 'FR', 'DE', 'IT'];


