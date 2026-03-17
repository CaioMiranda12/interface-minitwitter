import { useQuery } from '@tanstack/react-query'
import { getPosts, type GetPostsParams } from '@/features/posts/services/postsService'

export const usePosts = (params?: GetPostsParams) => {
  return useQuery({
    queryKey: ['posts', params],
    queryFn: async () => await getPosts(params)
  })
}