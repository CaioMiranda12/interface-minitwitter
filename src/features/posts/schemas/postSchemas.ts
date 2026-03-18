import { z } from 'zod'

export const createPostSchema = z.object({
  title: z.string().min(3, 'O título deve ter no minimo 3 caracteres'),
  content: z.string().min(1, 'Conteúdo é obrigatório'),
  image: z
    .instanceof(FileList)
    .optional()
    .refine(
      (files) => !files || files.length === 0 || files[0].size <= 5 * 1024 * 1024,
      'A imagem deve ter no máximo 5MB'
    ),
})

export const editPostSchema = z.object({
  title: z.string().min(3, 'O título deve ter no minimo 3 caracteres'),
  content: z.string().min(1, 'Conteúdo é obrigatório'),
  image: z
    .instanceof(FileList)
    .optional()
    .refine(
      (files) => !files || files.length === 0 || files[0].size <= 5 * 1024 * 1024,
      'A imagem deve ter no máximo 5MB'
    ),
})

export type CreatePostFormData = z.infer<typeof createPostSchema>

export type EditPostFormData = z.infer<typeof editPostSchema>