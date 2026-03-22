import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { editPostSchema, type EditPostFormData } from '@/features/posts/schemas/postSchemas'
import { useEditPost } from './useEditPost'
import { uploadImage } from '@/lib/uploadImage'
import type { Post } from '../services/postsService'

export const useEditPostForm = (post: Post, preview: string | null, onSuccess?: () => void) => {
  const { mutate, isPending, isError } = useEditPost()

  const { register, handleSubmit, formState: { errors } } = useForm<EditPostFormData>({
    resolver: zodResolver(editPostSchema),
    defaultValues: {
      title: post.title,
      content: post.content,
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    let imageUrl: string | null = null

    if (data.image && data.image.length > 0) {
      imageUrl = await uploadImage(data.image[0])
    } else if (preview) {
      imageUrl = preview
    }

    mutate(
      { id: post.id, data: { title: data.title, content: data.content, image: imageUrl ?? undefined } },
      { onSuccess: () => onSuccess?.() }
    )
  })

  return { register, onSubmit, errors, isPending, isError }
}