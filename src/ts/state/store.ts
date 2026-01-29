export type JokeReport = {
  id: string;
  joke: string;
  score: number;
  date: string;
};

const STORAGE_KEY = "jokesReport";

export function getJokesReport(): JokeReport[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) as JokeReport[] : [];
}

export function setJokesReport(data: JokeReport[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}