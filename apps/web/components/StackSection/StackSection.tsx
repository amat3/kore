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
// Same groups as the CV ("Habilidades técnicas"). The ORDER is the priority: categories from most to
// least relevant for the roles this portfolio targets (frontend with React/Next.js/TypeScript, React
// Native, design systems), and the items of each category from most to least relevant. Names in neutral
// English: they read the same in both languages of the i18n demo.
const STACK = [
  // Frontend
  { name: 'TypeScript', category: 'frontend', color: '#3178C6' },
  { name: 'React 19', category: 'frontend', color: '#61DAFB' },
  { name: 'Next.js 16', category: 'frontend', color: '#000000' },
  { name: 'JavaScript (ES6+)', category: 'frontend', color: '#F7DF1E' },
  { name: 'Semantic HTML5', category: 'frontend', color: '#E34F26' },
  { name: 'CSS3', category: 'frontend', color: '#1572B6' },
  { name: 'Tailwind CSS', category: 'frontend', color: '#06B6D4' },
  { name: 'Emotion', category: 'frontend', color: '#C43BAD' },
  { name: 'Storybook', category: 'frontend', color: '#FF4785' },
  { name: 'Redux Toolkit', category: 'frontend', color: '#764ABC' },
  { name: 'TanStack Query', category: 'frontend', color: '#FF4154' },
  { name: 'react-hook-form', category: 'frontend', color: '#EC5990' },
  { name: 'Zod', category: 'frontend', color: '#3068B7' },
  { name: 'React Router', category: 'frontend', color: '#CA4245' },
  { name: 'i18next', category: 'frontend', color: '#26A69A' },
  { name: 'Vite', category: 'frontend', color: '#646CFF' },
  { name: 'Astro', category: 'frontend', color: '#FF5D01' },
  // Mobile
  { name: 'React Native', category: 'mobile', color: '#61DAFB' },
  { name: 'Expo SDK 56', category: 'mobile', color: '#000020' },
  { name: 'Expo Router v4', category: 'mobile', color: '#000020' },
  { name: 'Reanimated 4', category: 'mobile', color: '#6B4FBB' },
  // Arquitectura
  { name: 'Design Tokens', category: 'architecture', color: '#B05E3A' },
  { name: 'Turborepo', category: 'architecture', color: '#EF4444' },
  { name: 'Monorepo', category: 'architecture', color: '#EF4444' },
  { name: 'SOLID', category: 'architecture', color: '#4B5563' },
  // Testing y calidad
  { name: 'Vitest', category: 'testing', color: '#6E9F18' },
  { name: 'Jest', category: 'testing', color: '#C21325' },
  { name: 'Testing Library', category: 'testing', color: '#E33332' },
  { name: 'MSW', category: 'testing', color: '#FF6A33' },
  { name: 'ESLint', category: 'testing', color: '#4B32C3' },
  { name: 'Prettier', category: 'testing', color: '#F7B93E' },
  // Backend & datos
  { name: 'Node.js', category: 'backend', color: '#339933' },
  { name: 'Express', category: 'backend', color: '#4B5563' },
  { name: 'REST APIs', category: 'backend', color: '#0EA5E9' },
  { name: 'PostgreSQL', category: 'backend', color: '#4169E1' },
  { name: 'Supabase', category: 'backend', color: '#3FCF8E' },
  { name: 'Row Level Security', category: 'backend', color: '#4169E1' },
  { name: 'Firebase', category: 'backend', color: '#FFCA28' },
  { name: 'Firestore', category: 'backend', color: '#FFCA28' },
  { name: 'WordPress', category: 'backend', color: '#21759B' },
  { name: 'Strapi', category: 'backend', color: '#4945FF' },
  { name: 'MongoDB', category: 'backend', color: '#47A248' },
  { name: 'Stripe', category: 'backend', color: '#635BFF' },
  // Cloud & DevOps
  { name: 'Google Cloud', category: 'cloud', color: '#4285F4' },
  { name: 'Cloud Run', category: 'cloud', color: '#4285F4' },
  { name: 'Docker', category: 'cloud', color: '#2496ED' },
  { name: 'Terraform', category: 'cloud', color: '#844FBA' },
  { name: 'Cloud Build', category: 'cloud', color: '#4285F4' },
  { name: 'GitHub Actions', category: 'cloud', color: '#2088FF' },
  { name: 'CI/CD', category: 'cloud', color: '#2088FF' },
  { name: 'Vercel', category: 'cloud', color: '#000000' },
  // IA
  { name: 'Claude Code', category: 'ai', color: '#D97757' },
  { name: 'GitHub Copilot', category: 'ai', color: '#000000' },
  { name: 'Cursor', category: 'ai', color: '#000000' },
  { name: 'MCP', category: 'ai', color: '#D97757' },
  // Animación
  { name: 'GSAP', category: 'animation', color: '#88CE02' },
  { name: 'Framer Motion', category: 'animation', color: '#FF0055' },
  { name: 'Lottie', category: 'animation', color: '#00C0C7' },
  // PWA
  { name: 'Service Worker', category: 'pwa', color: '#5A0FC8' },
  { name: 'Web Push', category: 'pwa', color: '#5A0FC8' },
  // Herramientas
  { name: 'Git', category: 'tools', color: '#F05032' },
  { name: 'GitHub', category: 'tools', color: '#181717' },
  { name: 'Figma', category: 'tools', color: '#F24E1E' },
  { name: 'Jira', category: 'tools', color: '#0052CC' },
  { name: 'Linear', category: 'tools', color: '#5E6AD2' },
  { name: 'Notion', category: 'tools', color: '#000000' },
  { name: 'PostHog', category: 'tools', color: '#F9BD2B' },
]

const CATEGORIES = ['frontend', 'mobile', 'architecture', 'testing', 'backend', 'cloud', 'ai', 'animation', 'pwa', 'tools'] as const

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
        <Heading>
          <TopRow>
            <SectionOverline variant="overline" as="span">{t('stack.overline')}</SectionOverline>
            <LangToggle
              onClick={toggleLang}
              aria-label={t('lang.label')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('lang.switch')}
            </LangToggle>
          </TopRow>
          <SectionTitle variant="h1" as="h2">
            {t('stack.title')} <em>{t('stack.title.em')}</em>
          </SectionTitle>
          <SectionSubtitle variant="body-light">{t('stack.subtitle')}</SectionSubtitle>
          <LangNote variant="caption" as="p">{t('lang.demo')}</LangNote>
        </Heading>

        {/* Grid por categoría */}
        {CATEGORIES.map(cat => {
          const items = STACK.filter(s => s.category === cat)
          return (
            <CategoryBlock key={cat}>
              <CategoryLabel variant="overline" as="p">{t(catKey(cat))}</CategoryLabel>
              <TechList
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
              </TechList>
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

const Heading = styled.div`
  margin-bottom: clamp(2.5rem, 5vw, 4rem);
`

// Overline on the left, the small language toggle on the right (same line at every width)
const TopRow = styled.div`
  display:         flex;
  align-items:     center;
  justify-content: space-between;
  gap:             var(--spacing-m);
  margin-bottom:   var(--spacing-m);
`

const SectionOverline = styled(Text)`
  display: block;
  margin:  0;
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

// The toggle is a small control, not a call to action
const LangToggle = styled(motion.button)`
  flex-shrink:    0;
  min-width:      2.5rem;
  padding:        var(--spacing-3xs) var(--spacing-s);
  border-radius:  var(--radius-full);
  border:         0.5px solid var(--stroke-secondary-on-surface);
  background:     var(--background-surface-solid);
  color:          var(--foreground-primary-on-surface);
  font-family:    var(--font-family-ui);
  font-size:      var(--scale-xs);
  font-weight:    var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-spacious);
  line-height:    1.6;
  cursor:         pointer;
  transition:     border-color 150ms;
  &:hover { border-color: var(--stroke-accent); }
`

// Says out loud that only this section is translated (an i18next demo)
const LangNote = styled(Text)`
  margin: var(--spacing-xs) 0 0;
  color:  var(--foreground-tertiary-on-surface);
`

const CategoryBlock = styled.div`
  margin-bottom: var(--spacing-xl);
`

const CategoryLabel = styled(Text)`
  color:  var(--foreground-tertiary-on-surface);
  margin: 0 0 var(--spacing-m);
`

// Pills keep the width of their content and share the free space of their row, so every row
// reaches both edges. The ::after filler soaks up the free space of the last row instead.
const TechList = styled(motion.div)`
  display:   flex;
  flex-wrap: wrap;
  gap:       var(--spacing-xs);

  &::after {
    content: '';
    flex:    999 1 0;
    margin-left: calc(var(--spacing-xs) * -1);
  }
`

const TechChip = styled(motion.div)<{ $color: string }>`
  display:         flex;
  flex:            1 1 auto;
  align-items:     center;
  justify-content: center;
  white-space:     nowrap;
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
