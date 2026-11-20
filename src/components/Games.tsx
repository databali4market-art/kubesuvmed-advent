import { useState } from 'react';
import { ArrowUpRight, Check, RotateCcw, X } from 'lucide-react';
import type { Game } from '../types';

interface Props { game: Game; onDone: () => void; }

export function GameView({ game, onDone }: Props) {
  return game.kind === 'quiz' ? <Quiz game={game} onDone={onDone} /> : <Persona game={game} onDone={onDone} />;
}

function Quiz({ game, onDone }: { game: Extract<Game, { kind: 'quiz' }>; onDone: () => void }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const total = game.questions.length;
  const reset = () => { setI(0); setScore(0); setPicked(null); setFinished(false); };

  if (finished && total > 1) {
    return (
      <div className="game-result">
        <strong>{score} z {total}</strong>
        <p>{score === total ? 'Všechno správně, výborně!' : 'Pěkný pokus!'}</p>
        <button className="btn ghost-dark" onClick={reset}><RotateCcw size={16} /> Hrát znovu</button>
      </div>
    );
  }
  const q = game.questions[i];
  const answered = picked !== null;
  const ok = picked === q.answer;
  return (
    <div className="game">
      {total > 1 && <div className="game-step">Otázka {i + 1} / {total}</div>}
      <h3>{q.q}</h3>
      {!answered && <div className="game-step">Vyberte jednu správnou odpověď</div>}
      <div className="options">
        {q.options.map((o, k) => (
          <button key={k} disabled={answered}
            onClick={() => { setPicked(k); if (k === q.answer) setScore((s) => s + 1); if (total === 1 && k === q.answer) onDone(); }}
            className={'option' + (answered ? (k === q.answer ? ' right' : k === picked ? ' wrong' : '') : '')}>
            <span><b>{String.fromCharCode(65 + k)}.</b> {o}</span>
            {answered && k === q.answer && <Check size={18} />}
            {answered && k === picked && k !== q.answer && <X size={18} />}
          </button>
        ))}
      </div>
      {answered && (
        <div className="game-next" role="status">
          <strong className={ok ? 'ok' : 'ko'}>{ok ? (q.right || 'Správně!') : (q.wrong || 'Tentokrát vedle!')}</strong>
          {q.explain && <p>{q.explain}</p>}
          {total > 1 ? (
            <button className="btn primary" onClick={() => { if (i + 1 < total) { setI(i + 1); setPicked(null); } else { setFinished(true); onDone(); } }}>
              {i + 1 < total ? 'Další otázka' : 'Zobrazit výsledek'}
            </button>
          ) : !ok && <button className="btn ghost-dark" onClick={reset}><RotateCcw size={16} /> Zkusit znovu</button>}
        </div>
      )}
    </div>
  );
}

function Persona({ game, onDone }: { game: Extract<Game, { kind: 'persona' }>; onDone: () => void }) {
  const [i, setI] = useState(0);
  const [tally, setTally] = useState<Record<string, number>>({});
  const [result, setResult] = useState<string | null>(null);
  if (result) {
    const r = game.results[result];
    return (
      <div className="game-result">
        <small>Vám nejvíc sedne</small>
        <strong>{r.title}</strong>
        <p>{r.text}</p>
        <div className="game-actions">
          {r.product && <a className="btn primary" href={r.product.url} target="_blank" rel="noreferrer">{r.product.label} <ArrowUpRight size={16} /></a>}
          <button className="btn ghost-dark" onClick={() => { setI(0); setTally({}); setResult(null); }}><RotateCcw size={16} /> Hrát znovu</button>
        </div>
      </div>
    );
  }
  const q = game.questions[i];
  return (
    <div className="game">
      <div className="game-step">Otázka {i + 1} / {game.questions.length}</div>
      <h3>{q.q}</h3>
      <div className="options">
        {q.options.map((o, k) => (
          <button key={k} className="option" onClick={() => {
            const t = { ...tally, [o.r]: (tally[o.r] || 0) + 1 };
            setTally(t);
            if (i + 1 < game.questions.length) setI(i + 1);
            else { setResult(Object.entries(t).sort((a, b) => b[1] - a[1])[0][0]); onDone(); }
          }}><span>{o.t}</span></button>
        ))}
      </div>
    </div>
  );
}
