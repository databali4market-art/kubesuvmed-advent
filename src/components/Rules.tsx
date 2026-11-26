/**
 * Pravidla soutěže adventního kalendáře: stránka /?pravidla
 * Údaje o pořadateli jsou v src/config.ts (OPERATOR).
 */
import { BASE } from '../content';
import { LEGAL, OPERATOR } from '../config';

export function Rules() {
  const o = OPERATOR;
  return (
    <main className="rules-page wrap">
      <article className="rules-card">
        <a href="./" className="rules-logo"><img src={BASE + 'media/foto/logo.webp'} alt="Kubešova medová manufaktura" /></a>
        <h1>Pravidla soutěže Medového adventu 2026</h1>

        <h2>1. Pořadatel</h2>
        <p>Pořadatelem soutěže je <b>{o.name}</b>, se sídlem {o.address}, IČ {o.ico} (zemědělský podnikatel, dále jen „pořadatel“), provozovatel značky Kubešova medová manufaktura. Kontakt: <a href={'mailto:' + o.email}>{o.email}</a>, {o.phone}.</p>

        <h2>2. Soutěž a doba konání</h2>
        <p><b>Soutěž o set Malé vánoční pohlazení</b> (okénko 8. prosince): zapojit se lze od 8. 12. 2026 0:00 do 13. 12. 2026 23:59. Výhra: dárkový set Malé vánoční pohlazení – tři lahve Kubešovy medoviny 0,75 l v hodnotě 883 Kč.</p>

        <h2>3. Kdo se může zapojit</h2>
        <p>Soutěžit může fyzická osoba starší 18 let s doručovací adresou v České republice. Výhra obsahuje alkohol, proto se osoby mladší 18 let zapojit nemohou. Ze soutěže jsou vyloučeni zaměstnanci pořadatele a jejich blízké osoby.</p>

        <h2>4. Jak se zapojit</h2>
        <p>Účastník se přihlásí do adventního kalendáře účtem Google a v okénku 8. prosince odešle odpověď na soutěžní otázku „Které tři medoviny najdete v sadě Malé vánoční pohlazení?“. Do soutěže se lze zapojit jen jednou; odpověď nelze měnit. Účast je zdarma a nepodmiňuje ji žádný nákup.</p>

        <h2>5. Určení výherce</h2>
        <p>V pondělí 14. 12. 2026 vylosujeme náhodně jednoho výherce ze všech správných odpovědí.</p>

        <h2>6. Oznámení a předání výhry</h2>
        <p>Výherce kontaktujeme e-mailem, který je spojený s jeho účtem Google, a požádáme ho o doručovací adresu. Výhru odešleme obratem, aby dorazila do Vánoc; při převzetí může přepravce ověřit věk. Pokud výherce do 3 dnů neodpoví, výhra propadá a pořadatel může stejným způsobem vylosovat náhradníka. Výhru nelze vyměnit za peníze. Křestní jméno a první písmeno příjmení výherce můžeme zveřejnit na webu a sociálních sítích pořadatele.</p>

        <h2>7. Osobní údaje</h2>
        <p>Pořadatel zpracovává e-mail, jméno z účtu Google a soutěžní odpověď za účelem provedení soutěže a předání výhry, u výherce také doručovací adresu. Údaje z kalendáře uchováváme do 31. 3. 2027, kontakty se souhlasem se zasíláním novinek do odvolání souhlasu. Více v <a href={LEGAL.privacy} target="_blank" rel="noreferrer">zásadách ochrany osobních údajů</a>.</p>

        <h2>8. Závěrečná ustanovení</h2>
        <p>Pořadatel si vyhrazuje právo pravidla změnit nebo soutěž zrušit či přerušit; změnu zveřejní na této stránce. Pořadatel může vyloučit účastníka, který jedná v rozporu s pravidly nebo dobrými mravy (např. zakládá více účtů). Na výhru není právní nárok. Soutěž není hazardní hrou podle zákona č. 186/2016 Sb.</p>

        <p className="muted">Platné od 1. 12. 2026.</p>
        <a href="./" className="btn primary">Zpět do kalendáře</a>
      </article>
    </main>
  );
}
