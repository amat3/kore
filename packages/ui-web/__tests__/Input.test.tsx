import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from '../src/atoms/Input/Input'

describe('Input', () => {
  it('renderiza con label y placeholder', () => {
    render(<Input label="Email" placeholder="tu@email.com" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('tu@email.com')).toBeInTheDocument()
  })

  it('llama a onChange al escribir', async () => {
    const handleChange = jest.fn()
    render(<Input onChange={handleChange} />)
    await userEvent.type(screen.getByRole('textbox'), 'hola')
    expect(handleChange).toHaveBeenCalled()
  })

  it('muestra el mensaje de error cuando errorText está presente', () => {
    render(<Input label="Email" errorText="Email no válido" />)
    expect(screen.getByText('Email no válido')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('muestra el mensaje de éxito cuando successText está presente', () => {
    render(<Input successText="Email disponible" />)
    expect(screen.getByText('Email disponible')).toBeInTheDocument()
  })

  it('el input queda disabled cuando state es disabled', () => {
    render(<Input disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })
})
