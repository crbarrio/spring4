import { apiData } from "./config";
import { errors } from "./errors";

type ApiCallOK = { status: 'ok', url: string, options: RequestInit, body?: string }
type ApiCallError = { status: 'error', error: string }
type ApiCallResult = ApiCallOK | ApiCallError


// funcion que checkea si la api a la que se llama tiene todos los parametros
// correspondientes, si tiene la apikey OK, si se proporcionan todos los parámetros...

export function checkApiCall(apiName: string, urlParameters: Record<string, string | number> = {} ): ApiCallResult {

    try {
        // Comprobar que existe la api en la configuración
        const apiFind = apiData.filter(api => api.name == apiName)
        if (apiFind.length === 0) throw new Error(errors.apiNameError)

        const api = apiFind[0]

        // Comprobar que hay requestOptions en configuración
        if (!api.requestOptions) throw new Error(errors.apiOptionsError)
        const options = api.requestOptions

        // Comprobar que existe la url
        if (!api.url) throw new Error(errors.apiUrlError)
        let url = api.url

        // aqui crear dos vias dependiendo de si es GET o POST

        if (options.method === "GET") {

            // Si hay apiKey en la configuración comprobar que esta en la url para replace
            if (api.apiKey) {
                if (url.search('{{api_key}}') === -1 ) throw new Error(errors.apiKeyError)
                url = url.replace('{{api_key}}', api.apiKey)
            }

            // Si hay apiOptions comprobar que estan
            if (api.apiOptions) {
                api.apiOptions.forEach(option => {
                    const isOPtion = url.search(`{{${option}}}`) !== -1;
                    const value = urlParameters[option as keyof typeof urlParameters];

                    if (!isOPtion || !value) throw new Error(errors.apiOptionsError);

                    url = url.replace(`{{${option}}}`, value as string);
                });
            }

        } else if (options.method === "POST") {

            const bodyContent: Record<string, string | number> = {};

            if (api.apiKey) {
                bodyContent['api_key'] = api.apiKey
            }

            if (api.apiOptions) {
                api.apiOptions.forEach(option => {
                    const value = urlParameters[option as keyof typeof urlParameters];
                    if (!value) throw new Error(errors.apiOptionsError);
                    bodyContent[option] = value;
                });

                options.body = JSON.stringify(bodyContent);

            }
        }

        return {status: 'ok', url, options}

    } catch (error) {
        
        return {status: 'error', error: String(error)};

    }
}

export async function fetchData(apiName: string, urlParameters: Record<string, string | number> = {} ) {

    const api = checkApiCall(apiName, urlParameters)

    if (api.status === 'error') return {status: 'error', error: api.error}
    
    try {
        
        const response = await fetch(api.url, api.options);

        if (!response.ok || response.status !== 200) throw new Error(errors.fetchDataError);
        const data = await response.json();
        return {status: 'ok', data};

    } catch (error) {
        return {status: 'error', error: String(error)}
    }
}

