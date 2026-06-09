'use client'

/**
 * KORE Portfolio — Contact Section §06
 *
 * Formulario de contacto con react-hook-form + Firebase Firestore.
 * Demuestra: validación, estados loading/success/error, UX de formulario.
 */

import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import styled from '@emotion/styled'
import { breakpoints } from '@kore/tokens'
import { motion, type Variants } from 'framer-motion'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import emailjs from '@emailjs/browser'
import { Icon, Text } from '@kore/ui-web'

// ── Tipos ─────────────────────────────────────────────────────────────────
interface ContactForm {
  name: string
  email: string
  company?: string
  message: string
}

// ── Variantes Framer ──────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

// ── Componente ────────────────────────────────────────────────────────────
const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>()

  // Next.js App Router intercepta <a> sin target="_blank" — forzamos href manualmente
  const handleProtoLink = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.location.href = e.currentTarget.href
  }, [])

  const onSubmit = async (data: ContactForm) => {
    setStatus('loading')
    try {
      // 1. Guardar en Firestore
      await addDoc(collection(db, 'contacts'), {
        ...data,
        createdAt: new Date().toISOString(),
      })

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: data.name,
          from_email: data.email,
          company: data.company ?? 'No especificada',
          message: data.message,
          reply_to: data.email,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )

      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <Section>
      <Container>
        <Grid>
          {/* Info lateral */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <SectionOverline variant="overline" as="span">
              Contacto
            </SectionOverline>
            <SectionTitle variant="h1" as="h2">
              Hablemos
            </SectionTitle>
            <SectionSubtitle variant="body-light">
              Disponible para nuevos proyectos y oportunidades. Si buscas un developer que combine
              criterio visual con solidez técnica, escríbeme.
            </SectionSubtitle>

            <ContactLinks>
              <ContactLink
                href="https://linkedin.com/in/juanan-amate-react"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BrandIcon viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </BrandIcon>
                juanan-amate-react
              </ContactLink>
              <ContactLink
                href="https://github.com/amat3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BrandIcon viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </BrandIcon>
                github.com/amat3
              </ContactLink>
              <ContactLink href="mailto:juanantamate@gmail.com" onClick={handleProtoLink}>
                <Icon name="Mail" size="sm" color="inherit" />
                juanantamate@gmail.com
              </ContactLink>
              <ContactLink href="tel:+34629572745" onClick={handleProtoLink}>
                <Icon name="Phone" size="sm" color="inherit" />
                +34 629 572 745
              </ContactLink>
            </ContactLinks>

            <LocationNote variant="body-sm" as="p">
              <Icon name="MapPin" size="xs" color="muted" />
              Jaén, España
            </LocationNote>
          </motion.div>

          {/* Formulario */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <FormCard onSubmit={handleSubmit(onSubmit)} noValidate>
              <motion.div variants={fadeUp}>
                <FieldGroup>
                  <Label htmlFor="name">Nombre *</Label>
                  <InputField
                    id="name"
                    type="text"
                    placeholder="Juan Antonio"
                    $hasError={!!errors.name}
                    {...register('name', {
                      required: 'El nombre es obligatorio',
                      minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                    })}
                  />
                  {errors.name && (
                    <FieldError variant="caption" as="span">
                      {errors.name.message}
                    </FieldError>
                  )}
                </FieldGroup>
              </motion.div>

              <motion.div variants={fadeUp}>
                <FieldGroup>
                  <Label htmlFor="email">Email *</Label>
                  <InputField
                    id="email"
                    type="email"
                    placeholder="tu@empresa.com"
                    $hasError={!!errors.email}
                    {...register('email', {
                      required: 'El email es obligatorio',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Email no válido',
                      },
                    })}
                  />
                  {errors.email && (
                    <FieldError variant="caption" as="span">
                      {errors.email.message}
                    </FieldError>
                  )}
                </FieldGroup>
              </motion.div>

              <motion.div variants={fadeUp}>
                <FieldGroup>
                  <Label htmlFor="company">
                    Empresa <Optional>(opcional)</Optional>
                  </Label>
                  <InputField
                    id="company"
                    type="text"
                    placeholder="Tu empresa"
                    $hasError={false}
                    {...register('company')}
                  />
                </FieldGroup>
              </motion.div>

              <motion.div variants={fadeUp}>
                <FieldGroup>
                  <Label htmlFor="message">Mensaje *</Label>
                  <TextareaField
                    id="message"
                    rows={5}
                    placeholder="Cuéntame sobre el proyecto o la oportunidad..."
                    $hasError={!!errors.message}
                    {...register('message', {
                      required: 'El mensaje es obligatorio',
                      minLength: { value: 20, message: 'Mínimo 20 caracteres' },
                    })}
                  />
                  {errors.message && (
                    <FieldError variant="caption" as="span">
                      {errors.message.message}
                    </FieldError>
                  )}
                </FieldGroup>
              </motion.div>

              <motion.div variants={fadeUp}>
                <SubmitButton
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  $status={status}
                  whileHover={status === 'idle' ? { scale: 1.02 } : {}}
                  whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                >
                  {status === 'loading' ? (
                    <>
                      <SpinnerIcon name="Loader" size="sm" color="inherit" />
                      Enviando...
                    </>
                  ) : status === 'success' ? (
                    <>
                      <Icon name="CircleCheck" size="sm" color="inherit" />
                      ¡Mensaje enviado!
                    </>
                  ) : (
                    <>
                      <Icon name="Send" size="sm" color="inherit" />
                      Enviar mensaje
                    </>
                  )}
                </SubmitButton>
              </motion.div>

              {status === 'error' && (
                <ErrorBanner>
                  <Icon name="CircleAlert" size="sm" color="inherit" />
                  Error al enviar. Inténtalo de nuevo o escríbeme directamente.
                </ErrorBanner>
              )}

              {status === 'success' && (
                <SuccessBanner>
                  <Icon name="CircleCheck" size="sm" color="inherit" />
                  Recibido. Te respondo en menos de 24h.
                </SuccessBanner>
              )}
            </FormCard>
          </motion.div>
        </Grid>
      </Container>
    </Section>
  )
}

// ── Styled ────────────────────────────────────────────────────────────────
const Section = styled.section`
  background-color: var(--background-surface-low);
  padding-block: var(--layout-section-pad);
`

const Container = styled.div`
  max-width: var(--container-xl);
  margin: 0 auto;
  padding-inline: var(--layout-gutter);
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(3rem, 6vw, 6rem);

  @media (min-width: ${breakpoints.tablet}px) {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
`

const SectionOverline = styled(Text)`
  display: block;
  margin-bottom: var(--spacing-m);
`

const SectionTitle = styled(Text)`
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  line-height: 1.05;
  margin: 0 0 var(--spacing-l);
`

const SectionSubtitle = styled(Text)`
  color: var(--foreground-secondary-on-surface);
  margin: 0 0 var(--spacing-2xl);
`

const ContactLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-m);
  margin-bottom: var(--spacing-xl);
`

const BrandIcon = styled.svg`
  width:       16px;
  height:      16px;
  fill:        currentColor;
  flex-shrink: 0;
`

const ContactLink = styled.a`
  display: flex;
  align-items: center;
  gap: var(--spacing-s);
  font-family: var(--font-family-ui);
  font-size: var(--scale-s);
  font-weight: var(--font-weight-semibold);
  color: var(--foreground-secondary-on-surface);
  text-decoration: none;
  transition: color 150ms;

  &:hover {
    color: var(--foreground-accent-on-surface);
  }
`

const LocationNote = styled(Text)`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--foreground-tertiary-on-surface);
  margin: 0;
`

const FormCard = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-l);
  padding: var(--spacing-2xl);
  border-radius: var(--corners-default-card);
  border: 0.5px solid var(--stroke-secondary-on-surface);
  background: var(--background-surface-solid);
`

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`

const Label = styled.label`
  font-family: var(--font-family-ui);
  font-size: var(--scale-s);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-spacious);
  text-transform: uppercase;
  color: var(--foreground-secondary-on-surface);
`

const Optional = styled.span`
  font-weight: var(--font-weight-regular);
  text-transform: none;
  letter-spacing: normal;
  opacity: 0.6;
`

const inputBase = `
  width:            100%;
  background:       var(--background-surface-low);
  border:           1.5px solid var(--stroke-secondary-on-surface);
  border-radius:    var(--radius-s);
  padding:          var(--spacing-m);
  font-family:      var(--font-family-ui);
  font-size:        var(--scale-m);
  color:            var(--foreground-primary-on-surface);
  outline:          none;
  transition:       border-color 150ms, box-shadow 150ms;
  box-sizing:       border-box;

  &::placeholder { color: var(--foreground-tertiary-on-surface); }

  &:focus {
    border-color: var(--stroke-accent);
    box-shadow:   0 0 0 3px var(--background-accent-dim);
  }
`

const InputField = styled.input<{ $hasError: boolean }>`
  ${inputBase}
  border-color: ${({ $hasError }) =>
    $hasError ? 'var(--stroke-error)' : 'var(--stroke-secondary-on-surface)'};
`

const TextareaField = styled.textarea<{ $hasError: boolean }>`
  ${inputBase}
  resize:       vertical;
  min-height: 120px;
  border-color: ${({ $hasError }) =>
    $hasError ? 'var(--stroke-error)' : 'var(--stroke-secondary-on-surface)'};
`

const FieldError = styled(Text)`
  display: flex;
  align-items: center;
  gap: var(--spacing-2xs);
  color: var(--foreground-error-on-surface);
`

const SubmitButton = styled(motion.button)<{
  $status: 'idle' | 'loading' | 'success' | 'error'
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-s);
  width: 100%;
  padding: var(--spacing-m) var(--spacing-xl);
  border-radius: var(--radius-full);
  border: none;
  background: ${({ $status }) =>
    $status === 'success'
      ? 'var(--background-success-solid)'
      : $status === 'error'
        ? 'var(--background-error-dim)'
        : 'var(--background-accent-solid)'};
  color: var(--foreground-primary-on-accent);
  font-family: var(--font-family-ui);
  font-size: var(--scale-s);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-spacious);
  text-transform: uppercase;
  cursor: ${({ $status }) =>
    $status === 'loading' || $status === 'success' ? 'default' : 'pointer'};
  transition: background 200ms;
`

const SpinnerIcon = styled(Icon)`
  animation: spin 600ms linear infinite;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

const bannerBase = `
  display:     flex;
  align-items: center;
  gap:         var(--spacing-s);
  padding:     var(--spacing-m);
  border-radius: var(--radius-s);
  font-family: var(--font-family-ui);
  font-size:   var(--scale-s);
  font-weight: var(--font-weight-semibold);
`

const ErrorBanner = styled.div`
  ${bannerBase}
  background: var(--background-error-dim);
  color: var(--foreground-error-on-surface);
`

const SuccessBanner = styled.div`
  ${bannerBase}
  background: var(--background-success-dim);
  color: var(--foreground-success-on-surface);
`

export default Contact
