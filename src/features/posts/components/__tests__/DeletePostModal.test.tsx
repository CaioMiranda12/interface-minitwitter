import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { DeletePostModal } from '../DeletePostModal'
import { describe, it, expect, vi } from 'vitest'


describe('DeletePostModal', () => {
  it('chama onConfirm ao clicar em Excluir', () => {
    const onConfirm = vi.fn()
    render(<DeletePostModal onConfirm={onConfirm} onClose={vi.fn()} isPending={false} />)
    fireEvent.click(screen.getByText('Excluir'))
    expect(onConfirm).toHaveBeenCalledTimes(1)
  })

  it('chama onClose ao clicar em Cancelar', () => {
    const onClose = vi.fn()
    render(<DeletePostModal onConfirm={vi.fn()} onClose={onClose} isPending={false} />)
    fireEvent.click(screen.getByText('Cancelar'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('desabilita botões quando isPending é true', () => {
    render(<DeletePostModal onConfirm={vi.fn()} onClose={vi.fn()} isPending={true} />)
    expect(screen.getByText('Excluindo...')).toBeDisabled()
    expect(screen.getByText('Cancelar')).toBeDisabled()
  })

  it('exibe mensagem de confirmação', () => {
    render(<DeletePostModal onConfirm={vi.fn()} onClose={vi.fn()} isPending={false} />)
    expect(screen.getByText(/Essa ação não pode ser desfeita/i)).toBeInTheDocument()
  })
})