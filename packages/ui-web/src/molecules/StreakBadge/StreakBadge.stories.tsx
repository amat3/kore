import { useState, useEffect }  from 'react'
import type { Meta, StoryObj }  from '@storybook/react'
import StreakBadge              from './StreakBadge'

const meta: Meta<typeof StreakBadge> = {
  title:     'KORE/Molecules/StreakBadge',
  component: StreakBadge,
  tags:      ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['active', 'inactive', 'record'] },
    size:    { control: 'select', options: ['sm', 'md', 'lg'] },
    count:   { control: { type: 'number', min: 0, max: 365 } },
  },
  args: { count: 7, variant: 'active', size: 'md' },
}

export default meta
type Story = StoryObj<typeof StreakBadge>

// ── Variantes ─────────────────────────────────────────────────────────────
export const Active:   Story = { args: { variant: 'active',   count: 7  } }
export const Inactive: Story = { args: { variant: 'inactive', count: 0  } }
export const Record:   Story = { args: { variant: 'record',   count: 30, label: '¡Récord!' } }

// ── Tamaños ───────────────────────────────────────────────────────────────
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <StreakBadge count={7} size="sm" />
      <StreakBadge count={7} size="md" />
      <StreakBadge count={7} size="lg" />
    </div>
  ),
}

// ── Contador animado ──────────────────────────────────────────────────────
export const AnimatedCounter: Story = {
  name: 'Contador animado — simula nuevo día',
  parameters: { controls: { disable: true } },
  render: () => {
    const [count, setCount] = useState(6)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <StreakBadge count={count} variant="active" size="lg" />
        <button
          onClick={() => setCount(c => c + 1)}
          style={{
            padding: '8px 20px', borderRadius: 999, cursor: 'pointer',
            background: '#B05E3A', color: '#fff', border: 'none', fontSize: 13,
          }}
        >
          + Nuevo día 🎉
        </button>
      </div>
    )
  },
}

// ── Todas las variantes ───────────────────────────────────────────────────
export const AllVariants: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <StreakBadge count={21} variant="active"   size="md" />
        <StreakBadge count={0}  variant="inactive" size="md" />
        <StreakBadge count={30} variant="record"   size="md" label="¡Récord!" />
      </div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <StreakBadge count={21} variant="active"   size="sm" />
        <StreakBadge count={0}  variant="inactive" size="sm" />
        <StreakBadge count={30} variant="record"   size="sm" label="Récord" />
      </div>
    </div>
  ),
}

// ── Uso real — home widget ────────────────────────────────────────────────
export const HomeWidget: Story = {
  name: 'Uso real — home widget',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <div style={{
      padding: '20px 24px',
      borderRadius: 16,
      background: 'var(--background-surface-solid)',
      maxWidth: 320,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <div>
        <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 500, letterSpacing: '.1em', textTransform: 'uppercase', opacity: .5 }}>
          Tu racha
        </p>
        <p style={{ margin: 0, fontSize: 13, opacity: .7 }}>
          ¡Sigue así, lo estás haciendo genial!
        </p>
      </div>
      <StreakBadge count={7} variant="active" size="md" />
    </div>
  ),
}
