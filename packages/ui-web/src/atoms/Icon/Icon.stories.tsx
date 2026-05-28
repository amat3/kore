import type { Meta, StoryObj } from '@storybook/react'
import { icons } from 'lucide-react'
import Icon from './Icon'

const meta: Meta<typeof Icon> = {
  title:     'KORE/Atoms/Icon',
  component: Icon,
  tags:      ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    name: {
      control: { type: 'select' },
      options: Object.keys(icons),
    },
    size:  { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    color: { control: 'select', options: ['default', 'muted', 'accent', 'success', 'error', 'inherit'] },
    strokeWidth: { control: { type: 'range', min: 1, max: 3, step: 0.25 } },
  },
  args: { name: 'Dumbbell', size: 'md', color: 'default', strokeWidth: 1.5 },
}

export default meta
type Story = StoryObj<typeof Icon>

// ── Básico ────────────────────────────────────────────────────────────────
export const Default: Story = {}

// ── Tamaños ───────────────────────────────────────────────────────────────
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(s => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Icon name="Dumbbell" size={s} />
          <span style={{ fontSize: 10, opacity: 0.5 }}>{s}</span>
        </div>
      ))}
    </div>
  ),
}

// ── Colores ───────────────────────────────────────────────────────────────
export const Colors: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {(['default', 'muted', 'accent', 'success', 'error'] as const).map(c => (
        <div key={c} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Icon name="Dumbbell" size="lg" color={c} />
          <span style={{ fontSize: 10, opacity: 0.5 }}>{c}</span>
        </div>
      ))}
    </div>
  ),
}

// ── StrokeWidth ───────────────────────────────────────────────────────────
export const StrokeWidths: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      {[1, 1.5, 2, 2.5].map(sw => (
        <div key={sw} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Icon name="Dumbbell" size="xl" strokeWidth={sw} />
          <span style={{ fontSize: 10, opacity: 0.5 }}>{sw}</span>
        </div>
      ))}
    </div>
  ),
}

// ── Iconos fitness KORE ───────────────────────────────────────────────────
export const KoreIcons: Story = {
  name: 'Iconos KORE — fitness',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const fitnessIcons = [
      { name: 'Dumbbell',       label: 'Entrenamiento' },
      { name: 'Heart',          label: 'Favoritos'     },
      { name: 'Timer',          label: 'Duración'      },
      { name: 'Flame',          label: 'Racha'         },
      { name: 'Trophy',         label: 'Logro'         },
      { name: 'Play',           label: 'Iniciar'       },
      { name: 'ChevronRight',   label: 'Navegar'       },
      { name: 'User',           label: 'Perfil'        },
      { name: 'Apple',          label: 'Nutrición'     },
      { name: 'CalendarCheck',  label: 'Hábitos'       },
      { name: 'Search',         label: 'Buscar'        },
      { name: 'Settings',       label: 'Ajustes'       },
    ] as const

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {fitnessIcons.map(({ name, label }) => (
          <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <Icon name={name as any} size="lg" color="accent" />
            <span style={{ fontSize: 10, opacity: 0.5 }}>{label}</span>
          </div>
        ))}
      </div>
    )
  },
}

// ── Herencia de color (dentro de Button) ──────────────────────────────────
export const InheritColor: Story = {
  name: 'Inherit — dentro de un botón',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      {(['#B05E3A', '#059669', '#4338CA'] as const).map(bg => (
        <button
          key={bg}
          style={{
            background: bg, color: '#fff', border: 'none', borderRadius: 999,
            padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer'
          }}
        >
          <Icon name="Play" size="sm" color="inherit" />
          Iniciar
        </button>
      ))}
    </div>
  ),
}
