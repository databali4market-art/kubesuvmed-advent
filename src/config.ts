/**
 * Náhledový build pro GitHub Pages (VITE_NAHLED=1, viz deploy.yml): vše odemčené, bez přihlášení,
 * bez Firebase (data jen v prohlížeči) a se žlutými poznámkami „K potvrzení“.
 */
export const NAHLED_BUILD = import.meta.env.VITE_NAHLED === '1';

/**
 * NASTAVENÍ WEBU
 *
 * 1) Firebase – zkopírujte z Firebase Console → Project settings → Your apps → Web app.
 *    Tyto hodnoty nejsou tajné (jsou vidět v každém webu, který Firebase používá).
 *    Dokud je apiKey prázdný, web běží v UKÁZKOVÉM režimu (přihlášení jen e-mailem, data jen v prohlížeči).
 */
export const FIREBASE = {
  apiKey: 'AIzaSyD8D8mY-_tU6nFx6f5kyNb1kZYs1Ibhj_A',
  // Na ostré doméně běží přihlašovací stránka přes proxy na stejné doméně (functions/__/[[path]].js),
  // jinde (test na kubesuvmed-advent-91953.web.app, localhost) přímo na Firebase.
  authDomain: typeof location !== 'undefined' && location.hostname === 'advent.kubesuvmed.cz' ? 'advent.kubesuvmed.cz' : 'kubesuvmed-advent-91953.firebaseapp.com',
  projectId: 'kubesuvmed-advent-91953',
  storageBucket: 'kubesuvmed-advent-91953.firebasestorage.app',
  messagingSenderId: '180001847164',
  appId: '1:180001847164:web:0c5eb1239f3aba077116f9',
};

/**
 * 'draft' = v náhledu (?nahled=KLÍČ) se u okének ukazují poznámky „K potvrzení“ (pole confirm v content.ts).
 * Běžní návštěvníci je nevidí nikdy. Až budou všechny vyřešené, přepněte na 'live'.
 */
export const CONTENT_MODE: 'draft' | 'live' = 'draft';

/**
 * Klíč pro náhled všech okének před 1. prosincem: otevřete web s ?nahled=KLÍČ
 * (vypnutí: ?nahled=off). Kalendář je statický, takže nejde o zabezpečení – jen o pohodlné testování.
 */
export const PREVIEW_KEY = 'medovyadvent';

export const firebaseEnabled = () => !NAHLED_BUILD && !!FIREBASE.apiKey && !!FIREBASE.projectId;

/**
 * UKÁZKOVÁ VERZE PRO PREZENTACI
 * true = vše je odemčené a dá se proklikat bez přihlášení (postup se ukládá jen v prohlížeči).
 * Před ostrým spuštěním kampaně přepněte na false.
 */
export const DEMO_MODE = false || NAHLED_BUILD;

/**
 * Kdo smí na stránce /?admin stahovat e-maily a soutěžní odpovědi (Google účty, malými písmeny).
 * Stejný seznam MUSÍ být i ve firestore.rules (funkce isAdmin), jinak databáze data nevydá.
 */
export const ADMIN_EMAILS: string[] = [
  'databali4market@gmail.com',
];

/**
 * Znění souhlasu s newsletterem. Ukládá se ke každému kontaktu spolu s datem souhlasu (kvůli GDPR).
 * Když text změníte, zvyšte verzi – u kontaktu pak uvidíte, s jakým zněním souhlasil.
 */
/**
 * Právní stránky se neřeší tady – odkazujeme na hlavní web kubesuvmed.cz.
 * (Adresu ochrany osobních údajů ověřte v patičce e-shopu; ve Shoptetu bývá /podminky-ochrany-osobnich-udaju/.)
 */
export const LEGAL = {
  privacy: 'https://www.kubesuvmed.cz/podminky-ochrany-osobnich-udaju/',
  terms: 'https://www.kubesuvmed.cz/obchodni-podminky/',
};

/**
 * Provozovatel kalendáře, pořadatel soutěže a správce osobních údajů (pravidla /?pravidla, patička).
 * DOPLNIT před spuštěním – hodnoty v [hranatých závorkách] jsou zástupné. Kontakt je z kubesuvmed.cz.
 */
export const OPERATOR = {
  name: '[doplnit: název firmy / jméno podnikatele]',
  address: '[doplnit: sídlo]',
  ico: '[doplnit]',
  email: 'info@kubesuvmed.cz',
  phone: '+420 605 159 173',
};
export const RULES_URL = '?pravidla';

export const NEWSLETTER_CONSENT = {
  version: 'v1-2026-11',
  text: 'Chci dostávat e-mailem medové novinky a nabídky Kubešovy medové manufaktury. Souhlas mohu kdykoli odvolat.',
};
