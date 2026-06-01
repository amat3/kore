'use client'

import Link from 'next/link'
import styled from '@emotion/styled'
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle'

const Header = () => (
  <HeaderStyled>
    <Container>
      <LogoLink href="/">KORE</LogoLink>
      <ThemeToggle />
    </Container>
  </HeaderStyled>
)

const HeaderStyled = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 56px;
  display: flex;
  align-items: center;
  background: var(--background-bars-glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 0.5px solid var(--stroke-secondary-on-surface);
`

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding-inline: var(--spacing-l);
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (min-width: 600px) {
    padding-inline: var(--spacing-2xl);
  }
  @media (min-width: 1200px) {
    padding-inline: var(--spacing-3xl);
  }
`

const LogoLink = styled(Link)`
  font-family: var(--font-family-display);
  font-size: var(--scale-xl);
  font-weight: var(--font-weight-light);
  letter-spacing: var(--letter-spacing-wide);
  color: var(--foreground-accent-on-surface);
  text-decoration: none;
  line-height: 1;
`

export default Header
