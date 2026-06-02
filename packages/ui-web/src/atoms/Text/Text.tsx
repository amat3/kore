'use client'
/**
 * @kore/ui-web — Text
 *
 * Átomo tipográfico base de KORE.
 * Usa CSS vars de @kore/tokens para todos los valores visuales.
 *
 * @example
 * <Text variant="h1">Entrena sin límites</Text>
 * <Text variant="overline" as="span">Fuerza · 45 min</Text>
 * <Text variant="body" as="p">Descripción del entrenamiento</Text>
 */

import styled from '@emotion/styled'
import { baseTextStyles, variantStyles, TextVariant } from './Text.styles'

// ── Tipos ─────────────────────────────────────────────────────────────────

type TextTag =
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'p' | 'span' | 'div' | 'label' | 'li' | 'strong' | 'em'

export interface TextProps {
  /** Rol semántico visual — mapea a typeRoles de @kore/tokens */
  variant?:    TextVariant
  /** Elemento HTML renderizado. Por defecto se infiere del variant */
  as?:         TextTag
  children:    React.ReactNode
  className?:  string
  /** Heredar el color del padre en lugar de usar el token */
  inheritColor?: boolean
}

// ── Defaults de tag por variant ───────────────────────────────────────────
const defaultTag: Record<TextVariant, TextTag> = {
  display:   'h1',
  h1:        'h1',
  h2:        'h2',
  h3:        'h3',
  overline:  'span',
  body:          'p',
  'body-light':  'p',
  'body-sm':     'p',
  caption:   'span',
  button:    'span',
}

// ── Componente ────────────────────────────────────────────────────────────
const Text = ({
  variant = 'body',
  as,
  children,
  className,
  inheritColor = false,
}: TextProps) => {
  const tag = as ?? defaultTag[variant]

  return (
    <TextStyled
      as={tag}
      $variant={variant}
      $inheritColor={inheritColor}
      className={className}
    >
      {children}
    </TextStyled>
  )
}

// ── Styled component ──────────────────────────────────────────────────────
const TextStyled = styled.p<{
  $variant:       TextVariant
  $inheritColor:  boolean
}>`
  ${baseTextStyles}
  ${({ $variant }) => variantStyles[$variant]}
  ${({ $inheritColor }) => $inheritColor && 'color: inherit;'}
`

export default Text
