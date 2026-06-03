import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '../src/atoms/Button/Button'

describe('Button', () => {
  it('renderiza el texto correctamente', () => {
    render(<Button variant="solid">Empezar</Button>)
    expect(screen.getByRole('button', { name: 'Empezar' })).toBeInTheDocument()
  })

  it('llama a onClick al pulsar', async () => {
    const handleClick = jest.fn()
    render(<Button variant="solid" onClick={handleClick}>Pulsar</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('no llama a onClick cuando está disabled', async () => {
    const handleClick = jest.fn()
    render(<Button variant="solid" disabled onClick={handleClick}>Disabled</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('muestra el estado loading y no llama onClick', async () => {
    const handleClick = jest.fn()
    render(<Button variant="solid" isLoading onClick={handleClick}>Loading</Button>)
    const btn = screen.getByRole('button')
    expect(btn).toBeDisabled()
    await userEvent.click(btn)
    expect(handleClick).not.toHaveBeenCalled()
  })
})
