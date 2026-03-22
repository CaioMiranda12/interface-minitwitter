import { describe, it, expect } from 'vitest'
import { LoginSchema, registerSchema } from '../authSchemas'

describe('LoginSchema', () => {
  it('valida email e senha corretos', () => {
    const result = LoginSchema.safeParse({ email: 'teste@email.com', password: '123456' })
    expect(result.success).toBe(true)
  })

  it('rejeita email inválido', () => {
    const result = LoginSchema.safeParse({ email: 'invalido', password: '123456' })
    expect(result.success).toBe(false)
  })

  it('rejeita senha com menos de 6 caracteres', () => {
    const result = LoginSchema.safeParse({ email: 'teste@email.com', password: '123' })
    expect(result.success).toBe(false)
  })
})

describe('registerSchema', () => {
  it('valida nome, email e senha corretos', () => {
    const result = registerSchema.safeParse({
      name: 'João Silva',
      email: 'teste@email.com',
      password: '123456',
    })
    expect(result.success).toBe(true)
  })

  it('rejeita nome com menos de 2 caracteres', () => {
    const result = registerSchema.safeParse({
      name: 'J',
      email: 'teste@email.com',
      password: '123456',
    })
    expect(result.success).toBe(false)
  })
})