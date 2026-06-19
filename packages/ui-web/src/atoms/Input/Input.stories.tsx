import type { Meta, StoryObj } from '@storybook/react'
import Icon from '../Icon/Icon'
import Input from './Input'

const iconOptions = {
  'Ninguno': undefined,
  'Mail': <Icon name="Mail" size="sm" color="inherit" />,
  'Lock': <Icon name="Lock" size="sm" color="inherit" />,
  'User': <Icon name="User" size="sm" color="inherit" />,
  'Phone': <Icon name="Phone" size="sm" color="inherit" />,
  'Eye': <Icon name="Eye" size="sm" color="inherit" />,
  'EyeOff': <Icon name="EyeOff" size="sm" color="inherit" />,
  'Calendar': <Icon name="Calendar" size="sm" color="inherit" />,
  'Globe': <Icon name="Globe" size="sm" color="inherit" />,
  'Link': <Icon name="Link" size="sm" color="inherit" />,
}

const meta: Meta<typeof Input> = {
  title:     'KORE/Atoms/Input',
  component: Input,
  tags:      ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'error', 'success', 'disabled'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
    },
    leftIcon: {
      control:  { type: 'select' },
      options:  Object.keys(iconOptions),
      mapping:  iconOptions,
    },
    rightIcon: {
      control:  { type: 'select' },
      options:  Object.keys(iconOptions),
      mapping:  iconOptions,
    },
  },
  args: {
    placeholder: 'Escribe aquí...',
    size:        'md',
    state:       'default',
    fullWidth:   true,
  },
  decorators: [
    Story => (
      <div style={{ maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Input>

// ── Default ───────────────────────────────────────────────────────────────
export const Default: Story = {}

// ── Con label ─────────────────────────────────────────────────────────────
export const WithLabel: Story = {
  args: {
    label:       'Email',
    placeholder: 'tu@email.com',
    type:        'email',
  },
}

// ── Con helper text ───────────────────────────────────────────────────────
export const WithHelper: Story = {
  args: {
    label:      'Contraseña',
    helperText: 'Mínimo 8 caracteres con letras y números',
    type:       'password',
  },
}

// ── Estados ───────────────────────────────────────────────────────────────
export const StateDefault: Story = {
  name: 'Estado — Default',
  args: { label: 'Nombre', placeholder: 'Juan Antonio' },
}

export const StateError: Story = {
  name: 'Estado — Error',
  args: {
    label:     'Email',
    errorText: 'Este email ya está registrado',
    value:     'juan@ejemplo.com',
    readOnly:  true,
  },
}

export const StateSuccess: Story = {
  name: 'Estado — Success',
  args: {
    label:       'Usuario',
    successText: 'Nombre de usuario disponible',
    value:       'juanan_kore',
    readOnly:    true,
  },
}

export const StateDisabled: Story = {
  name: 'Estado — Disabled',
  args: {
    label:    'Campo bloqueado',
    value:    'No editable',
    disabled: true,
    readOnly: true,
  },
}

// ── Tamaños ───────────────────────────────────────────────────────────────
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Input label="Small"  size="sm" placeholder="Tamaño sm" />
      <Input label="Medium" size="md" placeholder="Tamaño md" />
      <Input label="Large"  size="lg" placeholder="Tamaño lg" />
    </div>
  ),
}

// ── Con iconos ────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
)
const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)
const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)
const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

export const WithIcons: Story = {
  name: 'Con iconos',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Input label="Buscar" placeholder="Busca entrenamientos..." leftIcon={<SearchIcon />} />
      <Input label="Email"  placeholder="tu@email.com"            leftIcon={<MailIcon />}  type="email" />
      <Input label="Contraseña" placeholder="••••••••"            leftIcon={<LockIcon />}  rightIcon={<EyeIcon />} type="password" />
    </div>
  ),
}

// ── Clearable ─────────────────────────────────────────────────────────────
export const Clearable: Story = {
  args: {
    label:       'Búsqueda',
    placeholder: 'Busca entrenamientos...',
    clearable:   true,
    defaultValue: 'Full body fuerza',
    leftIcon: <SearchIcon />,
  },
}

// ── Tipos de input ────────────────────────────────────────────────────────
export const InputTypes: Story = {
  name: 'Tipos de input',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Input label="Texto"    type="text"     placeholder="Texto libre" />
      <Input label="Email"    type="email"    placeholder="tu@email.com" />
      <Input label="Password" type="password" placeholder="••••••••" />
      <Input label="Número"   type="number"   placeholder="0" />
      <Input label="Teléfono" type="tel"      placeholder="+34 600 000 000" />
      <Input label="URL"      type="url"      placeholder="https://..." />
    </div>
  ),
}

// ── Formulario real ───────────────────────────────────────────────────────
export const LoginForm: Story = {
  name: 'Uso real — formulario login',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 360 }}>
      <Input
        label="Email"
        type="email"
        placeholder="tu@email.com"
        leftIcon={<MailIcon />}
        clearable
      />
      <Input
        label="Contraseña"
        type="password"
        placeholder="••••••••"
        leftIcon={<LockIcon />}
        rightIcon={<EyeIcon />}
        helperText="¿Olvidaste tu contraseña?"
      />
      <Input
        label="Email"
        type="email"
        errorText="Este email no está registrado"
        value="wrong@email.com"
        readOnly
        leftIcon={<MailIcon />}
      />
    </div>
  ),
}

// ── Glass ─────────────────────────────────────────────────────────────────
export const GlassField: Story = {
  name: 'Glass — campo individual',
  args: {
    label:       'Email',
    placeholder: 'tu@email.com',
    type:        'email',
    glass:       true,
  },
}

/** Formulario glass completo sobre escena terracota — contexto real de uso en /login */
export const GlassOnScene: Story = {
  name: 'Glass — formulario sobre escena',
  parameters: { controls: { disable: true } },
  decorators: [
    Story => (
      <div style={{
        background: 'linear-gradient(135deg, var(--brand-terracota) 0%, var(--brand-obsidian) 55%, var(--brand-terracota-dark) 100%)',
        padding: 40, borderRadius: 16, maxWidth: 400,
      }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Input label="Email"      type="email"    placeholder="tu@email.com"  glass leftIcon={<MailIcon />} />
      <Input label="Contraseña" type="password" placeholder="••••••••"       glass leftIcon={<LockIcon />} />
    </div>
  ),
}

// ── Todos los estados ─────────────────────────────────────────────────────
export const AllStates: Story = {
  name: 'Todos los estados',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Input label="Default"  state="default"  placeholder="Estado por defecto" />
      <Input label="Error"    errorText="Campo requerido" value="valor incorrecto" readOnly />
      <Input label="Success"  successText="Campo válido"  value="valor correcto"  readOnly />
      <Input label="Disabled" disabled value="No editable" readOnly />
    </div>
  ),
}
