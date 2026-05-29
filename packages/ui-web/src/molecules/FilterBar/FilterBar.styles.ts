'use client'

import { css } from '@emotion/react'

// ── Wrapper ───────────────────────────────────────────────────────────────
export const baseWrapperStyles = css`
  display:        flex;
  flex-direction: column;
  gap:            var(--spacing-s);
  width:          100%;
`

// ── Tags row — scroll horizontal en mobile ────────────────────────────────
export const tagsRowStyles = css`
  display:    flex;
  gap:        var(--spacing-xs);
  overflow-x: auto;
  overflow-y: visible;
  padding-block: 2px;      /* espacio para el focus ring */

  /* Ocultar scrollbar visualmente pero mantener funcional */
  scrollbar-width:    none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar { display: none; }

  /* En desktop — wrap si hay espacio */
  @media (min-width: 600px) {
    flex-wrap:  wrap;
    overflow-x: visible;
  }
`

// ── Layout inline (search + tags en una fila) ─────────────────────────────
export const inlineWrapperStyles = css`
  display:     flex;
  align-items: center;
  gap:         var(--spacing-m);
  width:       100%;

  .kore-filterbar-search {
    flex-shrink: 0;
    width:       240px;
  }

  .kore-filterbar-tags {
    flex: 1;
    min-width: 0;
  }
`
