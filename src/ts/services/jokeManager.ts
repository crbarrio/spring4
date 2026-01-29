import { apiData, debug, type ApiEndpointConfig } from "../api/config";
import { errors } from "../api/errors";
import { fetchData } from "../api/apiService";
import { printJoke } from "../ui/ui";
import { qs } from "../utils/dom";
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
        printJoke(apiResult.data[mapJoke!], apiResult.data.id);
    } else {
        printJoke(errors.userJokeError)
        if (debug) console.log(apiResult.error) 
    }
}

export function saveScore(score: number, id: string) {
    const jokePanel = qs<HTMLParagraphElement>("#jokePanel")!;
    const d = new Date()
    const jokesReport = getJokesReport();
    const jokeIndex = jokesReport.findIndex(joke => joke.id == id);

    if (jokeIndex === -1) {
        jokesReport.push({
            id: id,
            joke: jokePanel.innerText,
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

