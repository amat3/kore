import { useState }             from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import NavBar                   from './NavBar'

const meta: Meta<typeof NavBar> = {
  title:     'KORE/Molecules/NavBar',
  component: NavBar,
  tags:      ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    activeId: {
      control: 'select',
      options: ['home', 'workouts', 'activity', 'profile'],
    },
  },
  args: { activeId: 'home' },
}

export default meta
type Story = StoryObj<typeof NavBar>

// ── Default ───────────────────────────────────────────────────────────────
export const Default: Story = {}

// ── Mobile preview ────────────────────────────────────────────────────────
export const MobilePreview: Story = {
  name: 'Mobile — bottom bar',
  parameters: {
    viewport:  { defaultViewport: 'mobile' },
    controls:  { disable: true },
  },
  render: () => {
    const [active, setActive] = useState('home')
    return (
      <div style={{ height: '100vh', position: 'relative', background: 'var(--background-surface-low)' }}>
        <div style={{ padding: '20px 16px', paddingBottom: 80 }}>
          <p style={{ margin: 0, fontSize: 14, opacity: .5 }}>
            Contenido de la página: <strong>{active}</strong>
          </p>
        </div>
        <NavBar activeId={active} onNavigate={setActive} />
      </div>
    )
  },
}

// ── Desktop preview ───────────────────────────────────────────────────────
export const DesktopPreview: Story = {
  name: 'Desktop — top bar',
  parameters: {
    viewport: { defaultViewport: 'desktop' },
    controls: { disable: true },
  },
  render: () => {
    const [active, setActive] = useState('workouts')
    return (
      <div style={{ minHeight: '60vh', background: 'var(--background-surface-low)' }}>
        <NavBar activeId={active} onNavigate={setActive} />
        <div style={{ padding: '32px 40px' }}>
          <p style={{ margin: 0, fontSize: 14, opacity: .5 }}>
            Sección activa: <strong>{active}</strong>
          </p>
        </div>
      </div>
    )
  },
}

// ── Interactivo ───────────────────────────────────────────────────────────
export const Interactive: Story = {
  name: 'Interactivo — cambia de sección',
  parameters: { controls: { disable: true } },
  render: () => {
    const [active, setActive] = useState('home')
    const pages: Record<string, string> = {
      home:      '🏠 Página de inicio',
      workouts:  '🏋️ Catálogo de entrenamientos',
      activity:  '📊 Mi actividad',
      profile:   '👤 Mi perfil',
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <NavBar activeId={active} onNavigate={setActive} />
        <div style={{
          padding: 20, borderRadius: 12,
          background: 'var(--background-surface-solid)',
          textAlign: 'center', fontSize: 18,
        }}>
          {pages[active]}
        </div>
      </div>
    )
  },
}

// ── Todos los estados activos ─────────────────────────────────────────────
export const AllActiveStates: Story = {
  name: 'Todos los estados activos',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {['home', 'workouts', 'activity', 'profile'].map(id => (
        <NavBar key={id} activeId={id} />
      ))}
    </div>
  ),
}
