import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deletePost } from '@/features/posts/services/postsService'
import { toast } from 'react-toastify'

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
    onError: (error: any) => {
      if (error?.response?.status === 403) {
        toast.error('Você não tem permissão para realizar essa ação.')
      }
    }
  })
}