import { apiData } from "./config";


function buildApiUrl(apiName: string, urlParameters: {} = {}) {

    const api = apiData.filter(api => api.name == apiName)[0]
    let url = api.url

    if (api.apiKey) {
        url = url.replace('{{api_key}}', api.apiKey)
    }

    if (api.apiOptions) {
        api.apiOptions.forEach(option => {
            const isOPtion = url.search(`{{${option}}}`) !== -1;
            const value = urlParameters[option as keyof typeof urlParameters];

            if (isOPtion && value) {
                url = url.replace(`{{${option}}}`, value as string);
            } else if (isOPtion && !value) {
                throw new Error("Falta el parámetro de opción de API: ")
            }
        });
    }
    
    return url
}


export async function fetchData(apiName: string, urlParameters: {} = {} ) {
    
    const api = apiData.filter(api => api.name == apiName)[0]
    const options = api.requestOptions

    const url = buildApiUrl(apiName, urlParameters)

    try {
        const response = await fetch(url, options );
        if (!response.ok || response.status !== 200) throw new Error("Se ha producido un error en la solicitud");
        const data = await response.json();
        return {status: 'ok', data};
    } catch (error) {
        return {status: 'error', data: error}
    }
}

