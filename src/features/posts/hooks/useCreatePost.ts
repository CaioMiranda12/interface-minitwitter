import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPost, type CreatePostData } from '@/features/posts/services/postsService'

export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreatePostData) => createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}