'use client'

import { useState }     from 'react'
import { useForm }      from 'react-hook-form'
import { useRouter }    from 'next/navigation'
import Link             from 'next/link'
import styled           from '@emotion/styled'
import { motion, type Variants } from 'framer-motion'
import { useAuth }      from '@/providers/AuthProvider'
import { Icon }         from '@kore/ui-web'

// ── Tipos ─────────────────────────────────────────────────────────────────
interface RegisterFormData {
  name:            string
  email:           string
  password:        string
  confirmPassword: string
}

// ── Variantes ─────────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07 } },
}

// ── Componente ────────────────────────────────────────────────────────────
const RegisterForm = () => {
  const { register: registerUser, loginGoogle } = useAuth()
  const router                                  = useRouter()
  const [authError,     setAuthError]           = useState<string | null>(null)
  const [loading,       setLoading]             = useState(false)
  const [googleLoading, setGoogleLoading]       = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>()

  const password = watch('password')

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true)
    setAuthError(null)
    try {
      await registerUser(data.name, data.email, data.password)
      router.push('/workouts')
    } catch (err: unknown) {
      const code = (err as any)?.code
      setAuthError(
        code === 'auth/email-already-in-use'
          ? 'Este email ya está registrado'
          : 'Error al crear la cuenta. Inténtalo de nuevo.'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setGoogleLoading(true)
    setAuthError(null)
    try {
      await loginGoogle()
      router.push('/workouts')
    } catch {
      setAuthError('Error al registrarse con Google.')
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <Wrapper>
      <motion.div variants={stagger} initial="hidden" animate="visible">

        <motion.div variants={fadeUp}>
          <LogoLink href="/">KORE</LogoLink>
          <Title>Empieza hoy</Title>
          <Subtitle>Crea tu cuenta y accede a todos los entrenamientos KORE.</Subtitle>
        </motion.div>

        <motion.div variants={fadeUp}>
          <GoogleButton
            type="button"
            onClick={handleGoogle}
            disabled={googleLoading || loading}
          >
            {googleLoading
              ? <Icon name="Loader" size="sm" color="inherit" />
              : <GoogleIcon />
            }
            Continuar con Google
          </GoogleButton>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Divider><DividerText>o con email</DividerText></Divider>
        </motion.div>

        <Form onSubmit={handleSubmit(onSubmit)} noValidate>

          <motion.div variants={fadeUp}>
            <FieldGroup>
              <Label htmlFor="name">Nombre</Label>
              <InputField
                id="name"
                type="text"
                placeholder="Tu nombre"
                $hasError={!!errors.name}
                autoComplete="name"
                {...register('name', {
                  required:  'El nombre es obligatorio',
                  minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                })}
              />
              {errors.name && <FieldError>{errors.name.message}</FieldError>}
            </FieldGroup>
          </motion.div>

          <motion.div variants={fadeUp}>
            <FieldGroup>
              <Label htmlFor="email">Email</Label>
              <InputField
                id="email"
                type="email"
                placeholder="tu@email.com"
                $hasError={!!errors.email}
                autoComplete="email"
                {...register('email', {
                  required: 'El email es obligatorio',
                  pattern: {
                    value:   /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Email no válido',
                  },
                })}
              />
              {errors.email && <FieldError>{errors.email.message}</FieldError>}
            </FieldGroup>
          </motion.div>

          <motion.div variants={fadeUp}>
            <FieldGroup>
              <Label htmlFor="password">Contraseña</Label>
              <InputField
                id="password"
                type="password"
                placeholder="Mínimo 8 caracteres"
                $hasError={!!errors.password}
                autoComplete="new-password"
                {...register('password', {
                  required:  'La contraseña es obligatoria',
                  minLength: { value: 8, message: 'Mínimo 8 caracteres' },
                  pattern: {
                    value:   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message: 'Debe incluir mayúscula, minúscula y número',
                  },
                })}
              />
              {errors.password && <FieldError>{errors.password.message}</FieldError>}
            </FieldGroup>
          </motion.div>

          <motion.div variants={fadeUp}>
            <FieldGroup>
              <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
              <InputField
                id="confirmPassword"
                type="password"
                placeholder="Repite la contraseña"
                $hasError={!!errors.confirmPassword}
                autoComplete="new-password"
                {...register('confirmPassword', {
                  required: 'Confirma tu contraseña',
                  validate: val =>
                    val === password || 'Las contraseñas no coinciden',
                })}
              />
              {errors.confirmPassword && (
                <FieldError>{errors.confirmPassword.message}</FieldError>
              )}
            </FieldGroup>
          </motion.div>

          {authError && (
            <motion.div variants={fadeUp}>
              <ErrorBanner>
                <Icon name="CircleAlert" size="sm" color="inherit" />
                {authError}
              </ErrorBanner>
            </motion.div>
          )}

          <motion.div variants={fadeUp}>
            <SubmitButton
              type="submit"
              disabled={loading || googleLoading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {loading
                ? <Icon name="Loader" size="sm" color="inherit" />
                : 'Crear cuenta'
              }
            </SubmitButton>
          </motion.div>

        </Form>

        <motion.div variants={fadeUp}>
          <Footer>
            ¿Ya tienes cuenta?{' '}
            <FooterLink href="/login">Inicia sesión</FooterLink>
          </Footer>
        </motion.div>

      </motion.div>
    </Wrapper>
  )
}

// ── Google Icon ───────────────────────────────────────────────────────────
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
)

// ── Styled — igual que LoginForm ──────────────────────────────────────────
const Wrapper        = styled.div`width: 100%; max-width: 420px; margin: 0 auto; padding: var(--spacing-2xl) var(--spacing-l);`
const LogoLink       = styled(Link)`display: block; font-family: var(--font-family-display); font-size: var(--scale-2xl); font-weight: var(--font-weight-light); color: var(--foreground-accent-on-surface); text-decoration: none; letter-spacing: var(--letter-spacing-wide); margin-bottom: var(--spacing-2xl);`
const Title          = styled.h1`font-family: var(--font-family-display); font-size: clamp(1.8rem, 4vw, 2.5rem); font-weight: var(--font-weight-light); color: var(--foreground-primary-on-surface); margin: 0 0 var(--spacing-s); line-height: 1.1;`
const Subtitle       = styled.p`font-family: var(--font-family-ui); font-size: var(--scale-m); font-weight: var(--font-weight-light); color: var(--foreground-secondary-on-surface); margin: 0 0 var(--spacing-2xl); line-height: var(--line-height-spacious);`
const GoogleButton   = styled.button`display: flex; align-items: center; justify-content: center; gap: var(--spacing-s); width: 100%; padding: var(--spacing-m); border-radius: var(--radius-full); border: 1.5px solid var(--stroke-secondary-on-surface); background: var(--background-surface-solid); color: var(--foreground-primary-on-surface); font-family: var(--font-family-ui); font-size: var(--scale-s); font-weight: var(--font-weight-semibold); cursor: pointer; transition: border-color 150ms, background 150ms; margin-bottom: var(--spacing-l); &:hover:not(:disabled) { border-color: var(--stroke-accent); background: var(--background-action-hover); } &:disabled { opacity: 0.5; cursor: not-allowed; }`
const Divider        = styled.div`display: flex; align-items: center; gap: var(--spacing-m); margin-bottom: var(--spacing-l); &::before, &::after { content: ''; flex: 1; height: 1px; background: var(--stroke-secondary-on-surface); }`
const DividerText    = styled.span`font-family: var(--font-family-ui); font-size: var(--scale-xs); color: var(--foreground-tertiary-on-surface); letter-spacing: var(--letter-spacing-spacious); text-transform: uppercase; white-space: nowrap;`
const Form           = styled.form`display: flex; flex-direction: column; gap: var(--spacing-l); margin-bottom: var(--spacing-l);`
const FieldGroup     = styled.div`display: flex; flex-direction: column; gap: var(--spacing-xs);`
const Label          = styled.label`font-family: var(--font-family-ui); font-size: var(--scale-s); font-weight: var(--font-weight-semibold); letter-spacing: var(--letter-spacing-spacious); text-transform: uppercase; color: var(--foreground-secondary-on-surface);`
const InputField     = styled.input<{ $hasError: boolean }>`width: 100%; background: var(--background-surface-low); border: 1.5px solid ${({ $hasError }) => $hasError ? 'var(--stroke-error)' : 'var(--stroke-secondary-on-surface)'}; border-radius: var(--radius-s); padding: var(--spacing-m); font-family: var(--font-family-ui); font-size: var(--scale-m); color: var(--foreground-primary-on-surface); outline: none; transition: border-color 150ms, box-shadow 150ms; box-sizing: border-box; &::placeholder { color: var(--foreground-tertiary-on-surface); } &:focus { border-color: var(--stroke-accent); box-shadow: 0 0 0 3px var(--background-accent-dim); }`
const FieldError     = styled.span`font-family: var(--font-family-ui); font-size: var(--scale-xs); color: var(--foreground-error-on-surface);`
const ErrorBanner    = styled.div`display: flex; align-items: center; gap: var(--spacing-s); padding: var(--spacing-m); border-radius: var(--radius-s); background: var(--background-error-dim); color: var(--foreground-error-on-surface); font-family: var(--font-family-ui); font-size: var(--scale-s); font-weight: var(--font-weight-semibold);`
const SubmitButton   = styled(motion.button)`display: flex; align-items: center; justify-content: center; gap: var(--spacing-s); width: 100%; padding: var(--spacing-m); border-radius: var(--radius-full); border: none; background: var(--background-accent-solid); color: var(--foreground-primary-on-accent); font-family: var(--font-family-ui); font-size: var(--scale-s); font-weight: var(--font-weight-semibold); letter-spacing: var(--letter-spacing-spacious); text-transform: uppercase; cursor: pointer; transition: background 150ms; &:disabled { opacity: 0.5; cursor: not-allowed; } &:hover:not(:disabled) { background: color-mix(in srgb, var(--background-accent-solid), black 12%); }`
const Footer         = styled.p`font-family: var(--font-family-ui); font-size: var(--scale-s); color: var(--foreground-secondary-on-surface); text-align: center; margin: 0;`
const FooterLink     = styled(Link)`color: var(--foreground-accent-on-surface); font-weight: var(--font-weight-semibold); text-decoration: none; &:hover { text-decoration: underline; }`

export default RegisterForm
