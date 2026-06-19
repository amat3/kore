import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'

const meta: Meta<typeof Button> = {
  title:     'KORE/Atoms/Button',
  component: Button,
  tags:      ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant:   { control: 'select', options: ['solid', 'outlined', 'ghost', 'glass'] },
    size:      { control: 'select', options: ['sm', 'md', 'lg'] },
    width:     { control: 'select', options: ['hug', 'full'] },
    isLoading: { control: 'boolean' },
    disabled:  { control: 'boolean' },
  },
  args: { children: 'Empezar sesión', variant: 'solid', size: 'md' },
}

export default meta
type Story = StoryObj<typeof Button>

// ── Variantes base
export const Solid:    Story = { args: { variant: 'solid'    } }
export const Outlined: Story = { args: { variant: 'outlined' } }
export const Ghost:    Story = { args: { variant: 'ghost'    } }

// ── Glass
export const Glass: Story = { args: { variant: 'glass' } }

/** Variante glass sobre escena terracota — contexto real de uso */
export const GlassOnScene: Story = {
  args: { variant: 'glass' },
  decorators: [
    Story => (
      <div style={{
        background: 'linear-gradient(135deg, var(--brand-terracota) 0%, var(--brand-obsidian) 55%, var(--brand-terracota-dark) 100%)',
        padding: 40, borderRadius: 16, display: 'flex', gap: 12, flexWrap: 'wrap' as const,
      }}>
        <Story />
      </div>
    ),
  ],
}

// ── Tamaños
export const Small:  Story = { args: { size: 'sm' } }
export const Medium: Story = { args: { size: 'md' } }
export const Large:  Story = { args: { size: 'lg' } }

// ── Estados
export const Loading:  Story = { args: { isLoading: true } }
export const Disabled: Story = { args: { disabled: true  } }

// ── Full width
export const FullWidth: Story = {
  parameters: { layout: 'padded' },
  args: { width: 'full' },
}

// ── Todas las variantes juntas
export const AllVariants: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['solid', 'outlined', 'ghost'] as const).map(variant => (
        <div key={variant} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {(['sm', 'md', 'lg'] as const).map(size => (
            <Button key={size} variant={variant} size={size}>
              {variant} {size}
            </Button>
          ))}
          <Button variant={variant} isLoading>Loading</Button>
          <Button variant={variant} disabled>Disabled</Button>
        </div>
      ))}
      <div
        style={{
          display: 'flex', gap: 12, alignItems: 'center', padding: 20, borderRadius: 12,
          background: 'linear-gradient(135deg, var(--brand-terracota) 0%, var(--brand-obsidian) 100%)',
        }}
      >
        {(['sm', 'md', 'lg'] as const).map(size => (
          <Button key={size} variant="glass" size={size}>glass {size}</Button>
        ))}
        <Button variant="glass" disabled>Disabled</Button>
      </div>
    </div>
  ),
}