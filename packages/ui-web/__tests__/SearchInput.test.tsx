import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchInput from '../src/atoms/SearchInput/SearchInput'

describe('SearchInput', () => {
  it('renderiza el campo de búsqueda', () => {
    render(<SearchInput />)
    expect(screen.getByRole('searchbox')).toBeInTheDocument()
  })

  it('llama a onSearch en cada tecla', async () => {
    const handleSearch = jest.fn()
    render(<SearchInput onSearch={handleSearch} />)
    await userEvent.type(screen.getByRole('searchbox'), 'abc')
    expect(handleSearch).toHaveBeenCalledTimes(3)
    expect(handleSearch).toHaveBeenCalledWith('a')
  })

  it('llama a onSearch con cadena vacía al pulsar Escape', async () => {
    const handleSearch = jest.fn()
    render(<SearchInput onSearch={handleSearch} />)
    await userEvent.type(screen.getByRole('searchbox'), '{Escape}')
    expect(handleSearch).toHaveBeenCalledWith('')
  })

  it('muestra el placeholder correctamente', () => {
    render(<SearchInput placeholder="Busca entrenamientos..." />)
    expect(screen.getByPlaceholderText('Busca entrenamientos...')).toBeInTheDocument()
  })
})
