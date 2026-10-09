'use client'

/**
 * KORE Portfolio — Otros proyectos
 *
 * Lo que hay fuera de KORE: starpoint (en producción con usuarios reales) y
 * Color Palette Generator (despliegue completo en Google Cloud). Mismo patrón
 * de sección que el resto del portfolio: tokens de @kore/tokens y Text de @kore/ui-web.
 */

import Image  from 'next/image'
import styled from '@emotion/styled'
import { Text } from '@kore/ui-web'

interface Project {
  name: string
  tagline: string
  description: string
  stack: string[]
  image: string
  imageAlt: string
  links: { label: string; href: string }[]
}

const PROJECTS: Project[] = [
  {
    name: 'starpoint',
    tagline: 'PWA en producción · 2026',
    description:
      'La app que usa un grupo real de pádel: unos 30 jugadores, un mixing semanal y más de 130 partidos registrados. Algoritmo de emparejamiento y ranking ELO para dobles validados con tests, seguridad con RLS y funciones atómicas en PostgreSQL, notificaciones push y design system propio.',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Supabase', 'PostgreSQL', 'Vitest'],
    image: '/projects/starpoint.png',
    imageAlt: 'starpoint: la demo en vivo con capturas de la app',
    links: [
      { label: 'Demo', href: 'https://star-point-demo.vercel.app' },
      { label: 'Caso de estudio', href: 'https://github.com/amat3/star-point/blob/main/docs/caso-de-estudio.md' },
      { label: 'Código', href: 'https://github.com/amat3/star-point' },
    ],
  },
  {
    name: 'Color Palette Generator',
    tagline: 'Design tokens en Google Cloud · 2026',
    description:
      'Genera una escala de tonos a partir de un color base y la exporta como design tokens en JSON y variables CSS. Entrega completa: imagen Docker multi-stage, CI/CD con Cloud Build, Cloud Run e infraestructura como código con Terraform.',
    stack: ['Next.js', 'TypeScript', 'Docker', 'Cloud Run', 'Terraform'],
    image: '/projects/color-palette-generator.png',
    imageAlt: 'Color Palette Generator: una escala de violetas con sus códigos y el JSON exportado',
    links: [
      { label: 'Demo', href: 'https://color-palette-generator-2dobv4kxqa-no.a.run.app' },
      { label: 'Código', href: 'https://github.com/amat3/color-palette-generator' },
    ],
  },
]

const ProjectsSection = () => (
  <Section>
    <Container>
      <Heading>
        <SectionOverline variant="overline" as="span">Otros proyectos</SectionOverline>
        <SectionTitle variant="h1" as="h2">
          Más allá de <em>KORE</em>
        </SectionTitle>
        <SectionSubtitle variant="body-light">
          Producto real con usuarios y despliegue en la nube, con el código abierto para revisarlo.
        </SectionSubtitle>
      </Heading>

      <Grid>
        {PROJECTS.map(project => (
          <Card key={project.name}>
            <Thumb>
              <Image
                src={project.image}
                alt={project.imageAlt}
                width={1280}
                height={640}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </Thumb>
            <Body>
              <Text variant="overline" as="span">{project.tagline}</Text>
              <ProjectName variant="h3" as="h3">{project.name}</ProjectName>
              <Description variant="body-sm">{project.description}</Description>
              <Stack>
                {project.stack.map(tech => <Chip key={tech}>{tech}</Chip>)}
              </Stack>
              <Links>
                {project.links.map(link => (
                  <ProjectLink key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label} ↗
                  </ProjectLink>
                ))}
              </Links>
            </Body>
          </Card>
        ))}
      </Grid>
    </Container>
  </Section>
)

// ── Styled ────────────────────────────────────────────────────────────────
const Section = styled.section`
  padding-block: var(--layout-section-pad);
`

const Container = styled.div`
  max-width:      var(--container-xl);
  margin:         0 auto;
  padding-inline: var(--layout-gutter);
`

const Heading = styled.div`
  margin-bottom: clamp(2.5rem, 5vw, 4rem);
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

const Grid = styled.div`
  display:               grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 22rem), 1fr));
  gap:                   var(--spacing-l);
`

const Card = styled.article`
  display:        flex;
  flex-direction: column;
  overflow:       hidden;
  border:         0.5px solid var(--stroke-secondary-on-surface);
  border-radius:  var(--radius-xl);
  background:     var(--background-surface-solid);
`

const Thumb = styled.div`
  aspect-ratio: 2 / 1;
  overflow:     hidden;
  border-bottom: 0.5px solid var(--stroke-secondary-on-surface);

  img {
    display:    block;
    width:      100%;
    height:     100%;
    object-fit: cover;
  }
`

const Body = styled.div`
  display:        flex;
  flex:           1;
  flex-direction: column;
  gap:            var(--spacing-s);
  padding:        var(--spacing-l);
`

const ProjectName = styled(Text)`
  margin: 0;
`

const Description = styled(Text)`
  color: var(--foreground-secondary-on-surface);
`

const Stack = styled.div`
  display:   flex;
  flex-wrap: wrap;
  gap:       var(--spacing-2xs);
`

const Chip = styled.span`
  padding:       var(--spacing-3xs) var(--spacing-s);
  border-radius: var(--radius-full);
  border:        0.5px solid var(--stroke-secondary-on-surface);
  font-family:   var(--font-family-ui);
  font-size:     var(--scale-xs);
  font-weight:   var(--font-weight-semibold);
  color:         var(--foreground-primary-on-surface);
`

const Links = styled.div`
  display:    flex;
  flex-wrap:  wrap;
  gap:        var(--spacing-m);
  margin-top: auto;
  padding-top: var(--spacing-s);
`

const ProjectLink = styled.a`
  font-family:     var(--font-family-ui);
  font-size:       var(--scale-s);
  font-weight:     var(--font-weight-semibold);
  color:           var(--foreground-accent-on-surface);
  text-decoration: none;
  &:hover { text-decoration: underline; }
`

export default ProjectsSection
