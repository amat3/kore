import type { Meta, StoryObj } from '@storybook/react'
import Badge from './Badge'

const meta: Meta<typeof Badge> = {
  title:     'KORE/Atoms/Badge',
  component: Badge,
  tags:      ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['default', 'accent', 'success', 'error', 'warning', 'solid', 'glass'] },
    size:    { control: 'select', options: ['sm', 'md'] },
  },
  args: { children: 'Fuerza', variant: 'default', size: 'md' },
}

export default meta
type Story = StoryObj<typeof Badge>

// ── Variantes ─────────────────────────────────────────────────────────────
export const Default: Story = { args: { variant: 'default' } }
export const Accent:  Story = { args: { variant: 'accent'  } }
export const Solid:   Story = { args: { variant: 'solid'   } }
export const Success: Story = { args: { variant: 'success', children: 'Completado' } }
export const Error:   Story = { args: { variant: 'error',   children: 'Error'      } }
export const Warning: Story = { args: { variant: 'warning', children: 'Pendiente'  } }
export const Glass:   Story = { args: { variant: 'glass'   } }

/** Badge glass sobre escena terracota — contexto real de uso */
export const GlassOnScene: Story = {
  args: { variant: 'glass' },
  decorators: [
    Story => (
      <div style={{
        background: 'linear-gradient(135deg, var(--brand-terracota) 0%, var(--brand-obsidian) 55%, var(--brand-terracota-dark) 100%)',
        padding: 32, borderRadius: 12,
      }}>
        <Story />
      </div>
    ),
  ],
}

// ── Tamaños ───────────────────────────────────────────────────────────────
export const Small:  Story = { args: { size: 'sm' } }
export const Medium: Story = { args: { size: 'md' } }

// ── Todas las variantes ───────────────────────────────────────────────────
export const AllVariants: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {(['default', 'accent', 'solid', 'success', 'error', 'warning'] as const).map(v => (
          <Badge key={v} variant={v} size="md">{v}</Badge>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {(['default', 'accent', 'solid', 'success', 'error', 'warning'] as const).map(v => (
          <Badge key={v} variant={v} size="sm">{v}</Badge>
        ))}
      </div>

      <div style={{
        display: 'flex', gap: 8, alignItems: 'center', padding: 16, borderRadius: 8,
        background: 'linear-gradient(135deg, var(--brand-terracota) 0%, var(--brand-obsidian) 100%)',
      }}>
        <Badge variant="glass" size="md">Glass md</Badge>
        <Badge variant="glass" size="sm">Glass sm</Badge>
      </div>

    </div>
  ),
}

// ── Uso real ──────────────────────────────────────────────────────────────
export const WorkoutBadges: Story = {
  name: 'Uso real — workout card',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Badge variant="accent">Fuerza</Badge>
      <Badge variant="default">45 min</Badge>
      <Badge variant="default">Intermedio</Badge>
      <Badge variant="success">Completado</Badge>
    </div>
  ),
}
