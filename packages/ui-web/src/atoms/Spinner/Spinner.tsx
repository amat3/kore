'use client'

import styled    from '@emotion/styled'
import { keyframes } from '@emotion/react'

const spin = keyframes`
  from { transform: rotate(0deg);   }
  to   { transform: rotate(360deg); }
`

const sizes = { sm: 14, md: 18 } as const

export const Spinner = ({ size = 'md' }: { size?: 'sm' | 'md' }) => (
  <SpinnerStyled $size={sizes[size]} aria-hidden="true" />
)

const SpinnerStyled = styled.span<{ $size: number }>`
  display:       inline-block;
  width:         ${({ $size }) => $size}px;
  height:        ${({ $size }) => $size}px;
  border:        2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation:     ${spin} 600ms linear infinite;
  flex-shrink:   0;
`