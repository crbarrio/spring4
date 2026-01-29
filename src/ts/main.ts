import { qs, qsa } from "./utils/dom";
import { getJoke, saveScore } from "./services/jokeManager";
import { getWeather } from "./services/weatherManager";

document.addEventListener("DOMContentLoaded", () => {


  /// Main Functions ///
  
  getJoke();
  getWeather();


  /// Event Listeners ///

  // Next Button
  const nextButton = qs<HTMLButtonElement>("#nextButton");
  nextButton?.addEventListener('click', async () => {
    getJoke()
  })


  // Score Buttons
  const scoreButtons = qsa<HTMLInputElement>(".scoreButton");
  scoreButtons.forEach(button => {
    button.addEventListener('click', () => {
      const score: number = parseInt(button.value || '0');
      const id: string = button.getAttribute("data-id") || '';
      saveScore(score, id);
    })
  })

});