import type { Door } from './types';

/**
 * OBSAH KALENDÁŘE – všech 24 okének (podle tabulky „Kubeš advent“).
 * Okénko se odemyká o půlnoci českého času (Europe/Prague).
 *
 * Než kalendář pustíte ven:
 *  - slevové kódy (code) založte v Shoptetu se stejným kódem a platností (codeUntil = poslední den),
 *  - vyřešte poznámky `confirm` (v náhledu ?nahled=… se ukazují, dokud je CONTENT_MODE = 'draft'),
 *  - PDF v public/pdf/ generuje tools/pdf (python3 tools/pdf/build.py && node tools/pdf/render.cjs).
 */
export const YEAR = 2026;

export const BASE = import.meta.env.BASE_URL;
const F = BASE + 'media/foto/';
const A = BASE + 'media/';
const PDF = BASE + 'pdf/';
const SHOP = 'https://www.kubesuvmed.cz/';

/** Dny se soutěží (musí sedět s firestore.rules). */
export const CONTEST_DAYS = [8];

const DOORS: Door[] = [
  {
    day: 1, type: 'tip', title: 'Vítejte v medovém adventu',
    text: 'Na chvíli se zastavte. Uvařte si oblíbený čaj, přidejte lžičku medu a nechte se vést. První prosincový den patří malým radostem.',
    image: F + 'pripitek.webp',
    more: 'Až do Štědrého dne tu na vás každý den čeká nové okénko. Všechno, co otevřete, se ukládá k vašemu účtu – recepty, tipy i dárky najdete kdykoli v sekci „Moje dárky“. Další okénko se odemyká vždy o půlnoci.',
  },
  {
    day: 2, type: 'discount', title: '15 % na nákup nad 1 500 Kč',
    text: 'Vánoce jsou časem obdarovávání, a tak jsme si dnes připravili malý dárek i pro vás.',
    image: F + 'efa3348.webp',
    more: 'Ať už vybíráte medové dobroty pod stromeček pro své blízké, nebo si chcete doplnit vlastní zásoby na zimu, máme pro vás slevu 15 % na nákup nad 1 500 Kč.\n\nS jeho využitím ale příliš neotálejte. Za dva dny naše adventní nadílka zase zmizí.\n\nUdělejte si radost a užijte si Vánoce hezky po medovém.',
    code: 'ADVENT15', codeNote: 'Sleva 15 % na nákup nad 1 500 Kč. Platí jen 2 dny – do 3. prosince.', codeUntil: 3,
    url: SHOP, urlLabel: 'Nakoupit v e-shopu',
  },
  {
    day: 3, type: 'recipe', title: 'Pečená hruška s medem a skořicí',
    text: 'Jednoduchý dezert, který provoní celý domov dřív, než stihnete prostřít.',
    image: F + 'den-03.webp',
    download: { url: PDF + 'pecena-hruska-recept.pdf', label: 'Stáhnout recept v PDF' },
    more: 'Na 2 porce: 2 hrušky, 2 lžičky medu, hrst vlašských ořechů, špetka skořice, kousek másla.\n\nHrušky rozpulte a zbavte jádřinců. Vložte do pekáčku, na každou půlku dejte kousek másla a pečte asi 20 minut při 180 °C. Ještě teplé zakápněte medem, posypte ořechy a skořicí. Podávejte s bílým jogurtem.',
  },
  {
    day: 4, type: 'gift', title: 'Dárek, který zahřeje',
    text: 'Pro dlouhé zimní večery vyberte medovinu z rodinné manufaktury. Třeba ovocnou s aronií – sametovou, tmavou a jemně trpkou.',
    image: A + 'medovina-aronie-cut.webp', product: true, adult: true,
    more: 'Na medovinu s aronií používáme plody černé aronie i s rozdrcenými slupkami a šťávou – kvasí spolu s medem a vodou. Výsledkem je tmavě rudá, plná medovina s vůní aronie a ibišku.\n\nPro koho? Pro milovníky červeného vína a výraznějších chutí, kterým sladké medoviny nic neříkají. Skvěle se hodí k sýrům, pečeni i ke chvíli u krbu – a vyzkoušejte ji i lehce zahřátou.',
    confirm: 'Popis podle e-shopu a blogu – zkontrolovat.',
    url: SHOP + 'medovina-aronie-0-75-l/', urlLabel: 'Medovina s aronií',
  },
  {
    day: 5, type: 'discount', title: 'Mikulášská doprava zdarma',
    text: 'Byli jste letos hodní? Ale co, my to na vás žalovat nebudeme!',
    image: F + 'efa3336.webp',
    more: 'Do dnešního adventního okénka jsme vám nadělili dopravu zdarma. Udělejte radost sobě nebo svým blízkým a naplňte košík medovými dobrotami za více než 1 000 Kč. O dopravu se tentokrát postaráme my 🍯\n\nStačí při objednávce zvolit doručení přes Messenger (zásilky do 10 kg) a zadat slevový kód.\n\nKrásného Mikuláše vám přejí Kubešovi',
    code: 'MIKULAS', codeNote: 'Doprava zdarma přes Messenger při nákupu nad 1 000 Kč (zásilka do 10 kg). Platí do pondělí 7. prosince. Ostatní způsoby dopravy zůstávají placené.', codeUntil: 7,
    url: SHOP, urlLabel: 'Nakoupit v e-shopu',
  },
  {
    day: 6, type: 'quiz', title: 'Včelí hádanka',
    text: 'Zatímco my si v zimě užíváme teplo domova, naše včelky mají vlastní způsob, jak přečkat chladné měsíce. V úlu rozhodně nejsou samy a ani v zimě nemají úplně volno.',
    image: F + 'farma-plastev.webp',
    game: {
      kind: 'quiz',
      questions: [{
        q: 'Kolik včel obvykle přezimuje v jednom úlu?',
        options: ['500–1 000 včel', '10 000–20 000 včel', '60 000–80 000 včel'],
        answer: 1,
        right: 'Výborně, trefili jste se!',
        wrong: 'Tentokrát vedle!',
        explain: 'V jednom úlu obvykle přezimuje kolem 10 až 20 tisíc včel. V létě jich přitom může být až 60 tisíc.\n\nVěděli jste, že včely přes zimu nespí? Semknou se do takzvaného zimního chomáče a činností svalů vytvářejí teplo. Společně tak chrání svou královnu a dokážou přečkat i mrazivé dny.\n\nPříroda to má zkrátka důmyslně vymyšlené.',
      }],
    },
  },
  {
    day: 7, type: 'recipe', title: 'Voňavé medové perníčky',
    text: 'Dnešní dárek od nás? Recept na ty nejlepší medové perníčky – i s PDF ke stažení, ať ho máte po ruce v kuchyni.',
    image: F + 'den-07.webp',
    more: 'Med, skořice, hřebíček a vůně čerstvě upečených perníčků. Bez toho si snad ani neumíme představit pravý advent. Dnes jsme si pro vás připravili náš osvědčený recept na domácí medové perníčky. Vytáhněte vykrajovátka, přizvěte malé i velké pomocníky a užijte si společně trochu toho vánočního pečení.\n\nCo budete potřebovat\n• 400 g hladké mouky\n• 100 g tekutého medu\n• 100 g moučkového cukru\n• 100 g vlahého rozpuštěného másla\n• 2 vejce\n• 2 lžičky perníkového koření\n• 1 lžička jedlé sody\n• 1 lžička kakaa (volitelně)\n\nJak na to\n1. Mouku a cukr prosejte, přidejte koření, sodu a případně kakao. Vmíchejte vejce, máslo a med a vypracujte hladké těsto.\n2. Těsto zakryjte a nechte v lednici odležet alespoň 6 hodin, nejlépe do druhého dne.\n3. Nechte těsto trochu povolit, rozválejte na plát silný asi 5 mm a vykrajujte oblíbené tvary.\n4. Perníčky rozložte na plech s pečicím papírem a pečte při 160 °C přibližně 8 minut. Délku přizpůsobte velikosti tvarů. Po vychladnutí je ozdobte podle chuti.\n\nMedový tip: Pokud je med zkrystalizovaný, nechte jej před pečením šetrně ztekutit ve vodní lázni.\n\nAť vám doma krásně voní!',
    download: { url: PDF + 'medove-pernicky-recept.pdf', label: 'Stáhnout recept v PDF' },
  },
  {
    day: 10, type: 'discount', title: 'Malá medovina zdarma',
    text: 'K adventu patří malá překvapení a my jsme si pro vás dnes jedno takové připravili.',
    image: F + 'den-10.webp', adult: true,
    reward: 'Malá medovina zdarma k nákupu nad 1 000 Kč – do neděle 13. prosince',
    more: 'K nákupu nad 1 000 Kč (zásilka do 10 kg) vám do neděle 13. prosince přibalíme malou Kubešovu medovinu jako dárek – bez kódu, automaticky. Třeba díky ní objevíte chuť, kterou jste od nás ještě neměli možnost ochutnat, nebo uděláte radost někomu ze svých blízkých.\n\nZkrátka malá pozornost od nás, aby byly vaše Vánoce ještě o něco medovější.\n\nNa zdraví a krásný advent vám přejí Kubešovi!\n\nNabídka je určena osobám starším 18 let.',
    url: SHOP, urlLabel: 'Nakoupit v e-shopu',
  },
  {
    day: 9, type: 'gift', title: 'Pohlazení pod stromeček',
    text: 'Zimní set medovin je pozvánkou ke společnému ochutnávání. Dárek pro dospělé milovníky medových chutí.',
    image: F + 'den-09.webp', adult: true,
    more: 'Tři lahve, tři různé chutě – od jemné po výrazně kořenitou. Set je ideální pro toho, kdo medovinu teprve objevuje, i pro páry a přátele, kteří rádi ochutnávají spolu a porovnávají, co komu chutná nejvíc.\n\nPro koho? Pro kolegy, rodiče i tchána, o kterém nevíte, jakou chuť má nejradši – v setu si vybere každý. Dárek je už hezky zabalený, stačí ho jen dát pod stromeček.',
    url: SHOP + 'set-medovin-3x-0-75-l:kubesuv-med-e-shop/', urlLabel: 'Set medovin v e-shopu',
  },
  {
    day: 11, type: 'download', title: 'Medové jmenovky pod stromeček',
    text: 'Dárky jsou nachystané, mašle uvázané… a teď ještě ta poslední tečka v podobě jmenovky.',
    image: A + 'nahledy/jmenovky.webp', product: true,
    more: 'Dnes pro vás máme malý dárek od nás. Připravili jsme vánoční jmenovky s ilustracemi včelek, které si můžete stáhnout, vytisknout a přivázat k dárkům pro své blízké.\n\nStačí je jen doplnit o jméno a o něco osobnější štědrovečerní radost je postaráno.\n\nAť jsou vaše dárky letos hezky po medovém.',
    download: { url: PDF + 'medove-jmenovky.pdf', label: 'Stáhnout jmenovky (PDF)' },
  },
  {
    day: 13, type: 'discount', title: '10 % na nákup nad 1 000 Kč',
    text: 'Ještě nemáte všechny dárky pod stromeček? Teď je poslední šance objednat tak, aby dorazily do Vánoc!',
    image: F + 'den-13.webp',
    more: 'Na dva dny jsme si pro vás připravili slevu 10 % na nákup nad 1 000 Kč. Potěšte své blízké poctivým medem, medovinou nebo některým z našich dárkových balení.\n\nJe to poslední šance objednat tak, aby vaše medové dárky stihly dorazit pod stromeček – s objednávkou proto neotálejte.\n\nKrásné a pohodové předvánoční dny vám přejí Kubešovi.',
    code: 'ADVENT10', codeNote: 'Sleva 10 % na nákup nad 1 000 Kč. Platí jen 2 dny – do 14. prosince.', codeUntil: 14,
    url: SHOP, urlLabel: 'Nakoupit v e-shopu',
  },
  {
    day: 12, type: 'recipe', title: 'Medovo-hořčičný dresink',
    text: 'Med nemusí končit jen v čaji, na chlebu nebo ve vánočním cukroví. Skvěle si rozumí i se slanými chutěmi.',
    image: F + 'den-12.webp',
    download: { url: PDF + 'medovo-horcicny-dresink-recept.pdf', label: 'Stáhnout recept v PDF' },
    more: 'Co budete potřebovat\n• 1 lžíci Kubešova medu\n• 1 lžíci dijonské hořčice\n• 3 lžíce olivového oleje\n• 1 lžíci citronové šťávy\n• špetku soli a čerstvě mletého pepře\n\nVšechny ingredience důkladně promíchejte, dokud se nespojí v hladký dresink. A je hotovo!\n\nSkvěle se hodí do zeleninových salátů, k pečené zelenině nebo ke grilovanému masu. Pro jeho přípravu doporučujeme náš jemný akátový med, který svou chutí nepřebije ostatní suroviny.\n\nDobrou chuť vám přejí Kubešovi',
  },
  {
    day: 8, type: 'contest', title: 'Soutěž o set Malé vánoční pohlazení',
    text: 'Dnes jsme do naší adventní plástve schovali pořádnou medovinovou nadílku!',
    image: F + 'den-08.webp', adult: true,
    more: 'Zasoutěžte si o dárkový set Malé vánoční pohlazení, ve kterém najdete tři lahve Kubešovy medoviny o objemu 0,75 l v celkové hodnotě 883 Kč.\n\nStačí správně odpovědět na naši soutěžní otázku. A pokud si s odpovědí nebudete jistí, malou nápovědu najdete na našem e-shopu.\n\nV pondělí 14. prosince vylosujeme jednoho šťastlivce a výhru obratem odešleme, aby měla dostatek času dorazit pod stromeček.\n\nDržíme vám palce!',
    contest: {
      question: 'Které tři medoviny najdete v sadě Malé vánoční pohlazení?',
      prize: 'Set Malé vánoční pohlazení (3 × 0,75 l, hodnota 883 Kč)',
      rules: 'Zapojit se lze do neděle 13. 12. 2026 23:59, jen jednou, od 18 let a s doručovací adresou v ČR. Ze správných odpovědí vylosujeme v pondělí 14. 12. jednoho výherce, napíšeme mu e-mailem a výhru hned odešleme.',
      until: 13,
      placeholder: 'Např. medovina…, medovina…, medovina…',
      adult: true,
    },
    url: SHOP + 'set-medovin-3x-0-75-l:kubesuv-med-e-shop/', urlLabel: 'Nápověda v e-shopu',
    confirm: 'Je odkaz „Nápověda“ na správný set (Malé vánoční pohlazení)? Doplnit údaje pořadatele (OPERATOR v src/config.ts) – ukazují se v pravidlech /?pravidla.',
  },
  {
    day: 14, type: 'gift', title: 'Přípitek na společné chvíle',
    text: 'Svěží frizzante pro slavnostní okamžik. Malé bublinky, velká radost ze setkání.',
    image: A + 'frizzante-cut.webp', product: true, adult: true,
    more: 'Frizzante je lehce perlivá medovina – nepřeslazená, svěží a s jemnými bublinkami. Přírodní varianta má květinové tóny doplněné limetkou a maracujou, k dostání je i verze s černým rybízem.\n\nPro koho? Pro všechny, kdo místo sektu rádi zkusí něco jiného: na silvestrovský přípitek, ke slavnostní večeři nebo jako dárek pro kamarádku, která má ráda svěží chutě. Podávejte dobře vychlazené.',
    url: SHOP + 'medovina/', urlLabel: 'Medoviny v e-shopu',
    confirm: 'Doplnit přímý odkaz na frizzante v e-shopu. Popis podle e-shopu – zkontrolovat.',
  },
  {
    day: 15, type: 'quiz', title: 'Jaký med je vám nejbližší?',
    text: 'Každý med má svůj osobitý charakter. Některý je jemný, jiný výrazný, další zase krásně voňavý. A stejně je to i s námi lidmi.',
    image: A + 'med-pastovany-cut.webp', product: true,
    more: 'Zajímá vás, který z našich medů by vám mohl být nejbližší? Stačí odpovědět na pět otázek a my vám prozradíme, jaký med se k vám nejvíce hodí.\n\nTak schválně, trefíme se vám do chuti?',
    game: {
      kind: 'persona',
      questions: [
        { q: 'Jak nejraději trávíte zimní večer?', options: [
          { t: 'S knihou a šálkem čaje', r: 'akat' },
          { t: 'U stolu s přáteli a dobrým jídlem', r: 'lipa' },
          { t: 'Pečením a mlsáním v kuchyni', r: 'pastovany' },
          { t: 'Venku na procházce v mrazu', r: 'zazvor' },
        ] },
        { q: 'Jakou snídani si vyberete?', options: [
          { t: 'Jogurt s ovocem', r: 'akat' },
          { t: 'Čerstvé pečivo s máslem', r: 'lipa' },
          { t: 'Lívance nebo vánočku', r: 'pastovany' },
          { t: 'Ovesnou kaši s kořením', r: 'zazvor' },
        ] },
        { q: 'Která vůně vás nejvíc přenese do Vánoc?', options: [
          { t: 'Jemná vanilka', r: 'akat' },
          { t: 'Rozkvetlé léto a bylinky', r: 'lipa' },
          { t: 'Čerstvě upečené cukroví', r: 'pastovany' },
          { t: 'Skořice, hřebíček a zázvor', r: 'zazvor' },
        ] },
        { q: 'Jak byste popsali svou povahu?', options: [
          { t: 'Klidná a vyrovnaná', r: 'akat' },
          { t: 'Výrazná a upřímná', r: 'lipa' },
          { t: 'Hravá a laskavá', r: 'pastovany' },
          { t: 'Energická a odvážná', r: 'zazvor' },
        ] },
        { q: 'Jaký dárek by vás potěšil nejvíc?', options: [
          { t: 'Klidný den jen pro sebe', r: 'akat' },
          { t: 'Výlet do přírody', r: 'lipa' },
          { t: 'Něco domácího, vyrobeného s láskou', r: 'pastovany' },
          { t: 'Nový zážitek, který jsem ještě nezkusil(a)', r: 'zazvor' },
        ] },
      ],
      results: {
        akat: { title: 'Jemný akátový med', text: 'Jste klidní, vyrovnaní a máte rádi jednoduchou krásu. Akátový med je světlý, jemný a dlouho zůstává tekutý – skvělý do čaje i do kuchyně.', product: { label: 'Medy v e-shopu', url: SHOP + 'med/' } },
        lipa: { title: 'Voňavý lipový med', text: 'Jste výrazní a upřímní, máte rádi poctivé chutě. Lipový med patří k nejaromatičtějším – připomene vám rozkvetlé léto i uprostřed zimy.', product: { label: 'Lipový med', url: SHOP + 'lipovy-med:kubesuv-med-e-shop/' } },
        pastovany: { title: 'Krémový pastovaný med', text: 'Jste hraví a laskaví a rádi děláte radost druhým. Pastovaný med je jemně krémový, snadno se roztírá a nekape – ideální k pomalým snídaním.', product: { label: 'Medy v e-shopu', url: SHOP + 'med/' } },
        zazvor: { title: 'Zázvor v pastovaném medu', text: 'Jste energičtí a nebojíte se nových chutí. Zázvor v medu vás nejdřív pohladí sladkostí a pak příjemně zahřeje.', product: { label: 'Zázvor v pastovaném medu', url: SHOP + 'zazvor-v-pastovanem-medu/' } },
      },
    },
    note: 'Kvíz je jen pro zábavu – vaše odpovědi nikam neukládáme.',
  },
  {
    day: 16, type: 'recipe', title: 'Horká medovina s pomerančem',
    text: 'Venku mrzne, doma voní jehličí a vánoční cukroví. Co si takhle zpříjemnit adventní večer voňavou horkou medovinou?',
    image: F + 'den-16.webp', adult: true,
    download: { url: PDF + 'horka-medovina-recept.pdf', label: 'Stáhnout recept v PDF' },
    more: 'Připravili jsme pro vás jednoduchý recept, díky kterému si kousek atmosféry vánočních trhů přenesete i k sobě domů.\n\nCo budete potřebovat na 2 porce\n• 300 ml Kubešovy Klasické bylinné medoviny\n• 2 plátky pomeranče\n• 1 svitek skořice\n• 2 hřebíčky\n• 1 hvězdičku badyánu\n\nMedovinu nalijte do kastrůlku, přidejte pomeranč a koření a pomalu zahřívejte. Dejte pozor, aby se nezačala vařit. Nechte několik minut rozvinout vůni koření a poté nalijte do oblíbených hrnečků.\n\nA teď už jen najít pohodlné místo, pustit si oblíbené koledy a vychutnat si malou adventní chvilku.\n\nNa zdraví vám přejí Kubešovi!',
    url: SHOP + 'medovina/', urlLabel: 'Medoviny v e-shopu',
  },
  {
    day: 17, type: 'gift', title: 'Zázvor v pastovaném medu',
    text: 'Když se venku ochladí, přichází čas na jednu z našich oblíbených medových dobrot – zázvor v pastovaném medu.',
    image: F + 'den-17.webp',
    more: 'Nejdřív vás pohladí jemná medová sladkost a vzápětí se o slovo přihlásí zázvor se svou typickou štiplavostí. A co se za touhle dobrotou skrývá? Jen dvě suroviny – květový med a jemně mletý zázvor.\n\nSkvěle chutná v čaji, na snídaňové kaši, ale i jen tak na lžičce.\n\nMalý tip od Kubešů: Přidejte lžičku zázvorového medu do teplé vody s citronem. Jednoduchá, voňavá dobrota jako stvořená pro chladné adventní dny.\n\nPro koho? Pro milovníky čaje, otužilce, sportovce i všechny, kdo v zimě rádi zahřejí. Jako malá pozornost se skvěle hodí i k většímu dárku.',
    url: SHOP + 'zazvor-v-pastovanem-medu/', urlLabel: 'Zázvor v medu v e-shopu',
  },
  {
    day: 18, type: 'discount', title: 'Horká medovina za heslo',
    text: 'Dnešní adventní překvapení vás zavede přímo na olomoucké vánoční trhy!',
    codeNote: 'Platí do 20. prosince, každý ho může použít jen jednou. Jen pro osoby starší 18 let.',
    image: F + 'den-18.webp', adult: true,
    password: 'Kubeš mi to dovolil!',
    more: 'Až půjdete kolem našeho stánku na olomouckých vánočních trzích, zastavte se u nás a řekněte obsluze tajné heslo. Za odměnu vám nalijeme malou horkou Kubešovu medovinu (2 dcl) úplně zdarma. Žádný háček, žádný nákup, jen malé adventní potěšení od nás.\n\nTak si heslo dobře zapamatujte a přijďte si s námi užít trochu té vánoční atmosféry.\n\nTěšíme se na vás u stánku!\n\nHeslo platí do 20. prosince a každý ho může použít jen jednou – jedna medovina na osobu. Jen pro osoby starší 18 let.',
  },
  {
    day: 19, type: 'download', title: 'Vánoční přání od srdce',
    text: 'Pár milých slov někdy potěší víc než ten největší dárek.',
    image: A + 'nahledy/prani.webp', product: true,
    more: 'A protože k Vánocům patří i chvíle, kdy si vzpomeneme na své blízké, připravili jsme pro vás malou kolekci vánočních přání s medovým nádechem.\n\nStačí si vybrat to, které se vám líbí nejvíce, stáhnout ho, vytisknout a připsat pár vlastních slov. Komu letos uděláte radost, už necháme na vás.\n\nAť se dobrá přání rozletí do světa stejně jako naše včelky.',
    download: { url: PDF + 'vanocni-prani.pdf', label: 'Stáhnout přání (PDF)' },
  },
  {
    day: 20, type: 'tip', title: 'Medová rada',
    text: 'Sáhnete po sklenici medu, ale místo tekuté dobroty vás čeká pořádně ztuhlý obsah? Žádné obavy!',
    image: F + 'den-20.webp',
    more: 'Krystalizace je přirozenou vlastností medu a rozhodně neznamená, že je med nekvalitní nebo že do něj někdo přidal cukr.\n\nVěděli jste, že každý druh medu krystalizuje jinak rychle? Nebo že i způsob skladování může jeho krystalizaci ovlivnit?\n\nNa našem blogu vám prozradíme, jak med správně skladovat, proč vlastně tuhne a jak mu šetrně vrátit tekutou konzistenci.\n\nProtože i o med je potřeba umět správně pečovat.',
    url: SHOP + 'blog/jak-setrne-ztekutit-zkrystalizovany-med/', urlLabel: 'Přečíst na blogu',
  },
  {
    day: 21, type: 'story', title: 'Pošlete dobro dál',
    text: 'Dnes pro vás nemáme slevu ani recept, ale jednu malou adventní výzvu.',
    image: F + 'farma-ule.webp',
    more: 'Zkuste dnes udělat někomu radost. Zavolejte někomu, koho jste dlouho neslyšeli, pozvěte souseda na čaj, podělte se o domácí cukroví nebo někomu jen tak věnujte pár milých slov.\n\nNemusí jít o velká gesta. I včelky nás učí, že z mnoha drobných činů může vzniknout něco krásného.\n\nPojďme si společně osladit nejen Vánoce, ale i svět kolem nás.',
  },
  {
    day: 22, type: 'gift', title: 'Lipový med – vzpomínka na léto',
    text: 'Vlahá letní rána, rozkvetlé lípy a bzukot pilných včel. I uprostřed prosince si můžeme tuhle krásnou atmosféru připomenout díky našemu lipovému medu.',
    image: F + 'den-22.webp', product: true,
    more: 'Patří mezi nejaromatičtější druhové medy a jeho nezaměnitelná vůně potěší především milovníky výraznějších medových chutí.\n\nSkvěle se hodí do čaje, na čerstvé pečivo s máslem nebo k přípravě domácích vánočních dobrot.\n\nMalý tip od Kubešů: Med přidávejte až do mírně vychladlého čaje, abyste co nejlépe zachovali jeho přirozené vlastnosti.\n\nDopřejte si uprostřed zimy malou vzpomínku na rozkvetlé léto.\n\nPro koho? Lipový med se tradičně podává při nachlazení, a tak potěší babičky a dědečky, ale i každého, kdo má rád poctivé, výrazné chutě.',
    url: SHOP + 'lipovy-med:kubesuv-med-e-shop/', urlLabel: 'Lipový med v e-shopu',
  },
  {
    day: 23, type: 'recipe', title: 'Pečené ořechy v medu a skořici',
    text: 'Med, skořice a křupavé oříšky. Někdy stačí jen pár surovin, aby se celým domem rozvoněly Vánoce.',
    image: F + 'den-23.webp',
    download: { url: PDF + 'pecene-orechy-recept.pdf', label: 'Stáhnout recept v PDF' },
    more: 'Skvěle se hodí na sváteční stůl, k večernímu mlsání nebo jako vlastnoručně vyrobený dárek pro někoho blízkého.\n\nCo budete potřebovat\n• 250 g oblíbených ořechů (mandle, lískové nebo vlašské)\n• 2 lžíce Kubešova medu\n• 1 lžíci rozpuštěného másla\n• 1 lžičku mleté skořice\n• špetku soli\n\nMed smíchejte s máslem, skořicí a solí. Přidejte ořechy a důkladně promíchejte, aby se všechny krásně obalily.\n\nRozprostřete je na plech vyložený pečicím papírem a pečte při 150 °C přibližně 15–20 minut. Během pečení je několikrát promíchejte a hlídejte, aby se nepřipálily. Poté je nechte úplně vychladnout.\n\nMalý tip od Kubešů: Nasypte oříšky do pěkné skleničky, přidejte mašli a některou z našich vánočních jmenovek. A sladký dárek pod stromeček je na světě!\n\nDobrou chuť a krásný advent',
  },
  {
    day: 24, type: 'tip', title: 'Šťastné a medové Vánoce',
    text: 'Děkujeme, že jste s námi strávili advent. Přejeme vám domov plný pohody, blízkých lidí a drobných sladkých radostí.',
    image: F + 'den-24.webp',
    more: 'Ať mají ty nejhezčí chvíle chuť medu. Krásné Vánoce a pokojný nový rok přeje celá Kubešova medová manufaktura.',
  },
];

/**
 * Česká typografie: nezalomit řádek uvnitř čísla („1 000 Kč“), mezi číslem a jednotkou
 * ani za jednopísmennou předložkou či spojkou (v, k, s, z, o, u, a, i).
 */
export function tidy(t: string): string {
  return t
    .replace(/(\d) (?=\d{3}\b)/g, '$1\u00a0')
    .replace(/(\d\.) (?=(prosince|listopadu|ledna|\d))/g, '$1\u00a0')
    .replace(/(\d) (?=(%|Kč|°C|g|ml|l|kg|let|dny|dní|lžíce|lžičky|lžičku|lžíci|porce|minut|×)(?![\p{L}]))/gu, '$1\u00a0')
    .replace(/(^|[\s(„])([vkszouaiVKSZOUAI]) /g, '$1$2\u00a0');
}

export const doors: Door[] = [...DOORS].sort((a, b) => a.day - b.day).map((d) => ({
  ...d,
  title: tidy(d.title),
  text: tidy(d.text),
  more: d.more && tidy(d.more),
  codeNote: d.codeNote && tidy(d.codeNote),
  reward: d.reward && tidy(d.reward),
}));

/** Den, který je dnes nejvýše dostupný (časové pásmo Europe/Prague). */
export function availableDay(now = new Date()): number {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Prague', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
  const get = (n: string) => Number(parts.find((x) => x.type === n)?.value);
  const y = get('year'), m = get('month'), d = get('day');
  if (y < YEAR || (y === YEAR && m < 12)) return 0;
  if (y > YEAR) return 24;
  return Math.min(24, d);
}
