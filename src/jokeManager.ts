import { apiData } from "./config";
import { fetchData } from "./apiService";
import { printJoke } from "./jokesUI";
import { qs } from "./helpers";
import { jokesReport } from "./db";


function randomJoke(): string {
    const availableJokeApi = apiData.filter(api => api.type == 'joke').map(api => api.name)
    const index = Math.floor(Math.random() * availableJokeApi.length);
    return availableJokeApi[index];
}

export async function getJoke() {
    const apiName = randomJoke();
    const apiResult = await fetchData(apiName);
    if (apiResult.status == 'ok') {
        printJoke(apiResult.data.joke)
    } else {
        printJoke(apiResult.data)
    }
}

export function saveScore(score: number) {
    const jokePanel = qs<HTMLParagraphElement>("#jokePanel");
    const d = new Date()
    jokesReport.push({
        joke: jokePanel ? jokePanel.innerText : '',
        score: score,
        date: d.toISOString()
    })

    console.log(jokesReport)

}

