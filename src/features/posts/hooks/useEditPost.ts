import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editPost, type CreatePostData } from '@/features/posts/services/postsService'
import { toast } from 'react-toastify'

export const useEditPost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreatePostData> }) =>
      editPost(id, data),
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