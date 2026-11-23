# Co musíme dořešit před spuštěním (1. 12. 2026)

Stav k 20. 11. 2026. Hotové body odškrtněte (`[x]`), ať je jasné, co zbývá.
Poznámky k obsahu jsou i přímo v okénkách – v náhledu `?nahled=medovyadvent` jako žluté rámečky „K potvrzení“ (pole `confirm` v `src/content.ts`).

## Obsah – čekáme na podklady

- [ ] **15. 12. – typový kvíz „Jaký med je vám nejbližší“**: otázky a výsledky na webu jsou zatím pracovní. Potřebujeme znění z Google Docu (zkopírovat text sem do chatu – dokument se z prostředí nedá otevřít).
- [ ] **10. 12. – jmenovky (PDF)**: nahradit provizorní soubor grafikou → `public/pdf/medove-jmenovky.pdf`.
- [ ] **19. 12. – vánoční přání (PDF)**: nahradit grafikou → `public/pdf/vanocni-prani.pdf`.
- [ ] **7. 12. – recept na perníčky (PDF)**: provizorní verze funguje, případně nahradit grafikou → `public/pdf/medove-pernicky-recept.pdf`.

## Obsah – otázky k potvrzení

- [ ] **5. 12. – MIKULAS**: do kdy kód platí? Na webu je nastaveno do neděle 6. 12. (`codeUntil` v `src/content.ts`).
- [ ] **8. 12. – malá medovina zdarma nad 800 Kč**: jak se dárek uplatní (automaticky v Shoptetu / kódem / poznámkou k objednávce) a jak dlouho platí?
- [ ] **13. 12. – soutěž**: je odkaz „Nápověda v e-shopu“ na správný set (Malé vánoční pohlazení)? Doplnit do pravidel IČO a adresu pořadatele.
- [ ] **14. 12. – frizzante**: přímý odkaz na produkt v e-shopu (teď vede na kategorii medovin).
- [ ] **18. 12. – heslo na trzích**: kde a kdy je stánek (trhy, adresa, dny/hodiny) a do kdy heslo platí.
- [ ] Ověřit adresu „Podmínky ochrany osobních údajů“ na kubesuvmed.cz (v patičce e-shopu) – kalendář na ni odkazuje z patičky i z přihlášení, teď `/podminky-ochrany-osobnich-udaju/` (`LEGAL` v `src/config.ts`). Ideálně do ní doplnit i adventní kalendář (přihlášení Googlem, soutěž, newsletter).

## Shoptet

- [ ] Založit kód **ADVENT15** – 15 % nad 1 500 Kč, platnost 2.–4. 12.
- [ ] Založit kód **MIKULAS** – doprava zdarma jen pro One Box, nad 500 Kč (platnost viz výše).
- [ ] Založit kód **ADVENT10** – 10 % nad 1 000 Kč, platnost 11.–13. 12.
- [ ] Nastavit dárek (malá medovina) k nákupu nad 800 Kč na 8. 12.

## Firebase a nasazení (postup v README)

- [ ] Authentication → zapnout **Google**, vyplnit e-mail podpory.
- [ ] Authentication → Authorized domains → přidat `advent.kubesuvmed.cz`.
- [ ] Google Cloud → OAuth consent screen / Branding: název „Kubešova medová manufaktura“, logo, odkaz na zásady.
- [ ] Firestore Database → vytvořit (`eur3`, production mode).
- [ ] Hosting → Get started (testovací web `kubesuvmed-advent.web.app`, bez vlastní domény).
- [ ] GitHub → Secrets → `FIREBASE_SERVICE_ACCOUNT` (JSON klíč servisního účtu).
- [ ] Google Cloud IAM → servisnímu účtu přidat roli **Service Usage Consumer** (kvůli nasazení `firestore.rules`).
- [ ] Správci: doplnit další Google účty do `ADMIN_EMAILS` (`src/config.ts`) **i** do `isAdmin()` (`firestore.rules`), pokud mají exporty stahovat i další lidé.
- [ ] Po spuštění: odebrat náhled na GitHub Pages (job `nahled` v `.github/workflows/deploy.yml`) a Pages vypnout.
- [ ] Repo přepnout na soukromé (Settings → General → Change visibility), jako Mobil Maják – pak ale GitHub Pages na bezplatném účtu nepoběží.

## Cloudflare Pages – ostrý web (až na konci, postup v README)

- [ ] Cloudflare → Pages → Connect to Git → repo `kubesuvmed-advent`, production branch `produkce`, build `npm run build`, output `dist`, `NODE_VERSION=22`.
- [ ] Preview deployments → None.
- [ ] Custom domain `advent.kubesuvmed.cz` + CNAME u správce DNS.
- [ ] Google Cloud → OAuth klient → redirect URI `https://advent.kubesuvmed.cz/__/auth/handler`.
- [ ] Založit větev `produkce` z hotového `main`.

## Spuštění

- [ ] Vyzkoušet přihlášení přes Google na ostré doméně (i na iPhonu / v Safari).
- [ ] Vyzkoušet `/?admin` – stažení CSV pro newsletter, všech přihlášených a soutěžních odpovědí.
- [ ] Po vyřešení všech bodů výše přepnout `CONTENT_MODE` na `'live'` v `src/config.ts`.
- [ ] Mergnout do `main` → vyzkoušet na `kubesuvmed-advent.web.app` → sloučit `main` do `produkce` → Cloudflare nasadí ostrý web.

## Během adventu

- [ ] 15. 12.: export soutěžních odpovědí (`/?admin`), vylosovat výherce ze správných odpovědí, kontaktovat e-mailem, odeslat výhru.
- [ ] Před rozesláním newsletteru vždy stáhnout čerstvé CSV (lidé mohou souhlas odvolat).
