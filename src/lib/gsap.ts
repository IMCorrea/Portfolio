import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, Flip, useGSAP);

gsap.defaults({ ease: 'expo.out', duration: 0.9 });

/** Condição usada em gsap.matchMedia: animações só rodam sem preferência por movimento reduzido. */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export { gsap, ScrollTrigger, Flip, useGSAP };

if (import.meta.env.DEV) Object.assign(window, { gsap, ScrollTrigger });
