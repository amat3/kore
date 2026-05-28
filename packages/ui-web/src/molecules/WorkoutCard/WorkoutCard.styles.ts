'use client'

import { css } from '@emotion/react'

// ── Base ──────────────────────────────────────────────────────────────────
export const baseCardStyles = css`
  display:        flex;
  flex-direction: column;
  border-radius:  var(--corners-default-card);
  overflow:       hidden;
  border:         0.5px solid var(--stroke-secondary-on-surface);
  background:     var(--background-surface-low);
  cursor:         pointer;
  width:          100%;
  transition:     border-color 200ms ease, transform 200ms ease;
  -webkit-tap-highlight-color: transparent;

  /* Desktop hover — no afecta mobile */
  @media (hover: hover) {
    &:hover {
      border-color: var(--stroke-accent);
      transform:    translateY(-2px);
    }
    &:hover .kore-card-image img {
      transform: scale(1.03);
    }
  }

  /* Tap feedback en mobile */
  &:active {
    transform:    scale(0.99);
    border-color: var(--stroke-accent-dim);
  }
`

// ── Imagen ────────────────────────────────────────────────────────────────
export const imageWrapperStyles = css`
  position:    relative;
  width:       100%;
  aspect-ratio: 4 / 3;
  overflow:    hidden;
  background:  var(--background-surface-solid);

  img {
    width:      100%;
    height:     100%;
    object-fit: cover;
    display:    block;
    transition: transform 400ms ease;
  }
`

// ── Placeholder sin imagen ────────────────────────────────────────────────
export const placeholderStyles = css`
  width:           100%;
  height:          100%;
  display:         flex;
  align-items:     center;
  justify-content: center;
  background:      var(--background-surface-solid);
  color:           var(--foreground-tertiary-on-surface);
`

// ── Body ──────────────────────────────────────────────────────────────────
export const bodyStyles = css`
  display:        flex;
  flex-direction: column;
  gap:            var(--spacing-2xs);
  padding:        var(--spacing-m);
  flex:           1;
`

// ── Meta row ──────────────────────────────────────────────────────────────
export const metaRowStyles = css`
  display:     flex;
  align-items: center;
  gap:         var(--spacing-xs);
  flex-wrap:   wrap;
`
