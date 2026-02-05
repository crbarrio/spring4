import { qs, qsa } from "./utils/dom";
import { getJoke, saveScore } from "./services/jokeManager";
import { getWeather } from "./services/weatherManager";
import { changeLanguage, translateJoke } from "./services/languageManager";
import { showScore, resetJokePanel } from "./ui/ui";
import { applyTranslations } from "./i18n/i18n";
import { getLanguage } from "./state/store";


document.addEventListener("DOMContentLoaded", () => {

  /// Main Functions ///
  applyTranslations()
  getJoke();
  getWeather();
  
  /// Set Language Selector Value ///
  const languageSelector = qs<HTMLSelectElement>("#languageSelect")!;
  languageSelector.value = getLanguage();

  /// Event Listeners ///

  // Next Button
  const nextButton = qs<HTMLButtonElement>("#nextButton")!;

  nextButton.addEventListener('click', async () => {
    resetJokePanel();
    getJoke();
  })


  // Score Buttons
  const scoreButtons = qsa<HTMLInputElement>(".scoreButton")!;
  const jokePanel = qs<HTMLParagraphElement>("#jokePanel")!;
  
  scoreButtons.forEach(button => {
    button.addEventListener('click', () => {
      const score: number = parseInt(button.value || '0');
      const id: string = jokePanel.getAttribute("data-id") || '';
      const joke: string = jokePanel.getAttribute("data-joke") || '';

      saveScore(score, id, joke);
      showScore(score);

    })
  })

  // Language Selector
  languageSelector.addEventListener('change', () => {

    const joke: string = jokePanel.getAttribute("data-joke") || '';
    const selectedLanguage = languageSelector.value as 'en' | 'es' | 'fr';

    changeLanguage(selectedLanguage);

    translateJoke(joke).then(translatedJoke => {
      jokePanel.textContent = translatedJoke;
    })

    applyTranslations();

  })

});