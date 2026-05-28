import type { Meta, StoryObj } from '@storybook/react'
import WorkoutCard               from './WorkoutCard'

const meta: Meta<typeof WorkoutCard> = {
  title:     'KORE/Molecules/WorkoutCard',
  component: WorkoutCard,
  tags:      ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    level: {
      control: 'select',
      options: ['beginner', 'intermediate', 'advanced'],
    },
    completed: { control: 'boolean' },
    favorited: { control: 'boolean' },
  },
  args: {
    title:    'Full body con peso libre',
    category: 'Fuerza',
    duration: 45,
    level:    'intermediate',
  },
  decorators: [
    Story => (
      <div style={{ maxWidth: 320 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof WorkoutCard>

// ── Default — sin imagen (placeholder) ───────────────────────────────────
export const Default: Story = {}

// ── Con imagen ────────────────────────────────────────────────────────────
export const WithImage: Story = {
  args: {
    imageSrc: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    imageAlt: 'Mujer haciendo ejercicio de fuerza',
  },
}

// ── Completado ────────────────────────────────────────────────────────────
export const Completed: Story = {
  args: {
    imageSrc:  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    completed: true,
  },
}

// ── Favorito ──────────────────────────────────────────────────────────────
export const Favorited: Story = {
  args: {
    imageSrc:  'https://images.unsplash.com/photo-1549476464-37392f717541?w=600&q=80',
    favorited: true,
    title:     'Yoga restaurativo',
    category:  'Yoga',
    duration:  30,
    level:     'beginner',
  },
}

// ── Niveles ───────────────────────────────────────────────────────────────
export const Levels: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
      <WorkoutCard title="Movilidad matutina"     category="Movilidad" duration={20} level="beginner"     />
      <WorkoutCard title="Full body peso libre"   category="Fuerza"    duration={45} level="intermediate" />
      <WorkoutCard title="HIIT explosivo"         category="Cardio"    duration={25} level="advanced"     />
    </div>
  ),
}

// ── Grid catálogo ─────────────────────────────────────────────────────────
export const CatalogGrid: Story = {
  name: 'Uso real — grid catálogo',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const workouts = [
      { title: 'Full body con peso libre',   category: 'Fuerza',      duration: 45, level: 'intermediate' as const, imageSrc: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80' },
      { title: 'Yoga restaurativo',          category: 'Yoga',        duration: 30, level: 'beginner'     as const, imageSrc: 'https://images.unsplash.com/photo-1549476464-37392f717541?w=600&q=80', completed: true },
      { title: 'HIIT explosivo',             category: 'Cardio',      duration: 20, level: 'advanced'     as const },
      { title: 'Pilates core',               category: 'Pilates',     duration: 40, level: 'intermediate' as const, imageSrc: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80', favorited: true },
      { title: 'Stretching post-entreno',    category: 'Movilidad',   duration: 15, level: 'beginner'     as const },
      { title: 'Sentadillas y glúteos',      category: 'Fuerza',      duration: 35, level: 'intermediate' as const, imageSrc: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=600&q=80' },
    ]

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
        {workouts.map((w, i) => (
          <WorkoutCard
            key={i}
            {...w}
            onClick={() => alert(`Abriendo: ${w.title}`)}
          />
        ))}
      </div>
    )
  },
}

// ── Título largo ──────────────────────────────────────────────────────────
export const LongTitle: Story = {
  name: 'Título largo — clamp a 2 líneas',
  args: {
    title:    'Entrenamiento funcional completo de cuerpo completo con mancuernas y bandas elásticas',
    category: 'Funcional',
    duration: 60,
    level:    'advanced',
  },
}
