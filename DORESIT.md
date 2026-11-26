# Co musíme dořešit před spuštěním (1. 12. 2026)

Stav k 20. 11. 2026. Hotové body odškrtněte (`[x]`), ať je jasné, co zbývá.
Poznámky k obsahu jsou i přímo v okénkách – v náhledu `?nahled=medovyadvent` jako žluté rámečky „K potvrzení“ (pole `confirm` v `src/content.ts`).

## Obsah – čekáme na podklady

- [ ] **15. 12. – typový kvíz „Jaký med je vám nejbližší“**: otázky a výsledky na webu jsou zatím pracovní. Potřebujeme znění z Google Docu (zkopírovat text sem do chatu – dokument se z prostředí nedá otevřít).
- [ ] **PDF (recept 7. 12., jmenovky 10. 12., přání 19. 12.)**: nová verze ve stylu webu – zkontrolovat vytištěné. Texty a vzhled se mění v `tools/pdf/build.py`, pak `python3 tools/pdf/build.py && node tools/pdf/render.cjs`.

## Fotky – čekáme na dodání (zpětná vazba z testování 24. 11.)

Pošlete je a vyměním je (do té doby jsou v okénkách ilustrace z brandových kreseb):
- [x] **Úvod (koláž nahoře)**: fotky místo současných – velká do oblouku (na výšku) a 2 menší do kroužků.
- [x] **7. 12. perníčky**: fotka upečených perníčků.
- [x] **8. 12. soutěž**: fotka zavřené krabice setu Malé vánoční pohlazení (aby se odpověď nedala opsat z fotky). Teď je tam jen pohár.
- [x] **17. 12. zázvor v pastovaném medu**: produktová fotka (ideálně na bílém nebo průhledném pozadí).
- [x] **Hlavní stránka – „Od včel až pod stromeček“**: včelaři (velká), plástev zblízka, úly s létajícími včelami – vše obdélníky (24. 11.).
- [x] **Hlavní stránka – „Darujte něco dobrého“**: fotky Rozkvetlá louka, Zimní set, Medové dobroty na stole, Degustační set (krabice) (24. 11.).
- [x] **1. 12.**: fotka přípitku z vánočních trhů (24. 11.).
- [x] Fotky do okének 3., 6.–9., 11.–13., 16.–18., 20.–24. (24. 11.) – teď mají fotku všechna okénka.

## Obsah – otázky k potvrzení

- [x] **Provozovatel / pořadatel soutěže / správce údajů** (doplněno 26. 11.: Jan Kubeš, IČO 64633934): doplnit název firmy (nebo jméno podnikatele), sídlo a IČO do `OPERATOR` v `src/config.ts`. Ukazuje se v pravidlech soutěže (`/?pravidla`) a v patičce. Bez toho kalendář nespouštět.

- [ ] **8. 12. – soutěž**: je odkaz „Nápověda v e-shopu“ na správný set (Malé vánoční pohlazení)? Údaje pořadatele doplněné.
- [ ] **14. 12. – frizzante**: přímý odkaz na produkt v e-shopu (teď vede na kategorii medovin).
- [ ] Ověřit adresu „Podmínky ochrany osobních údajů“ na kubesuvmed.cz (v patičce e-shopu) – kalendář na ni odkazuje z patičky i z přihlášení, teď `/podminky-ochrany-osobnich-udaju/` (`LEGAL` v `src/config.ts`). Ideálně do ní doplnit i adventní kalendář (přihlášení Googlem, soutěž, newsletter).

## Pravidla databáze – nutné vložit ručně

- [ ] **Soutěž se přesunula na 8. 12. → `firestore.rules` se změnila** (povolený den soutěže). Firebase konzole → Firestore Database → Rules → vložit celý obsah `firestore.rules` → Publish. Bez toho nepůjde odeslat soutěžní odpověď.

## Shoptet

- [ ] Založit kód **ADVENT15** – 15 % nad 1 500 Kč, platnost 2.–3. 12. (jen 2 dny)
- [ ] Založit kód **MIKULAS** – doprava zdarma jen pro Messenger, nad 1 000 Kč, zásilky do 10 kg, platnost 5.–7. 12.
- [ ] Založit kód **ADVENT10** – 10 % nad 1 000 Kč, platnost 13.–14. 12. (jen 2 dny)
- [ ] Nastavit dárek (malá medovina) k nákupu nad 1 000 Kč (do 10 kg) na 10.–13. 12. – automaticky, bez kódu

## Firebase a nasazení (projekt `kubesuvmed-advent-91953`)

Musí udělat majitel účtu (cca 5 minut), zbytek zařídí automatické nasazení:

- [ ] **Přihlášení Google:** Firebase Console → Build → Authentication → Get started → Google → Enable → e-mail podpory → Save.
- [ ] **Klíč pro GitHub:** Project settings → Service accounts → Generate new private key → obsah souboru vložit v GitHubu (repo → Settings → Secrets and variables → Actions → New repository secret) jako `FIREBASE_SERVICE_ACCOUNT`, soubor smazat.
- [ ] **Role:** Google Cloud → IAM → účet `firebase-adminsdk-…@kubesuvmed-advent-91953.iam.gserviceaccount.com` → přidat roli **Service Usage Consumer**.
- [x] Databáze Firestore založená, pravidla `firestore.rules` vložená ručně (23. 11.). **Při změně `firestore.rules` je vložte znovu ručně** (Firestore Database → Rules → Publish), nebo klíči přidejte roli **Firebase Rules Admin** a nasazení je nahraje samo.
- [ ] Authentication → Settings → Authorized domains → přidat testovací doménu `kubesuvmed-test.web.app`.
- [ ] Vyzkoušet na testovacím webu: přihlášení Google, otevření okénka, `/?admin` → stažení CSV.
- [ ] Napsat Claudovi → spustí nasazení: založí databázi Firestore (eur3), nahraje pravidla a testovací web (preview kanál `test`). Průvodce Hostingem ani `npm install -g firebase-tools` není potřeba.
- [ ] Google Cloud → OAuth consent screen / Branding: název „Kubešova medová manufaktura“, logo, odkaz na zásady (nepovinné, ale hezčí přihlašovací okno).
- [ ] Správci: další Google účty do `ADMIN_EMAILS` (`src/config.ts`) **i** do `isAdmin()` (`firestore.rules`).
- [ ] Po spuštění: odebrat náhled na GitHub Pages (job `nahled` v `.github/workflows/deploy.yml`) a Pages vypnout.
- [ ] Repo přepnout na soukromé (Settings → General → Change visibility), jako Mobil Maják – pak ale GitHub Pages na bezplatném účtu nepoběží.

## Ostrý web a doména (před spuštěním, postup v README)

- [ ] Firebase → Hosting → Add custom domain `advent.kubesuvmed.cz` + DNS záznamy u správce domény (na Cloudflare šedý mráček).
- [ ] Firebase → Authentication → Authorized domains: `advent.kubesuvmed.cz` a doména testovacího kanálu.
- [ ] Google Cloud → OAuth klient → redirect URI `https://advent.kubesuvmed.cz/__/auth/handler`.
- [ ] Založit větev `produkce` z hotového `main` (tím se nasadí ostrý web).

## Spuštění

- [ ] Vyzkoušet přihlášení přes Google na ostré doméně (i na iPhonu / v Safari).
- [ ] Vyzkoušet `/?admin` – stažení CSV pro newsletter, všech přihlášených a soutěžních odpovědí.
- [x] `CONTENT_MODE` přepnutý na `'live'` (26. 11.), náhled `?nahled=` je na advent.kubesuvmed.cz vypnutý.
- [ ] Mergnout do `main` → vyzkoušet na testovacím webu → sloučit `main` do `produkce` → nasadí se ostrý web.

## Během adventu

- [ ] Pondělí 14. 12.: export soutěžních odpovědí (`/?admin`), vylosovat výherce ze správných odpovědí, kontaktovat e-mailem, odeslat výhru.
- [ ] Před rozesláním newsletteru vždy stáhnout čerstvé CSV (lidé mohou souhlas odvolat).
