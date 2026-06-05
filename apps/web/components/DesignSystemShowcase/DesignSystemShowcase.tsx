'use client'

/**
 * KORE — Design System Showcase §03
 *
 * Componentes @kore/ui-web renderizados en vivo.
 * Selector light/dark integrado que cambia los tokens en tiempo real.
 * La prueba más potente de componentización del portfolio.
 */

import { useEffect, useRef, useState } from 'react'
import styled                           from '@emotion/styled'
import gsap                             from 'gsap'
import { ScrollTrigger }                from 'gsap/ScrollTrigger'

import { Text, Button, Badge, Tag, Avatar, AvatarGroup, Input, Icon } from '@kore/ui-web'

gsap.registerPlugin(ScrollTrigger)

// ── Datos mock ────────────────────────────────────────────────────────────
const MOCK_USERS = [
  { name: 'María García'       },
  { name: 'Laura Fernández'    },
  { name: 'Ana Martínez'       },
  { name: 'Sofía Ruiz'         },
  { name: 'Carmen López'       },
]

// ── Componente ────────────────────────────────────────────────────────────
const DesignSystemShowcase = () => {
  const sectionRef  = useRef<HTMLElement>(null)
  const headingRef  = useRef<HTMLDivElement>(null)
  const showcaseRef = useRef<HTMLDivElement>(null)
  const [isDark, setIsDark]         = useState(false)
  const [inputVal, setInputVal]     = useState('')
  const [activeTag, setActiveTag]   = useState('fuerza')

  // Aplica el tema al wrapper del showcase
  useEffect(() => {
    if (showcaseRef.current) {
      showcaseRef.current.setAttribute('data-theme', isDark ? 'dark' : 'light')
    }
  }, [isDark])

  // Animaciones de entrada
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 40, autoAlpha: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
      })
      const blocks = showcaseRef.current?.querySelectorAll('.ds-block')
      if (blocks) {
        gsap.from(blocks, {
          y: 50, autoAlpha: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: showcaseRef.current, start: 'top 80%' },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <Section ref={sectionRef}>
      <Container>

        {/* Heading */}
        <HeadingRow ref={headingRef}>
          <div>
            <SectionOverline variant="overline" as="span">Design System</SectionOverline>
            <SectionTitle variant="h1" as="h2">
              Componentes que <em>escalan</em>
            </SectionTitle>
            <SectionSubtitle variant="body-light">
              <code>@kore/ui-web</code> — 15+ componentes con Emotion, TypeScript y Storybook.
              Dark mode nativo, tokens semánticos, accesibilidad WCAG.
            </SectionSubtitle>
          </div>

          <HeaderActions>
            {/* Toggle dark/light */}
            <ThemeToggle
              onClick={() => setIsDark(d => !d)}
              aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              title={isDark ? 'Modo claro' : 'Modo oscuro'}
            >
              <Icon name={isDark ? 'Sun' : 'Moon'} size="sm" color="inherit" />
              {isDark ? 'Light' : 'Dark'}
            </ThemeToggle>

            <StorybookLink
              href="https://6a1f429ec79df80605844468-jlgixgzjns.chromatic.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="ExternalLink" size="xs" color="inherit" />
              Storybook
            </StorybookLink>
          </HeaderActions>
        </HeadingRow>

        {/* Showcase canvas */}
        <ShowcaseCanvas ref={showcaseRef} $isDark={isDark}>

          {/* § Icons */}
          <DSBlock className="ds-block">
            <BlockLabel variant="overline" as="span">Icon — tamaños y colores</BlockLabel>
            <BlockContent $align="center" $gap="l">
              <Icon name="Dumbbell"    size="xs"  color="muted"   />
              <Icon name="Dumbbell"    size="sm"  color="default" />
              <Icon name="Dumbbell"    size="md"  color="accent"  />
              <Icon name="Dumbbell"    size="lg"  color="accent"  />
              <Icon name="Dumbbell"    size="xl"  color="accent"  />
            </BlockContent>
            <BlockContent $align="center">
              <Icon name="Heart"       size="sm" color="accent"   />
              <Icon name="TrendingUp"  size="sm" color="default"  />
              <Icon name="Flame"       size="sm" color="accent"   />
              <Icon name="Users"       size="sm" color="default"  />
              <Icon name="Star"        size="sm" color="accent"   />
              <Icon name="Check"       size="sm" color="default"  />
              <Icon name="CircleAlert" size="sm" color="muted"    />
              <Icon name="Search"      size="sm" color="muted"    />
            </BlockContent>
          </DSBlock>

          {/* § Buttons */}
          <DSBlock className="ds-block">
            <BlockLabel variant="overline" as="span">Button</BlockLabel>
            <BlockContent>
              <Button variant="solid"    size="md">Empezar sesión</Button>
              <Button variant="outlined" size="md">Ver catálogo</Button>
              <Button variant="ghost"    size="md">Cancelar</Button>
              <Button variant="solid"    size="md" isLoading>Cargando</Button>
              <Button variant="solid"    size="md" disabled>Desactivado</Button>
            </BlockContent>
          </DSBlock>

          {/* § Sizes */}
          <DSBlock className="ds-block">
            <BlockLabel variant="overline" as="span">Button sizes</BlockLabel>
            <BlockContent $align="center">
              <Button variant="solid" size="sm">Small</Button>
              <Button variant="solid" size="md">Medium</Button>
              <Button variant="solid" size="lg">Large</Button>
            </BlockContent>
          </DSBlock>

          {/* § Badges */}
          <DSBlock className="ds-block">
            <BlockLabel variant="overline" as="span">Badge</BlockLabel>
            <BlockContent>
              <Badge variant="default">Default</Badge>
              <Badge variant="accent">Fuerza</Badge>
              <Badge variant="success">Completado</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="warning">Pendiente</Badge>
              <Badge variant="solid">Nuevo</Badge>
            </BlockContent>
          </DSBlock>

          {/* § Tags */}
          <DSBlock className="ds-block">
            <BlockLabel variant="overline" as="span">Tag — interactivos</BlockLabel>
            <BlockContent>
              {['fuerza', 'cardio', 'yoga', 'pilates', 'hiit'].map(t => (
                <Tag
                  key={t}
                  variant={activeTag === t ? 'selected' : 'default'}
                  onClick={() => setActiveTag(t)}
                >
                  {t}
                </Tag>
              ))}
            </BlockContent>
          </DSBlock>

          {/* § Avatars */}
          <DSBlock className="ds-block">
            <BlockLabel variant="overline" as="span">Avatar + AvatarGroup</BlockLabel>
            <BlockContent $align="center" $gap="l">
              <Avatar name="Juan Antonio Amate" size="xs" />
              <Avatar name="María García"       size="sm" status="online" />
              <Avatar name="Laura Fernández"    size="md" status="busy" />
              <Avatar name="Ana Martínez"       size="lg" ring />
              <Divider />
              <AvatarGroup users={MOCK_USERS} max={4} size="md" />
            </BlockContent>
          </DSBlock>

          {/* § Input */}
          <DSBlock className="ds-block" $wide>
            <BlockLabel variant="overline" as="span">Input</BlockLabel>
            <InputGrid>
              <Input
                label="Email"
                type="email"
                placeholder="tu@email.com"
                leftIcon={<Icon name="Mail" size="sm" color="inherit" />}
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                clearable
              />
              <Input
                label="Contraseña"
                type="password"
                placeholder="••••••••"
                leftIcon={<Icon name="Lock" size="sm" color="inherit" />}
                helperText="Mínimo 8 caracteres"
              />
              <Input
                label="Email incorrecto"
                type="email"
                value="email-incorrecto"
                readOnly
                errorText="Este email no está registrado"
                leftIcon={<Icon name="Mail" size="sm" color="inherit" />}
              />
              <Input
                label="Campo validado"
                value="juanan_kore"
                readOnly
                successText="Nombre de usuario disponible"
                leftIcon={<Icon name="User" size="sm" color="inherit" />}
              />
            </InputGrid>
          </DSBlock>

          {/* § Typography */}
          <DSBlock className="ds-block" $wide>
            <BlockLabel variant="overline" as="span">Text — variantes tipográficas</BlockLabel>
            <TypoList>
              <Text variant="display">Display · KORE</Text>
              <Text variant="h1">Heading 1 · Entrenamiento funcional</Text>
              <Text variant="h2">Heading 2 · Sesiones de fuerza</Text>
              <Text variant="h3">Heading 3 · Full body con peso libre</Text>
              <Text variant="overline">Overline · Fuerza · 45 min · Intermedio</Text>
              <Text variant="body">Body · Una sesión para activar todo el cuerpo. Sin excusas, sin límites.</Text>
              <Text variant="body-light">Body Light · Disponible para nuevos proyectos y oportunidades.</Text>
              <Text variant="body-sm">Body Small · Diseñado para mujeres que entrenan con intención.</Text>
              <Text variant="caption">Caption · Última sesión hace 2 días</Text>
            </TypoList>
          </DSBlock>

          {/* § Tokens */}
          <DSBlock className="ds-block" $wide>
            <BlockLabel variant="overline" as="span">Color tokens — {isDark ? 'dark' : 'light'} theme</BlockLabel>
            <TokenGrid>
              {[
                { label: 'background-surface-low',    var: '--background-surface-low'    },
                { label: 'background-surface-solid',  var: '--background-surface-solid'  },
                { label: 'background-accent-solid',   var: '--background-accent-solid'   },
                { label: 'background-accent-dim',     var: '--background-accent-dim'     },
                { label: 'foreground-primary',        var: '--foreground-primary-on-surface' },
                { label: 'foreground-accent',         var: '--foreground-accent-on-surface'  },
                { label: 'stroke-secondary',          var: '--stroke-secondary-on-surface'   },
                { label: 'stroke-accent',             var: '--stroke-accent'                 },
              ].map(token => (
                <TokenChip key={token.var}>
                  <TokenSwatch style={{ background: `var(${token.var})` }} />
                  <TokenName>{token.label}</TokenName>
                </TokenChip>
              ))}
            </TokenGrid>
          </DSBlock>

        </ShowcaseCanvas>

        {/* Footer stats */}
        <StatsRow>
          {[
            { num: '15',   label: 'Componentes' },
            { num: '2',    label: 'Packages'    },
            { num: '164',  label: 'CSS vars'    },
            { num: '100%', label: 'TypeScript'  },
          ].map(stat => (
            <StatItem key={stat.label}>
              <StatNum variant="display" as="span">{stat.num}</StatNum>
              <StatLabel variant="overline" as="span">{stat.label}</StatLabel>
            </StatItem>
          ))}
        </StatsRow>

      </Container>
    </Section>
  )
}

// ── Styled ─────────────────────────────────────────────────────────────────
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
  align-items:     flex-start;
  justify-content: space-between;
  flex-wrap:       wrap;
  gap:             var(--spacing-l);
  margin-bottom:   clamp(2rem, 5vw, 4rem);
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
    border-radius: var(--radius-xs);
    background:    var(--background-surface-solid);
    color:         var(--foreground-accent-on-surface);
    border:        0.5px solid var(--stroke-secondary-on-surface);
    font-family:   monospace;
  }
`

const HeaderActions = styled.div`
  display:     flex;
  align-items: center;
  gap:         var(--spacing-s);
  flex-shrink: 0;
`

const ThemeToggle = styled.button`
  display:        flex;
  align-items:    center;
  gap:            var(--spacing-xs);
  padding:        var(--spacing-xs) var(--spacing-m);
  border-radius:  var(--radius-full);
  border:         0.5px solid var(--stroke-secondary-on-surface);
  background:     var(--background-surface-solid);
  color:          var(--foreground-secondary-on-surface);
  font-family:    var(--font-family-ui);
  font-size:      var(--scale-s);
  font-weight:    var(--font-weight-semibold);
  cursor:         pointer;
  transition:     border-color 150ms, color 150ms;
  &:hover {
    border-color: var(--stroke-accent);
    color:        var(--foreground-accent-on-surface);
  }
`

const StorybookLink = styled.a`
  display:        flex;
  align-items:    center;
  gap:            var(--spacing-xs);
  padding:        var(--spacing-xs) var(--spacing-m);
  border-radius:  var(--radius-full);
  border:         0.5px solid var(--stroke-accent-dim);
  background:     var(--background-accent-dim);
  color:          var(--foreground-accent-on-surface);
  font-family:    var(--font-family-ui);
  font-size:      var(--scale-s);
  font-weight:    var(--font-weight-semibold);
  text-decoration: none;
  transition:     background 150ms;
  &:hover { background: color-mix(in srgb, var(--background-accent-dim), var(--background-accent-solid) 15%); }
`

const ShowcaseCanvas = styled.div<{ $isDark: boolean }>`
  background:    ${({ $isDark }) => $isDark ? '#1A1A1A' : 'var(--background-surface-solid)'};
  border-radius: var(--corners-default-card);
  border:        0.5px solid var(--stroke-secondary-on-surface);
  padding:       var(--spacing-xl);
  display:       grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap:           var(--spacing-m);
  transition:    background 300ms ease;
`

const DSBlock = styled.div<{ $wide?: boolean }>`
  display:        flex;
  flex-direction: column;
  gap:            var(--spacing-m);
  padding:        var(--spacing-l);
  border-radius:  var(--radius-m);
  background:     var(--background-surface-low);
  border:         0.5px solid var(--stroke-secondary-on-surface);
  visibility:     visible;
  ${({ $wide }) => $wide && `
    grid-column: 1 / -1;
  `}
`

const BlockLabel = styled(Text)`
  color: var(--foreground-tertiary-on-surface);
`

const BlockContent = styled.div<{ $align?: string; $gap?: string }>`
  display:     flex;
  flex-wrap:   wrap;
  align-items: ${({ $align }) => $align ?? 'flex-start'};
  gap:         ${({ $gap }) => $gap === 'l' ? 'var(--spacing-l)' : 'var(--spacing-s)'};
`

const Divider = styled.div`
  width:  1px;
  height: 40px;
  background: var(--stroke-secondary-on-surface);
`

const TypoList = styled.div`
  display:        flex;
  flex-direction: column;
  gap:            var(--spacing-m);
`

const InputGrid = styled.div`
  display:               grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap:                   var(--spacing-m);
`

const TokenGrid = styled.div`
  display:               grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap:                   var(--spacing-s);
`

const TokenChip = styled.div`
  display:     flex;
  align-items: center;
  gap:         var(--spacing-xs);
`

const TokenSwatch = styled.div`
  width:        var(--spacing-l);
  height:       var(--spacing-l);
  border-radius: var(--radius-xs);
  border:        0.5px solid var(--stroke-secondary-on-surface);
  flex-shrink:   0;
`

const TokenName = styled.span`
  font-family: monospace;
  font-size:   10px;
  color:       var(--foreground-secondary-on-surface);
  line-height: 1.3;
`

const StatsRow = styled.div`
  display:               grid;
  grid-template-columns: repeat(4, 1fr);
  gap:                   var(--spacing-m);
  margin-top:            clamp(2rem, 4vw, 3rem);
  text-align:            center;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const StatItem = styled.div`
  display:        flex;
  flex-direction: column;
  gap:            var(--spacing-2xs);
  padding:        var(--spacing-l);
  border-radius:  var(--corners-default-card);
  border:         0.5px solid var(--stroke-secondary-on-surface);
`

const StatNum = styled(Text)`
  font-size:   clamp(2rem, 4vw, 3rem);
  color:       var(--foreground-accent-on-surface);
  line-height: 1;
`

const StatLabel = styled(Text)`
  color: var(--foreground-secondary-on-surface);
`

export default DesignSystemShowcase
