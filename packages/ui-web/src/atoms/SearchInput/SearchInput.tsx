'use client'

import Input       from '../Input/Input'
import Icon        from '../Icon/Icon'

export interface SearchInputProps {
  value?:        string
  defaultValue?: string
  placeholder?:  string
  size?:         'sm' | 'md' | 'lg'
  fullWidth?:    boolean
  disabled?:     boolean
  onSearch?:     (value: string) => void
  onChange?:     (e: React.ChangeEvent<HTMLInputElement>) => void
  onClear?:      () => void
  className?:    string
  autoFocus?:    boolean
}

const SearchInput = ({
  onSearch,
  onClear,
  size      = 'md',
  fullWidth = true,
  ...props
}: SearchInputProps) => {

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter')  onSearch?.(e.currentTarget.value)
    if (e.key === 'Escape') {
      e.currentTarget.value = ''
      e.currentTarget.blur()
      onSearch?.('')
      onClear?.()
    }
  }

  return (
    <Input
      type="text"
      role="searchbox"
      aria-label="Buscar"
      size={size}
      fullWidth={fullWidth}
      clearable
      leftIcon={<Icon name="Search" size="sm" color="inherit" />}
      onKeyDown={handleKeyDown}
      onClear={() => { onSearch?.(''); onClear?.() }}
      {...props}
    />
  )
}

export default SearchInput
