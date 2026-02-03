import { describe, it, expect, vi, afterEach } from "vitest";
import { checkApiCall, fetchData } from "../src/ts/api/apiService.ts";

describe('example.checkApiCall', () => {

    it('returns an object with status ok and url', () => {
        const returnObject = checkApiCall('weather', {
            latitude: 41.3851,
            longitude: 2.1734
        })

        expect(returnObject).toStrictEqual({
            status: 'ok', 
            url: "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/41.3851%2C2.1734/today?unitGroup=metric&elements=conditions,icon,name,tempmax,tempmin&key=KZ8CUBJNX4Q2M3ZXBG9GXBTKP&contentType=json",
            options: {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                }
            }
        })
    })

    it('does not call fetch and returns error when checkApiCall fails', async () => {
        const fetchFake = vi.fn();
        vi.stubGlobal('fetch', fetchFake);

        const result = await fetchData('', {
            latitude: 41.3851,
            longitude: 2.1734
        });

        expect(fetchFake).not.toHaveBeenCalled();

        expect(result.status).toBe('error');
    });

    it('returns status error when the Api doesnt exist or is empty', () => {
        const returnObject = checkApiCall('', {
            latitude: 41.3851,
            longitude: 2.1734
        })

        expect(returnObject).toStrictEqual({status: 'error', error: "Error: The API does not exist in the config file"})
    })

    it('returns status error when one parameter is missing and error description', () => {
        const returnObject = checkApiCall('weather', {
            latitude: 41.3851
        })

        expect(returnObject).toStrictEqual({status: 'error', error: "Error: checkApiCall error: Parameters missing for the api request"})
    })

})

describe('example.fetchData', () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('returns an object with data when fetch succeeds -> API WEATHER', async () => {
        const mockedJson = { 
            currentConditions: {icon: 'partly-cloudy-day'},
            days: [
                {
                    tempmax: '25',
                    tempmin: '15'
                }
            ]
        };

        // simulamos la respuesta de fetch
        const mockResponse = {
            ok: true,
            status: 200,
            json: vi.fn().mockResolvedValue(mockedJson)
        } as any;

        // simulamos fetch global
        const fetchMock = vi.fn().mockResolvedValue(mockResponse);
        vi.stubGlobal('fetch', fetchMock);

        const result = await fetchData('weather', {
            latitude: 41.3851,
            longitude: 2.1734
        });

        expect(fetchMock).toHaveBeenCalledOnce();
        expect(result).toStrictEqual({
            status: 'ok',
            data: mockedJson
        });
    });

    it('returns status error when fetch returns non 200', async () => {
        const mockResponse = {
            ok: false,
            status: 500,
            json: vi.fn()
        } as any;

        vi.stubGlobal('fetch', vi.fn().mockResolvedValue(mockResponse));

        const result = await fetchData('weather', {
            latitude: 41.3851,
            longitude: 2.1734
        });

        expect(result.status).toBe('error');
    });


})