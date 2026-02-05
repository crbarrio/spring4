import { getLanguage } from "../state/store";

const translations = {
    "appTitle": {
        "en": "Random Joke Generator",
        "es": "Generador de Chistes Aleatorios",
        "fr": "Générateur de Blagues Aléatoires"
    },
    "nextButton": {
        "en": "Next Joke",
        "es": "Siguiente Chiste",
        "fr": "Blague Suivante"
    },
    "subHeader": {
        "en": "Ready to laugh?",
        "es": "¿Listo para reír?",
        "fr": "Prêt à rire?"
    },
    "ScoreLegend": {
        "en": "Rate this joke from 1 to 3 stars!",
        "es": "Califica este chiste del 1 al 3 estrellas!",
        "fr": "Évaluez cette blague de 1 à 3 étoiles!"
    },
    "translationError": {
        "en": "* Sorry, we couldn't translate the joke. Please try again later",
        "es": "* Lo siento, no pudimos traducir el chiste. Por favor, inténtalo de nuevo más tarde",
        "fr": "* Désolé, nous n'avons pas pu traduire la blague. Veuillez réessayer plus tard"
    }
};

type TranslationKey = keyof typeof translations
type Language = keyof (typeof translations)[TranslationKey];

export function t(key: TranslationKey): string {
    const currentLanguage = getLanguage();
    return translations[key][currentLanguage];
}

export function applyTranslations(): void {
  // Texto
  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n as TranslationKey | undefined;
    if (!key) return;
    el.textContent = t(key);
  });

  // Título + lang del documento
  document.title = t("appTitle");
  document.documentElement.lang = (getLanguage() as Language) ?? "en";
}