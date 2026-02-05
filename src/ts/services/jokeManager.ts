import { apiData, debug, type ApiEndpointConfig } from "../api/config";
import { errors } from "../api/errors";
import { fetchData } from "../api/apiService";
import { translateJoke } from "./languageManager";
import { printJoke, toggleScorePanel } from "../ui/ui";
import { getJokesReport, setJokesReport } from "../state/store";


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
        const originalJoke = apiResult.data[mapJoke!];
        const joke = await translateJoke(originalJoke);
        printJoke(joke, apiResult.status, apiResult.data.id, originalJoke);
    } else {
        printJoke(errors.userJokeError, apiResult.status)
        if (debug) console.log(apiResult.error) 
    }

    toggleScorePanel(apiResult.status);
}




export function saveScore(score: number, id: string, joke: string) {
    const d = new Date()
    const jokesReport = getJokesReport();
    const jokeIndex = jokesReport.findIndex(joke => joke.id == id);

    if (jokeIndex === -1) {
        jokesReport.push({
            id: id,
            joke: joke,
            score: score,
            date: d.toISOString()
        })
    } else {
        jokesReport[jokeIndex].score = score;
        jokesReport[jokeIndex].date = d.toISOString();
    }

    setJokesReport(jokesReport);
    console.log(jokesReport);
}

