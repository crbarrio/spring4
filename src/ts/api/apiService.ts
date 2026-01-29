import { apiData } from "./config";
import { errors } from "./errors";

type urlOK = { status: 'ok', url: string}
type urlError = { status: 'error', error: string}
type urlBuildAnswer = urlOK | urlError

function buildApiUrl(apiName: string, urlParameters: Record<string, string> = {}): urlBuildAnswer {

    try {
        const api = apiData.filter(api => api.name == apiName)[0]
        let url = api.url

        if (api.apiKey) {
            if (url.search('{{api_key}}') === -1 ) throw new Error(errors.apiKeyError)
            url = url.replace('{{api_key}}', api.apiKey)
        }

        if (api.apiOptions) {
            api.apiOptions.forEach(option => {
                const isOPtion = url.search(`{{${option}}}`) !== -1;
                const value = urlParameters[option as keyof typeof urlParameters];
                if (!isOPtion || !value) throw new Error(errors.apiOptionsError)
                url = url.replace(`{{${option}}}`, value as string);
            });
        }
    
        return {status: 'ok', url}

    } catch (error) {
        return {status: 'error', error: String(error)}
    }
    
}


export async function fetchData(apiName: string, urlParameters: {} = {} ) {
    
    const api = apiData.filter(api => api.name == apiName)[0]
    const options = api.requestOptions

    try {
        const url = buildApiUrl(apiName, urlParameters)

        if (url.status === 'error') throw new Error(errors.apiOptionsError)

        const response = await fetch(url.url, options);
        if (!response.ok || response.status !== 200) throw new Error(errors.fetchDataError);
        const data = await response.json();
        return {status: 'ok', data};
    } catch (error) {
        return {status: 'error', error: error}
    }
}

