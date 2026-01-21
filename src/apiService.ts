import { apiData, type ApiEndpointConfig } from "./config";


type ApiName = keyof typeof apiData;


export async function fetchData(apiName: ApiName ) {

    const {url, options}: ApiEndpointConfig = apiData[apiName]

    try {
        const response = await fetch(url, options );
        if (!response.ok || response.status !== 200) throw new Error("Se ha producido un error en la solicitud");
        const data = await response.json();
        console.log(data);  
        return data;
    } catch (error) {
        console.error(error);
    }
}

