
const options: RequestInit = {
  method: "GET",
  headers: {
    "Accept": "application/json",
  }
};

export type ApiEndpointConfig = {
  url: string;
  options: RequestInit;
};


export const apiData = {
    dadJoke : {
        url: "https://icanhazdadjoke.com/",
        options: options,
    },
    chuckNorris : {
        url: "https://api.chucknorris.io/jokes/random",
        options: options,
    },
    weather : {
        url: "https://api.ejemplo.com",
        options: options,
    },
} satisfies Record<string, ApiEndpointConfig>

// P Ejemplo dadJoke es string y el objeto dentro es de tipo ApiEndpointConfig