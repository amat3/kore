import LoginForm   from '@/components/Auth/LoginForm'
import GlassScene  from '@/components/GlassScene/GlassScene'

export const metadata = {
  title: 'Iniciar sesión — KORE',
}

export default function LoginPage() {
  return (
    <main style={{
      position:        'relative',
      minHeight:       '100svh',
      display:         'flex',
      alignItems:      'center',
      justifyContent:  'center',
      padding:         '1rem',
      zIndex:          1,
    }}>
      <GlassScene position="fixed" />
      <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <LoginForm />
      </div>
    </main>
  )
}
