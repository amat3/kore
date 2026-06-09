'use client'

import styled from '@emotion/styled'

interface KoreWordmarkProps {
  fontSize?: string
  color?:    string
}

const KoreWordmark = ({
  fontSize = 'var(--scale-2xl)',
  color    = 'var(--foreground-accent-on-surface)',
}: KoreWordmarkProps) => (
  <Wrapper aria-label="KORE">
    {'KORE'.split('').map((letter, i) => (
      <Letter key={i} $fontSize={fontSize} $color={color} aria-hidden="true">
        {letter}
      </Letter>
    ))}
  </Wrapper>
)

const Wrapper = styled.span`
  display:     inline-flex;
  line-height: 0.9;
`

const Letter = styled.span<{ $fontSize: string; $color: string }>`
  font-family: var(--font-family-display);
  font-size:   ${({ $fontSize }) => $fontSize};
  font-weight: var(--font-weight-light);
  color:       ${({ $color }) => $color};
  line-height: 1;
  display:     inline-block;
`

export default KoreWordmark
