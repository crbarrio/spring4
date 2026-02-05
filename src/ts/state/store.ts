export type JokeReport = {
  id: string;
  joke: string;
  score: number;
  date: string;
};

export type Language = 'en' | 'es' | 'fr';



const STORAGE_KEY = "jokesReport";
const LANGUAGE_KEY = "language";

export function getLanguage(): Language {
  const raw = localStorage.getItem(LANGUAGE_KEY);
  return (raw as Language) || 'en';
}

export function setLanguage(language: Language): void {
  localStorage.setItem(LANGUAGE_KEY, language);
}

export function getJokesReport(): JokeReport[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) as JokeReport[] : [];
}

export function setJokesReport(data: JokeReport[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}