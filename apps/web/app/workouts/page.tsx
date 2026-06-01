'use client'

import { useEffect }   from 'react'
import { useRouter }   from 'next/navigation'
import styled          from '@emotion/styled'
import { useAuth }     from '@/providers/AuthProvider'
import  Catalog     from '@/components/Catalog/Catalog'
import { Icon }        from '@kore/ui-web'

export default function WorkoutsPage() {
  const { user, loading } = useAuth()
  const router                    = useRouter()

  useEffect(() => {
    if (!loading && !user) router.replace('/login')
  }, [user, loading, router])

  if (loading || !user) return <LoadingScreen />

  return (
    <Page>
      <Catalog />
    </Page>
  )
}

const LoadingScreen = () => (
  <Loading>
    <Icon name="Loader" size="lg" color="accent" />
  </Loading>
)

const Page = styled.main`
  min-height:      100svh;
  background:      var(--background-surface-low);
  padding-top:     56px;
`

const UserBar = styled.div`
  display:         flex;
  align-items:     center;
  justify-content: space-between;
  padding:         var(--spacing-m) var(--spacing-2xl);
  background:      var(--background-surface-solid);
  border-bottom:   0.5px solid var(--stroke-secondary-on-surface);
`

const UserInfo = styled.div`
  display:     flex;
  align-items: center;
  gap:         var(--spacing-s);
  font-family: var(--font-family-ui);
  font-size:   var(--scale-s);
  font-weight: var(--font-weight-semibold);
  color:       var(--foreground-primary-on-surface);
`

const LogoutButton = styled.button`
  display:     flex;
  align-items: center;
  gap:         var(--spacing-xs);
  padding:     var(--spacing-xs) var(--spacing-m);
  border-radius: var(--radius-full);
  border:      0.5px solid var(--stroke-secondary-on-surface);
  background:  transparent;
  color:       var(--foreground-secondary-on-surface);
  font-family: var(--font-family-ui);
  font-size:   var(--scale-s);
  font-weight: var(--font-weight-semibold);
  cursor:      pointer;
  transition:  border-color 150ms, color 150ms;
  &:hover { border-color: var(--stroke-error); color: var(--foreground-error-on-surface); }
`

const Loading = styled.div`
  min-height:      100svh;
  display:         flex;
  align-items:     center;
  justify-content: center;
  background:      var(--background-surface-low);
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  svg { animation: spin 600ms linear infinite; }
`
