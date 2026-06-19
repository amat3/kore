/// <reference path="../declarations.d.ts" />
import type { Preview } from '@storybook/react'
import '@kore/tokens/css'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light',       value: '#F7F4F1' },
        { name: 'dark',        value: '#1A1A1A' },
        { name: 'glass-scene', value: 'linear-gradient(135deg, #B05E3A 0%, #1A1A1A 55%, #7A3D22 100%)' },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name:   'Mobile',
          styles: { width: '390px', height: '844px' },
        },
        tablet: {
          name:   'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
        desktop: {
          name:   'Desktop',
          styles: { width: '1280px', height: '800px' },
        },
        wide: {
          name:   'Wide',
          styles: { width: '1920px', height: '1080px' },
        },
      },
      defaultViewport: 'desktop',
    },
    layout: 'padded',
  },
  decorators: [
    (Story, context) => {
      const bg     = context.globals.backgrounds?.value ?? ''
      const isDark = bg === '#1A1A1A' || bg.startsWith('linear-gradient')
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
      return <Story />
    },
  ],
}

export default preview