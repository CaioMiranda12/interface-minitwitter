import { describe, it, expect, beforeEach } from 'vitest'
import { isPostLiked } from '../../hooks/useLike'

describe('useLike — localStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('retorna false quando post não foi curtido', () => {
    expect(isPostLiked(1)).toBe(false)
  })

  it('retorna true quando post está no storage', () => {
    localStorage.setItem('user_likes', JSON.stringify([1, '2']))
    expect(isPostLiked(1)).toBe(true)
  })

  it('retorna false para post não curtido quando há outros curtidos', () => {
    localStorage.setItem('user_likes', JSON.stringify(['2', '3']))
    expect(isPostLiked(1)).toBe(false)
  })

  it('retorna false quando storage está vazio', () => {
    localStorage.setItem('user_likes', '[]')
    expect(isPostLiked(1)).toBe(false)
  })
})