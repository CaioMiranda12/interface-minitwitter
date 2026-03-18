import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createPostSchema, type CreatePostFormData } from '@/features/posts/schemas/postSchemas'
import { useCreatePost } from './useCreatePost'
import { uploadImage } from '@/lib/uploadImage'

export const useCreatePostForm = (onSuccess?: () => void) => {
  const { mutate, isPending, isError, error } = useCreatePost()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
  })

  const onSubmit = handleSubmit(async (data) => {
    let imageUrl: string | undefined

    if (data.image && data.image.length > 0) {
      imageUrl = await uploadImage(data.image[0])
    }

    mutate({
      title: data.title,
      content: data.content,
      image: imageUrl
    },
      {
        onSuccess: () => {
          reset()
          onSuccess?.()
        },
      }
    )
  })

  return { register, onSubmit, errors, isPending, isError, error }
}