import LoginForm from '@/components/Auth/LoginForm'

export const metadata = {
  title: 'Iniciar sesión — KORE',
}

export default function LoginPage() {
  return (
    <main style={{
      minHeight:       '100svh',
      display:         'flex',
      alignItems:      'center',
      justifyContent:  'center',
      backgroundColor: 'var(--background-surface-low)',
      padding:         '1rem',
    }}>
      <LoginForm />
    </main>
  )
}