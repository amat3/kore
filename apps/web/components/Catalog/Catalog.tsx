'use client'

/**
 * KORE — Catalog Section §03
 *
 * WorkoutCards con datos reales de Firestore.
 * FilterBar funcional con búsqueda y filtros por categoría.
 * Skeleton loading mientras carga.
 */

import { useState } from 'react'
import Link   from 'next/link'
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/react'
import { WorkoutCard, FilterBar, Text } from '@kore/ui-web'
import { useWorkouts }    from '@/hooks/useWorkouts'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { toggleFavorite } from '@/store/workoutsSlice'

// ── Skeleton animation ────────────────────────────────────────────────────
const shimmer = keyframes`
  0%   { background-position: -400px 0; }
  100% { background-position:  400px 0; }
`

// ── Skeleton card ─────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <SkeletonWrapper>
    <SkeletonImage />
    <SkeletonBody>
      <SkeletonLine $width="40%" $height="10px" />
      <SkeletonLine $width="80%" $height="20px" />
      <SkeletonLine $width="55%" $height="10px" />
    </SkeletonBody>
  </SkeletonWrapper>
)

// ── Componente principal ──────────────────────────────────────────────────
const Catalog = () => {
  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState<string[]>([])

  const dispatch  = useAppDispatch()
  const favorites = useAppSelector(state => state.workouts.favorites)

  const {
    workouts,
    loading,
    error,
    categories: allCategories,
  } = useWorkouts({
    search,
    categories,
  })

  const filters = allCategories.map((cat) => ({
    id: cat.toLowerCase(),
    label: cat,
    selected: categories.includes(cat),
  }))

  const handleFilterToggle = (id: string) => {
    const cat = allCategories.find((c) => c.toLowerCase() === id)
    if (!cat) return
    setCategories((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]))
  }

  return (
    <Section>
      <Container id="catalog">
        {/* Heading */}
        <HeadingWrapper>
          <SectionOverline variant="overline" as="span">Entrenamientos</SectionOverline>
          <SectionTitle variant="h1" as="h2">
            Entrena con <em>propósito</em>
          </SectionTitle>
          <SectionSubtitle variant="body-light">
            Sesiones diseñadas para cada nivel. Filtra por categoría o busca lo que necesitas hoy.
          </SectionSubtitle>
        </HeadingWrapper>

        {/* FilterBar */}
        <FilterBarWrapper>
          <FilterBar
            filters={filters}
            searchPlaceholder="Busca entrenamientos..."
            onSearch={setSearch}
            onFilterToggle={handleFilterToggle}
            searchValue={search}
          />
        </FilterBarWrapper>

        {/* Resultados */}
        {error ? (
          <ErrorState variant="body">No se pudieron cargar los entrenamientos. Inténtalo de nuevo.</ErrorState>
        ) : loading ? (
          <Grid>
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </Grid>
        ) : workouts.length === 0 ? (
          <EmptyState>
            <EmptyIcon>🔍</EmptyIcon>
            <EmptyTitle variant="h3">Sin resultados</EmptyTitle>
            <EmptyText variant="body">Prueba con otros filtros o busca otra cosa.</EmptyText>
          </EmptyState>
        ) : (
          <>
            <ResultsCount variant="body-sm">
              {workouts.length} entrenamiento{workouts.length !== 1 ? 's' : ''}
            </ResultsCount>
            <Grid>
              {workouts.map((workout) => (
                <CardLink key={workout.id} href={`/workouts/${workout.id}`}>
                  <WorkoutCard
                    title={workout.title}
                    category={workout.category}
                    duration={workout.duration}
                    level={workout.level}
                    imageSrc={workout.imageSrc}
                    favorited={favorites.includes(workout.id)}
                    onFavorite={() => dispatch(toggleFavorite(workout.id))}
                  />
                </CardLink>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </Section>
  )
}

// ── Styled ────────────────────────────────────────────────────────────────
const Section = styled.section`
  background-color: var(--background-surface-low);
  padding-block: clamp(4rem, 10vw, 8rem);
  border-top: 0.5px solid var(--stroke-secondary-on-surface);
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-inline: var(--spacing-l);
  @media (min-width: 600px) {
    padding-inline: var(--spacing-2xl);
  }
  @media (min-width: 1200px) {
    padding-inline: var(--spacing-3xl);
  }
`

const HeadingWrapper = styled.div`
  margin-bottom: clamp(2rem, 4vw, 3rem);
`

const SectionOverline = styled(Text)`
  display:       block;
  margin-bottom: var(--spacing-m);
`

const SectionTitle = styled(Text)`
  font-size:   clamp(2rem, 5vw, 4rem);
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

const FilterBarWrapper = styled.div`
  margin-bottom: var(--spacing-xl);
`

const ResultsCount = styled(Text)`
  color:  var(--foreground-tertiary-on-surface);
  margin: 0 0 var(--spacing-m);
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: var(--spacing-m);
`

const CardLink = styled(Link)`
  display:         block;
  text-decoration: none;
  color:           inherit;
  border-radius:   var(--corners-default-card);
`

// ── Skeleton ──────────────────────────────────────────────────────────────
const skeletonBase = css`
  background: linear-gradient(
    90deg,
    var(--background-surface-solid) 0px,
    var(--background-action-hover) 40px,
    var(--background-surface-solid) 80px
  );
  background-size: 400px 100%;
  animation: ${shimmer} 1.4s ease infinite;
`

const SkeletonWrapper = styled.div`
  border-radius: var(--corners-default-card);
  border: 0.5px solid var(--stroke-secondary-on-surface);
  overflow: hidden;
  background: var(--background-surface-solid);
`

const SkeletonImage = styled.div`
  aspect-ratio: 4 / 3;
  ${skeletonBase}
`

const SkeletonBody = styled.div`
  padding: var(--spacing-m);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-s);
`

const SkeletonLine = styled.div<{ $width: string; $height: string }>`
  height: ${({ $height }) => $height};
  width: ${({ $width }) => $width};
  border-radius: var(--radius-xs);
  ${skeletonBase}
`

// ── Empty / Error ─────────────────────────────────────────────────────────
const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: clamp(3rem, 8vw, 6rem);
  text-align: center;
  gap: var(--spacing-m);
`

const EmptyIcon = styled.span`
  font-size: 2.5rem;
`

const EmptyTitle = styled(Text)`
  margin: 0;
`

const EmptyText = styled(Text)`
  color: var(--foreground-secondary-on-surface);
`

const ErrorState = styled(Text)`
  color:      var(--foreground-error-on-surface);
  text-align: center;
  padding:    var(--spacing-2xl);
`

export default Catalog
