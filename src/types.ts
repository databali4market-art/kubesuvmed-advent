export type DoorType = 'tip' | 'recipe' | 'gift' | 'discount' | 'contest' | 'story' | 'quiz' | 'download';

export interface QuizQuestion { q: string; options: string[]; answer: number; right?: string; wrong?: string; explain?: string }
export interface PersonaQuestion { q: string; options: { t: string; r: string }[] }
export interface PersonaResult { title: string; text: string; product?: { label: string; url: string } }

export type Game =
  | { kind: 'quiz'; questions: QuizQuestion[] }
  | { kind: 'persona'; questions: PersonaQuestion[]; results: Record<string, PersonaResult> };

export interface Contest {
  question: string;
  prize: string;
  rules: string;
  /** poslední den (prosinec), kdy lze odpovídat */
  until: number;
  placeholder?: string;
  adult?: boolean;
}

export interface Door {
  day: number;
  type: DoorType;
  title: string;
  text: string;
  more?: string;
  image?: string;
  /** produktová fotka na bílém/průhledném pozadí (zobrazí se „na podstavci“) */
  product?: boolean;
  url?: string;
  urlLabel?: string;
  /** slevový kód do e-shopu */
  code?: string;
  /** podmínky kódu (výše slevy, na co platí) */
  codeNote?: string;
  /** poslední den platnosti kódu (prosinec) – po něm se kód ukáže jako neplatný */
  codeUntil?: number;
  /** heslo pro stánek (místo slevového kódu) */
  password?: string;
  /** zvýrazněná odměna bez kódu (např. dárek k nákupu) */
  reward?: string;
  /** soubor ke stažení (PDF) */
  download?: { url: string; label: string };
  game?: Game;
  contest?: Contest;
  adult?: boolean;
  /** poznámka k potvrzení – zobrazí se jen v náhledu při CONTENT_MODE = 'draft' */
  confirm?: string;
}

export interface User {
  uid: string;
  email: string;
  name: string | null;
}

export interface Progress {
  /** den -> ISO čas otevření */
  opened: Record<number, string>;
  /** dny, ve kterých uživatel odeslal soutěžní odpověď */
  entries: number[];
  newsletter: boolean;
  /** uživatel už odpověděl na nabídku newsletteru (ano i ne) – znovu se neptáme */
  newsletterAsked?: boolean;
}
