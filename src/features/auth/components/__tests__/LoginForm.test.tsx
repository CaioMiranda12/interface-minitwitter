import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { LoginForm } from '../LoginForm'
import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { useForm } from 'react-hook-form'

vi.mock('@/features/auth/hooks/useLoginForm', () => ({
  useLoginForm: () => {
    const { control, formState: { errors } } = useForm()
    return {
      onSubmit: vi.fn((e) => e.preventDefault()),
      errors,
      isPending: false,
      control,
    }
  },
}))

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
)

describe('LoginForm', () => {
  it('renderiza os campos do formulário', () => {
    render(<LoginForm />, { wrapper })
    expect(screen.getByPlaceholderText('Insira o seu e-mail')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Insira a sua senha')).toBeInTheDocument()
  })

  it('renderiza o botão de submit', () => {
    render(<LoginForm />, { wrapper })
    expect(screen.getByRole('button', { name: /continuar/i })).toBeInTheDocument()
  })

  it('botão não está desabilitado por padrão', () => {
    render(<LoginForm />, { wrapper })
    expect(screen.getByRole('button', { name: /continuar/i })).not.toBeDisabled()
  })
})