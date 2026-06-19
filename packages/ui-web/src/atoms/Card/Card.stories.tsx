import type { Meta, StoryObj } from '@storybook/react'
import Card from './Card'

const sampleContent = (
  <div style={{ padding: 20 }}>
    <p style={{ margin: '0 0 8px', fontSize: 12, opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
      Componente · 01
    </p>
    <p style={{ margin: '0 0 4px', fontFamily: 'var(--font-family-display)', fontSize: 20, fontWeight: 600 }}>
      Título de ejemplo
    </p>
    <p style={{ margin: 0, fontSize: 14, opacity: 0.7, lineHeight: 1.5 }}>
      Superficie translúcida con tinte terracota y blur de fondo.
    </p>
  </div>
)

const sceneBackground = {
  style: {
    background: 'linear-gradient(135deg, var(--brand-terracota) 0%, var(--brand-obsidian) 55%, var(--brand-terracota-dark) 100%)',
    padding: 40,
    borderRadius: 16,
  },
}

const meta: Meta<typeof Card> = {
  title:     'KORE/Atoms/Card',
  component: Card,
  tags:      ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant:     { control: 'select', options: ['default', 'glass'] },
    interactive: { control: 'boolean' },
  },
  args: { children: sampleContent },
  decorators: [Story => <div style={{ maxWidth: 320 }}><Story /></div>],
}

export default meta
type Story = StoryObj<typeof Card>

// ── Default ───────────────────────────────────────────────────────────────

export const Static: Story = {
  args: { variant: 'default', interactive: false },
}

export const Interactive: Story = {
  args: { variant: 'default', interactive: true, onClick: () => alert('Card pulsada') },
}

// ── Glass ─────────────────────────────────────────────────────────────────

export const Glass: Story = {
  args: { variant: 'glass' },
}

export const GlassInteractive: Story = {
  args: { variant: 'glass', interactive: true, onClick: () => alert('Glass card pulsada') },
}

/** Variante glass sobre escena terracota — contexto real de uso */
export const GlassOnScene: Story = {
  args: { variant: 'glass' },
  decorators: [
    Story => (
      <div style={{ maxWidth: 320, ...sceneBackground.style }}>
        <Story />
      </div>
    ),
  ],
}

export const GlassInteractiveOnScene: Story = {
  args: { variant: 'glass', interactive: true, onClick: () => alert('Glass card pulsada') },
  decorators: [
    Story => (
      <div style={{ maxWidth: 320, ...sceneBackground.style }}>
        <Story />
      </div>
    ),
  ],
}

/** Comparativa lado a lado: Default vs Glass */
export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  decorators: [],
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div style={{ width: 280 }}>
        <p style={{ fontSize: 11, opacity: 0.5, marginBottom: 8, textTransform: 'uppercase' }}>Default</p>
        <Card variant="default">{sampleContent}</Card>
      </div>
      <div style={{ width: 280, ...sceneBackground.style }}>
        <p style={{ fontSize: 11, opacity: 0.7, marginBottom: 8, textTransform: 'uppercase', color: '#fff' }}>Glass</p>
        <Card variant="glass">{sampleContent}</Card>
      </div>
    </div>
  ),
}
