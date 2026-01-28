import { qs } from "./helpers";

export function printJoke (joke: string) { 
    const jokePanel = qs<HTMLParagraphElement>("#jokePanel");
    if(jokePanel) jokePanel.innerText = joke
}
