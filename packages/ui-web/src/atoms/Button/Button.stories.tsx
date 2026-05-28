import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'

const meta: Meta<typeof Button> = {
  title:     'KORE/Atoms/Button',
  component: Button,
  tags:      ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant:   { control: 'select', options: ['solid', 'outlined', 'ghost'] },
    size:      { control: 'select', options: ['sm', 'md', 'lg'] },
    width:     { control: 'select', options: ['hug', 'full'] },
    isLoading: { control: 'boolean' },
    disabled:  { control: 'boolean' },
  },
  args: { children: 'Empezar sesión', variant: 'solid', size: 'md' },
}

export default meta
type Story = StoryObj<typeof Button>

// ── Variantes
export const Solid:    Story = { args: { variant: 'solid'    } }
export const Outlined: Story = { args: { variant: 'outlined' } }
export const Ghost:    Story = { args: { variant: 'ghost'    } }

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
    </div>
  ),
}