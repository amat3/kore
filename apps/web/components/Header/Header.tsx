'use client'

import Link            from 'next/link'
import { useRouter }  from 'next/navigation'
import styled          from '@emotion/styled'
import ThemeToggle     from '@/components/ThemeToggle/ThemeToggle'
import { useAuth }     from '@/providers/AuthProvider'
import { Avatar, Icon } from '@kore/ui-web'

const Header = () => {
  const { user, logout } = useAuth()
  const router           = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  return (
    <HeaderStyled>
      <Container>
        <LogoLink href="/">KORE</LogoLink>

        <Actions>
          {user && (
            <>
              <Avatar
                name={user.displayName ?? user.email ?? 'Usuario'}
                src={user.photoURL ?? undefined}
                size="sm"
              />
              <UserName>
                {user.displayName ?? user.email}
              </UserName>
              <LogoutButton
                onClick={handleLogout}
                type="button"
                aria-label="Cerrar sesión"
                title="Cerrar sesión"
              >
                <Icon name="LogOut" size="sm" color="inherit" />
              </LogoutButton>
            </>
          )}
          <ThemeToggle />
        </Actions>
      </Container>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  position:         fixed;
  top:              0;
  left:             0;
  right:            0;
  z-index:          100;
  height:           56px;
  display:          flex;
  align-items:      center;
  background:       var(--background-bars-glass);
  backdrop-filter:  blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom:    0.5px solid var(--stroke-secondary-on-surface);
`

const Container = styled.div`
  max-width:       1200px;
  width:           100%;
  margin:          0 auto;
  padding-inline:  var(--spacing-l);
  display:         flex;
  align-items:     center;
  justify-content: space-between;
  @media (min-width: 600px)  { padding-inline: var(--spacing-2xl); }
  @media (min-width: 1200px) { padding-inline: var(--spacing-3xl); }
`

const LogoLink = styled(Link)`
  font-family:     var(--font-family-display);
  font-size:       var(--scale-xl);
  font-weight:     var(--font-weight-light);
  letter-spacing:  var(--letter-spacing-wide);
  color:           var(--foreground-accent-on-surface);
  text-decoration: none;
  line-height:     1;
`

const Actions = styled.div`
  display:     flex;
  align-items: center;
  gap:         var(--spacing-s);
`

const UserName = styled.span`
  font-family: var(--font-family-ui);
  font-size:   var(--scale-s);
  font-weight: var(--font-weight-semibold);
  color:       var(--foreground-secondary-on-surface);
  max-width:   160px;
  overflow:    hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 600px) { display: none; }
`

const LogoutButton = styled.button`
  display:         flex;
  align-items:     center;
  justify-content: center;
  width:           36px;
  height:          36px;
  border-radius:   50%;
  border:          0.5px solid var(--stroke-secondary-on-surface);
  background:      transparent;
  color:           var(--foreground-secondary-on-surface);
  cursor:          pointer;
  transition:      border-color 150ms, color 150ms;

  &:hover {
    border-color: var(--stroke-error);
    color:        var(--foreground-error-on-surface);
  }
`

export default Header