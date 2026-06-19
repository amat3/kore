import RegisterForm  from '@/components/Auth/RegisterForm'
import GlassScene    from '@/components/GlassScene/GlassScene'

export const metadata = {
  title: 'Crear cuenta — KORE',
}

export default function RegisterPage() {
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
        <RegisterForm />
      </div>
    </main>
  )
}
