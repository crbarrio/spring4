import './style.css'
import { enviarDatos } from "./apiService";

console.log(enviarDatos("dadJoke"))

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
  </div>
`


