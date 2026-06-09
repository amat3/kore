'use client'

import styled        from '@emotion/styled'
import { breakpoints } from '@kore/tokens'
import Link          from 'next/link'
import { Icon, Text } from '@kore/ui-web'
import KoreWordmark  from '@/components/KoreWordmark/KoreWordmark'

// ── Componente ────────────────────────────────────────────────────────────
const Footer = ({ surface = 'low' }: { surface?: 'low' | 'solid' }) => (
  <FooterEl $surface={surface}>
    <Container>

      <Grid>

        {/* Brand */}
        <BrandCol>
          <Logo href="/"><KoreWordmark fontSize="var(--scale-3xl)" /></Logo>
          <Tagline variant="body-light">Entrena sin límites.</Tagline>
        </BrandCol>

        {/* Producto */}
        <NavCol>
          <ColTitle variant="overline" as="span">Producto</ColTitle>
          <NavList>
            <li><NavLink href="/workouts">Entrenamientos</NavLink></li>
            <li><NavLink href="/register">Empezar gratis</NavLink></li>
            <li><NavLink href="/login">Acceder</NavLink></li>
          </NavList>
        </NavCol>

        {/* Portfolio */}
        <NavCol>
          <ColTitle variant="overline" as="span">Portfolio</ColTitle>
          <NavList>
            <li><NavLink href="/portfolio">Ver portfolio</NavLink></li>
            <li><NavLink href="/portfolio#catalog">Stack técnico</NavLink></li>
          </NavList>
        </NavCol>

        {/* Contacto */}
        <NavCol>
          <ColTitle variant="overline" as="span">Contacto</ColTitle>
          <SocialList>
            <li>
              <SocialLink
                href="https://linkedin.com/in/juanan-amate-react"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BrandIcon viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </BrandIcon>
                LinkedIn
              </SocialLink>
            </li>
            <li>
              <SocialLink
                href="https://github.com/amat3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BrandIcon viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </BrandIcon>
                GitHub
              </SocialLink>
            </li>
            <li>
              <SocialLink href="mailto:juanantamate@gmail.com">
                <Icon name="Mail" size="xs" color="inherit" />
                juanantamate@gmail.com
              </SocialLink>
            </li>
          </SocialList>
        </NavCol>

      </Grid>

      <Bottom>
        <Copyright variant="caption">© 2025 Juan Antonio Amate · Diseño y desarrollo propio</Copyright>
        <LegalNote variant="caption">Construido con Next.js, React y mucho café.</LegalNote>
      </Bottom>

    </Container>
  </FooterEl>
)

// ── Layout ────────────────────────────────────────────────────────────────
const FooterEl = styled.footer<{ $surface: 'low' | 'solid' }>`
  background-color: ${({ $surface }) =>
    $surface === 'solid' ? 'var(--background-surface-solid)' : 'var(--background-surface-low)'};
  padding-block:    clamp(3rem, 6vw, 5rem) clamp(2rem, 4vw, 3rem);
`

const Container = styled.div`
  max-width:      var(--container-xl);
  margin:         0 auto;
  padding-inline: var(--layout-gutter);
`

const Grid = styled.div`
  display:               grid;
  grid-template-columns: 1fr;
  gap:                   var(--spacing-2xl);

  @media (min-width: ${breakpoints.tablet}px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: ${breakpoints.desktop}px) {
    grid-template-columns: 2fr 1fr 1fr 1fr;
    align-items: start;
  }
`

const BrandCol = styled.div`
  display:        flex;
  flex-direction: column;
  gap:            var(--spacing-s);
`

// ── Tipografía via Text — solo override lo que difiere del variant ────────

// Logo: elemento de navegación — no es tipografía pura, se queda como Link
const Logo = styled(Link)`
  display:         inline-flex;
  text-decoration: none;
  line-height:     1;
`

// Tagline: body-light + color terciario
const Tagline = styled(Text)`
  color: var(--foreground-tertiary-on-surface);
`

// ColTitle: overline + color secundario (no el acento/terracota del variant)
const ColTitle = styled(Text)`
  color: var(--foreground-secondary-on-surface);
`

// Copyright / LegalNote: caption + color terciario
const Copyright = styled(Text)`
  color: var(--foreground-tertiary-on-surface);
`

const LegalNote = styled(Text)`
  color:   var(--foreground-tertiary-on-surface);
  opacity: 0.6;
`

// ── Navegación — styled links, no tipografía pura ─────────────────────────

const NavCol = styled.div`
  display:        flex;
  flex-direction: column;
  gap:            var(--spacing-m);
`

const NavList = styled.ul`
  list-style: none;
  margin:     0;
  padding:    0;
  display:    flex;
  flex-direction: column;
  gap:        var(--spacing-s);
`

const NavLink = styled(Link)`
  font-family:     var(--font-family-ui);
  font-size:       var(--scale-s);
  font-weight:     var(--font-weight-regular);
  color:           var(--foreground-tertiary-on-surface);
  text-decoration: none;
  transition:      color 150ms;

  @media (hover: hover) {
    &:hover { color: var(--foreground-accent-on-surface); }
  }
`

const SocialList = styled.ul`
  list-style: none;
  margin:     0;
  padding:    0;
  display:    flex;
  flex-direction: column;
  gap:        var(--spacing-s);
`

const SocialLink = styled.a`
  display:         flex;
  align-items:     center;
  gap:             var(--spacing-xs);
  font-family:     var(--font-family-ui);
  font-size:       var(--scale-s);
  font-weight:     var(--font-weight-regular);
  color:           var(--foreground-tertiary-on-surface);
  text-decoration: none;
  transition:      color 150ms;

  @media (hover: hover) {
    &:hover { color: var(--foreground-accent-on-surface); }
  }
`

const BrandIcon = styled.svg`
  width:       14px;
  height:      14px;
  fill:        currentColor;
  flex-shrink: 0;
`

const Bottom = styled.div`
  display:         flex;
  align-items:     center;
  justify-content: space-between;
  flex-wrap:       wrap;
  gap:             var(--spacing-m);
  margin-top:      clamp(2rem, 4vw, 3rem);
  padding-top:     var(--spacing-xl);
  border-top:      0.5px solid var(--stroke-secondary-on-surface);
`

export default Footer
