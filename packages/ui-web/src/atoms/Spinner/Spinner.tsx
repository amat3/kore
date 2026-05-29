'use client'

import styled        from '@emotion/styled'
import { keyframes } from '@emotion/react'
import Icon          from '../Icon/Icon'

const spin = keyframes`
  from { transform: rotate(0deg);   }
  to   { transform: rotate(360deg); }
`

const sizes = { sm: 14, md: 18 } as const

export const Spinner = ({ size = 'md' }: { size?: 'sm' | 'md' }) => (
  <SpinnerWrapper $size={sizes[size]} aria-hidden="true">
    <Icon name="Loader" size={size === 'sm' ? 'xs' : 'sm'} color="inherit" />
  </SpinnerWrapper>
)

const SpinnerWrapper = styled.span<{ $size: number }>`
  display:    inline-flex;
  align-items: center;
  justify-content: center;
  width:      ${({ $size }) => $size}px;
  height:     ${({ $size }) => $size}px;
  animation:  ${spin} 600ms linear infinite;
  flex-shrink: 0;
  color:      currentColor;
`
