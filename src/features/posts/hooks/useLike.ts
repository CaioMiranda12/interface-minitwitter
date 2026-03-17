import { useMutation, useQueryClient } from '@tanstack/react-query'
import { likePost } from '@/features/posts/services/postsService'

export const useLike = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => likePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}