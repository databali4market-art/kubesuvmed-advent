/**
 * NASTAVENÍ WEBU
 *
 * 1) Firebase – zkopírujte z Firebase Console → Project settings → Your apps → Web app.
 *    Tyto hodnoty nejsou tajné (jsou vidět v každém webu, který Firebase používá).
 *    Dokud je apiKey prázdný, web běží v UKÁZKOVÉM režimu (přihlášení jen e-mailem, data jen v prohlížeči).
 */
export const FIREBASE = {
  apiKey: 'AIzaSyCX8rTyVYunrnZS7vMC58d2eqQTs3aiABk',
  // Na ostré doméně běží přihlašovací stránka přes proxy na stejné doméně (functions/__/[[path]].js),
  // jinde (test na kubesuvmed-advent.web.app, localhost) přímo na Firebase.
  authDomain: typeof location !== 'undefined' && location.hostname === 'advent.kubesuvmed.cz' ? 'advent.kubesuvmed.cz' : 'kubesuvmed-advent.firebaseapp.com',
  projectId: 'kubesuvmed-advent',
  storageBucket: 'kubesuvmed-advent.firebasestorage.app',
  messagingSenderId: '285914020856',
  appId: '1:285914020856:web:93073dad155c693f94f40d',
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

export const firebaseEnabled = () => !!FIREBASE.apiKey && !!FIREBASE.projectId;

/**
 * UKÁZKOVÁ VERZE PRO PREZENTACI
 * true = vše je odemčené a dá se proklikat bez přihlášení (postup se ukládá jen v prohlížeči).
 * Před ostrým spuštěním kampaně přepněte na false.
 */
export const DEMO_MODE = false;

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
export const NEWSLETTER_CONSENT = {
  version: 'v1-2026-11',
  text: 'Chci dostávat e-mailem medové novinky a nabídky Kubešovy medové manufaktury. Souhlas mohu kdykoli odvolat.',
};
