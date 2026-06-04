'use client'

import styled from '@emotion/styled'
import { useTheme } from '@/providers/ThemeProvider'
import { Icon } from '@kore/ui-web'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <ToggleButton
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
      type="button"
    >
      <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} size="sm" color="inherit" />
    </ToggleButton>
  )
}

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 0.5px solid var(--stroke-secondary-on-surface);
  background: var(--background-action-hover);
  color: var(--foreground-secondary-on-surface);
  cursor: pointer;
  transition:
    border-color 150ms,
    color 150ms,
    background 150ms;
  flex-shrink: 0;

  &:hover {
    border-color: var(--stroke-accent);
    color: var(--foreground-accent-on-surface);
  }

  &:focus-visible {
    outline: 2px solid var(--stroke-focus);
    outline-offset: 2px;
  }
`

export default ThemeToggle
