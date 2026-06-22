'use client'

/**
 * KORE Portfolio — Cross-platform Showcase §05
 *
 * Mockups CSS de browser + iPhone mostrando el mismo design system
 * en web y mobile. Sin imágenes — todo construido con styled-components.
 */

import styled           from '@emotion/styled'
import { breakpoints }  from '@kore/tokens'
import { keyframes }    from '@emotion/react'
import { motion, type Variants } from 'framer-motion'
import { Text }                  from '@kore/ui-web'

// ── Animaciones ───────────────────────────────────────────────────────────
const pulse = keyframes`
  0%, 100% { opacity: 1;   }
  50%       { opacity: 0.5; }
`

const shimmer = keyframes`
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(100%);  }
`

// ── Variantes Framer ──────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.7, ease: 'easeOut' } },
}

const slideLeft: Variants = {
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0,   transition: { duration: 0.7, ease: 'easeOut', delay: 0.1 } },
}

const slideRight: Variants = {
  hidden:  { opacity: 0, x: 40  },
  visible: { opacity: 1, x: 0,   transition: { duration: 0.7, ease: 'easeOut', delay: 0.2 } },
}

// ── Mockup Browser ────────────────────────────────────────────────────────
const SHARED_CARDS = [
  { cat: 'Fuerza',  title: 'Full body con peso libre', dur: '45 min · Intermedio'   },
  { cat: 'Yoga',    title: 'Yoga restaurativo',         dur: '30 min · Principiante' },
  { cat: 'Cardio',  title: 'HIIT explosivo',            dur: '20 min · Avanzado'     },
  { cat: 'Pilates', title: 'Core profundo',             dur: '40 min · Intermedio'   },
]

const BrowserMockup = () => (
  <Browser>
    <BrowserBar>
      <BrowserDots>
        <BrowserDot $color="#FF5F57" />
        <BrowserDot $color="#FEBC2E" />
        <BrowserDot $color="#28C840" />
      </BrowserDots>
      <BrowserUrl>kore.app/workouts</BrowserUrl>
    </BrowserBar>

    <BrowserContent>
      <MockNav>
        <MockNavLogo>KORE</MockNavLogo>
        <MockNavItems>
          <MockNavItem>Inicio</MockNavItem>
          <MockNavItem $active>Entrena</MockNavItem>
          <MockNavItem>Perfil</MockNavItem>
        </MockNavItems>
      </MockNav>

      <MockCatalogHeader>
        <MockCatalogTitle>Entrenamientos</MockCatalogTitle>
        <MockSearchBar>
          <MockSearchIcon>🔍</MockSearchIcon>
          <MockSearchText>Buscar...</MockSearchText>
        </MockSearchBar>
        <MockFilterRow>
          {['Todos', 'Fuerza', 'Yoga', 'Cardio'].map((tag, i) => (
            <MockFilterTag key={tag} $active={i === 0}>{tag}</MockFilterTag>
          ))}
        </MockFilterRow>
      </MockCatalogHeader>

      <MockGrid>
        {SHARED_CARDS.map(card => (
          <MockCard key={card.title}>
            <MockCardImg />
            <MockCardBody>
              <MockCardCat>{card.cat}</MockCardCat>
              <MockCardTitle>{card.title}</MockCardTitle>
              <MockCardMeta>{card.dur}</MockCardMeta>
            </MockCardBody>
          </MockCard>
        ))}
      </MockGrid>
    </BrowserContent>
  </Browser>
)

// ── Mockup iPhone ─────────────────────────────────────────────────────────
const PhoneMockup = () => (
  <Phone>
    {/* Notch */}
    <PhoneNotch>
      <PhoneCamera />
    </PhoneNotch>

    {/* Pantalla */}
    <PhoneScreen>
      {/* Status bar */}
      <PhoneStatus>
        <span>9:41</span>
        <PhoneStatusIcons>
          <PhoneStatusDot />
          <PhoneStatusDot />
          <PhoneStatusDot />
        </PhoneStatusIcons>
      </PhoneStatus>

      {/* Header */}
      <PhoneHeader>
        <PhoneTitle>Entrenamientos</PhoneTitle>
        <PhoneStreak>🔥 7</PhoneStreak>
      </PhoneHeader>

      {/* Search bar */}
      <PhoneSearch>
        <PhoneSearchIcon>🔍</PhoneSearchIcon>
        <PhoneSearchText>Buscar...</PhoneSearchText>
      </PhoneSearch>

      {/* Filter tags */}
      <PhoneTags>
        {['Todos', 'Fuerza', 'Yoga', 'Cardio'].map((tag, i) => (
          <PhoneTag key={tag} $active={i === 0}>{tag}</PhoneTag>
        ))}
      </PhoneTags>

      {/* Cards */}
      <PhoneCards>
        {SHARED_CARDS.slice(0, 2).map(card => (
          <PhoneCard key={card.title}>
            <PhoneCardImg />
            <PhoneCardBody>
              <PhoneCardCat>{card.cat}</PhoneCardCat>
              <PhoneCardTitle>{card.title}</PhoneCardTitle>
              <PhoneCardMeta>{card.dur}</PhoneCardMeta>
            </PhoneCardBody>
          </PhoneCard>
        ))}
      </PhoneCards>

      {/* Bottom nav */}
      <PhoneNav>
        {[
          { icon: '🏠', label: 'Inicio',   active: false },
          { icon: '🏋️', label: 'Entrena',  active: true  },
          { icon: '📊', label: 'Actividad',active: false },
          { icon: '👤', label: 'Perfil',   active: false },
        ].map(item => (
          <PhoneNavItem key={item.label} $active={item.active}>
            {item.active ? (
              <PhoneNavPill>
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </PhoneNavPill>
            ) : (
              <>
                <span>{item.icon}</span>
                <PhoneNavLabel>{item.label}</PhoneNavLabel>
              </>
            )}
          </PhoneNavItem>
        ))}
      </PhoneNav>
    </PhoneScreen>

    {/* Home indicator */}
    <PhoneHomeIndicator />
  </Phone>
)

// ── Componente principal ──────────────────────────────────────────────────
const CrossPlatform = () => (
  <Section>
    <Container>

      {/* Heading */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <HeadingWrapper>
          <SectionOverline variant="overline" as="span">Cross-platform</SectionOverline>
          <SectionTitle variant="h1" as="h2">
            Un sistema, <em>dos plataformas</em>
          </SectionTitle>
          <SectionSubtitle variant="body-light">
            El mismo <code>@kore/tokens</code> alimenta la web y la app mobile.
            Mismos colores, misma tipografía, misma API de componentes.
            Web con React + Next.js · Mobile con React Native + Expo.
          </SectionSubtitle>
        </HeadingWrapper>
      </motion.div>

      {/* Mockups */}
      <MockupsWrapper>
        <motion.div
          variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{ minWidth: 0 }}
        >
          <BrowserMockup />
        </motion.div>

        <motion.div
          variants={slideRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <PhoneMockup />
        </motion.div>
      </MockupsWrapper>

      {/* Tokens bridge */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        <TokensBridge>
          <BridgeItem>
            <BridgeLabel variant="overline" as="span">Web</BridgeLabel>
            <BridgeCode>{'import { colors } from "@kore/tokens"'}</BridgeCode>
            <BridgeNote variant="caption" as="span">CSS vars → var(--background-accent-solid)</BridgeNote>
          </BridgeItem>

          <BridgeCenter>
            <BridgePackage>@kore/tokens</BridgePackage>
            <BridgeArrows>
              <span>←</span>
              <BridgePulse variant="caption" as="span">Fuente única de verdad</BridgePulse>
              <span>→</span>
            </BridgeArrows>
          </BridgeCenter>

          <BridgeItem $right>
            <BridgeLabel variant="overline" as="span">Mobile</BridgeLabel>
            <BridgeCode>{'import { colors } from "@kore/tokens"'}</BridgeCode>
            <BridgeNote variant="caption" as="span">JS objects → StyleSheet.create()</BridgeNote>
          </BridgeItem>
        </TokensBridge>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        <StatsRow>
          {[
            { num: '1',    label: 'Package de tokens compartido' },
            { num: '190',  label: 'CSS vars generadas'           },
            { num: '2',    label: 'Plataformas'                  },
            { num: '0',    label: 'Duplicación de valores'       },
          ].map(s => (
            <StatItem key={s.label}>
              <StatNum variant="display" as="span">{s.num}</StatNum>
              <StatLabel variant="caption" as="span">{s.label}</StatLabel>
            </StatItem>
          ))}
        </StatsRow>
      </motion.div>

    </Container>
  </Section>
)

// ── Styled — Sección ──────────────────────────────────────────────────────
const Section = styled.section`
  background-color: var(--background-surface-solid);
  padding-block:    var(--layout-section-pad);
`

const Container = styled.div`
  max-width:      var(--container-xl);
  margin:         0 auto;
  padding-inline: var(--layout-gutter);
  display:        flex;
  flex-direction: column;
  gap:            clamp(3rem, 6vw, 5rem);
`

const HeadingWrapper = styled.div`
  max-width: 700px;
`

const SectionOverline = styled(Text)`
  display:       block;
  margin-bottom: var(--spacing-m);
`

const SectionTitle = styled(Text)`
  font-size:   clamp(2rem, 4vw, 3.5rem);
  line-height: 1.1;
  margin:      0 0 var(--spacing-m);
  em {
    font-style:  italic;
    font-weight: var(--font-weight-semibold);
    color:       var(--foreground-accent-on-surface);
  }
`

const SectionSubtitle = styled(Text)`
  color: var(--foreground-secondary-on-surface);
  code {
    font-size:     0.9em;
    padding:       2px 6px;
    border-radius: 4px;
    background:    var(--background-surface-solid);
    color:         var(--foreground-accent-on-surface);
    font-family:   monospace;
  }
`

const MockupsWrapper = styled.div`
  display:         flex;
  align-items:     flex-start;
  justify-content: center;
  gap:             var(--spacing-2xl);
  flex-wrap:       wrap;
`

// ── Styled — Browser ──────────────────────────────────────────────────────
const Browser = styled.div`
  width:         520px;
  max-width:     100%;
  border-radius: 12px;
  overflow:      hidden;
  border:        1px solid var(--stroke-secondary-on-surface);
  box-shadow:    0 20px 60px rgba(0,0,0,0.15);
  background:    var(--background-surface-solid);
`

const BrowserBar = styled.div`
  display:         flex;
  align-items:     center;
  gap:             var(--spacing-m);
  padding:         10px 14px;
  background:      var(--background-surface-solid);
  border-bottom:   1px solid var(--stroke-secondary-on-surface);
`

const BrowserDots = styled.div`
  display: flex;
  gap:     6px;
`

const BrowserDot = styled.span<{ $color: string }>`
  width:         10px;
  height:        10px;
  border-radius: 50%;
  background:    ${({ $color }) => $color};
  flex-shrink:   0;
`

const BrowserUrl = styled.div`
  flex:          1;
  height:        22px;
  border-radius: 4px;
  background:    var(--background-surface-low);
  display:       flex;
  align-items:   center;
  padding-inline: 8px;
  font-family:   monospace;
  font-size:     11px;
  color:         var(--foreground-tertiary-on-surface);
`

const BrowserContent = styled.div`
  overflow: hidden;
`

const MockNav = styled.div`
  display:         flex;
  align-items:     center;
  justify-content: space-between;
  padding:         8px 14px;
  background:      #1A1A1A;
  border-bottom:   1px solid rgba(255,255,255,0.08);
`

const MockNavLogo = styled.span`
  font-family:    var(--font-family-display);
  font-size:      16px;
  font-weight:    300;
  color:          #B05E3A;
  letter-spacing: 0.1em;
`

const MockNavItems = styled.div`
  display: flex;
  gap:     16px;
`

const MockNavItem = styled.span<{ $active?: boolean }>`
  font-family:    var(--font-family-ui);
  font-size:      9px;
  font-weight:    600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color:          ${({ $active }) => $active ? '#B05E3A' : 'rgba(247,244,241,0.4)'};
`

const MockCatalogHeader = styled.div`
  padding:        8px 10px 4px;
  display:        flex;
  flex-direction: column;
  gap:            6px;
  background:     var(--background-surface-low);
`

const MockCatalogTitle = styled.h3`
  font-family: var(--font-family-display);
  font-size:   14px;
  font-weight: 600;
  color:       var(--foreground-primary-on-surface);
  margin:      0;
`

const MockSearchBar = styled.div`
  display:       flex;
  align-items:   center;
  gap:           5px;
  padding:       5px 8px;
  border-radius: 6px;
  background:    var(--background-surface-solid);
  border:        0.5px solid var(--stroke-secondary-on-surface);
`

const MockSearchIcon = styled.span`font-size: 8px;`

const MockSearchText = styled.span`
  font-family: var(--font-family-ui);
  font-size:   8px;
  color:       var(--foreground-tertiary-on-surface);
`

const MockFilterRow = styled.div`
  display: flex;
  gap:     4px;
`

const MockFilterTag = styled.span<{ $active?: boolean }>`
  font-family:    var(--font-family-ui);
  font-size:      7px;
  font-weight:    600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding:        2px 7px;
  border-radius:  100px;
  border:         0.5px solid ${({ $active }) => $active ? '#B05E3A' : 'var(--stroke-secondary-on-surface)'};
  background:     ${({ $active }) => $active ? 'rgba(176,94,58,0.15)' : 'transparent'};
  color:          ${({ $active }) => $active ? '#B05E3A' : 'var(--foreground-secondary-on-surface)'};
`

const MockGrid = styled.div`
  display:               grid;
  grid-template-columns: repeat(4, 1fr);
  gap:                   6px;
  padding:               10px;
  background:            var(--background-surface-low);
`

const MockCard = styled.div`
  border-radius: 6px;
  overflow:      hidden;
  border:        0.5px solid var(--stroke-secondary-on-surface);
  background:    var(--background-surface-solid);
`

const MockCardImg = styled.div`
  aspect-ratio: 4/3;
  background:   linear-gradient(135deg, var(--background-surface-solid), var(--background-action-hover));
  position:     relative;
  overflow:     hidden;

  &::after {
    content:    '';
    position:   absolute;
    inset:      0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255,255,255,0.06) 50%,
      transparent 100%
    );
    animation: ${shimmer} 2s ease-in-out infinite;
  }
`

const MockCardBody = styled.div`
  padding: 5px 6px 6px;
`

const MockCardCat = styled.p`
  font-family:    var(--font-family-ui);
  font-size:      6px;
  font-weight:    600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color:          #B05E3A;
  margin:         0 0 2px;
`

const MockCardTitle = styled.p`
  font-family: var(--font-family-display);
  font-size:   8px;
  font-weight: 600;
  color:       var(--foreground-primary-on-surface);
  margin:      0 0 2px;
  line-height: 1.2;
`

const MockCardMeta = styled.p`
  font-family: var(--font-family-ui);
  font-size:   6px;
  color:       var(--foreground-tertiary-on-surface);
  margin:      0;
`

// ── Styled — Phone ────────────────────────────────────────────────────────
const Phone = styled.div`
  width:         240px;
  border-radius: 36px;
  overflow:      hidden;
  border:        2px solid var(--stroke-primary-on-surface);
  box-shadow:    0 20px 60px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255,255,255,0.05);
  background:    #1A1A1A;
  position:      relative;
  flex-shrink:   0;
`

const PhoneNotch = styled.div`
  height:          28px;
  background:      #1A1A1A;
  display:         flex;
  align-items:     center;
  justify-content: center;
  position:        relative;
  z-index:         10;
`

const PhoneCamera = styled.div`
  width:         10px;
  height:        10px;
  border-radius: 50%;
  background:    #0A0A0A;
  border:        1px solid #333;
`

const PhoneScreen = styled.div`
  background:     var(--background-surface-low);
  min-height:     480px;
  display:        flex;
  flex-direction: column;
`

const PhoneStatus = styled.div`
  display:         flex;
  justify-content: space-between;
  align-items:     center;
  padding:         4px 16px;
  font-family:     var(--font-family-ui);
  font-size:       9px;
  font-weight:     600;
  color:           var(--foreground-primary-on-surface);
`

const PhoneStatusIcons = styled.div`
  display:     flex;
  gap:         3px;
  align-items: center;
`

const PhoneStatusDot = styled.div`
  width:         5px;
  height:        5px;
  border-radius: 1px;
  background:    var(--foreground-primary-on-surface);
`

const PhoneHeader = styled.div`
  display:         flex;
  align-items:     center;
  justify-content: space-between;
  padding:         8px 14px 4px;
`

const PhoneTitle = styled.h3`
  font-family: var(--font-family-display);
  font-size:   16px;
  font-weight: 600;
  color:       var(--foreground-primary-on-surface);
  margin:      0;
`

const PhoneStreak = styled.span`
  font-size:   12px;
  font-weight: 600;
`

const PhoneSearch = styled.div`
  display:     flex;
  align-items: center;
  gap:         6px;
  margin:      6px 10px;
  padding:     6px 10px;
  border-radius: 8px;
  background:  var(--background-surface-solid);
  border:      0.5px solid var(--stroke-secondary-on-surface);
`

const PhoneSearchIcon = styled.span`font-size: 9px;`

const PhoneSearchText = styled.span`
  font-family: var(--font-family-ui);
  font-size:   9px;
  color:       var(--foreground-tertiary-on-surface);
`

const PhoneTags = styled.div`
  display:    flex;
  gap:        5px;
  padding:    0 10px;
  overflow-x: auto;
  scrollbar-width: none;
`

const PhoneTag = styled.span<{ $active: boolean }>`
  font-family:    var(--font-family-ui);
  font-size:      8px;
  font-weight:    600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding:        3px 8px;
  border-radius:  100px;
  border:         0.5px solid ${({ $active }) => $active ? '#B05E3A' : 'var(--stroke-secondary-on-surface)'};
  background:     ${({ $active }) => $active ? 'rgba(176,94,58,0.15)' : 'transparent'};
  color:          ${({ $active }) => $active ? '#B05E3A' : 'var(--foreground-secondary-on-surface)'};
  white-space:    nowrap;
  flex-shrink:    0;
`

const PhoneCards = styled.div`
  display:        flex;
  flex-direction: column;
  gap:            8px;
  padding:        8px 10px;
  flex:           1;
`

const PhoneCard = styled.div`
  border-radius: 8px;
  overflow:      hidden;
  border:        0.5px solid var(--stroke-secondary-on-surface);
  background:    var(--background-surface-solid);
`

const PhoneCardImg = styled.div`
  height:   80px;
  background: linear-gradient(135deg, var(--background-surface-solid), var(--background-action-hover));
`

const PhoneCardBody = styled.div`
  padding: 6px 8px 8px;
`

const PhoneCardCat = styled.p`
  font-family:    var(--font-family-ui);
  font-size:      7px;
  font-weight:    600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color:          #B05E3A;
  margin:         0 0 2px;
`

const PhoneCardTitle = styled.p`
  font-family: var(--font-family-display);
  font-size:   10px;
  font-weight: 600;
  color:       var(--foreground-primary-on-surface);
  margin:      0 0 2px;
  line-height: 1.2;
`

const PhoneCardMeta = styled.p`
  font-family: var(--font-family-ui);
  font-size:   7px;
  color:       var(--foreground-tertiary-on-surface);
  margin:      0;
`

const PhoneNav = styled.div`
  display:          flex;
  align-items:      center;
  padding:          8px 10px;
  background:       var(--background-surface-solid);
  border-top:       0.5px solid var(--stroke-secondary-on-surface);
`

const PhoneNavItem = styled.div<{ $active: boolean }>`
  flex:           1;
  display:        flex;
  flex-direction: column;
  align-items:    center;
  gap:            2px;
  font-size:      12px;
  color:          ${({ $active }) => $active ? '#B05E3A' : 'var(--foreground-tertiary-on-surface)'};
`

const PhoneNavPill = styled.div`
  display:          flex;
  align-items:      center;
  gap:              4px;
  padding:          3px 8px;
  border-radius:    100px;
  background:       rgba(176,94,58,0.15);
  color:            #B05E3A;
  font-family:      var(--font-family-ui);
  font-size:        8px;
  font-weight:      600;
  letter-spacing:   0.06em;
  text-transform:   uppercase;
`

const PhoneNavLabel = styled.span`
  font-family:    var(--font-family-ui);
  font-size:      7px;
  font-weight:    600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`

const PhoneHomeIndicator = styled.div`
  height:        20px;
  background:    #1A1A1A;
  display:       flex;
  align-items:   center;
  justify-content: center;

  &::after {
    content:       '';
    width:         80px;
    height:        4px;
    border-radius: 2px;
    background:    rgba(255,255,255,0.3);
  }
`

// ── Styled — Bridge ───────────────────────────────────────────────────────
const TokensBridge = styled.div`
  display:        grid;
  grid-template-columns: 1fr auto 1fr;
  align-items:    center;
  gap:            var(--spacing-l);
  padding:        var(--spacing-xl);
  border-radius:  var(--corners-default-card);
  border:         0.5px solid var(--stroke-secondary-on-surface);
  background:     var(--background-surface-solid);

  @media (max-width: ${breakpoints.tablet - 1}px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`

const BridgeItem = styled.div<{ $right?: boolean }>`
  display:        flex;
  flex-direction: column;
  gap:            var(--spacing-xs);
  min-width:      0;
  text-align:     ${({ $right }) => $right ? 'right' : 'left'};

  @media (max-width: ${breakpoints.tablet - 1}px) {
    text-align: center;
  }
`

const BridgeLabel = styled(Text)`
  letter-spacing: var(--letter-spacing-spacious);
`

const BridgeCode = styled.code`
  display:       block;
  width:         100%;
  font-family:   monospace;
  font-size:     var(--scale-xs);
  color:         var(--foreground-primary-on-surface);
  background:    var(--background-surface-low);
  padding:       4px 8px;
  border-radius: var(--radius-xs);
  border:        0.5px solid var(--stroke-secondary-on-surface);
  white-space:   nowrap;
  overflow:      hidden;
  text-overflow: ellipsis;
`

const BridgeNote = styled(Text)`
  color: var(--foreground-tertiary-on-surface);
`

const BridgeCenter = styled.div`
  display:        flex;
  flex-direction: column;
  align-items:    center;
  gap:            var(--spacing-s);
`

const BridgePackage = styled.span`
  font-family:    var(--font-family-ui);
  font-size:      var(--scale-s);
  font-weight:    var(--font-weight-semibold);
  color:          var(--foreground-accent-on-surface);
  padding:        var(--spacing-xs) var(--spacing-m);
  border-radius:  var(--radius-full);
  background:     var(--background-accent-dim);
  border:         0.5px solid var(--stroke-accent-dim);
  white-space:    nowrap;
`

const BridgeArrows = styled.div`
  display:     flex;
  align-items: center;
  gap:         var(--spacing-s);
  color:       var(--foreground-tertiary-on-surface);
  font-size:   var(--scale-m);
`

const BridgePulse = styled(Text)`
  color:       var(--foreground-tertiary-on-surface);
  white-space: nowrap;
  animation:   ${pulse} 2s ease-in-out infinite;
`

const StatsRow = styled.div`
  display:               grid;
  grid-template-columns: repeat(4, 1fr);
  gap:                   var(--spacing-m);
  @media (max-width: ${breakpoints.tablet - 1}px) { grid-template-columns: repeat(2, 1fr); }
`

const StatItem = styled.div`
  padding:        var(--spacing-l);
  border-radius:  var(--corners-default-card);
  border:         0.5px solid var(--stroke-secondary-on-surface);
  background:     var(--background-surface-low);
  display:        flex;
  flex-direction: column;
  gap:            var(--spacing-2xs);
  text-align:     center;
`

const StatNum = styled(Text)`
  font-size:   clamp(1.8rem, 3vw, 2.5rem);
  color:       var(--foreground-accent-on-surface);
  line-height: 1;
`

const StatLabel = styled(Text)`
  color: var(--foreground-secondary-on-surface);
`

export default CrossPlatform
