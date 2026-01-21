
const options: RequestInit = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    // "Authorization": "Bearer tu_token_aqui"
  }
};

export type ApiEndpointConfig = {
  url: string;
  options: RequestInit;
};


export const apiData = {
    dadJoke : {
        url: "https://api.ejemplo.com",
        options: options,
    },
    chuckNorris : {
        url: "https://api.ejemplo.com",
        options: options,
    },
    weather : {
        url: "https://api.ejemplo.com",
        options: options,
    },
} satisfies Record<string, ApiEndpointConfig>

// P Ejemplo dadJoke es string y el objeto dentro es de tipo ApiEndpointConfig