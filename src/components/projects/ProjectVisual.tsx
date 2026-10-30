import { LayoutGrid, Lock, Plug, Receipt, Scale, ShoppingCart, Wallet, Wifi } from 'lucide-react';
import type { Project } from '../../data/projects';

const iconMap = {
  receipt: Receipt,
  portal: LayoutGrid,
  wallet: Wallet,
  plug: Plug,
  scale: Scale,
  cart: ShoppingCart,
};

/**
 * Mídia do cartão. Imagens reais vêm do portfólio original; para projetos
 * sem captura disponível, usa composições gráficas originais (sinalizadas).
 */
export function ProjectVisual({ project }: { project: Project }) {
  const v = project.visual;

  if (v.kind === 'image') {
    return (
      <div className="pv pv--image">
        <img src={v.src} alt={v.alt} width={v.width} height={v.height} loading="lazy" decoding="async" />
      </div>
    );
  }

  if (v.kind === 'card') {
    return (
      <div className="pv pv--card" aria-hidden="true">
        <div className="cc">
          <div className="cc__top">
            <span className="cc__chip" />
            <Wifi size={18} className="cc__nfc" />
          </div>
          <div className="cc__lines">
            <span />
            <span />
          </div>
        </div>
      </div>
    );
  }

  if (v.kind === 'browser') {
    return (
      <div className="pv pv--browser" aria-hidden="true">
        <div className="browser">
          <div className="browser__bar">
            <i />
            <i />
            <i />
            <span>{v.domain}</span>
          </div>
          <div className="browser__body">
            <b className="w80" />
            <b className="w60" />
            <b className="w40" />
            <span className="browser__cta" />
            <div className="browser__cols">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const Icon = iconMap[v.icon];
  return (
    <div className="pv pv--icon" aria-hidden="true">
      <span className="pv__icon">
        <Icon size={40} strokeWidth={1.75} />
      </span>
      <span className="pv__lock">
        <Lock size={12} /> Interno
      </span>
    </div>
  );
}
