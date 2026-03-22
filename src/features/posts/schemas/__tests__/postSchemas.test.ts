import { describe, it, expect } from 'vitest'
import { createPostSchema } from '../postSchemas'

describe('createPostSchema', () => {
  it('valida post com título e conteúdo válidos', () => {
    const result = createPostSchema.safeParse({
      title: 'Título válido',
      content: 'Conteúdo válido',
    })
    expect(result.success).toBe(true)
  })

  it('rejeita post sem título', () => {
    const result = createPostSchema.safeParse({
      title: '',
      content: 'Conteúdo válido',
    })
    expect(result.success).toBe(false)
  })

  it('rejeita post sem conteúdo', () => {
    const result = createPostSchema.safeParse({
      title: 'Título válido',
      content: '',
    })
    expect(result.success).toBe(false)
  })
})