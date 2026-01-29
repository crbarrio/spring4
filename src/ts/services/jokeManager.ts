import { apiData, type ApiEndpointConfig } from "../api/config";
import { errors } from "../api/errors";
import { fetchData } from "../api/apiService";
import { printJoke } from "../ui/ui";
import { qs } from "../utils/dom";
import { jokesReport } from "../state/store";


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
    }
}

export function saveScore(score: number, id: string) {
    const jokePanel = qs<HTMLParagraphElement>("#jokePanel");
    const d = new Date()
    const jokeIndex = jokesReport.findIndex(joke => joke.id == id);

    if (!jokeIndex) {
        jokesReport.push({
            id: id,
            joke: jokePanel ? jokePanel.innerText : '',
            score: score,
            date: d.toISOString()
        })
    } else {
        jokesReport[jokeIndex].score = score;
        jokesReport[jokeIndex].date = d.toISOString();
    }

    console.log(jokesReport);
}

