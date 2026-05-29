'use client'

/**
 * @kore/ui-web — NavBar
 *
 * Navegación principal de KORE.
 * Mobile  → bottom bar fija con icono + label + dot activo.
 * Desktop → top bar sticky con logo + items de texto.
 *
 * @example
 * <NavBar
 *   activeId="workouts"
 *   onNavigate={id => router.push(`/${id}`)}
 * />
 */

import styled from '@emotion/styled'
import Icon   from '../../atoms/Icon/Icon'
import type { IconName } from '../../atoms/Icon/Icon'
import {
  mobileNavStyles,
  desktopNavStyles,
  mobileItemStyles,
  desktopItemStyles,
   activePillStyles, 
  mobileLabelStyles,
  desktopItemsStyles,
} from './NavBar.styles'

// ── Config de items ───────────────────────────────────────────────────────
export interface NavItem {
  id:          string
  label:       string
  icon:        IconName
  iconActive?: IconName
}

const DEFAULT_ITEMS: NavItem[] = [
  { id: 'home',       label: 'Inicio',        icon: 'House',       iconActive: 'House'      },
  { id: 'workouts',   label: 'Entrenamientos', icon: 'Dumbbell',    iconActive: 'Dumbbell'   },
  { id: 'activity',   label: 'Mi actividad',   icon: 'ChartLine',   iconActive: 'ChartLine'  },
  { id: 'profile',    label: 'Perfil',          icon: 'CircleUser',  iconActive: 'CircleUser' },
]

// ── Tipos ─────────────────────────────────────────────────────────────────
export interface NavBarProps {
  /** ID del item activo */
  activeId?:    string
  /** Items personalizados — por defecto usa los 4 de KORE */
  items?:       NavItem[]
  /** Callback al pulsar un item */
  onNavigate?:  (id: string) => void
  /** Logo para el desktop — por defecto "KORE" en tipografía display */
  logo?:        React.ReactNode
  className?:   string
}

// ── Componente ────────────────────────────────────────────────────────────
const NavBar = ({
  activeId,
  items      = DEFAULT_ITEMS,
  onNavigate,
  logo,
  className,
}: NavBarProps) => {
  const handleNav = (id: string) => onNavigate?.(id)

  return (
    <>
      {/* ── Mobile — bottom ────────────────────────────────────── */}
      <MobileNav className={className} role="navigation" aria-label="Navegación principal">
       {items.map(item => {
  const isActive = item.id === activeId
  return (
    <MobileItem
      key={item.id}
      type="button"
      onClick={() => handleNav(item.id)}
      aria-current={isActive ? 'page' : undefined}
      aria-label={item.label}
    >
      {isActive ? (
        <ActivePill>
          <Icon name={item.iconActive ?? item.icon} size="sm" color="inherit" strokeWidth={2} />
          <MobileLabel>{item.label}</MobileLabel>
        </ActivePill>
      ) : (
        <>
          <Icon name={item.icon} size="sm" color="inherit" strokeWidth={1.5} />
          <MobileLabel>{item.label}</MobileLabel>
        </>
      )}
    </MobileItem>
  )
})}
      </MobileNav>

      {/* ── Desktop — top ──────────────────────────────────────── */}
      <DesktopNav className={className} role="navigation" aria-label="Navegación principal">

        {/* Logo */}
        <LogoWrapper>
          {logo ?? <LogoText>KORE</LogoText>}
        </LogoWrapper>

        {/* Items */}
        <DesktopItems>
          {items.map(item => {
            const isActive = item.id === activeId
            return (
              <DesktopItem
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon
                  name={isActive && item.iconActive ? item.iconActive : item.icon}
                  size="xs"
                  color="inherit"
                  strokeWidth={isActive ? 2 : 1.5}
                />
                {item.label}
              </DesktopItem>
            )
          })}
        </DesktopItems>

      </DesktopNav>
    </>
  )
}

// ── Styled components ─────────────────────────────────────────────────────
const MobileNav     = styled.nav`${mobileNavStyles}`
const DesktopNav    = styled.header`${desktopNavStyles}`
const MobileItem    = styled.button`${mobileItemStyles}`
const DesktopItem   = styled.button`${desktopItemStyles}`
const ActivePill    = styled.div`${activePillStyles}`
const MobileLabel   = styled.span`${mobileLabelStyles}`
const DesktopItems  = styled.div`${desktopItemsStyles}`

const LogoWrapper = styled.div`
  display:     flex;
  align-items: center;
`

const LogoText = styled.span`
  font-family:    var(--font-family-display);
  font-size:      var(--scale-xl);
  font-weight:    var(--font-weight-light);
  letter-spacing: var(--letter-spacing-wide);
  color:          var(--foreground-accent-on-surface);
  line-height:    1;
`

export default NavBar
