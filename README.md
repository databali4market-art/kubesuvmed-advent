# Medový advent 2026 – Kubešova medová manufaktura

Statický web (Vite + React + TypeScript): 24 buněk medové plástve, které se odemykají každý den o půlnoci (Europe/Prague). Přihlášení jen přes **Google** (Firebase Authentication), data (otevřená okénka, soutěžní odpovědi, souhlas s newsletterem) ve **Firestore**. Web běží na **Firebase Hosting** (tarif Spark zdarma): ostrý na `advent.kubesuvmed.cz`, testovací na preview kanálu `test`. Obsah vychází z tabulky „Kubeš advent“. Postup nasazení je stejný jako u kalendáře Mobil Maják.

## Co kde je

| Soubor | Co obsahuje |
| --- | --- |
| `src/content.ts` | **obsah všech 24 okének** (texty, kódy, kvízy, soutěž, PDF, odkazy); `confirm` = co je ještě potřeba potvrdit |
| `src/config.ts` | Firebase, `DEMO_MODE`, `CONTENT_MODE`, `PREVIEW_KEY`, `ADMIN_EMAILS`, znění souhlasu `NEWSLETTER_CONSENT` |
| `src/components/Games.tsx` | kvíz (6. 12.) a typový kvíz „Jaký med je vám nejbližší“ (15. 12.) |
| `src/components/Admin.tsx` | stránka `/?admin` – stažení e-mailů (vč. stavu souhlasu) a soutěžních odpovědí do CSV |
| `src/components/Rules.tsx` | stránka `/?pravidla` – pravidla soutěže (pořadatel = `OPERATOR` v `src/config.ts`) |
| `public/pdf/` | PDF ke stažení: recept na perníčky (7.), jmenovky (10.), přání (19.) |
| `firestore.rules` | pravidla Firestore (soutěž ve dni 13, přístup správců) |
| `firebase.json`, `.firebaserc`, `.github/workflows/deploy.yml` | testovací hosting a automatické nasazení |
| `src/fonts.css` | písma (jen latinka + čeština) |
| `public/media/botanika/`, `public/media/vcelka.svg` | brandové vektorové kresby (SVG z `kubes_vektory.ai`) a včelka; včelka je i v `src/components/Decor.tsx` |

## Odměny v kalendáři

| Den | Odměna | Jak funguje na webu |
| --- | --- | --- |
| 2. | **ADVENT15** – 15 % nad 1 500 Kč | kód ke zkopírování, po 4. 12. se ukáže jako neplatný |
| 5. | **MIKULAS** – doprava zdarma do One Boxu nad 500 Kč | kód, platnost nastavena do 6. 12. |
| 6. | kvíz o zimování včel | okamžité vyhodnocení + vysvětlení |
| 7. | recept na perníčky | + PDF ke stažení |
| 8. | malá medovina zdarma nad 800 Kč | zvýrazněná odměna (18+) |
| 10. | jmenovky pod stromeček | PDF ke stažení |
| 11. | **ADVENT10** – 10 % nad 1 000 Kč | kód, po 13. 12. neplatný |
| 13. | **soutěž** o set Malé vánoční pohlazení (883 Kč) | odpověď + 18+ + pravidla, přijímá do 14. 12., losování 15. 12. |
| 15. | typový kvíz „Jaký med je vám nejbližší“ | 5 otázek → doporučený med s odkazem |
| 18. | heslo „Kubeš mi to dovolil!“ na trzích | heslo (18+, 1 na osobu) |
| 19. | vánoční přání | PDF ke stažení |

Kódy a hesla se uživateli ukládají i v sekci **Moje dárky**.

## Vývoj

```bash
npm install
npm run dev      # http://localhost:5173/
npm run build    # výstup v dist/
```

## Jak to celé funguje

- **Ostrý web**: Firebase Hosting, `https://advent.kubesuvmed.cz` (technicky i `https://kubesuvmed-advent-91953.web.app`). Nasazuje se jen z větve **`produkce`**.
- **Testovací web**: preview kanál Firebase `test` (`https://kubesuvmed-advent-91953--test-….web.app`, přesná adresa je v logu GitHub Actions). Nasazuje se po každém pushi do **`main`**.
- **Náhled bez přihlášení** na GitHub Pages (https://databali4market-art.github.io/kubesuvmed-advent/), také z `main` – vše odemčené, se žlutými poznámkami „K potvrzení“.
- Tarif **Spark (zdarma)**: hosting 360 MB přenosu denně. Při blížícím se limitu (Firebase → Hosting → Usage) přepnout projekt na Blaze – web se nevypne, platí se 0,15 $/GB navíc.
- **Přihlášení** jen přes Google. Bez přihlášení se okénka neotevřou (`DEMO_MODE = false`).
- **Data** ve Firestore: `users/{uid}` (e-mail, jméno, otevřená okénka, souhlas s newsletterem vč. data a znění), `entries` (soutěžní odpovědi).
- **E-maily** stahuje správce na `https://advent.kubesuvmed.cz/?admin` jako CSV (newsletter / všichni přihlášení / soutěžní odpovědi).

Stačí bezplatný tarif Firebase (Spark) – přihlášení a databáze mají vlastní, dostatečné limity. Projekt: `kubesuvmed-advent-91953`.

## Nastavení Firebase (jednorázově, cca 15 minut)

1. **Projekt** (hotovo: `kubesuvmed-advent-91953`) a **webová aplikace** (hotovo – konfigurace je v `src/config.ts`).
2. **Přihlášení**: Build → *Authentication* → Get started → *Google* → Enable → vyplnit e-mail podpory → Save.
   *Settings → Authorized domains*: přidat `advent.kubesuvmed.cz`.
   Na stránce souhlasu Googlu (Google Cloud Console → APIs & Services → OAuth consent screen / Branding) nastavit název „Kubešova medová manufaktura“, logo a odkaz na zásady ochrany osobních údajů.
3. **Databáze**: založí ji automaticky nasazení (krok „Založení databáze Firestore“, lokace `eur3`). Ručně: Build → *Firestore Database* → Create database → `eur3 (europe-west)` → *production mode*.
4. **Správci**: Google e-mail (malými písmeny) zapsat do `ADMIN_EMAILS` v `src/config.ts` **a** do funkce `isAdmin()` ve `firestore.rules`.
5. **Hosting** (testovací web): nic není potřeba – web nahraje nasazení z GitHubu. Průvodce *Get started* (včetně `npm install -g firebase-tools`) lze přeskočit. Vlastní doménu připojíte až před spuštěním (viz Ostrý web a doména).

## Nasazení (GitHub → Firebase)

Workflow `.github/workflows/deploy.yml` po každém pushi do `main` sestaví web a nasadí ho i s `firestore.rules` do projektu `kubesuvmed-advent-91953`. Potřebuje jedno nastavení v GitHubu (repo → Settings → Secrets and variables → Actions). Dokud chybí, nasazení se přeskočí.

1. **Secrets** → `FIREBASE_SERVICE_ACCOUNT` = JSON klíč: Firebase Console → Project settings → *Service accounts* → **Generate new private key** → obsah souboru vložit do secretu, soubor smazat.
2. Aby se nasazovala i pravidla databáze, potřebuje tento účet (`firebase-adminsdk-…@kubesuvmed-advent-91953.iam.gserviceaccount.com`) navíc roli **Service Usage Consumer**: [Google Cloud → IAM](https://console.cloud.google.com/iam-admin/iam?project=kubesuvmed-advent-91953) → u účtu tužka → *Add another role* → Service Usage Consumer → Save. Bez ní se nasadí jen web.
3. GitHub Pages slouží jen pro náhled ke kontrole (job `nahled`). Po spuštění kampaně ho lze z workflow odebrat a Pages vypnout.

Ruční nasazení z počítače: `npm run build && npx firebase-tools deploy --only hosting,firestore:rules --project kubesuvmed-advent-91953`.

## Ostrý web a doména

Postup práce (jako u Mobil Maják): změny → `main` → vyzkoušet na testovacím webu → sloučit `main` do `produkce` → ostrý web.

Jednorázové nastavení domény `advent.kubesuvmed.cz`:
1. Firebase → Hosting → *Add custom domain* → `advent.kubesuvmed.cz` → DNS záznamy, které Firebase ukáže, přidat u správce DNS (na Cloudflare: **DNS only / šedý mráček**, jinak se nevydá certifikát).
2. Firebase → Authentication → Settings → *Authorized domains* → přidat `advent.kubesuvmed.cz` (a doménu testovacího kanálu `kubesuvmed-advent-91953--test-….web.app`).
3. Google Cloud → APIs & Services → Credentials → OAuth klient „Web client (auto created by Google Service)“ → *Authorized redirect URIs* → přidat `https://advent.kubesuvmed.cz/__/auth/handler`.

`authDomain` se v `src/config.ts` přepíná podle domény: na `advent.kubesuvmed.cz` běží přihlašovací stránka přímo na doméně webu (spolehlivé v Safari / na iPhonu, a návštěvníci nikde neuvidí technický název projektu).

## Newsletter a e-maily

- Na `/?admin` se přihlaste Google účtem správce → **E-maily pro newsletter (CSV)** → importovat do nástroje na newsletter (Ecomail, Mailchimp, Shoptet…). CSV má středníky a UTF-8, v Excelu se otevře správně.
- Do newsletteru patří **jen** tento soubor – lidé, kteří zaškrtli souhlas. U každého je datum a znění souhlasu (kvůli GDPR). Znění je v `src/config.ts` (`NEWSLETTER_CONSENT`).
- Soubor „Všichni přihlášení“ slouží jen pro kalendář a kontakt s výhercem, ne pro marketing.
- Kdo souhlas v sekci *Moje dárky* odškrtne, v CSV pro newsletter už nebude (export dělejte až před rozesláním).
- Soutěž 13. 12.: „Soutěžní odpovědi (CSV)“ → vyfiltrovat správné odpovědi → vylosovat 15. 12.

## Před spuštěním (1. 12.)

Podrobný seznam otevřených bodů je v [DORESIT.md](DORESIT.md).

- [ ] Firebase nastavený (viz výše), vyzkoušené přihlášení přes Google a export na `/?admin`.
- [ ] Ve Shoptetu založit kódy **ADVENT15** (2.–4. 12., nad 1 500 Kč), **MIKULAS** (One Box, nad 500 Kč), **ADVENT10** (11.–13. 12., nad 1 000 Kč) a nastavit dárek k nákupu nad 800 Kč (8. 12.).
- [ ] Vyřešit všechny poznámky `confirm` v `src/content.ts` (vidíte je v náhledu jako žluté rámečky), pak `CONTENT_MODE = 'live'`.
- [ ] 15. 12.: nahradit pracovní otázky typového kvízu zněním z Google Docu.
- [ ] Nahradit provizorní PDF v `public/pdf/` grafikou (stejné názvy souborů).
- [ ] Ochrana osobních údajů, cookies a obchodní podmínky se neřeší tady – patička a přihlášení odkazují na kubesuvmed.cz (`LEGAL` v `src/config.ts`). Ověřit adresu.

> Web je statický, takže obsah budoucích okének (včetně kódů) je technicky součástí stránky. Kódy proto mají v Shoptetu platit jen ve svých dnech.

## Náhled před 1. prosincem

`?nahled=medovyadvent` odemkne všechna okénka (vypnutí `?nahled=off`). Náhledová otevření a soutěžní odpovědi se ukládají odděleně od ostrých a do exportu se nepočítají.

## Hudba

`public/audio/vanoce.mp3` je vlastní syntetizované aranžmá dvou volných děl – *Rolničky* (J. Pierpont, 1857) a *Tichá noc* (F. X. Gruber, 1818) – se zvonkohrou, celestou a rolničkami. Bez autorských práv třetích stran.
