/// <reference path="../declarations.d.ts" />
import type { Preview } from '@storybook/react'
import '@kore/tokens/css'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#F7F4F1' },
        { name: 'dark',  value: '#1A1A1A' },
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
      const isDark = context.globals.backgrounds?.value === '#1A1A1A'
      document.documentElement.setAttribute(
        'data-theme',
        isDark ? 'dark' : 'light'
      )
      return <Story />
    },
  ],
}

export default preview