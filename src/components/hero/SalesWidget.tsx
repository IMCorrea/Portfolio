import { TrendingUp } from 'lucide-react';

/** Pontos ilustrativos da curva (dados demonstrativos, não indicadores reais). */
const points = [18, 26, 22, 34, 30, 42, 38, 52, 47, 58, 55, 68];
const W = 280;
const H = 84;
const path = points
  .map((v, i) => {
    const x = (i / (points.length - 1)) * W;
    const y = H - (v / 72) * H;
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
  })
  .join(' ');

const bars = [42, 58, 50, 72, 64, 88, 76];
const days = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];

/** Composição "Visão de Vendas", baseada no conceito visual do portfólio original. */
export function SalesWidget() {
  return (
    <article className="widget widget--sales tone-lilac" data-hero="widget" aria-label="Ilustração: dashboard de vendas com dados demonstrativos">
      <header className="widget__head">
        <p className="widget__title">
          <TrendingUp size={16} aria-hidden="true" /> Visão de Vendas
        </p>
        <span className="demo-badge">Demo</span>
      </header>
      <div className="widget__kpi">
        <p className="widget__label">Faturamento (mês)</p>
        <p className="widget__value">R$ 1,24 mi</p>
        <p className="widget__delta">▲ 8,4% vs mês anterior</p>
      </div>
      <svg className="widget__chart" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
        {[0.25, 0.5, 0.75].map((r) => (
          <line key={r} x1="0" x2={W} y1={H * r} y2={H * r} className="widget__grid" />
        ))}
        <path d={`${path} L${W} ${H} L0 ${H} Z`} className="widget__area" data-hero="area" />
        <path d={path} className="widget__line" pathLength={1} data-hero="line" />
      </svg>
      <div className="widget__split">
        <div className="mini-kpi">
          <b>32,1%</b>
          <span>Margem</span>
        </div>
        <div className="mini-kpi">
          <b>R$ 58</b>
          <span>Ticket</span>
        </div>
        <div className="widget__bars" aria-hidden="true">
          {bars.map((b, i) => (
            <span key={i} className="widget__bar">
              <i style={{ height: `${b}%` }} data-hero="bar" />
              <small>{days[i]}</small>
            </span>
          ))}
        </div>
      </div>
      <p className="widget__note">Ilustração · dados demonstrativos</p>
    </article>
  );
}
