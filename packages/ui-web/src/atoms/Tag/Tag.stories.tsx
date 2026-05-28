import { useState }             from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Tag, { TagGroup }        from './Tag'

const meta: Meta<typeof Tag> = {
  title:     'KORE/Atoms/Tag',
  component: Tag,
  tags:      ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant:    { control: 'select', options: ['default', 'selected', 'solid'] },
    size:       { control: 'select', options: ['sm', 'md', 'lg'] },
    dismissible:{ control: 'boolean' },
    disabled:   { control: 'boolean' },
  },
  args: { children: 'Fuerza', variant: 'default', size: 'md' },
}

export default meta
type Story = StoryObj<typeof Tag>

// ── Variantes ─────────────────────────────────────────────────────────────
export const Default:  Story = { args: { variant: 'default'  } }
export const Selected: Story = { args: { variant: 'selected' } }
export const Solid:    Story = { args: { variant: 'solid'    } }

// ── Tamaños ───────────────────────────────────────────────────────────────
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Tag size="sm">Small</Tag>
      <Tag size="md">Medium</Tag>
      <Tag size="lg">Large</Tag>
    </div>
  ),
}

// ── Dismissible ───────────────────────────────────────────────────────────
export const Dismissible: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const [tags, setTags] = useState(['Fuerza', 'Yoga', 'Cardio', 'Pilates'])
    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', minHeight: 40 }}>
        {tags.map(tag => (
          <Tag
            key={tag}
            variant="selected"
            dismissible
            onDismiss={() => setTags(prev => prev.filter(t => t !== tag))}
          >
            {tag}
          </Tag>
        ))}
        {tags.length === 0 && (
          <span style={{ opacity: 0.4, fontSize: 14 }}>Sin filtros activos</span>
        )}
      </div>
    )
  },
}

// ── Toggle seleccionable ──────────────────────────────────────────────────
export const Selectable: Story = {
  name: 'Toggle — seleccionable',
  parameters: { controls: { disable: true } },
  render: () => {
    const [selected, setSelected] = useState<string[]>(['Fuerza'])
    const options = ['Fuerza', 'Cardio', 'Yoga', 'Pilates', 'HIIT', 'Stretching']

    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {options.map(opt => (
          <Tag
            key={opt}
            variant={selected.includes(opt) ? 'selected' : 'default'}
            onClick={() => setSelected(prev =>
              prev.includes(opt) ? prev.filter(s => s !== opt) : [...prev, opt]
            )}
          >
            {opt}
          </Tag>
        ))}
      </div>
    )
  },
}

// ── Disabled ──────────────────────────────────────────────────────────────
export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Tag disabled>Default</Tag>
      <Tag disabled variant="selected">Selected</Tag>
      <Tag disabled dismissible>Dismissible</Tag>
    </div>
  ),
}

// ── TagGroup ──────────────────────────────────────────────────────────────
export const TagGroupStory: Story = {
  name: 'TagGroup — filtros de entrenamiento',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const [filters, setFilters] = useState([
      { id: 'fuerza',    label: 'Fuerza',    selected: true  },
      { id: 'cardio',    label: 'Cardio',    selected: false },
      { id: 'yoga',      label: 'Yoga',      selected: false },
      { id: 'pilates',   label: 'Pilates',   selected: true  },
      { id: 'hiit',      label: 'HIIT',      selected: false },
      { id: 'stretch',   label: 'Stretching',selected: false },
    ])

    return (
      <TagGroup
        tags={filters}
        onToggle={id =>
          setFilters(prev =>
            prev.map(f => f.id === id ? { ...f, selected: !f.selected } : f)
          )
        }
      />
    )
  },
}

// ── Todas las variantes ───────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'Todas las variantes',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['sm', 'md', 'lg'] as const).map(size => (
        <div key={size} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Tag size={size} variant="default">Default</Tag>
          <Tag size={size} variant="selected">Selected</Tag>
          <Tag size={size} variant="solid">Solid</Tag>
          <Tag size={size} variant="selected" dismissible>Dismissible</Tag>
          <Tag size={size} disabled>Disabled</Tag>
        </div>
      ))}
    </div>
  ),
}
