'use client'

import i18n               from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  es: {
    translation: {
      // Portfolio hero
      'portfolio.overline':     'Portfolio técnico',
      'portfolio.back':         '← Ver la app KORE',
      'portfolio.role':         'Frontend Developer · React, Next.js & React Native',
      'portfolio.description':  'Desarrollador frontend con React, Next.js y TypeScript, especializado en design systems y productos mobile-first que llegan a producción.',

      // Stack section
      'stack.overline':         'Stack técnico',
      'stack.title':            'Herramientas con las que',
      'stack.title.em':         'construyo',
      'stack.subtitle':         'Tecnologías con las que he construido productos en producción y en mis proyectos.',

      // Stack categories
      'stack.cat.frontend':     'Frontend',
      'stack.cat.mobile':       'Mobile',
      'stack.cat.animation':    'Animación',
      'stack.cat.backend':      'Backend & datos',
      'stack.cat.cloud':        'Cloud & DevOps',
      'stack.cat.tooling':      'Tooling y testing',
      'stack.cat.ai':           'IA',

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
      'lang.label':             'Ver esta sección en inglés',
      'lang.demo':              'Demo de i18n con i18next: solo traduce esta sección.',
    },
  },
  en: {
    translation: {
      // Portfolio hero
      'portfolio.overline':     'Technical Portfolio',
      'portfolio.back':         '← Back to KORE app',
      'portfolio.role':         'Frontend Developer · React, Next.js & React Native',
      'portfolio.description':  'Frontend developer working with React, Next.js and TypeScript, focused on design systems and mobile-first products that reach production.',

      // Stack section
      'stack.overline':         'Tech Stack',
      'stack.title':            'Tools I',
      'stack.title.em':         'build with',
      'stack.subtitle':         'Technologies I have shipped production products and personal projects with.',

      // Stack categories
      'stack.cat.frontend':     'Frontend',
      'stack.cat.mobile':       'Mobile',
      'stack.cat.animation':    'Animation',
      'stack.cat.backend':      'Backend & data',
      'stack.cat.cloud':        'Cloud & DevOps',
      'stack.cat.tooling':      'Tooling & testing',
      'stack.cat.ai':           'AI',

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
      'lang.label':             'Ver esta sección en español',
      'lang.demo':              'i18n demo with i18next: only this section is translated.',
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
