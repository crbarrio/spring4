import './style.css'
import { fetchData } from "./apiService";

function qs<T extends HTMLElement>(selector: string): T | null {
  return document.querySelector(selector);
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="flex flex-col justify-center w-2xl m-auto mt-10">
    <h1 class="text-3xl self-center">
      Get Jokes
    </h1>

    <p class="h-16 p-8 my-4 text-center" id="jokePanel"></p>

    <div class="text-center">
      <button class="bg-amber-700 border border-bg-white rounded px-3 py-2 m-3 hover:cursor-pointer hover:bg-amber-500" id="nextButton">Next</button>
    </div>
    
  </div>
`

const nextButton = qs<HTMLButtonElement>("#nextButton");
const jokePanel = qs<HTMLParagraphElement>("#jokePanel");

nextButton?.addEventListener('click', async () => {
  const joke = await fetchData('dadJoke');
  if (!jokePanel || !joke) return;

  jokePanel.innerText = joke.joke ?? joke.id ?? '';
})



