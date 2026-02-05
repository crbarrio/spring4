import { getLanguage, setLanguage, type Language } from "../state/store";
import { fetchData } from "../api/apiService";
import { debug } from "../api/config";
import { showTranslationError, hideTranslationError } from "../ui/ui";



export function changeLanguage(language: Language): void {
    setLanguage(language);
    location.reload();
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
