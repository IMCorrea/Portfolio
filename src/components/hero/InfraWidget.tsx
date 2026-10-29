import { Activity, Database, Network, Server, ShieldCheck } from 'lucide-react';

const categories = [
  { label: 'Servid.', Icon: Server },
  { label: 'Rede', Icon: Network },
  { label: 'Seg.', Icon: ShieldCheck },
  { label: 'BD', Icon: Database },
];

const status = [
  { name: 'ERP Winthor', value: 'OK' },
  { name: 'Gateway Power BI', value: 'OK' },
  { name: 'Backup noturno', value: '02:00' },
];

/** Composição "Infraestrutura", baseada no conceito visual do portfólio original. */
export function InfraWidget() {
  return (
    <article className="widget widget--infra tone-mint" data-hero="widget" aria-label="Ilustração: monitoramento de infraestrutura com dados demonstrativos">
      <header className="widget__head">
        <p className="widget__title">
          <Activity size={16} aria-hidden="true" /> Infraestrutura
        </p>
        <span className="demo-badge">Demo</span>
      </header>
      <p className="widget__online">
        <span className="status-dot" aria-hidden="true" /> Todos os serviços online.
      </p>
      <div className="uptime">
        <div className="uptime__row">
          <span>Uptime</span>
          <b>99,9%</b>
        </div>
        <div className="uptime__track" aria-hidden="true">
          {Array.from({ length: 24 }, (_, i) => (
            <i key={i} className={i === 17 ? 'is-warn' : ''} data-hero="tick" />
          ))}
        </div>
      </div>
      <ul className="infra-cats">
        {categories.map(({ label, Icon }) => (
          <li key={label}>
            <Icon size={15} aria-hidden="true" />
            {label}
          </li>
        ))}
      </ul>
      <ul className="infra-status">
        {status.map((s) => (
          <li key={s.name}>
            <span>{s.name}</span>
            <b>{s.value}</b>
          </li>
        ))}
      </ul>
      <p className="widget__note">Ilustração · dados demonstrativos</p>
    </article>
  );
}
