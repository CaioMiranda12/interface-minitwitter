import { useInfiniteQuery } from '@tanstack/react-query'
import { getPosts, type GetPostsParams } from '@/features/posts/services/postsService'
import { isPostLiked } from './useLike'

export const usePosts = (params?: Omit<GetPostsParams, 'page'>) => {
  return useInfiniteQuery({
    queryKey: ['posts', params],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await getPosts({ ...params, page: pageParam })
      return {
        ...result,
        posts: result.posts.map((post) => ({
          ...post,
          isLikedByUser: isPostLiked(String(post.id)),
        })),
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const totalPages = Math.ceil(lastPage.total / lastPage.limit)
      const nextPage = lastPage.page + 1
      return nextPage <= totalPages ? nextPage : undefined
    },
  })
}