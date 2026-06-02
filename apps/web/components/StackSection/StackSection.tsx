'use client'

/**
 * KORE Portfolio — Stack Section §03
 *
 * Grid de tecnologías con Framer Motion stagger.
 * Selector ES/EN con i18next funcional.
 */

import '@/i18n'
import styled                from '@emotion/styled'
import { motion, type Variants } from 'framer-motion'
import { Text }                  from '@kore/ui-web'
import { useTranslation }    from 'react-i18next'

// ── Data ──────────────────────────────────────────────────────────────────
const STACK = [
  // Frontend
  { name: 'TypeScript',      category: 'frontend',  color: '#3178C6', level: 5 },
  { name: 'React 18/19',     category: 'frontend',  color: '#61DAFB', level: 5 },
  { name: 'Next.js',         category: 'frontend',  color: '#000000', level: 4 },
  { name: 'Emotion',         category: 'frontend',  color: '#C43BAD', level: 5 },
  { name: 'Redux Toolkit',   category: 'frontend',  color: '#764ABC', level: 4 },
  { name: 'react-hook-form', category: 'frontend',  color: '#EC5990', level: 4 },
  // Mobile
  { name: 'React Native',    category: 'mobile',    color: '#61DAFB', level: 5 },
  { name: 'Expo',            category: 'mobile',    color: '#000020', level: 4 },
  { name: 'Expo Router',     category: 'mobile',    color: '#000020', level: 4 },
  { name: 'Reanimated',      category: 'mobile',    color: '#6B4FBB', level: 4 },
  // Animación
  { name: 'GSAP',            category: 'animation', color: '#88CE02', level: 4 },
  { name: 'Framer Motion',   category: 'animation', color: '#FF0055', level: 4 },
  { name: 'Lottie',          category: 'animation', color: '#00C0C7', level: 3 },
  // Backend & datos
  { name: 'Firebase',        category: 'backend',   color: '#FFCA28', level: 4 },
  { name: 'Firestore',       category: 'backend',   color: '#FFCA28', level: 4 },
  { name: 'Node.js',         category: 'backend',   color: '#339933', level: 3 },
  // Tooling
  { name: 'Storybook',       category: 'tooling',   color: '#FF4785', level: 5 },
  { name: 'Jest + MSW',      category: 'tooling',   color: '#C21325', level: 3 },
  { name: 'Turborepo',       category: 'tooling',   color: '#EF4444', level: 4 },
  { name: 'i18next',         category: 'tooling',   color: '#26A69A', level: 4 },
]

const CATEGORIES = ['frontend', 'mobile', 'animation', 'backend', 'tooling'] as const

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

  const toggleLang = () =>
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es')

  const catKey = (cat: string) =>
    `stack.cat.${cat}` as Parameters<typeof t>[0]

  return (
    <Section>
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

          <LangToggle
            onClick={toggleLang}
            aria-label="Cambiar idioma"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('lang.switch')}
          </LangToggle>
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
                    <TechLevel>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <LevelDot key={i} $active={i < tech.level} />
                      ))}
                    </TechLevel>
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
  padding-block:    clamp(4rem, 10vw, 8rem);
  border-top:       0.5px solid var(--stroke-secondary-on-surface);
`

const Container = styled.div`
  max-width:      1200px;
  margin:         0 auto;
  padding-inline: var(--spacing-l);
  @media (min-width: 600px)  { padding-inline: var(--spacing-2xl); }
  @media (min-width: 1200px) { padding-inline: var(--spacing-3xl); }
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

const TechLevel = styled.span`
  display:     flex;
  align-items: center;
  gap:         var(--spacing-3xs);
  margin-left: var(--spacing-2xs);
`

const LevelDot = styled.span<{ $active: boolean }>`
  width:         var(--spacing-2xs);
  height:        var(--spacing-2xs);
  border-radius: 50%;
  background:    ${({ $active }) =>
    $active ? 'var(--foreground-accent-on-surface)' : 'var(--stroke-secondary-on-surface)'};
`

export default StackSection
