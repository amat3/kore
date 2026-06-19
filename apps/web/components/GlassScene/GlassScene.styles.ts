import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/react'

// ── Morfología de blobs ───────────────────────────────────────────────────

const morph1 = keyframes`
  0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  25%       { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  50%       { border-radius: 50% 60% 30% 60% / 40% 70% 60% 30%; }
  75%       { border-radius: 40% 50% 60% 30% / 70% 40% 50% 60%; }
`

const morph2 = keyframes`
  0%, 100% { border-radius: 40% 60% 60% 40% / 70% 30% 60% 40%; }
  33%       { border-radius: 60% 30% 40% 70% / 40% 70% 30% 60%; }
  66%       { border-radius: 30% 70% 50% 50% / 60% 40% 70% 30%; }
`

const morph3 = keyframes`
  0%, 100% { border-radius: 50% 50% 40% 60% / 30% 60% 40% 70%; }
  40%       { border-radius: 70% 30% 60% 40% / 50% 40% 70% 30%; }
  80%       { border-radius: 40% 60% 30% 70% / 60% 50% 30% 60%; }
`

// ── Animaciones de drift (movimiento lento) ───────────────────────────────

const drift1 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1);      }
  33%       { transform: translate(40px, -30px) scale(1.05); }
  66%       { transform: translate(-20px, 20px) scale(0.97); }
`

const drift2 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1);       }
  40%       { transform: translate(-50px, 30px) scale(1.08); }
  70%       { transform: translate(30px, -40px) scale(0.95); }
`

const drift3 = keyframes`
  0%, 100% { transform: translate(-50%, -50%) scale(1);      }
  50%       { transform: translate(-50%, -50%) scale(1.12) rotate(15deg); }
`

// ── Estilos reducidos ─────────────────────────────────────────────────────

const reducedMotion = css`
  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
  }
`

// ── Root ──────────────────────────────────────────────────────────────────

export const SceneRoot = styled.div<{ $position: 'fixed' | 'absolute' }>`
  position:       ${({ $position }) => $position};
  inset:          0;
  z-index:        0;
  overflow:       hidden;
  pointer-events: none;
  user-select:    none;
`

// ── Blobs ─────────────────────────────────────────────────────────────────

const blobBase = css`
  position: absolute;
  filter:   blur(80px);
  opacity:  0.55;
  ${reducedMotion}
`

export const Blob1 = styled.div`
  ${blobBase}
  width:      55vw;
  max-width:  640px;
  height:     55vw;
  max-height: 640px;
  top:        -15%;
  left:       -10%;
  background: radial-gradient(
    ellipse at center,
    var(--brand-terracota)       0%,
    var(--brand-terracota-light) 45%,
    transparent                  75%
  );
  animation:
    ${css`${morph1}`} 18s ease-in-out infinite,
    ${css`${drift1}`} 22s ease-in-out infinite;
`

export const Blob2 = styled.div`
  ${blobBase}
  width:      50vw;
  max-width:  580px;
  height:     50vw;
  max-height: 580px;
  bottom:     -10%;
  right:      -8%;
  background: radial-gradient(
    ellipse at center,
    var(--brand-terracota-dark) 0%,
    var(--brand-obsidian)       50%,
    transparent                 78%
  );
  animation:
    ${css`${morph2}`} 22s ease-in-out infinite,
    ${css`${drift2}`} 28s ease-in-out infinite;
  animation-delay: -8s, -12s;
`

export const Blob3 = styled.div`
  ${blobBase}
  width:      40vw;
  max-width:  480px;
  height:     40vw;
  max-height: 480px;
  top:        50%;
  left:       50%;
  opacity:    0.30;
  background: radial-gradient(
    ellipse at center,
    var(--brand-ivory)     0%,
    var(--brand-terracota) 60%,
    transparent            80%
  );
  animation:
    ${css`${morph3}`} 16s ease-in-out infinite,
    ${css`${drift3}`} 20s ease-in-out infinite;
  animation-delay: -4s, -6s;
`
