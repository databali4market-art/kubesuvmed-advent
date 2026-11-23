import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Copy, Download, Gift, KeyRound, Printer, Share2, X } from 'lucide-react';
import type { Door } from '../types';
import { typeIcon } from './Honeycomb';
import { Bee } from './Decor';
import { GameView } from './Games';

export const LABELS: Record<string, string> = {
  tip: 'Malá radost', recipe: 'Z medové kuchyně', gift: 'Tip na dárek', discount: 'Adventní nadílka', contest: 'Vánoční soutěž', story: 'Adventní výzva', quiz: 'Medový kvíz', download: 'Dárek ke stažení',
};

interface Props {
  door: Door | null;
  /** ukázat poznámky „K potvrzení“ (náhled + CONTENT_MODE draft) */
  showConfirm: boolean;
  /** skutečný dnešní den v prosinci (kvůli platnosti kódů a soutěží), 0 = před adventem */
  today: number;
  entered: boolean;
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
  onShare: () => void;
  onCopy: (code: string) => void;
  onEnter: (day: number, answer: string) => Promise<void>;
  onWin: () => void;
}

export function DoorModal({ door, showConfirm, today, entered, canPrev, canNext, onPrev, onNext, onClose, onShare, onCopy, onEnter, onWin }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [more, setMore] = useState(false);
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState('');
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const d = ref.current!;
    if (door && !d.open) d.showModal();
    if (!door && d.open) d.close();
    setMore(false);
    setFormError('');
    bodyRef.current?.scrollTo(0, 0);
  }, [door]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!door || busy) return;
    const f = new FormData(e.currentTarget);
    setBusy(true); setFormError('');
    try { await onEnter(door.day, String(f.get('answer') || '')); }
    catch (er) { setFormError((er as Error).message); }
    finally { setBusy(false); }
  }

  return (
    <dialog ref={ref} className="modal" aria-label={door?.title || 'Okénko'} onCancel={(e) => { e.preventDefault(); onClose(); }} onClick={(e) => { if (e.target === ref.current) onClose(); }}>
      {door && (
        <div className="modal-card" key={door.day}>
          <button className="modal-close" aria-label="Zavřít" onClick={onClose}><X size={20} /></button>
          <div className={'modal-art' + (door.product ? ' product' : '') + (door.image ? '' : ' plain')}>
            {door.image && <img src={door.image} alt="" />}
            {!door.image && <div className="modal-glyph">{typeIcon(door.type, 64)}</div>}
            <div className="modal-day"><strong>{door.day}</strong><span>prosince</span></div>
            <Bee className="modal-bee" />
          </div>
          <div className="modal-body" ref={bodyRef}>
            <div className="eyebrow">{typeIcon(door.type, 14)} {LABELS[door.type]}</div>
            <h2>{door.title}</h2>
            <p className="lead">{door.text}</p>

            {door.code && (() => {
              const expired = !!door.codeUntil && today > door.codeUntil;
              return (
                <div className={'coupon' + (expired ? ' expired' : '')}>
                  <div className="coupon-label">{expired ? 'Platnost kódu skončila' : 'Váš slevový kód'}</div>
                  <div className="coupon-row">
                    <code>{door.code}</code>
                    {!expired && <button onClick={() => onCopy(door.code!)}><Copy size={16} /> Kopírovat</button>}
                  </div>
                  {door.codeNote && <small>{door.codeNote}</small>}
                  {!expired && <small>Kód zadejte v košíku. Najdete ho i v sekci <b>Moje dárky</b>.</small>}
                </div>
              );
            })()}

            {door.password && (
              <div className="coupon password">
                <div className="coupon-label"><KeyRound size={14} /> Tajné heslo pro náš stánek</div>
                <div className="coupon-row"><code>„{door.password}“</code></div>
                <small>Řekněte ho obsluze u stánku. Najdete ho i v sekci <b>Moje dárky</b>.</small>
              </div>
            )}

            {door.reward && <div className="reward-box"><Gift size={22} /><strong>{door.reward}</strong></div>}

            {door.more && (
              door.type === 'recipe' ? (
                <>
                  <button className="more-btn" aria-expanded={more} onClick={() => setMore(!more)}>{more ? 'Skrýt recept' : 'Zobrazit celý recept'} <ArrowRight size={16} /></button>
                  {more && (
                    <>
                      <div className="more">{door.more}</div>
                      {!door.download && <button className="more-btn" onClick={() => window.print()}><Printer size={16} /> Vytisknout recept</button>}
                    </>
                  )}
                </>
              ) : <div className={'more' + (door.more.length < 320 ? ' soft' : '')}>{door.more}</div>
            )}

            {door.download && (
              <div className="cta-row">
                <a className="btn primary" href={door.download.url} download><Download size={17} /> {door.download.label}</a>
              </div>
            )}

            {door.game && <GameView key={door.day} game={door.game} onDone={onWin} />}

            {door.contest && (() => {
              const c = door.contest;
              const closed = today > c.until;
              return (
                <div className="contest">
                  <div className="prize"><span>Výhra</span><b>{c.prize}</b></div>
                  {entered ? (
                    <div className="success" role="status"><Check size={26} /><div><strong>Vaši odpověď máme.</strong><span>Výherce oznámíme e-mailem. Držíme palce!</span></div></div>
                  ) : closed ? (
                    <div className="draft-note">Soutěž už skončila. Děkujeme všem, kdo se zapojili!</div>
                  ) : (
                    <form onSubmit={submit}>
                      <label htmlFor="answer">{c.question}</label>
                      <textarea id="answer" name="answer" required minLength={3} maxLength={1000} rows={3} placeholder={c.placeholder || 'Napište nám…'} />
                      {c.adult && <label className="check"><input type="checkbox" required /> <span>Je mi více než 18 let.</span></label>}
                      <label className="check"><input type="checkbox" required /> <span>Souhlasím s pravidly soutěže a se zpracováním e-mailu a odpovědi pro její vyhodnocení.</span></label>
                      {formError && <div className="form-error" role="alert">{formError}</div>}
                      <button className="btn primary" disabled={busy}>{busy ? 'Odesílám…' : 'Odeslat odpověď'} <ArrowRight size={17} /></button>
                    </form>
                  )}
                  <details className="rules"><summary>Pravidla soutěže</summary><p>{c.rules}</p></details>
                </div>
              );
            })()}

            {door.url && (
              <div className="cta-row">
                <a className="btn primary" href={door.url} target="_blank" rel="noreferrer">{door.urlLabel || 'Do e-shopu'} <ArrowUpRight size={16} /></a>
                {door.adult && <small className="adult">Alkoholické nápoje prodáváme pouze osobám starším 18 let.</small>}
              </div>
            )}

            {showConfirm && door.confirm && <div className="draft-note"><b>K potvrzení:</b> {door.confirm}</div>}

            <nav className="modal-nav" aria-label="Další okénka">
              <button disabled={!canPrev} onClick={onPrev}><ChevronLeft size={17} /> Předchozí</button>
              <button onClick={onShare}><Share2 size={15} /> Sdílet</button>
              <button disabled={!canNext} onClick={onNext}>Další <ChevronRight size={17} /></button>
            </nav>
          </div>
        </div>
      )}
    </dialog>
  );
}
