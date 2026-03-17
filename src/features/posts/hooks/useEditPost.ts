import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editPost, type CreatePostData } from '@/features/posts/services/postsService'

export const useEditPost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreatePostData> }) =>
      editPost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}