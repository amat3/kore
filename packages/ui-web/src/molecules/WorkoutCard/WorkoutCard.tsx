'use client'

import styled  from '@emotion/styled'
import Card    from '../../atoms/Card/Card'
import Icon    from '../../atoms/Icon/Icon'

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

    <ImageWrapper className="kore-card-image">
      {imageSrc ? (
        <img src={imageSrc} alt={imageAlt ?? title} loading="lazy" />
      ) : (
        <Placeholder>
          <Icon name="Dumbbell" size="lg" color="muted" />
        </Placeholder>
      )}

      {completed && (
        <CompletedBadge aria-label="Completado">
          <Icon name="Check" size="xs" color="inherit" />
        </CompletedBadge>
      )}

      {favorited && (
        <FavoriteBadge aria-label="Favorito">
          <Icon name="Heart" size="sm" color="inherit" />
        </FavoriteBadge>
      )}
    </ImageWrapper>

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
  color:    var(--foreground-accent-on-surface);
  filter:   drop-shadow(0 1px 2px rgba(0,0,0,0.2));
`

export default WorkoutCard
