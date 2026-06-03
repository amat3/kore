import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import Text from '../src/atoms/Text/Text'

describe('Text', () => {
  it('renderiza el tag correcto para cada variant', () => {
    const { rerender } = render(<Text variant="h1">Título</Text>)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()

    rerender(<Text variant="h2">Título</Text>)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()

    rerender(<Text variant="body">Texto</Text>)
    expect(screen.getByText('Texto').tagName).toBe('P')

    rerender(<Text variant="overline" as="span">Label</Text>)
    expect(screen.getByText('Label').tagName).toBe('SPAN')

    rerender(<Text variant="caption">Pie</Text>)
    expect(screen.getByText('Pie').tagName).toBe('SPAN')
  })

  it('el prop `as` sobreescribe el tag por defecto', () => {
    render(<Text variant="h1" as="h3">Override</Text>)
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
  })

  it('renderiza los children correctamente', () => {
    render(<Text variant="body">Hola KORE</Text>)
    expect(screen.getByText('Hola KORE')).toBeInTheDocument()
  })
})
