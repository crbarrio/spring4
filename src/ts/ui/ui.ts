import { qs } from "../utils/dom";

let spinnerTimeout: number | undefined;

export function printJoke (joke: string, status: string, id: string = '') { 
    const jokePanel = qs<HTMLParagraphElement>("#jokePanel")!;
    const spinner = qs<HTMLElement>("#spinnerJoke")!;

    if (spinnerTimeout) {
        clearTimeout(spinnerTimeout);
        spinnerTimeout = undefined;
    }

    spinner.classList.add("hidden");
    
    jokePanel.append(joke);
    
    if (status == 'ok') {
        jokePanel.classList.add('text-comic-black', 'dark:text-white')
        jokePanel.classList.remove('text-red-700')

        jokePanel.setAttribute("data-id", id);
        jokePanel.setAttribute("data-joke", joke);

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
    const spinner = qs<HTMLElement>("#spinnerJoke")!;
    const scoreSection = qs<HTMLDivElement>("#scoreSection")!;
    const jokePanel = qs<HTMLParagraphElement>("#jokePanel")!;

    jokePanel.innerHTML = ''; 
    scoreSection.classList.add("opacity-0");
    
    if (spinnerTimeout) {
        clearTimeout(spinnerTimeout);
        spinnerTimeout = undefined;
    }

    spinnerTimeout = window.setTimeout(() => {
        spinner.classList.remove("hidden");
    }, 500);
}