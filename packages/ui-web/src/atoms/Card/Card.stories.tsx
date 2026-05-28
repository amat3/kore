import type { Meta, StoryObj } from '@storybook/react'
import Card from './Card'

const meta: Meta<typeof Card> = {
  title:     'KORE/Atoms/Card',
  component: Card,
  tags:      ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    interactive: { control: 'boolean' },
  },
  args: {
    children: (
      <div style={{ padding: 16 }}>
        <p style={{ margin: 0, fontSize: 14 }}>Contenido de ejemplo</p>
      </div>
    ),
  },
  decorators: [Story => <div style={{ maxWidth: 320 }}><Story /></div>],
}

export default meta
type Story = StoryObj<typeof Card>

export const Static:      Story = { args: { interactive: false } }
export const Interactive: Story = { args: { interactive: true, onClick: () => alert('Card pulsada') } }
