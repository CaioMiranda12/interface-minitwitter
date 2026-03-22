import { useMutation, useQueryClient } from '@tanstack/react-query'
import { likePost } from '@/features/posts/services/postsService'

const LIKES_STORAGE_KEY = 'user_likes'

const getLikedPostIds = (): number[] => {
  return JSON.parse(localStorage.getItem(LIKES_STORAGE_KEY) ?? '[]')
}

const saveLikeToStorage = (postId: number) => {
  const likedIds = getLikedPostIds()
  const alreadyLiked = likedIds.includes(postId)

  const updated = alreadyLiked
    ? likedIds.filter((id) => id !== postId)
    : [...likedIds, postId]

  localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(updated))
}

export const isPostLiked = (postId: number): boolean => {
  return getLikedPostIds().includes(postId)
}

const updatePostInCache = (cachedData: any, postId: number, currentlyLiked: boolean) => {
  if (!cachedData?.pages) return cachedData

  return {
    ...cachedData,
    pages: cachedData.pages.map((page: any) => ({
      ...page,
      posts: page.posts.map((post: any) =>
        post.id === postId
          ? {
            ...post,
            isLikedByUser: !currentlyLiked,
            likesCount: currentlyLiked ? post.likesCount - 1 : post.likesCount + 1,
          }
          : post
      ),
    })),
  }
}

export const useLike = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (postId: number) => likePost(postId),

    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] })

      const snapshot = queryClient.getQueriesData({ queryKey: ['posts'] })
      const currentlyLiked = isPostLiked(postId)

      queryClient.setQueriesData(
        { queryKey: ['posts'] },
        (cachedData: any) => updatePostInCache(cachedData, postId, currentlyLiked)
      )

      saveLikeToStorage(postId)
      return { snapshot }
    },

    onError: (_err, postId, context) => {
      context?.snapshot.forEach(([queryKey, data]) => queryClient.setQueryData(queryKey, data))
      saveLikeToStorage(postId)
    },
  })
}