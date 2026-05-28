/**
 * @kore/ui-web — Text.stories.tsx
 *
 * Documentación viva del átomo Text.
 * Una story por rol semántico + story de escala completa.
 */

import type { Meta, StoryObj } from '@storybook/react'
import Text from './Text'

const meta: Meta<typeof Text> = {
  title:     'KORE/Atoms/Text',
  component: Text,
  tags:      ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control:  { type: 'select' },
      options:  ['display', 'h1', 'h2', 'h3', 'overline', 'body', 'body-sm', 'caption', 'button'],
    },
    as: {
      control:  { type: 'select' },
      options:  ['h1', 'h2', 'h3', 'h4', 'p', 'span', 'div', 'label'],
    },
    inheritColor: { control: 'boolean' },
  },
  args: {
    children: 'Entrena sin límites',
    variant:  'body',
  },
}

export default meta
type Story = StoryObj<typeof Text>

// ── Stories por variante ──────────────────────────────────────────────────

export const DisplayStory: Story = {
  name: 'Display',
  args: { variant: 'display', children: 'KORE' },
}

export const H1Story: Story = {
  name: 'Heading 1',
  args: { variant: 'h1', children: 'Entrenamiento funcional' },
}

export const H2Story: Story = {
  name: 'Heading 2',
  args: { variant: 'h2', children: 'Sesiones de fuerza' },
}

export const H3Story: Story = {
  name: 'Heading 3',
  args: { variant: 'h3', children: 'Full body con peso libre' },
}

export const OverlineStory: Story = {
  name: 'Overline',
  args: { variant: 'overline', children: 'Fuerza · 45 min · Intermedio' },
}

export const BodyStory: Story = {
  name: 'Body',
  args: {
    variant:  'body',
    children: 'Una sesión completa para activar todo el cuerpo. Sin excusas, sin límites.',
  },
}

export const BodySmStory: Story = {
  name: 'Body Small',
  args: {
    variant:  'body-sm',
    children: 'Diseñado para mujeres que entrenan con intención y viven con propósito.',
  },
}

export const CaptionStory: Story = {
  name: 'Caption',
  args: { variant: 'caption', children: 'Última sesión hace 2 días' },
}

export const ButtonStory: Story = {
  name: 'Button',
  args: { variant: 'button', children: 'Empezar sesión' },
}

// ── Escala completa ───────────────────────────────────────────────────────

export const FullScale: Story = {
  name: 'Escala completa',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Text variant="display">KORE — Display</Text>
      <Text variant="h1">Heading 1 — Entrenamiento funcional</Text>
      <Text variant="h2">Heading 2 — Sesiones de fuerza</Text>
      <Text variant="h3">Heading 3 — Full body con peso libre</Text>
      <Text variant="overline">Overline — Fuerza · 45 min · Intermedio</Text>
      <Text variant="body">Body — Una sesión completa para activar todo el cuerpo. Sin excusas, sin límites.</Text>
      <Text variant="body-sm">Body Small — Diseñado para mujeres que entrenan con intención.</Text>
      <Text variant="caption">Caption — Última sesión hace 2 días</Text>
      <Text variant="button">Button — Empezar sesión</Text>
    </div>
  ),
}

// ── Polimorfismo semántico ────────────────────────────────────────────────

export const Polymorphic: Story = {
  name: 'Polimorfismo — mismo estilo, distinto tag',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Text variant="h2" as="h1">Visualmente H2, semánticamente H1</Text>
      <Text variant="body" as="label">Body como label de formulario</Text>
      <Text variant="caption" as="span">Caption como span inline</Text>
    </div>
  ),
}
