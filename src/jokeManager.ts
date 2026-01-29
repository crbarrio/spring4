import { apiData, type ApiEndpointConfig } from "./config";
import { fetchData } from "./apiService";
import { printJoke } from "./ui";
import { qs } from "./helpers";
import { jokesReport } from "./db";


function randomJoke(): ApiEndpointConfig {
    const availableJokeApi = apiData.filter(api => api.type == 'joke')
    const index = Math.floor(Math.random() * availableJokeApi.length);
    return availableJokeApi[index];
}

export async function getJoke() {
    const jokeApi = randomJoke();
    const apiResult = await fetchData(jokeApi.name);
    const mapJoke = jokeApi.joke;

    if (apiResult.status == 'ok') {
        printJoke(apiResult.data[mapJoke!], apiResult.data.id);
    } else {
        printJoke(apiResult.data)
    }
}

export function saveScore(score: number, id: string) {
    const jokePanel = qs<HTMLParagraphElement>("#jokePanel");
    const d = new Date()

    if (!jokesReport.find(joke => joke.id == id)) {
        jokesReport.push({
            id: id,
            joke: jokePanel ? jokePanel.innerText : '',
            score: score,
            date: d.toISOString()
        })
    } else {
        const jokeIndex = jokesReport.findIndex(joke => joke.id == id);
        jokesReport[jokeIndex].score = score;
        jokesReport[jokeIndex].date = d.toISOString();
    }

    console.log(jokesReport);
}

