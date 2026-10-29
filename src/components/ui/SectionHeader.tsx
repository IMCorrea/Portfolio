import type { ReactNode } from 'react';
import { SplitTitle } from './SplitTitle';

interface Props {
  index: string;
  kicker: string;
  title: readonly string[];
  titleId: string;
  highlight?: number;
  children?: ReactNode;
  aside?: ReactNode;
}

export function SectionHeader({ index, kicker, title, titleId, highlight, children, aside }: Props) {
  return (
    <header className="section-header">
      <div className="section-header__main">
        <p className="kicker" data-reveal>
          <span className="kicker__index">{index}</span>
          <span className="kicker__rule" aria-hidden="true" />
          {kicker}
        </p>
        <SplitTitle lines={title} id={titleId} highlight={highlight} className="section-title" />
        {children && (
          <div className="section-header__lead" data-reveal>
            {children}
          </div>
        )}
      </div>
      {aside && (
        <div className="section-header__aside" data-reveal>
          {aside}
        </div>
      )}
    </header>
  );
}
