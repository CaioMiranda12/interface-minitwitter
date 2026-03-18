import { useQuery } from '@tanstack/react-query'
import { getPosts, type GetPostsParams } from '@/features/posts/services/postsService'
import { isPostLiked } from './useLike'

export const usePosts = (params?: GetPostsParams) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts', params],
    queryFn: async () => {
      const result = await getPosts(params)
      return {
        ...result,
        posts: result.posts.map((post) => ({
          ...post,
          isLikedByUser: isPostLiked(String(post.id)),
        })),
      }
    },
  })

  const totalPages = data ? Math.ceil(data.total / data.limit) : 0
  const hasNextPage = (params?.page ?? 1) < totalPages
  const hasPrevPage = (params?.page ?? 1) > 1

  return { data, isLoading, isError, totalPages, hasNextPage, hasPrevPage }
}