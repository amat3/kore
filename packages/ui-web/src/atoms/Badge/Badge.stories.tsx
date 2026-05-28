import type { Meta, StoryObj } from '@storybook/react'
import Badge from './Badge'

const meta: Meta<typeof Badge> = {
  title:     'KORE/Atoms/Badge',
  component: Badge,
  tags:      ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['default', 'accent', 'success', 'error', 'warning', 'solid'] },
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
