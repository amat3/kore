import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  es: {
    translation: {
      'nav.home':      'Inicio',
      'nav.workouts':  'Entrena',
      'nav.activity':  'Actividad',
      'nav.profile':   'Perfil',
      'home.greeting': 'Hola, {{name}}',
      'home.streak':   '{{days}} días de racha',
      'workouts.title': 'Entrenamientos',
      'workouts.search': 'Buscar...',
      'workouts.empty':  'No hay resultados',
      'activity.title':  'Mi actividad',
      'profile.title':       'Perfil',
      'profile.stats':       'Estadísticas',
      'profile.sessions':    'sesiones',
      'profile.minutes':     'minutos',
      'profile.streak':      'racha',
      'profile.preferences': 'Preferencias',
      'profile.darkMode':    'Modo oscuro',
      'profile.language':    'Idioma',
      'profile.logout':      'Cerrar sesión',
      'auth.login':      'Entrar',
      'auth.register':   'Crear cuenta',
      'auth.logout':     'Cerrar sesión',
      'auth.email':      'Email',
      'auth.password':   'Contraseña',
      'auth.name':       'Nombre',
    },
  },
  en: {
    translation: {
      'nav.home':      'Home',
      'nav.workouts':  'Workouts',
      'nav.activity':  'Activity',
      'nav.profile':   'Profile',
      'home.greeting': 'Hi, {{name}}',
      'home.streak':   '{{days}} day streak',
      'workouts.title': 'Workouts',
      'workouts.search': 'Search...',
      'workouts.empty':  'No results found',
      'activity.title':  'My activity',
      'profile.title':       'Profile',
      'profile.stats':       'Stats',
      'profile.sessions':    'sessions',
      'profile.minutes':     'minutes',
      'profile.streak':      'streak',
      'profile.preferences': 'Preferences',
      'profile.darkMode':    'Dark mode',
      'profile.language':    'Language',
      'profile.logout':      'Sign out',
      'auth.login':      'Sign in',
      'auth.register':   'Create account',
      'auth.logout':     'Sign out',
      'auth.email':      'Email',
      'auth.password':   'Password',
      'auth.name':       'Name',
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng:          'es',
  fallbackLng:  'es',
  interpolation: { escapeValue: false },
})

export default i18n
