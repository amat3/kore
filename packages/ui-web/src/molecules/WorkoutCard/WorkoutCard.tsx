'use client'

/**
 * @kore/ui-web — WorkoutCard
 * Consume el átomo Card como contenedor base.
 */

import styled         from '@emotion/styled'
import Card           from '../../atoms/Card/Card'

// ── Icono placeholder ─────────────────────────────────────────────────────
const DumbbellIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M6 5v14M18 5v14M8 8H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h4M16 8h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-4M8 12h8"/>
  </svg>
)

// ── Tipos ─────────────────────────────────────────────────────────────────
export type WorkoutLevel = 'beginner' | 'intermediate' | 'advanced'

const levelLabel: Record<WorkoutLevel, string> = {
  beginner:     'Principiante',
  intermediate: 'Intermedio',
  advanced:     'Avanzado',
}

export interface WorkoutCardProps {
  title:      string
  category:   string
  duration:   number
  level?:     WorkoutLevel
  imageSrc?:  string
  imageAlt?:  string
  onClick?:   () => void
  completed?: boolean
  favorited?: boolean
  className?: string
}

// ── Componente ────────────────────────────────────────────────────────────
const WorkoutCard = ({
  title,
  category,
  duration,
  level,
  imageSrc,
  imageAlt,
  onClick,
  completed = false,
  favorited = false,
  className,
}: WorkoutCardProps) => (
  <Card
    interactive={!!onClick}
    onClick={onClick}
    className={`${className ?? ''} kore-workout-card`}
    aria-label={`${title} — ${category}, ${duration} minutos`}
    role="article"
  >

    {/* ── Imagen ─────────────────────────────────────────────── */}
    <ImageWrapper className="kore-card-image">
      {imageSrc ? (
        <img src={imageSrc} alt={imageAlt ?? title} loading="lazy" />
      ) : (
        <Placeholder><DumbbellIcon /></Placeholder>
      )}

      {completed && (
        <CompletedBadge aria-label="Completado">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </CompletedBadge>
      )}

      {favorited && (
        <FavoriteBadge aria-label="Favorito">
          <svg width="12" height="12" viewBox="0 0 24 24"
            fill="currentColor" stroke="none" aria-hidden="true">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </FavoriteBadge>
      )}
    </ImageWrapper>

    {/* ── Body ───────────────────────────────────────────────── */}
    <Body>
      <Overline>{category}</Overline>
      <Title>{title}</Title>
      <MetaRow>
        <MetaText>{duration} min</MetaText>
        {level && (
          <>
            <MetaDot aria-hidden="true">·</MetaDot>
            <MetaText>{levelLabel[level]}</MetaText>
          </>
        )}
      </MetaRow>
    </Body>

  </Card>
)

// ── Styled components ─────────────────────────────────────────────────────
const ImageWrapper = styled.div`
  position:     relative;
  width:        100%;
  aspect-ratio: 4 / 3;
  overflow:     hidden;
  background:   var(--background-surface-solid);

  img {
    width:      100%;
    height:     100%;
    object-fit: cover;
    display:    block;
    transition: transform 400ms ease;
  }

  @media (hover: hover) {
    .kore-workout-card:hover & img {
      transform: scale(1.03);
    }
  }
`

const Placeholder = styled.div`
  width:           100%;
  height:          100%;
  display:         flex;
  align-items:     center;
  justify-content: center;
  color:           var(--foreground-tertiary-on-surface);
`

const Body = styled.div`
  display:        flex;
  flex-direction: column;
  gap:            var(--spacing-2xs);
  padding:        var(--spacing-m);
`

const MetaRow = styled.div`
  display:     flex;
  align-items: center;
  gap:         var(--spacing-xs);
`

const Overline = styled.span`
  font-family:    var(--font-family-ui);
  font-size:      var(--scale-xs);
  font-weight:    var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
  color:          var(--foreground-accent-on-surface);
  line-height:    1;
`

const Title = styled.h3`
  font-family:        var(--font-family-display);
  font-size:          var(--scale-2xl);
  font-weight:        var(--font-weight-semibold);
  letter-spacing:     var(--letter-spacing-dense);
  color:              var(--foreground-primary-on-surface);
  line-height:        var(--line-height-dense);
  margin:             0;
  display:            -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow:           hidden;
`

const MetaText = styled.span`
  font-family: var(--font-family-ui);
  font-size:   var(--scale-s);
  font-weight: var(--font-weight-light);
  color:       var(--foreground-secondary-on-surface);
  line-height: 1;
`

const MetaDot = styled.span`
  color:       var(--foreground-tertiary-on-surface);
  font-size:   var(--scale-s);
  line-height: 1;
`

const CompletedBadge = styled.div`
  position:         absolute;
  top:              var(--spacing-xs);
  right:            var(--spacing-xs);
  width:            24px;
  height:           24px;
  border-radius:    50%;
  background-color: var(--background-success-solid);
  color:            #fff;
  display:          flex;
  align-items:      center;
  justify-content:  center;
`

const FavoriteBadge = styled.div`
  position: absolute;
  top:      var(--spacing-xs);
  left:     var(--spacing-xs);
  color:    #B05E3A;
  filter:   drop-shadow(0 1px 2px rgba(0,0,0,0.2));
`

export default WorkoutCard
