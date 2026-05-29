'use client'

/**
 * @kore/ui-web — FilterBar
 *
 * Barra de búsqueda + filtros del catálogo.
 * Mobile: SearchInput arriba, Tags con scroll horizontal.
 * Desktop: SearchInput a la izquierda, Tags con wrap.
 *
 * @example
 * <FilterBar
 *   filters={filters}
 *   onFilterToggle={id => toggleFilter(id)}
 *   onSearch={q => setQuery(q)}
 *   searchPlaceholder="Busca entrenamientos..."
 * />
 */

import styled      from '@emotion/styled'
import SearchInput from '../../atoms/SearchInput/SearchInput'
import Tag         from '../../atoms/Tag/Tag'
import {
  baseWrapperStyles,
  tagsRowStyles,
  inlineWrapperStyles,
} from './FilterBar.styles'

// ── Tipos ─────────────────────────────────────────────────────────────────
export interface FilterItem {
  id:        string
  label:     string
  selected?: boolean
  icon?:     React.ReactNode
}

export interface FilterBarProps {
  /** Lista de filtros */
  filters:              FilterItem[]
  /** Callback al toglear un filtro */
  onFilterToggle?:      (id: string) => void
  /** Callback de búsqueda — se dispara en Enter y al limpiar */
  onSearch?:            (value: string) => void
  /** Valor controlado del search */
  searchValue?:         string
  searchPlaceholder?:   string
  /** Ocultar el SearchInput */
  hideSearch?:          boolean
  /** Ocultar los Tags */
  hideTags?: boolean
  /**
   * stacked  → search arriba, tags abajo (default)
   * inline   → search a la izquierda, tags a la derecha (solo desktop)
   */
  layout?:              'stacked' | 'inline'
  className?:           string
}

// ── Componente ────────────────────────────────────────────────────────────
const FilterBar = ({
  filters,
  onFilterToggle,
  onSearch,
  searchValue,
  searchPlaceholder = 'Buscar...',
  hideSearch        = false,
  hideTags        = false,
  layout            = 'stacked',
  className,
}: FilterBarProps) => {

  const tagsSection = !hideTags && filters.length > 0 && (
    <TagsRow className="kore-filterbar-tags">
      {filters.map(filter => (
        <Tag
          key={filter.id}
          variant={filter.selected ? 'selected' : 'default'}
          size="md"
          icon={filter.icon}
          onClick={() => onFilterToggle?.(filter.id)}
          aria-label={`${filter.selected ? 'Quitar' : 'Aplicar'} filtro: ${filter.label}`}
        >
          {filter.label}
        </Tag>
      ))}
    </TagsRow>
  )

  const searchSection = !hideSearch && (
    <SearchInput
      value={searchValue}
      placeholder={searchPlaceholder}
      onSearch={onSearch}
      className="kore-filterbar-search"
    />
  )

  if (layout === 'inline') {
    return (
      <InlineWrapper className={className}>
        {searchSection}
        {tagsSection}
      </InlineWrapper>
    )
  }

  return (
    <StackedWrapper className={className}>
      {searchSection}
      {tagsSection}
    </StackedWrapper>
  )
}

// ── Styled components ─────────────────────────────────────────────────────
const StackedWrapper = styled.div`
  ${baseWrapperStyles}
`

const InlineWrapper = styled.div`
  ${inlineWrapperStyles}
`

const TagsRow = styled.div`
  ${tagsRowStyles}
`

export default FilterBar
