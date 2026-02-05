import { getLanguage, setLanguage, type Language } from "../state/store";
import { fetchData } from "../api/apiService";
import { debug } from "../api/config";
import { showTranslationError, hideTranslationError, jokeSpinner, setJokePanel } from "../ui/ui";
import { applyTranslations } from "../i18n/i18n";

export async function changeLanguage(language: Language, joke: string): Promise<void> {
    setLanguage(language);
    applyTranslations();
    setJokePanel('');
    const translatedJoke = await jokeSpinner.run(translateJoke(joke));

    setJokePanel(translatedJoke);
    
}

export async function translateJoke(joke:string): Promise<string> {

    const currentLanguage = getLanguage();

    if (currentLanguage === 'en') return joke;

    const translation  = await fetchData('translate', {source: 'en', target: currentLanguage, q: joke});

    if (translation.status === 'error') {
        if (debug) console.log(translation.error);
        showTranslationError();
        return joke;
    } else {
        hideTranslationError();
        return translation.data.translatedText;
    }


}
