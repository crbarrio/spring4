
const optionsGET: RequestInit = {
  method: "GET",
  headers: {
    "Accept": "application/json",
  }
};

const optionsPOST: RequestInit = {
  method: "POST",
  headers: {
    "Authorization": "{{api_key}}",
    "Content-Type": "application/json"
  },
  body: ""
};

export type ApiEndpointConfig = {
  name: string,
  type: string,
  url: string,
  apiKey?: string,
  apiPrefix?: string,
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
    url: "https://api-free.deepl.com/v2/translate",
    apiKey: import.meta.env.VITE_TRANSLATE_API_KEY,
    apiPrefix: 'DeepL-Auth-Key',
    apiOptions: ['text', 'target_lang'],
    requestOptions: optionsPOST,
  }
] satisfies ApiEndpointConfig[]

export const debug = import.meta.env.VITE_DEBUG;

export const language = ['EN-US', 'ES', 'FR', 'DE', 'IT'];


// async function traducir() {
//   try {
//     const response = await fetch("https://api.deepl.com/v2/translate", ,
//       body: JSON.stringify({
//         text: ["Hello, world!"],
//         target_lang: "DE"
//       })
//     });

//     if (!response.ok) {
//       throw new Error(`Error HTTP: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log("Traducción:", data.translations[0].text);

//   } catch (error) {
//     console.error("Error en la petición:", error);
//   }
// }