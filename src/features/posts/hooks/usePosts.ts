import { useQuery } from '@tanstack/react-query'
import { getPosts, type GetPostsParams } from '@/features/posts/services/postsService'

export const usePosts = (params?: GetPostsParams) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts', params],
    queryFn: () => getPosts(params),
  })

  const totalPages = data ? Math.ceil(data.total / data.limit) : 0
  const hasNextPage = (params?.page ?? 1) < totalPages
  const hasPrevPage = (params?.page ?? 1) > 1

  return { data, isLoading, isError, totalPages, hasNextPage, hasPrevPage }
}