import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(4, 'Senha deve ter pelo menos 4 caracteres'),
})

export const LoginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(4, 'Senha deve ter pelo menos 4 caracteres'),
})

export type RegisterFormData = z.infer<typeof registerSchema>
export type LoginFormData = z.infer<typeof LoginSchema>