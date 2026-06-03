'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { doc, getDoc }          from 'firebase/firestore'
import { db }                   from '@/lib/firebase'
import styled                   from '@emotion/styled'
import { motion, type Variants } from 'framer-motion'
import { Icon, Text, Badge }    from '@kore/ui-web'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { toggleFavorite }       from '@/store/workoutsSlice'
import type { Workout }         from '@/hooks/useWorkouts'

// ── Variantes ─────────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
}

// ── Helpers ───────────────────────────────────────────────────────────────
const levelLabel: Record<string, string> = {
  beginner:     'Principiante',
  intermediate: 'Intermedio',
  advanced:     'Avanzado',
}

const levelVariant: Record<string, 'default' | 'accent' | 'warning' | 'error'> = {
  beginner:     'default',
  intermediate: 'accent',
  advanced:     'error',
}

// ── Componente ────────────────────────────────────────────────────────────
export default function WorkoutDetailPage() {
  const { id }    = useParams<{ id: string }>()
  const router    = useRouter()
  const dispatch  = useAppDispatch()
  const favorites = useAppSelector(state => state.workouts.favorites)

  const [workout,    setWorkout]    = useState<Workout | null>(null)
  const [loading,    setLoading]    = useState(true)
  const [notFound,   setNotFound]   = useState(false)
  const [videoOpen,  setVideoOpen]  = useState(false)

  const isFavorite = workout ? favorites.includes(workout.id) : false

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setVideoOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!id) return
    getDoc(doc(db, 'workouts', id))
      .then(snap => {
        if (!snap.exists()) { setNotFound(true); return }
        setWorkout({ id: snap.id, ...snap.data() } as Workout)
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [id])

  if (loading)   return <LoadingWrapper><Icon name="Loader" size="lg" color="accent" /></LoadingWrapper>
  if (notFound)  return <LoadingWrapper><Text variant="body">Entrenamiento no encontrado.</Text></LoadingWrapper>
  if (!workout)  return null

  return (
    <Page>
      <Container>
        <motion.div variants={stagger} initial="hidden" animate="visible">

          {/* Back */}
          <motion.div variants={fadeUp}>
            <BackButton type="button" onClick={() => router.back()}>
              <Icon name="ArrowLeft" size="sm" color="inherit" />
              Volver al catálogo
            </BackButton>
          </motion.div>

          {/* Imagen */}
          <motion.div variants={fadeUp}>
            <ImageWrapper>
              {workout.imageSrc
                ? <img src={workout.imageSrc} alt={workout.title} />
                : <ImagePlaceholder><Icon name="Dumbbell" size="xl" color="muted" /></ImagePlaceholder>
              }
            </ImageWrapper>
          </motion.div>

          {/* Meta */}
          <motion.div variants={fadeUp}>
            <MetaRow>
              <Badge variant="accent">{workout.category}</Badge>
              <Badge variant={levelVariant[workout.level] ?? 'default'}>
                {levelLabel[workout.level] ?? workout.level}
              </Badge>
              <MetaChip>
                <Icon name="Clock" size="xs" color="inherit" />
                {workout.duration} min
              </MetaChip>
            </MetaRow>
          </motion.div>

          {/* Título + acciones */}
          <motion.div variants={fadeUp}>
            <TitleRow>
              <Title variant="h1" as="h1">{workout.title}</Title>
              <FavoriteBtn
                type="button"
                $active={isFavorite}
                onClick={() => dispatch(toggleFavorite(workout.id))}
                aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
              >
                <Icon name="Heart" size="md" color="inherit" />
              </FavoriteBtn>
            </TitleRow>
          </motion.div>

          {/* Descripción */}
          {workout.description && (
            <motion.div variants={fadeUp}>
              <Description variant="body-light">{workout.description}</Description>
            </motion.div>
          )}

          {/* CTA */}
          <motion.div variants={fadeUp}>
            <StartButton
              type="button"
              onClick={() => workout.videoUrl && setVideoOpen(true)}
              disabled={!workout.videoUrl}
            >
              <Icon name="Play" size="sm" color="inherit" />
              Empezar entrenamiento
            </StartButton>
          </motion.div>

        </motion.div>
      </Container>

      {/* Video overlay */}
      {videoOpen && workout.videoUrl && (
        <VideoOverlay onClick={() => setVideoOpen(false)}>
          <VideoModal onClick={e => e.stopPropagation()}>
            <CloseButton type="button" onClick={() => setVideoOpen(false)} aria-label="Cerrar vídeo">
              <Icon name="X" size="sm" color="inherit" />
            </CloseButton>
            <VideoWrapper>
              <iframe
                src={`${workout.videoUrl}?autoplay=1`}
                title={workout.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                allowFullScreen
              />
            </VideoWrapper>
          </VideoModal>
        </VideoOverlay>
      )}
    </Page>
  )
}

// ── Styled ────────────────────────────────────────────────────────────────
const Page = styled.main`
  min-height:       100svh;
  background-color: var(--background-surface-low);
  padding-top:      calc(56px + var(--spacing-2xl));
  padding-bottom:   var(--spacing-4xl);
`

const Container = styled.div`
  max-width:      760px;
  margin:         0 auto;
  padding-inline: var(--spacing-l);
  @media (min-width: 600px)  { padding-inline: var(--spacing-2xl); }
  @media (min-width: 1200px) { padding-inline: var(--spacing-3xl); }
`

const LoadingWrapper = styled.div`
  min-height:      100svh;
  display:         flex;
  align-items:     center;
  justify-content: center;
`

const BackButton = styled.button`
  display:     flex;
  align-items: center;
  gap:         var(--spacing-xs);
  background:  none;
  border:      none;
  cursor:      pointer;
  color:       var(--foreground-secondary-on-surface);
  font-family: var(--font-family-ui);
  font-size:   var(--scale-s);
  font-weight: var(--font-weight-semibold);
  padding:     0;
  margin-bottom: var(--spacing-xl);
  transition:  color 150ms;
  &:hover { color: var(--foreground-accent-on-surface); }
`

const ImageWrapper = styled.div`
  border-radius: var(--corners-default-card);
  overflow:      hidden;
  aspect-ratio:  16 / 9;
  margin-bottom: var(--spacing-xl);
  background:    var(--background-surface-solid);

  img {
    width:      100%;
    height:     100%;
    object-fit: cover;
    display:    block;
  }
`

const ImagePlaceholder = styled.div`
  width:           100%;
  height:          100%;
  display:         flex;
  align-items:     center;
  justify-content: center;
`

const MetaRow = styled.div`
  display:     flex;
  align-items: center;
  gap:         var(--spacing-s);
  flex-wrap:   wrap;
  margin-bottom: var(--spacing-m);
`

const MetaChip = styled.span`
  display:     flex;
  align-items: center;
  gap:         var(--spacing-2xs);
  font-family: var(--font-family-ui);
  font-size:   var(--scale-xs);
  font-weight: var(--font-weight-semibold);
  color:       var(--foreground-secondary-on-surface);
`

const TitleRow = styled.div`
  display:         flex;
  align-items:     flex-start;
  justify-content: space-between;
  gap:             var(--spacing-m);
  margin-bottom:   var(--spacing-l);
`

const Title = styled(Text)`
  font-size:   clamp(1.8rem, 4vw, 2.8rem);
  line-height: 1.1;
  margin:      0;
  flex:        1;
`

const FavoriteBtn = styled.button<{ $active: boolean }>`
  background:  ${({ $active }) => $active ? 'var(--background-accent-solid)' : 'var(--background-surface-solid)'};
  border:      0.5px solid ${({ $active }) => $active ? 'var(--stroke-accent)' : 'var(--stroke-secondary-on-surface)'};
  border-radius: 50%;
  width:       var(--sizing-3xl);
  height:      var(--sizing-3xl);
  display:     flex;
  align-items: center;
  justify-content: center;
  cursor:      pointer;
  color:       ${({ $active }) => $active ? '#F7F4F1' : 'var(--foreground-secondary-on-surface)'};
  flex-shrink: 0;
  transition:  background 150ms, border-color 150ms;
`

const Description = styled(Text)`
  color:         var(--foreground-secondary-on-surface);
  margin-bottom: var(--spacing-2xl);
  line-height:   var(--line-height-spacious);
`

const StartButton = styled.button`
  display:         flex;
  align-items:     center;
  justify-content: center;
  gap:             var(--spacing-s);
  width:           100%;
  padding:         var(--spacing-m) var(--spacing-2xl);
  border-radius:   var(--radius-full);
  border:          none;
  background:      var(--background-accent-solid);
  color:           var(--foreground-primary-on-accent);
  font-family:     var(--font-family-ui);
  font-size:       var(--scale-s);
  font-weight:     var(--font-weight-semibold);
  letter-spacing:  var(--letter-spacing-spacious);
  text-transform:  uppercase;
  cursor:          pointer;
  margin-bottom:   var(--spacing-2xl);
  transition:      background 200ms;

  @media (hover: hover) {
    &:hover { background: color-mix(in srgb, var(--background-accent-solid), black 12%); }
  }
`

const VideoOverlay = styled.div`
  position:        fixed;
  inset:           0;
  background:      var(--background-scrim-heavy);
  z-index:         200;
  display:         flex;
  align-items:     center;
  justify-content: center;
  padding:         var(--spacing-l);
  backdrop-filter: blur(8px);
`

const VideoModal = styled.div`
  position:      relative;
  width:         100%;
  max-width:     900px;
  border-radius: var(--corners-default-card);
  overflow:      hidden;
  box-shadow:    0 24px 80px rgba(0,0,0,0.6);
`

const CloseButton = styled.button`
  position:        absolute;
  top:             var(--spacing-s);
  right:           var(--spacing-s);
  z-index:         10;
  background:      rgba(0,0,0,0.6);
  border:          none;
  border-radius:   50%;
  width:           var(--sizing-2xl);
  height:          var(--sizing-2xl);
  display:         flex;
  align-items:     center;
  justify-content: center;
  cursor:          pointer;
  color:           #F7F4F1;
  backdrop-filter: blur(4px);
  transition:      background 150ms;
  &:hover { background: rgba(0,0,0,0.8); }
`

const VideoWrapper = styled.div`
  position:     relative;
  aspect-ratio: 16 / 9;
  background:   #000;

  iframe {
    position: absolute;
    inset:    0;
    width:    100%;
    height:   100%;
    border:   0;
  }
`
