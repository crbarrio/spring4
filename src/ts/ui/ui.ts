import { qs } from "../utils/dom";

import { createSpinner } from "./spinnerManager";

const jokePanel = qs<HTMLParagraphElement>("#jokePanel")!;

export const jokeSpinner = createSpinner("#spinnerJoke", { delayMs: 500 });

export function setJokePanel(joke:string) {
    jokePanel.textContent = joke;
}

export function printJoke (joke: string, status: string, id: string = '', originalJoke: string = '') {
    jokeSpinner.stop();
    
    setJokePanel(joke);
    
    if (status == 'ok') {
        jokePanel.classList.add('text-comic-black', 'dark:text-white')
        jokePanel.classList.remove('text-red-700')

        jokePanel.setAttribute("data-id", id);
        jokePanel.setAttribute("data-joke", originalJoke);

    } else {
        jokePanel.classList.add('text-red-700')
        jokePanel.classList.remove('text-comic-black', 'dark:text-white')
    }
}

export function printWeather(icon: string, tempMax: string, tempMin: string) {
    const weatherIcon = qs<HTMLImageElement>("#weatherIcon")!;
    const curTemp = qs<HTMLDivElement>("#curTemp")!;
    const weatherPanel = qs<HTMLDivElement>("#wetherPanel")!;

    weatherPanel.classList.remove("opacity-0");
    weatherPanel.classList.add("opacity-100", "animate-pow");

    weatherIcon.src=`./assets/icons/${icon}.svg`
    weatherIcon.alt=icon
    weatherIcon.classList.add("h-10", "w-10", "md:h-16", "md:w-16", "lg:h-20", "lg:w-20")
    curTemp.innerHTML = `Max: ${tempMax}°C <br> Min: ${tempMin}°C`
}

export function showScore(score: number) {

    let hideScoreTimeout: number | undefined;
    const starScore = qs<HTMLDivElement>("#StarScore")!;
    const scoreNumber = qs<HTMLSpanElement>("#scoreNumber")!;
    scoreNumber.textContent = score.toString();
    
    if (hideScoreTimeout) {
        clearTimeout(hideScoreTimeout);
    }

    starScore.classList.remove("opacity-0", "scale-0", "translate-y-4");
    starScore.classList.add("opacity-100", "scale-100", "-translate-y-2", "animate-pow");

    hideScoreTimeout = window.setTimeout(() => {
        starScore.classList.remove("opacity-100", "scale-100", "-translate-y-2", "animate-pow");
        starScore.classList.add("opacity-0", "scale-0", "translate-y-4");
    }, 1400);
}

export function toggleScorePanel(status: string) {
    const scoreSection = qs<HTMLDivElement>("#scoreSection")!;

    if (status === 'error') {
        scoreSection.classList.add("opacity-0");
    } else {
        scoreSection.classList.remove("opacity-0");
    }
}

export function resetJokePanel() {
    const scoreSection = qs<HTMLDivElement>("#scoreSection")!;
    const jokePanel = qs<HTMLParagraphElement>("#jokePanel")!;

    jokePanel.innerHTML = ''; 
    scoreSection.classList.add("opacity-0");

    jokeSpinner.start();
}

export function showTranslationError() {
    const translationError = qs<HTMLDivElement>("#translationError")!;
    translationError.classList.remove("hidden");
}

export function hideTranslationError() {
    const translationError = qs<HTMLDivElement>("#translationError")!;
    translationError.classList.add("hidden");
}