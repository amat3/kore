'use client'

import styled        from '@emotion/styled'
import Link          from 'next/link'
import { Icon, Text } from '@kore/ui-web'

// ── Componente ────────────────────────────────────────────────────────────
const Footer = () => (
  <FooterEl>
    <Container>

      <Grid>

        {/* Brand */}
        <BrandCol>
          <Logo href="/">KORE</Logo>
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
                <Icon name="Link2" size="xs" color="inherit" />
                LinkedIn
              </SocialLink>
            </li>
            <li>
              <SocialLink
                href="https://github.com/amat3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="Code" size="xs" color="inherit" />
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
const FooterEl = styled.footer`
  background-color: var(--background-surface-low);
  border-top:       0.5px solid var(--stroke-secondary-on-surface);
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

  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1024px) {
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
  font-family:     var(--font-family-display);
  font-size:       var(--scale-3xl);
  font-weight:     var(--font-weight-light);
  letter-spacing:  var(--letter-spacing-wide);
  color:           var(--foreground-accent-on-surface);
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
