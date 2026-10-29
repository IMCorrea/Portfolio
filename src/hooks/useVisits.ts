import { useEffect, useState } from 'react';

/**
 * Contador de visitas do portfólio original (API gratuita Abacus).
 * Conta 1 visita por sessão; acessos locais apenas leem o valor.
 * Em caso de falha, retorna null e o indicador é ocultado.
 */
const COUNTER = 'https://abacus.jasoncameron.dev';
const NAMESPACE = 'imcorrea-portfolio';
const KEY = 'visitas';

let request: Promise<number | null> | null = null;

function fetchVisits() {
  if (request) return request;
  let counted = false;
  try {
    counted = sessionStorage.getItem('visit-counted') === '1';
  } catch {
    /* sem sessionStorage */
  }
  if (['localhost', '127.0.0.1', ''].includes(location.hostname)) counted = true;

  request = fetch(`${COUNTER}/${counted ? 'get' : 'hit'}/${NAMESPACE}/${KEY}`)
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => {
      if (!data || typeof data.value !== 'number') return null;
      try {
        sessionStorage.setItem('visit-counted', '1');
      } catch {
        /* sem sessionStorage */
      }
      return data.value as number;
    })
    .catch(() => null);
  return request;
}

export function useVisits() {
  const [visits, setVisits] = useState<number | null>(null);
  useEffect(() => {
    let alive = true;
    fetchVisits().then((v) => alive && setVisits(v));
    return () => {
      alive = false;
    };
  }, []);
  return visits;
}
