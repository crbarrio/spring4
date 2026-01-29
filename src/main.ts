import { qs, qsa } from "./helpers";
import { getJoke, saveScore } from "./jokeManager";
import { getLocation } from "./weatherManager";



getJoke();
getLocation();

/// Event Listeners ///

// Next Button
const nextButton = qs<HTMLButtonElement>("#nextButton");
nextButton?.addEventListener('click', async () => {
  getJoke()
})


// Score Buttons

//// ¿Cuando lanzar el evento en la pulsación del radio o en la pulsación de siguiente? ///
// si en en la pulsación del radio como cambiar el resultado de la puntuacion? Controlo que siguiente ha sido pulsado?
// si lo hago en siguiente tengo que controlar si el usuario no ha puntuado el chiste
// al pulsar en siguiente resetear el radio siempre

const scoreButtons = qsa<HTMLInputElement>(".scoreButton");
scoreButtons.forEach(button => {
  button.addEventListener('click', () => {
    const score: number = parseInt(button.value || '0');
    const id: string = button.getAttribute("data-id") || '';
    saveScore(score, id);
  })
})

