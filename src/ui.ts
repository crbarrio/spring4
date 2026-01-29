import { qs } from "./helpers";

export function printJoke (joke: string, id: string = '') { 
    const jokePanel = qs<HTMLParagraphElement>("#jokePanel");
    if(jokePanel) {
        jokePanel.innerText = joke
        jokePanel.setAttribute("data-id", id);
    }
}


export function printWeather(icon: string, tempMax: string, tempMin: string) {
    const weatherIcon = qs<HTMLImageElement>("#weatherIcon");
    const curTemp = qs<HTMLDivElement>("#curTemp");


    if(weatherIcon) {
        weatherIcon.src=`./src/assets/icons/${icon}.svg`
        weatherIcon.alt=icon
        weatherIcon.classList.add("h-20", "w-20")
    }

    if(curTemp) curTemp.innerText = `Max: ${tempMax}°C / Min: ${tempMin}°C`
}