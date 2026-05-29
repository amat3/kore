'use client'

import { css } from '@emotion/react'

// ── Mobile nav — floating ─────────────────────────────────────────────────
export const mobileNavStyles = css`
  position:                 fixed;
  bottom:                   12px;
  left:                     12px;
  right:                    12px;
  z-index:                  var(--z-overlay);
  display:                  flex;
  align-items:              center;
  height:                   64px;
  padding-inline:           var(--spacing-xs);
  background:               var(--background-bars-glass);
  backdrop-filter:          blur(16px);
  -webkit-backdrop-filter:  blur(16px);
  border:                   0.5px solid var(--stroke-secondary-on-surface);
  border-radius:            var(--radius-xl);
  box-shadow:               0 4px 24px rgba(0, 0, 0, 0.08);

  @media (min-width: 600px) {
    display: none;
  }
`

// ── Desktop — top bar ─────────────────────────────────────────────────────
export const desktopNavStyles = css`
  display:          none;
  align-items:      center;
  justify-content:  space-between;
  height:           60px;
  padding-inline:   var(--spacing-2xl);
  background:       var(--background-header-default);
  backdrop-filter:  blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom:    0.5px solid var(--stroke-secondary-on-surface);
  position:         sticky;
  top:              0;
  z-index:          var(--z-overlay);

  @media (min-width: 600px) {
    display: flex;
  }
`

export const mobileItemStyles = css`
  flex:              1;
  display:           flex;
  flex-direction:    column;
  align-items:       center;
  justify-content:   center;
  gap:               3px;
  cursor:            pointer;
  padding-block:     var(--spacing-xs);
  border:            none;
  background:        none;
  color:             var(--foreground-tertiary-on-surface);
  transition:        color 200ms ease;
  -webkit-tap-highlight-color: transparent;

  &:focus-visible {
    outline:        2px solid var(--stroke-focus);
    outline-offset: -2px;
    border-radius:  var(--radius-s);
  }
`

// ── Item desktop ──────────────────────────────────────────────────────────
export const desktopItemStyles = css`
  display:        flex;
  align-items:    center;
  gap:            var(--spacing-xs);
  padding:        var(--spacing-xs) var(--spacing-m);
  border-radius:  var(--radius-full);
  border:         none;
  background:     none;
  cursor:         pointer;
  color:          var(--foreground-secondary-on-surface);
  font-family:    var(--font-family-ui);
  font-size:      var(--scale-s);
  font-weight:    var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-spacious);
  text-transform: uppercase;
  transition:     color 200ms ease, background-color 200ms ease;
  white-space:    nowrap;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background-color: var(--background-action-hover);
    color:            var(--foreground-primary-on-surface);
  }

  &[aria-current="page"] {
    color:            var(--foreground-accent-on-surface);
    background-color: var(--background-accent-dim);
  }

  &:focus-visible {
    outline:        2px solid var(--stroke-focus);
    outline-offset: 2px;
  }
`

// ── Label mobile ──────────────────────────────────────────────────────────
export const mobileLabelStyles = css`
  font-family:    var(--font-family-ui);
  font-size:      var(--scale-2xs);
  font-weight:    var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-spacious);
  text-transform: uppercase;
  line-height:    1;
`

// ── Desktop items row ──────────────────────────────────────────────────────
export const desktopItemsStyles = css`
  display:     flex;
  align-items: center;
  gap:         var(--spacing-2xs);
`

// ── Pill activa mobile ────────────────────────────────────────────────────
export const activePillStyles = css`
  display:          flex;
  flex-direction:   column;
  align-items:      center;
  gap:              3px;
  padding:          var(--spacing-2xs) var(--spacing-m);
  border-radius:    var(--radius-full);
  background-color: var(--background-accent-dim);
  color:            var(--foreground-accent-on-surface);
  transition:       background-color 200ms ease, color 200ms ease;
`


