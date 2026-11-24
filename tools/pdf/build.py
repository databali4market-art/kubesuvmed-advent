"""
Generátor PDF ke stažení (recept 7. 12., jmenovky 10. 12., přání 19. 12.) ve stylu webu:
stejná písma (Playfair Display, Source Sans 3), medové barvy, brandová včelka a botanické SVG kresby.

Použití (z kořene repa):  python3 tools/pdf/build.py && node tools/pdf/render.cjs
Výstup: public/pdf/*.pdf
"""
import os, re, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]
MEDIA = ROOT / 'public' / 'media'
FONTS = ROOT / 'node_modules' / '@fontsource-variable'
OUT = ROOT / 'tools' / 'pdf' / 'html'
OUT.mkdir(parents=True, exist_ok=True)


def plant(name, cls='', style=''):
    """Botanická kresba vložená přímo do stránky (vektor)."""
    svg = (MEDIA / 'botanika' / f'{name}.svg').read_text()
    svg = svg.replace('<svg ', f'<svg class="plant {cls}" style="{style}" ', 1)
    return svg.replace('fill="#966a39"', 'fill="currentColor"')


BEE_PATH = re.search(r'd="(M910[^"]+)"', (MEDIA / 'vcelka.svg').read_text()).group(1)


def bee(cls='', style=''):
    return f'<svg class="bee {cls}" style="{style}" viewBox="120 220 810 680"><path d="{BEE_PATH}" fill="currentColor" fill-rule="evenodd"/></svg>'


LOGO = (MEDIA / 'foto' / 'logo.webp').as_uri()

BASE_CSS = f"""
@font-face {{ font-family: 'Playfair'; font-style: normal; font-weight: 400 900;
  src: url({(FONTS / 'playfair-display/files/playfair-display-latin-ext-wght-normal.woff2').as_uri()}) format('woff2'); unicode-range: U+0100-024F; }}
@font-face {{ font-family: 'Playfair'; font-style: normal; font-weight: 400 900;
  src: url({(FONTS / 'playfair-display/files/playfair-display-latin-wght-normal.woff2').as_uri()}) format('woff2'); unicode-range: U+0000-00FF, U+2000-206F; }}
@font-face {{ font-family: 'Playfair'; font-style: italic; font-weight: 400 900;
  src: url({(FONTS / 'playfair-display/files/playfair-display-latin-ext-wght-italic.woff2').as_uri()}) format('woff2'); unicode-range: U+0100-024F; }}
@font-face {{ font-family: 'Playfair'; font-style: italic; font-weight: 400 900;
  src: url({(FONTS / 'playfair-display/files/playfair-display-latin-wght-italic.woff2').as_uri()}) format('woff2'); unicode-range: U+0000-00FF, U+2000-206F; }}
@font-face {{ font-family: 'Source Sans'; font-weight: 200 900;
  src: url({(FONTS / 'source-sans-3/files/source-sans-3-latin-ext-wght-normal.woff2').as_uri()}) format('woff2'); unicode-range: U+0100-024F; }}
@font-face {{ font-family: 'Source Sans'; font-weight: 200 900;
  src: url({(FONTS / 'source-sans-3/files/source-sans-3-latin-wght-normal.woff2').as_uri()}) format('woff2'); unicode-range: U+0000-00FF, U+2000-206F; }}
:root {{ --paper: #fbf6ec; --cream: #f4ead7; --cream-2: #efe1c4; --ink: #3d322d; --ink-soft: #6c5b4f;
  --honey: #966a39; --honey-deep: #6e4a22; --gold: #d6b06a; --gold-soft: #ecd5a3; }}
* {{ box-sizing: border-box; margin: 0; padding: 0; }}
html, body {{ -webkit-print-color-adjust: exact; print-color-adjust: exact; }}
body {{ font-family: 'Source Sans', sans-serif; color: var(--ink); }}
.page {{ position: relative; overflow: hidden; background: var(--paper); page-break-after: always; break-after: page; }}
.page:last-child {{ page-break-after: auto; break-after: auto; }}
.plant {{ position: absolute; color: var(--honey); height: auto; }}
.bee {{ color: var(--ink); height: auto; }}
.serif {{ font-family: 'Playfair', serif; }}
.eyebrow {{ font-size: 9pt; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: var(--honey); }}
.eyebrow .line {{ display: inline-block; width: 22pt; height: 0.8pt; background: currentColor; vertical-align: middle; margin: 0 8pt; }}
"""


def page_html(title, size_css, body, extra_css=''):
    return f"""<!doctype html><html lang="cs"><head><meta charset="utf-8"><title>{title}</title>
<style>{BASE_CSS}
@page {{ size: {size_css}; margin: 0; }}
{extra_css}</style></head><body>{body}</body></html>"""


# ------------------------------------------------------------------ recepty
RECIPES = [
    dict(slug='pecena-hruska-recept', day='3. prosince', title=('Pečená hruška', 's medem a skořicí'),
         lead='Jednoduchý dezert, který provoní celý domov dřív, než stihnete prostřít.',
         need='Na 2 porce', ingr=['2 hrušky', '2 lžičky Kubešova medu', 'hrst vlašských ořechů', 'špetka skořice', 'kousek másla', 'bílý jogurt k podávání'],
         steps=['Hrušky rozpulte a lžičkou zbavte jádřinců.',
                'Vložte je do pekáčku a na každou půlku dejte kousek másla.',
                'Pečte asi 20 minut při 180 °C, dokud hrušky nezměknou.',
                'Ještě teplé zakápněte medem, posypte nasekanými ořechy a skořicí. Podávejte s bílým jogurtem.'],
         tip=('Medový tip', 'Med přidávejte až na upečené hrušky – vynikne tak jeho vůně i chuť.'),
         outro='Dobrou chuť!', plants=('javor', 'rebricek')),
    dict(slug='medove-pernicky-recept', day='7. prosince', title=('Voňavé', 'medové perníčky'),
         lead='Med, skořice, hřebíček a vůně čerstvě upečených perníčků. Bez toho si snad ani neumíme představit pravý advent.',
         need='Co budete potřebovat', ingr=['400 g hladké mouky', '100 g tekutého medu', '100 g moučkového cukru', '100 g vlahého rozpuštěného másla',
               '2 vejce', '2 lžičky perníkového koření', '1 lžička jedlé sody', '1 lžička kakaa (volitelně)'],
         steps=['Mouku a cukr prosejte, přidejte koření, sodu a případně kakao. Vmíchejte vejce, máslo a med a vypracujte hladké těsto.',
                'Těsto zakryjte a nechte v lednici odležet alespoň 6 hodin, nejlépe do druhého dne.',
                'Nechte těsto trochu povolit, rozválejte na plát silný asi 5 mm a vykrajujte oblíbené tvary.',
                'Perníčky rozložte na plech s pečicím papírem a pečte při 160 °C přibližně 8 minut. Délku přizpůsobte velikosti tvarů. Po vychladnutí je ozdobte podle chuti.'],
         tip=('Medový tip', 'Pokud je med zkrystalizovaný, nechte jej před pečením šetrně ztekutit ve vodní lázni.'),
         outro='Ať vám doma krásně voní!', plants=('lipa', 'rebricek')),
    dict(slug='medovo-horcicny-dresink-recept', day='12. prosince', title=('Medovo-hořčičný', 'dresink'),
         lead='Med nemusí končit jen v čaji, na chlebu nebo ve vánočním cukroví. Skvěle si rozumí i se slanými chutěmi.',
         need='Co budete potřebovat', ingr=['1 lžíce Kubešova medu', '1 lžíce dijonské hořčice', '3 lžíce olivového oleje', '1 lžíce citronové šťávy', 'špetka soli', 'čerstvě mletý pepř'],
         steps=['Všechny ingredience dejte do misky nebo uzavíratelné sklenice.',
                'Důkladně promíchejte (nebo protřepejte), dokud se nespojí v hladký dresink.',
                'Podle chuti dosolte a opepřete. A je hotovo!'],
         tip=('Medový tip', 'Dresink se skvěle hodí do zeleninových salátů, k pečené zelenině i ke grilovanému masu. Doporučujeme jemný akátový med, který nepřebije ostatní suroviny.'),
         outro='Dobrou chuť vám přejí Kubešovi', plants=('louka', 'akat')),
    dict(slug='horka-medovina-recept', day='16. prosince', title=('Horká medovina', 's pomerančem a kořením'),
         lead='Kousek atmosféry vánočních trhů, který si přenesete až domů.',
         need='Na 2 porce', ingr=['300 ml Kubešovy Klasické bylinné medoviny', '2 plátky pomeranče', '1 svitek skořice', '2 hřebíčky', '1 hvězdička badyánu'],
         steps=['Medovinu nalijte do kastrůlku a přidejte pomeranč a koření.',
                'Pomalu zahřívejte – dejte pozor, aby se medovina nezačala vařit.',
                'Nechte několik minut rozvinout vůni koření a nalijte do oblíbených hrnečků.'],
         tip=('Malá adventní chvilka', 'Najděte si pohodlné místo, pusťte si oblíbené koledy a vychutnejte si ji pomalu. Jen pro dospělé.'),
         outro='Na zdraví vám přejí Kubešovi!', plants=('borovice', 'malina')),
    dict(slug='pecene-orechy-recept', day='23. prosince', title=('Pečené ořechy', 'v medu a skořici'),
         lead='Med, skořice a křupavé oříšky. Někdy stačí jen pár surovin, aby se celým domem rozvoněly Vánoce.',
         need='Co budete potřebovat', ingr=['250 g oblíbených ořechů (mandle, lískové nebo vlašské)', '2 lžíce Kubešova medu', '1 lžíce rozpuštěného másla', '1 lžička mleté skořice', 'špetka soli'],
         steps=['Med smíchejte s máslem, skořicí a solí.',
                'Přidejte ořechy a důkladně promíchejte, aby se všechny krásně obalily.',
                'Rozprostřete je na plech s pečicím papírem a pečte při 150 °C přibližně 15–20 minut. Během pečení je několikrát promíchejte a hlídejte, aby se nepřipálily.',
                'Nechte je úplně vychladnout – teprve pak budou křupavé.'],
         tip=('Tip od Kubešů', 'Nasypte oříšky do pěkné skleničky, přidejte mašli a některou z našich vánočních jmenovek. A sladký dárek pod stromeček je na světě!'),
         outro='Dobrou chuť a krásný advent', plants=('akat', 'lipa')),
]

RECIPE_CSS = """
.page { width: 210mm; height: 297mm; padding: 22mm 22mm 18mm; }
.p-a { width: 92mm; right: -16mm; top: -10mm; opacity: .16; transform: rotate(-8deg); }
.p-b { width: 42mm; left: -6mm; bottom: -4mm; opacity: .16; }
header { text-align: center; position: relative; }
header img { height: 17mm; }
header .eyebrow { margin-top: 7mm; }
h1 { font-family: 'Playfair'; font-weight: 400; font-size: 32pt; line-height: 1.1; margin: 4mm 0 0; }
h1 em { font-style: italic; font-weight: 600; color: var(--honey); }
.lead { font-family: 'Playfair'; font-style: italic; font-size: 12.5pt; color: var(--ink-soft); max-width: 140mm; margin: 5mm auto 0; text-align: center; line-height: 1.5; }
.sep { display: flex; align-items: center; justify-content: center; gap: 4mm; margin: 8mm 0 7mm; color: var(--gold); }
.sep i { width: 30mm; height: .7pt; background: var(--gold-soft); }
.sep .bee { width: 9mm; }
.grid { display: grid; grid-template-columns: 62mm 1fr; gap: 12mm; }
h2 { font-size: 9pt; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: var(--honey); margin-bottom: 4mm; }
ul { list-style: none; }
li { font-size: 11pt; line-height: 1.35; padding: 2mm 0 2mm 6mm; border-bottom: .6pt solid var(--cream-2); position: relative; }
li::before { content: ''; position: absolute; left: 0; top: 3.6mm; width: 2.4mm; height: 2.7mm; background: var(--gold);
  clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%); opacity: .8; }
ol { list-style: none; counter-reset: s; }
ol li { counter-increment: s; padding: 0 0 4.5mm 11mm; border: 0; font-size: 11pt; line-height: 1.5; }
ol li::before { content: counter(s); clip-path: none; background: none; width: 7mm; height: 7mm; top: -.4mm; border: .8pt solid var(--gold);
  border-radius: 50%; display: grid; place-items: center; font-family: 'Playfair'; font-size: 10.5pt; color: var(--honey-deep); opacity: 1; }
.tip { margin-top: 4mm; padding: 5mm 6mm; border-radius: 4mm; background: #fffaf1; border: .8pt dashed var(--gold); font-size: 10.5pt; line-height: 1.5; }
.tip b { font-family: 'Playfair'; font-style: italic; font-weight: 600; font-size: 12pt; color: var(--honey-deep); display: block; margin-bottom: 1mm; }
footer { position: absolute; left: 0; right: 0; bottom: 16mm; text-align: center; }
footer .serif { font-style: italic; font-size: 17pt; color: var(--honey-deep); }
footer small { display: block; margin-top: 3mm; font-size: 8.5pt; letter-spacing: .14em; text-transform: uppercase; color: var(--honey); }
.page > .bee { position: absolute; width: 11mm; right: 30mm; bottom: 34mm; transform: rotate(-12deg); }
"""


def nb(t):
    """Nezlomitelné mezery jako na webu (číslo + jednotka, jednopísmenné předložky)."""
    t = re.sub(r'(\d) (?=\d{3}\b)', '\\1\u00a0', t)
    t = re.sub(r'(\d) (?=(%|Kč|°C|g|ml|l|kg|lžíce|lžičky|lžička|minut)\b)', '\\1\u00a0', t)
    return re.sub(r'(^|[\s(„])([vkszouaiVKSZOUAI]) ', '\\1\\2\u00a0', t)


def recipe(r):
    a, em = r['title']
    body = f"""<section class="page">
  {plant(r['plants'][0], 'p-a')}{plant(r['plants'][1], 'p-b')}
  <header><img src="{LOGO}" alt="">
    <div class="eyebrow"><span class="line"></span>Medový advent 2026 · {r['day']}<span class="line"></span></div>
    <h1>{a} <em>{em}</em></h1>
    <p class="lead">{nb(r['lead'])}</p>
  </header>
  <div class="sep"><i></i>{bee()}<i></i></div>
  <div class="grid">
    <div><h2>{r['need']}</h2><ul>{''.join(f'<li>{nb(x)}</li>' for x in r['ingr'])}</ul></div>
    <div><h2>Jak na to</h2><ol>{''.join(f'<li>{nb(x)}</li>' for x in r['steps'])}</ol>
      <div class="tip"><b>{r['tip'][0]}</b>{nb(r['tip'][1])}</div></div>
  </div>
  {bee()}
  <footer><div class="serif">{r['outro']}</div><small>Kubešova medová manufaktura · kubesuvmed.cz</small></footer>
</section>"""
    (OUT / f"{r['slug']}.html").write_text(page_html(f"{a} {em} – recept", 'A4', body, RECIPE_CSS))


# ---------------------------------------------------------------- jmenovky
def tags():
    wishes = ['Veselé Vánoce', 'Sladké Vánoce', 'S láskou', 'Pod stromeček', 'Ať to bzučí radostí', 'Medové Vánoce', 'Od srdce', 'Šťastné svátky']
    plants = ['lipa', 'malina', 'borovice', 'akat', 'javor', 'louka', 'rebricek', 'lipa']
    css = """
.page { width: 210mm; height: 297mm; padding: 14mm 12mm 12mm; }
.hint { text-align: center; font-size: 8.5pt; color: var(--ink-soft); margin-bottom: 6mm; }
.hint b { font-family: 'Playfair'; font-style: italic; font-weight: 600; font-size: 13pt; color: var(--honey-deep); display: block; margin-bottom: 1mm; }
.tags { display: grid; grid-template-columns: 1fr 1fr; gap: 6mm 7mm; }
.tag { position: relative; height: 59mm; }
.tag .shape { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.tag .clip { position: absolute; inset: 0; overflow: hidden;
  clip-path: polygon(10mm 0, 100% 0, 100% 100%, 10mm 100%, 0 calc(100% - 10mm), 0 10mm); }
.hole { position: absolute; left: 6mm; top: 50%; width: 5mm; height: 5mm; margin-top: -2.5mm; border-radius: 50%; border: .8pt solid var(--gold); background: var(--paper); }
.tag .plant { width: 46mm; right: -9mm; top: -6mm; opacity: .17; }
.tag .bee { position: absolute; width: 9mm; right: 7mm; bottom: 6mm; transform: rotate(-10deg); }
.tag h3 { position: absolute; left: 17mm; top: 9mm; right: 18mm; font-family: 'Playfair'; font-style: italic; font-weight: 500; font-size: 15pt; color: var(--honey-deep); line-height: 1.15; }
.field { position: absolute; left: 17mm; right: 20mm; font-size: 8.5pt; letter-spacing: .16em; text-transform: uppercase; color: var(--honey); display: flex; gap: 3mm; align-items: flex-end; }
.field i { flex: 1; border-bottom: .6pt solid var(--gold-soft); height: 4mm; }
.f1 { top: 32mm; } .f2 { top: 44mm; }
"""
    # obrys jmenovky v mm (šířka buňky 89,5 mm × 59 mm): zkosená levá strana, zaoblené pravé rohy
    W, H, C, R = 89.5, 59, 10, 6
    outline = (f'M{C} 0 H{W-R} A{R} {R} 0 0 1 {W} {R} V{H-R} A{R} {R} 0 0 1 {W-R} {H} H{C} L0 {H-C} V{C} Z')
    shape = (f'<svg class="shape" viewBox="0 0 {W} {H}" preserveAspectRatio="none"><path d="{outline}" fill="#fffdf8" '
             f'stroke="#c9ad80" stroke-width=".3" stroke-dasharray="1.4 1.1"/></svg>')
    cells = ''.join(f"""<div class="tag">{shape}<div class="clip">{plant(plants[i])}</div><span class="hole"></span><h3>{w}</h3>
<div class="field f1">Pro<i></i></div><div class="field f2">Od<i></i></div>{bee()}</div>""" for i, w in enumerate(wishes))
    body = f"""<section class="page"><p class="hint"><b>Medové jmenovky pod stromeček</b>Vytiskněte, vystřihněte podél přerušované čáry, prorazte dírku a provlékněte stužku. · Kubešova medová manufaktura</p>
<div class="tags">{cells}</div></section>"""
    (OUT / 'medove-jmenovky.html').write_text(page_html('Medové jmenovky pod stromeček', 'A4', body, css))


# -------------------------------------------------------------------- přání
def cards():
    designs = [
        ('Sladké', 'Vánoce', 'Ať jsou svátky plné pohody, vůně medu a blízkých lidí.', ['lipa', 'louka']),
        ('Ať to bzučí', 'radostí', 'Přejeme vám Vánoce plné drobných radostí a nový rok plný dobrých zpráv.', ['malina', 'akat']),
        ('Šťastné', 'a medové', 'Ať mají ty nejhezčí chvíle chuť medu.', ['borovice', 'rebricek']),
    ]
    css = """
.page { width: 297mm; height: 210mm; display: grid; grid-template-columns: 1fr 1fr; }
.half { position: relative; overflow: hidden; }
.fold { position: absolute; left: 50%; top: 8mm; bottom: 8mm; border-left: .6pt dashed #d9c49e; }
.back { display: grid; place-items: end center; padding-bottom: 16mm; text-align: center; }
.back img { height: 12mm; opacity: .9; }
.back small { display: block; margin-top: 3mm; font-size: 7.5pt; letter-spacing: .16em; text-transform: uppercase; color: var(--honey); }
.front { display: grid; place-items: center; text-align: center; }
.front .p1 { width: 118mm; left: -14mm; top: -16mm; opacity: .2; transform: rotate(-6deg); }
.front .p2 { width: 70mm; right: -6mm; bottom: -8mm; opacity: .18; }
.frame { position: absolute; inset: 12mm; border: .7pt solid var(--gold-soft); border-radius: 3mm; }
.front .inner { position: relative; padding: 0 22mm; }
.front .eyebrow { margin-bottom: 6mm; }
.front h2 { font-family: 'Playfair'; font-weight: 400; font-size: 38pt; line-height: 1.05; color: var(--ink); }
.front h2 em { display: block; font-style: italic; font-weight: 600; color: var(--honey); }
.front p { font-family: 'Playfair'; font-style: italic; font-size: 12pt; color: var(--ink-soft); line-height: 1.5; margin-top: 7mm; }
.front .bee { width: 15mm; margin: 0 auto 6mm; display: block; }
.inside { background: #fffdf8; }
.write { position: absolute; left: 22mm; right: 22mm; top: 30mm; }
.write .serif { font-style: italic; font-size: 14pt; color: var(--honey); }
.write i { display: block; height: 12mm; border-bottom: .6pt solid var(--cream-2); }
.inside .p3 { width: 40mm; right: 10mm; bottom: 8mm; opacity: .16; }
.inside .bee { position: absolute; width: 10mm; left: 22mm; bottom: 16mm; }
"""
    pages = ''
    for a, b, sub, (pa, pb) in designs:
        pages += f"""<section class="page">
  <div class="half back"><div><img src="{LOGO}" alt=""><small>Medový advent 2026 · kubesuvmed.cz</small></div></div>
  <div class="half front">{plant(pa, 'p1')}{plant(pb, 'p2')}<span class="frame"></span>
    <div class="inner">{bee()}<div class="eyebrow"><span class="line"></span>Přání od srdce<span class="line"></span></div>
      <h2>{a}<em>{b}</em></h2><p>{sub}</p></div></div>
  <span class="fold"></span>
</section>
<section class="page inside-page">
  <div class="half inside"></div>
  <div class="half inside"><div class="write"><div class="serif">Milá / Milý …</div>{'<i></i>' * 9}</div>{plant(pb, 'p3')}{bee()}</div>
  <span class="fold"></span>
</section>"""
    (OUT / 'vanocni-prani.html').write_text(page_html('Vánoční přání od srdce', 'A4 landscape', pages, css))


for r in RECIPES: recipe(r)
tags(); cards()
print('HTML hotové:', ', '.join(sorted(p.name for p in OUT.glob('*.html'))))
