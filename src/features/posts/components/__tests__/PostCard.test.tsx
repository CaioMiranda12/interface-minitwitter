import { render, screen } from '@testing-library/react'
import { PostCard } from '../PostCard'
import { describe, it, expect, vi } from 'vitest'
import '@testing-library/jest-dom'

const mockPost = {
  id: 1,
  title: 'Teste de post',
  content: 'Conteúdo do post',
  image: null,
  authorId: 1,
  authorName: 'João Silva',
  createdAt: '2026-01-01',
  likesCount: 5,
  isLikedByUser: false,
}

vi.mock('@/features/auth/hooks/useAuth', () => ({
  useAuth: () => ({ isAuthenticated: false, user: null }),
}))

vi.mock('@/features/posts/hooks/useDeletePost', () => ({
  useDeletePost: () => ({ mutate: vi.fn(), isPending: false }),
}))

vi.mock('@/features/posts/hooks/useLike', () => ({
  useLike: () => ({ mutate: vi.fn() }),
}))

describe('PostCard', () => {
  it('renderiza título e conteúdo corretamente', () => {
    render(<PostCard post={mockPost} />)
    expect(screen.getByText('Teste de post')).toBeInTheDocument()
    expect(screen.getByText('Conteúdo do post')).toBeInTheDocument()
  })

  it('renderiza nome do autor', () => {
    render(<PostCard post={mockPost} />)
    expect(screen.getByText('João Silva')).toBeInTheDocument()
  })

  it('não mostra botões de editar/deletar para não donos', () => {
    render(<PostCard post={mockPost} />)
    expect(screen.queryByRole('button', { name: /editar/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /deletar/i })).not.toBeInTheDocument()
  })

  it('mostra ícone de like preenchido quando isLikedByUser é true', () => {
    render(<PostCard post={{ ...mockPost, isLikedByUser: true }} />)
    expect(screen.getByTestId('liked-icon')).toBeInTheDocument()
  })

  it('mostra contador de likes', () => {
    render(<PostCard post={mockPost} />)
    expect(screen.getByText('5')).toBeInTheDocument()
  })
})