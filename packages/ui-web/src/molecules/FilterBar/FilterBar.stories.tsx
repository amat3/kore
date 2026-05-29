import { useState }             from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import FilterBar                from './FilterBar'

const defaultFilters = [
  { id: 'fuerza',    label: 'Fuerza',     selected: true  },
  { id: 'cardio',    label: 'Cardio',     selected: false },
  { id: 'yoga',      label: 'Yoga',       selected: false },
  { id: 'pilates',   label: 'Pilates',    selected: true  },
  { id: 'hiit',      label: 'HIIT',       selected: false },
  { id: 'stretch',   label: 'Stretching', selected: false },
  { id: 'funcional', label: 'Funcional',  selected: false },
]

const meta: Meta<typeof FilterBar> = {
  title:     'KORE/Molecules/FilterBar',
  component: FilterBar,
  tags:      ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    layout:     { control: 'select', options: ['stacked', 'inline'] },
    hideSearch: { control: 'boolean' },
  },
  args: {
    filters:           defaultFilters,
    searchPlaceholder: 'Busca entrenamientos...',
    layout:            'stacked',
  },
}

export default meta
type Story = StoryObj<typeof FilterBar>

// ── Default — estático ────────────────────────────────────────────────────
export const Default: Story = {}

// ── Interactivo ───────────────────────────────────────────────────────────
export const Interactive: Story = {
  render: () => {
    const [filters, setFilters] = useState(defaultFilters)
    const [query, setQuery]     = useState('')

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <FilterBar
          filters={filters}
          searchValue={query}
          searchPlaceholder="Busca entrenamientos..."
          onFilterToggle={id =>
            setFilters(prev =>
              prev.map(f => f.id === id ? { ...f, selected: !f.selected } : f)
            )
          }
          onSearch={setQuery}
        />
        <div style={{ fontSize: 12, color: 'var(--foreground-secondary-on-surface)' }}>
          <p style={{ margin: 0 }}>Query: <strong>{query || '—'}</strong></p>
          <p style={{ margin: '4px 0 0' }}>
            Activos: <strong>{filters.filter(f => f.selected).map(f => f.label).join(', ') || '—'}</strong>
          </p>
        </div>
      </div>
    )
  },
}

// ── Solo search (sin filtros) ─────────────────────────────────────────────
export const SearchOnly: Story = {
  name: 'Solo búsqueda — sin filtros',
  args: {
    hideTags:          true,
    searchPlaceholder: 'Busca entrenamientos...',
  },
}

// ── Solo filtros (sin search) ─────────────────────────────────────────────
export const FiltersOnly: Story = {
  name: 'Solo filtros — sin SearchInput',
  render: () => {
    const [filters, setFilters] = useState(defaultFilters)
    return (
      <FilterBar
        filters={filters}
        hideSearch
        onFilterToggle={id =>
          setFilters(prev =>
            prev.map(f => f.id === id ? { ...f, selected: !f.selected } : f)
          )
        }
      />
    )
  },
}

// ── Layout inline ─────────────────────────────────────────────────────────
export const InlineLayout: Story = {
  name: 'Layout inline — desktop',
  render: () => {
    const [filters, setFilters] = useState(defaultFilters)
    return (
      <FilterBar
        filters={filters}
        layout="inline"
        searchPlaceholder="Buscar..."
        onFilterToggle={id =>
          setFilters(prev =>
            prev.map(f => f.id === id ? { ...f, selected: !f.selected } : f)
          )
        }
      />
    )
  },
}

// ── Uso real — catálogo ───────────────────────────────────────────────────
export const CatalogUse: Story = {
  name: 'Uso real — catálogo KORE',
  parameters: { controls: { disable: true } },
  render: () => {
    const [filters, setFilters] = useState([
      { id: 'todos',     label: 'Todos',      selected: true  },
      { id: 'fuerza',    label: 'Fuerza',     selected: false },
      { id: 'cardio',    label: 'Cardio',     selected: false },
      { id: 'yoga',      label: 'Yoga',       selected: false },
      { id: 'pilates',   label: 'Pilates',    selected: false },
      { id: 'hiit',      label: 'HIIT',       selected: false },
      { id: '15min',     label: '< 15 min',   selected: false },
      { id: '30min',     label: '< 30 min',   selected: false },
      { id: 'principiante', label: 'Principiante', selected: false },
    ])

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <FilterBar
          filters={filters}
          searchPlaceholder="Busca entrenamientos, duración, nivel..."
          onFilterToggle={id =>
            setFilters(prev =>
              prev.map(f =>
                f.id === 'todos'
                  ? { ...f, selected: id === 'todos' }
                  : f.id === id
                    ? { ...f, selected: !f.selected }
                    : { ...f, selected: f.id === 'todos' ? false : f.selected }
              )
            )
          }
        />
        <p style={{ fontSize: 12, color: 'var(--foreground-tertiary-on-surface)', margin: 0 }}>
          {filters.filter(f => f.selected && f.id !== 'todos').length} filtros activos
        </p>
      </div>
    )
  },
}
