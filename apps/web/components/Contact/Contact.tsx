'use client'

/**
 * KORE Portfolio — Contact Section §06
 *
 * Formulario de contacto con react-hook-form + Firebase Firestore.
 * Demuestra: validación, estados loading/success/error, UX de formulario.
 */

import { useState }           from 'react'
import { useForm }            from 'react-hook-form'
import styled                 from '@emotion/styled'
import { motion, type Variants } from 'framer-motion'
import { collection, addDoc } from 'firebase/firestore'
import { db }                 from '@/lib/firebase'
import emailjs from '@emailjs/browser'
import { Icon, Text }         from '@kore/ui-web'

// ── Tipos ─────────────────────────────────────────────────────────────────
interface ContactForm {
  name:     string
  email:    string
  company?: string
  message:  string
}

// ── Variantes Framer ──────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  hidden:  {},
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
        from_name:  data.name,
        from_email: data.email,
        company:    data.company ?? 'No especificada',
        message:    data.message,
        reply_to:   data.email,
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    )

    setStatus('success')
    reset()
 } catch  {
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
            <SectionOverline variant="overline" as="span">Contacto</SectionOverline>
            <SectionTitle variant="h1" as="h2">Hablemos</SectionTitle>
            <SectionSubtitle variant="body-light">
              Disponible para nuevos proyectos y oportunidades.
              Si buscas un developer que combine criterio visual
              con solidez técnica, escríbeme.
            </SectionSubtitle>

            <ContactLinks>
              <ContactLink
                href="https://linkedin.com/in/juanan-amate-react"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="Link2"      size="sm" color="inherit" />
                juanan-amate-react
              </ContactLink>
              <ContactLink
                href="https://github.com/amat3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="Code"       size="sm" color="inherit" />
                github.com/amat3
              </ContactLink>
              <ContactLink href="mailto:juanantamate@gmail.com">
                <Icon name="Mail"       size="sm" color="inherit" />
                juanantamate@gmail.com
              </ContactLink>
              <ContactLink href="tel:+34629572745">
                <Icon name="Phone"      size="sm" color="inherit" />
                +34 629 572 745
              </ContactLink>
            </ContactLinks>

            <LocationNote variant="body-sm" as="p">
              <Icon name="MapPin" size="xs" color="muted" />
              Jaén, España · Disponible para viajes nacionales e internacionales
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
                  {errors.name && <FieldError variant="caption" as="span">{errors.name.message}</FieldError>}
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
                        value:   /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Email no válido',
                      },
                    })}
                  />
                  {errors.email && <FieldError variant="caption" as="span">{errors.email.message}</FieldError>}
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
                  {errors.message && <FieldError variant="caption" as="span">{errors.message.message}</FieldError>}
                </FieldGroup>
              </motion.div>

              <motion.div variants={fadeUp}>
                <SubmitButton
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  $status={status}
                  whileHover={status === 'idle' ? { scale: 1.02 } : {}}
                  whileTap={status === 'idle'  ? { scale: 0.98 } : {}}
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
  padding-block:    clamp(4rem, 10vw, 8rem);
  border-top:       0.5px solid var(--stroke-secondary-on-surface);
`

const Container = styled.div`
  max-width:      1200px;
  margin:         0 auto;
  padding-inline: var(--spacing-l);
  @media (min-width: 600px)  { padding-inline: var(--spacing-2xl); }
  @media (min-width: 1200px) { padding-inline: var(--spacing-3xl); }
`

const Grid = styled.div`
  display:               grid;
  grid-template-columns: 1fr;
  gap:                   clamp(3rem, 6vw, 6rem);

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    align-items:           start;
  }
`

const SectionOverline = styled(Text)`
  display:       block;
  margin-bottom: var(--spacing-m);
`

const SectionTitle = styled(Text)`
  font-size:   clamp(2.5rem, 5vw, 4.5rem);
  line-height: 1.05;
  margin:      0 0 var(--spacing-l);
`

const SectionSubtitle = styled(Text)`
  color:  var(--foreground-secondary-on-surface);
  margin: 0 0 var(--spacing-2xl);
`

const ContactLinks = styled.div`
  display:        flex;
  flex-direction: column;
  gap:            var(--spacing-m);
  margin-bottom:  var(--spacing-xl);
`

const ContactLink = styled.a`
  display:     flex;
  align-items: center;
  gap:         var(--spacing-s);
  font-family: var(--font-family-ui);
  font-size:   var(--scale-s);
  font-weight: var(--font-weight-semibold);
  color:       var(--foreground-secondary-on-surface);
  text-decoration: none;
  transition:  color 150ms;

  &:hover { color: var(--foreground-accent-on-surface); }
`

const LocationNote = styled(Text)`
  display:     flex;
  align-items: flex-start;
  gap:         var(--spacing-xs);
  color:       var(--foreground-tertiary-on-surface);
  margin:      0;
`

const FormCard = styled.form`
  display:        flex;
  flex-direction: column;
  gap:            var(--spacing-l);
  padding:        var(--spacing-2xl);
  border-radius:  var(--corners-default-card);
  border:         0.5px solid var(--stroke-secondary-on-surface);
  background:     var(--background-surface-solid);
`

const FieldGroup = styled.div`
  display:        flex;
  flex-direction: column;
  gap:            var(--spacing-xs);
`

const Label = styled.label`
  font-family:    var(--font-family-ui);
  font-size:      var(--scale-s);
  font-weight:    var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-spacious);
  text-transform: uppercase;
  color:          var(--foreground-secondary-on-surface);
`

const Optional = styled.span`
  font-weight:    var(--font-weight-regular);
  text-transform: none;
  letter-spacing: normal;
  opacity:        0.6;
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
  min-height:   120px;
  border-color: ${({ $hasError }) =>
    $hasError ? 'var(--stroke-error)' : 'var(--stroke-secondary-on-surface)'};
`

const FieldError = styled(Text)`
  display:     flex;
  align-items: center;
  gap:         var(--spacing-2xs);
  color:       var(--foreground-error-on-surface);
`

const SubmitButton = styled(motion.button)<{
  $status: 'idle' | 'loading' | 'success' | 'error'
}>`
  display:        flex;
  align-items:    center;
  justify-content: center;
  gap:            var(--spacing-s);
  width:          100%;
  padding:        var(--spacing-m) var(--spacing-xl);
  border-radius:  var(--radius-full);
  border:         none;
  background:     ${({ $status }) =>
    $status === 'success' ? 'var(--background-success-solid)' :
    $status === 'error'   ? 'var(--background-error-dim)'    :
                            'var(--background-accent-solid)'};
  color:          var(--foreground-primary-on-accent);
  font-family:    var(--font-family-ui);
  font-size:      var(--scale-s);
  font-weight:    var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-spacious);
  text-transform: uppercase;
  cursor:         ${({ $status }) =>
    $status === 'loading' || $status === 'success' ? 'default' : 'pointer'};
  transition:     background 200ms;
`

const SpinnerIcon = styled(Icon)`
  animation: spin 600ms linear infinite;
  @keyframes spin {
    from { transform: rotate(0deg);   }
    to   { transform: rotate(360deg); }
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
  color:      var(--foreground-error-on-surface);
`

const SuccessBanner = styled.div`
  ${bannerBase}
  background: var(--background-success-dim);
  color:      var(--foreground-success-on-surface);
`

export default Contact
