import { apiData, type ApiEndpointConfig } from "./config";


type ApiName = keyof typeof apiData;


export async function enviarDatos(apiName: ApiName ) {

    const {url, options}: ApiEndpointConfig = apiData[apiName]

    try {
        const response = await fetch(url, options );
        if (!response.ok) throw new Error("Error en la petición");
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

