'use client'

import i18n               from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  es: {
    translation: {
      // Portfolio hero
      'portfolio.overline':     'Portfolio técnico',
      'portfolio.back':         '← Ver la app KORE',
      'portfolio.role':         'Mid Frontend Developer · React / React Native',
      'portfolio.description':  'Especialista en UI, design systems y animaciones avanzadas. Tokens semánticos, monorrepo Turborepo, componentes con Storybook y animaciones GSAP — construido desde cero con React 19 y Next.js 16.',

      // Stack section
      'stack.overline':         'Stack técnico',
      'stack.title':            'Herramientas con las que',
      'stack.title.em':         'construyo',
      'stack.subtitle':         'Tecnologías que uso en producción a diario — no en tutoriales.',

      // Stack categories
      'stack.cat.frontend':     'Frontend',
      'stack.cat.mobile':       'Mobile',
      'stack.cat.animation':    'Animación',
      'stack.cat.backend':      'Backend & datos',
      'stack.cat.tooling':      'Tooling',

      // Contact
      'contact.overline':       'Contacto',
      'contact.title':          'Hablemos',
      'contact.subtitle':       'Disponible para nuevos proyectos y oportunidades.',
      'contact.name':           'Nombre',
      'contact.email':          'Email',
      'contact.company':        'Empresa (opcional)',
      'contact.message':        'Mensaje',
      'contact.send':           'Enviar mensaje',
      'contact.sending':        'Enviando...',
      'contact.success':        '¡Mensaje enviado! Te respondo pronto.',
      'contact.error':          'Error al enviar. Inténtalo de nuevo.',

      // Lang toggle
      'lang.switch':            'EN',
    },
  },
  en: {
    translation: {
      // Portfolio hero
      'portfolio.overline':     'Technical Portfolio',
      'portfolio.back':         '← Back to KORE app',
      'portfolio.role':         'Mid Frontend Developer · React / React Native',
      'portfolio.description':  'UI specialist in design systems and advanced animations. Semantic tokens, Turborepo monorepo, Storybook components and GSAP animations — built from scratch with React 19 and Next.js 16.',

      // Stack section
      'stack.overline':         'Tech Stack',
      'stack.title':            'Tools I',
      'stack.title.em':         'build with',
      'stack.subtitle':         'Technologies I use in production daily — not just in tutorials.',

      // Stack categories
      'stack.cat.frontend':     'Frontend',
      'stack.cat.mobile':       'Mobile',
      'stack.cat.animation':    'Animation',
      'stack.cat.backend':      'Backend & data',
      'stack.cat.tooling':      'Tooling',

      // Contact
      'contact.overline':       'Contact',
      'contact.title':          "Let's talk",
      'contact.subtitle':       'Available for new projects and opportunities.',
      'contact.name':           'Name',
      'contact.email':          'Email',
      'contact.company':        'Company (optional)',
      'contact.message':        'Message',
      'contact.send':           'Send message',
      'contact.sending':        'Sending...',
      'contact.success':        'Message sent! I\'ll get back to you soon.',
      'contact.error':          'Failed to send. Please try again.',

      // Lang toggle
      'lang.switch':            'ES',
    },
  },
}

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng:           'es',
      fallbackLng:   'es',
      interpolation: { escapeValue: false },
    })
}

export default i18n
