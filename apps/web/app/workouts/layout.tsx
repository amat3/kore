'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styled from '@emotion/styled'
import { Provider }   from 'react-redux'
import { store }      from '@/store/store'
import { useAuth }    from '@/providers/AuthProvider'
import { Avatar, Icon, Text } from '@kore/ui-web'
import ThemeToggle    from '@/components/ThemeToggle/ThemeToggle'

export default function WorkoutsLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) router.replace('/login')
  }, [user, loading, router])

  if (loading || !user)
    return (
      <Loading>
        <Icon name="Loader" size="lg" color="accent" />
      </Loading>
    )

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  return (
    <Provider store={store}>
      <AppHeader>
        <Container>
          <LogoLink href="/">KORE</LogoLink>
          <Actions>
            <UserInfo>
              <Avatar
                name={user.displayName ?? user.email ?? 'Usuario'}
                src={user.photoURL ?? undefined}
                size="sm"
              />
              <UserName variant="body-sm">{user.displayName ?? user.email}</UserName>
            </UserInfo>
            <LogoutButton onClick={handleLogout} type="button" aria-label="Cerrar sesión">
              <Icon name="LogOut" size="sm" color="inherit" />
            </LogoutButton>
            <ThemeToggle />
          </Actions>
        </Container>
      </AppHeader>
      <PageWrapper>{children}</PageWrapper>
    </Provider>
  )
}

const AppHeader = styled.header`
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

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-s);
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-s);
`

const UserName = styled(Text)`
  font-weight: var(--font-weight-semibold);
  color:       var(--foreground-secondary-on-surface);
  max-width:   160px;
  overflow:    hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (max-width: 600px) { display: none; }
`

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 0.5px solid var(--stroke-secondary-on-surface);
  background: transparent;
  color: var(--foreground-secondary-on-surface);
  cursor: pointer;
  transition:
    border-color 150ms,
    color 150ms;
  &:hover {
    border-color: var(--stroke-error);
    color: var(--foreground-error-on-surface);
  }
`

const PageWrapper = styled.main`
  min-height: 100svh;
  padding-top: 56px;
  background: var(--background-surface-low);
`

const Loading = styled.div`
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background-surface-low);
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  svg {
    animation: spin 600ms linear infinite;
  }
`
