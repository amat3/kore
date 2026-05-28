import type { Meta, StoryObj } from '@storybook/react'
import Avatar, { AvatarGroup }   from './Avatar'

const meta: Meta<typeof Avatar> = {
  title:     'KORE/Atoms/Avatar',
  component: Avatar,
  tags:      ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size:   { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    status: { control: 'select', options: ['online', 'offline', 'busy', 'away'] },
    ring:   { control: 'boolean' },
    src:    { control: 'text' },
  },
  args: { name: 'Juan Antonio Amate', size: 'md' },
}

export default meta
type Story = StoryObj<typeof Avatar>

// ── Básico ────────────────────────────────────────────────────────────────
export const Default: Story = {}

export const WithImage: Story = {
  args: {
    src:  'https://i.pravatar.cc/150?img=47',
    name: 'María García',
    size: 'lg',
  },
}

// ── Fallback a iniciales ──────────────────────────────────────────────────
export const Initials: Story = {
  name: 'Fallback — iniciales',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      {[
        'Juan Antonio Amate',
        'María García',
        'Carlos López',
        'Ana Martínez',
        'Pedro Sánchez',
        'Laura Fernández',
        'Miguel Torres',
        'Sofía Ruiz',
      ].map(name => (
        <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <Avatar name={name} size="md" />
          <span style={{ fontSize: 10, opacity: 0.5, maxWidth: 60, textAlign: 'center' }}>
            {name.split(' ')[0]}
          </span>
        </div>
      ))}
    </div>
  ),
}

// ── Tamaños ───────────────────────────────────────────────────────────────
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map(s => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Avatar name="Juan Antonio" size={s} />
          <span style={{ fontSize: 10, opacity: 0.5 }}>{s}</span>
        </div>
      ))}
    </div>
  ),
}

// ── Con status ────────────────────────────────────────────────────────────
export const WithStatus: Story = {
  name: 'Con indicador de estado',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
      {(['online', 'offline', 'busy', 'away'] as const).map(status => (
        <div key={status} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Avatar name="María García" size="lg" status={status} />
          <span style={{ fontSize: 10, opacity: 0.5 }}>{status}</span>
        </div>
      ))}
    </div>
  ),
}

// ── Ring ──────────────────────────────────────────────────────────────────
export const WithRing: Story = {
  name: 'Con ring — avatar destacado',
  args: { ring: true, size: 'lg', name: 'Juan Antonio Amate' },
}

// ── Error de imagen → fallback ────────────────────────────────────────────
export const ImageError: Story = {
  name: 'Imagen rota → fallback automático',
  args: {
    src:  'https://url-rota.example.com/foto.jpg',
    name: 'Juan Antonio Amate',
    size: 'lg',
  },
}

// ── AvatarGroup ───────────────────────────────────────────────────────────
export const Group: Story = {
  name: 'AvatarGroup — participantes',
  parameters: { controls: { disable: true } },
  render: () => {
    const users = [
      { name: 'Juan Antonio Amate',  src: 'https://i.pravatar.cc/150?img=47' },
      { name: 'María García López' },
      { name: 'Carlos Martínez'    },
      { name: 'Ana Fernández'      },
      { name: 'Pedro Sánchez'      },
      { name: 'Laura Torres'       },
    ]
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <p style={{ fontSize: 12, opacity: 0.5, marginBottom: 8 }}>max=3</p>
          <AvatarGroup users={users} max={3} size="md" />
        </div>
        <div>
          <p style={{ fontSize: 12, opacity: 0.5, marginBottom: 8 }}>max=4</p>
          <AvatarGroup users={users} max={4} size="md" />
        </div>
        <div>
          <p style={{ fontSize: 12, opacity: 0.5, marginBottom: 8 }}>size="sm"</p>
          <AvatarGroup users={users} max={5} size="sm" />
        </div>
      </div>
    )
  },
}

// ── Uso real — perfil KORE ────────────────────────────────────────────────
export const ProfileCard: Story = {
  name: 'Uso real — perfil KORE',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16,
      padding: '16px 20px',
      background: 'var(--background-surface-solid)',
      borderRadius: 'var(--corners-default-card)',
      maxWidth: 320,
    }}>
      <Avatar
        name="Juan Antonio Amate"
        size="lg"
        status="online"
        ring
      />
      <div>
        <p style={{ margin: 0, fontWeight: 600, fontSize: 16, color: 'var(--foreground-primary-on-surface)' }}>
          Juan Antonio
        </p>
        <p style={{ margin: '2px 0 0', fontSize: 13, color: 'var(--foreground-secondary-on-surface)' }}>
          Frontend Developer
        </p>
      </div>
    </div>
  ),
}
