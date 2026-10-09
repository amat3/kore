'use client'

/**
 * KORE Portfolio — Stack Section §03
 *
 * Grid de tecnologías con Framer Motion stagger.
 * Selector ES/EN: demo de i18next acotada a esta sección (lo dice su etiqueta),
 * con el idioma guardado en localStorage y el atributo lang de la sección al día.
 */

import '@/i18n'
import { useEffect }         from 'react'
import styled                from '@emotion/styled'
import { motion, type Variants } from 'framer-motion'
import { Text }                  from '@kore/ui-web'
import { useTranslation }    from 'react-i18next'

// ── Data ──────────────────────────────────────────────────────────────────
const STACK = [
  // Frontend
  { name: 'TypeScript',            category: 'frontend',  color: '#3178C6' },
  { name: 'React 19',              category: 'frontend',  color: '#61DAFB' },
  { name: 'Next.js 16',            category: 'frontend',  color: '#000000' },
  { name: 'HTML5 semántico · CSS3', category: 'frontend', color: '#E34F26' },
  { name: 'Emotion',               category: 'frontend',  color: '#C43BAD' },
  { name: 'Tailwind CSS',          category: 'frontend',  color: '#06B6D4' },
  { name: 'Redux Toolkit',         category: 'frontend',  color: '#764ABC' },
  { name: 'TanStack Query',        category: 'frontend',  color: '#FF4154' },
  { name: 'react-hook-form + Zod', category: 'frontend',  color: '#EC5990' },
  // Mobile
  { name: 'React Native',          category: 'mobile',    color: '#61DAFB' },
  { name: 'Expo SDK 56',           category: 'mobile',    color: '#000020' },
  { name: 'Expo Router v4',        category: 'mobile',    color: '#000020' },
  { name: 'Reanimated 4',          category: 'mobile',    color: '#6B4FBB' },
  // Animación
  { name: 'GSAP',                  category: 'animation', color: '#88CE02' },
  { name: 'Framer Motion',         category: 'animation', color: '#FF0055' },
  { name: 'Lottie',                category: 'animation', color: '#00C0C7' },
  // Backend & datos
  { name: 'Node.js + Express',     category: 'backend',   color: '#339933' },
  { name: 'Supabase',              category: 'backend',   color: '#3FCF8E' },
  { name: 'PostgreSQL (RLS)',      category: 'backend',   color: '#4169E1' },
  { name: 'Firebase · Firestore',  category: 'backend',   color: '#FFCA28' },
  // Cloud & DevOps
  { name: 'Google Cloud Run',      category: 'cloud',     color: '#4285F4' },
  { name: 'Docker',                category: 'cloud',     color: '#2496ED' },
  { name: 'Terraform',             category: 'cloud',     color: '#844FBA' },
  { name: 'Vercel',                category: 'cloud',     color: '#000000' },
  { name: 'GitHub Actions',        category: 'cloud',     color: '#2088FF' },
  // Tooling
  { name: 'Storybook',             category: 'tooling',   color: '#FF4785' },
  { name: 'Turborepo',             category: 'tooling',   color: '#EF4444' },
  { name: 'Vitest',                category: 'tooling',   color: '#6E9F18' },
  { name: 'Jest + MSW',            category: 'tooling',   color: '#C21325' },
  { name: 'React Testing Library', category: 'tooling',   color: '#E33332' },
  { name: 'i18next',               category: 'tooling',   color: '#26A69A' },
  // IA
  { name: 'Claude Code',           category: 'ai',        color: '#D97757' },
  { name: 'GitHub Copilot',        category: 'ai',        color: '#000000' },
  { name: 'Cursor',                category: 'ai',        color: '#000000' },
  { name: 'MCP',                   category: 'ai',        color: '#D97757' },
]

const CATEGORIES = ['frontend', 'mobile', 'animation', 'backend', 'cloud', 'tooling', 'ai'] as const

const LANG_KEY = 'kore-portfolio-lang'

// ── Framer Motion variants ────────────────────────────────────────────────
const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0,  scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  },
}

// ── Componente ────────────────────────────────────────────────────────────
const StackSection = () => {
  const { t, i18n } = useTranslation()

  // Restores the language chosen in a previous visit (the server always renders Spanish)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LANG_KEY)
      if ((saved === 'es' || saved === 'en') && saved !== i18n.language) i18n.changeLanguage(saved)
    } catch {
      // Storage blocked (private mode): the section simply starts in Spanish
    }
  }, [i18n])

  const toggleLang = () => {
    const next = i18n.language === 'es' ? 'en' : 'es'
    i18n.changeLanguage(next)
    try { localStorage.setItem(LANG_KEY, next) } catch { /* not persisted */ }
  }

  const catKey = (cat: string) =>
    `stack.cat.${cat}` as Parameters<typeof t>[0]

  return (
    <Section lang={i18n.language}>
      <Container>

        {/* Heading + lang toggle */}
        <HeadingRow>
          <div>
            <SectionOverline variant="overline" as="span">{t('stack.overline')}</SectionOverline>
            <SectionTitle variant="h1" as="h2">
              {t('stack.title')} <em>{t('stack.title.em')}</em>
            </SectionTitle>
            <SectionSubtitle variant="body-light">{t('stack.subtitle')}</SectionSubtitle>
          </div>

          <LangDemo>
            <LangToggle
              onClick={toggleLang}
              aria-label={t('lang.label')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('lang.switch')}
            </LangToggle>
            <LangNote variant="caption" as="span">{t('lang.demo')}</LangNote>
          </LangDemo>
        </HeadingRow>

        {/* Grid por categoría */}
        {CATEGORIES.map(cat => {
          const items = STACK.filter(s => s.category === cat)
          return (
            <CategoryBlock key={cat}>
              <CategoryLabel variant="overline" as="p">{t(catKey(cat))}</CategoryLabel>
              <motion.div
                style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
              >
                {items.map(tech => (
                  <TechChip
                    key={tech.name}
                    variants={itemVariants}
                    whileHover={{ y: -3, transition: { type: 'spring', stiffness: 400 } }}
                    $color={tech.color}
                  >
                    <TechDot $color={tech.color} />
                    {tech.name}
                  </TechChip>
                ))}
              </motion.div>
            </CategoryBlock>
          )
        })}

      </Container>
    </Section>
  )
}

// ── Styled ────────────────────────────────────────────────────────────────
const Section = styled.section`
  background-color: var(--background-surface-low);
  padding-block:    var(--layout-section-pad);
`

const Container = styled.div`
  max-width:      var(--container-xl);
  margin:         0 auto;
  padding-inline: var(--layout-gutter);
`

const HeadingRow = styled.div`
  display:         flex;
  justify-content: space-between;
  align-items:     flex-start;
  gap:             var(--spacing-l);
  flex-wrap:       wrap;
  margin-bottom:   clamp(2.5rem, 5vw, 4rem);
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
`

// The toggle and its note: says out loud that only this section is translated (an i18next demo)
const LangDemo = styled.div`
  display:        flex;
  flex-direction: column;
  align-items:    flex-end;
  gap:            var(--spacing-2xs);
  max-width:      16rem;
  text-align:     right;
`

const LangNote = styled(Text)`
  color: var(--foreground-tertiary-on-surface);
`

const LangToggle = styled(motion.button)`
  padding:        var(--spacing-s) var(--spacing-l);
  border-radius:  var(--radius-full);
  border:         0.5px solid var(--stroke-secondary-on-surface);
  background:     var(--background-surface-solid);
  color:          var(--foreground-primary-on-surface);
  font-family:    var(--font-family-ui);
  font-size:      var(--scale-s);
  font-weight:    var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-spacious);
  cursor:         pointer;
  flex-shrink:    0;
  transition:     border-color 150ms;
  &:hover { border-color: var(--stroke-accent); }
`

const CategoryBlock = styled.div`
  margin-bottom: var(--spacing-xl);
`

const CategoryLabel = styled(Text)`
  color:  var(--foreground-tertiary-on-surface);
  margin: 0 0 var(--spacing-m);
`

const TechChip = styled(motion.div)<{ $color: string }>`
  display:        inline-flex;
  align-items:    center;
  gap:            var(--spacing-xs);
  padding:        var(--spacing-xs) var(--spacing-m);
  border-radius:  var(--radius-full);
  border:         0.5px solid var(--stroke-secondary-on-surface);
  background:     var(--background-surface-solid);
  font-family:    var(--font-family-ui);
  font-size:      var(--scale-s);
  font-weight:    var(--font-weight-semibold);
  color:          var(--foreground-primary-on-surface);
  cursor:         default;

  &:hover {
    border-color: ${({ $color }) => $color}60;
    background:   ${({ $color }) => $color}10;
  }
`

const TechDot = styled.span<{ $color: string }>`
  width:         var(--spacing-xs);
  height:        var(--spacing-xs);
  border-radius: 50%;
  background:    ${({ $color }) => $color};
  flex-shrink:   0;
`

export default StackSection
