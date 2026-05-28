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