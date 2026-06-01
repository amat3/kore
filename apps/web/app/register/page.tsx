import RegisterForm from '@/components/Auth/RegisterForm'

export const metadata = {
  title: 'Crear cuenta — KORE',
}

export default function RegisterPage() {
  return (
    <main style={{
      minHeight:       '100svh',
      display:         'flex',
      alignItems:      'center',
      justifyContent:  'center',
      backgroundColor: 'var(--background-surface-low)',
      padding:         '1rem',
    }}>
      <RegisterForm />
    </main>
  )
}