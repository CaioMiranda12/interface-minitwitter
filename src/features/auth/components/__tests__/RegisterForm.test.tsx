
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { RegisterForm } from '../RegisterForm'
import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'

vi.mock('@/features/auth/hooks/useRegisterForm', async () => {
  const { useForm } = await import('react-hook-form')

  return {
    useRegisterForm: () => {
      const { control, formState: { errors } } = useForm()
      return {
        onSubmit: vi.fn((e) => e.preventDefault()),
        errors,
        isPending: false,
        control,
      }
    },
  }
})

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
)

describe('RegisterForm', () => {
  it('renderiza os campos do formulário', () => {
    render(<RegisterForm />, { wrapper })
    expect(screen.getByPlaceholderText('Insira o seu nome')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Insira o seu e-mail')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Insira a sua senha')).toBeInTheDocument()
  })

  it('renderiza o botão de submit', () => {
    render(<RegisterForm />, { wrapper })
    expect(screen.getByRole('button', { name: /continuar/i })).toBeInTheDocument()
  })

  it('botão não está desabilitado por padrão', () => {
    render(<RegisterForm />, { wrapper })
    expect(screen.getByRole('button', { name: /continuar/i })).not.toBeDisabled()
  })

  it('renderiza link de termos de serviço', () => {
    render(<RegisterForm />, { wrapper })
    expect(screen.getByText(/termos de serviço/i)).toBeInTheDocument()
  })
})