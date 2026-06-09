'use client'

import Link from 'next/link'
import styled from '@emotion/styled'
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle'
import KoreWordmark from '@/components/KoreWordmark/KoreWordmark'

const Header = () => (
  <HeaderStyled>
    <Container>
      <LogoLink href="/"><KoreWordmark fontSize="var(--scale-xl)" /></LogoLink>
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
  max-width:       var(--container-xl);
  width: 100%;
  margin: 0 auto;
  padding-inline:  var(--layout-gutter);
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const LogoLink = styled(Link)`
  display:         inline-flex;
  text-decoration: none;
  line-height:     1;
`

export default Header
