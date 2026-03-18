import { useMutation, useQueryClient } from '@tanstack/react-query'
import { likePost, type GetPostsResponse } from '@/features/posts/services/postsService'

const LIKES_KEY = 'user_likes'

const getLikedPosts = (): string[] => {
  return JSON.parse(localStorage.getItem(LIKES_KEY) ?? '[]')
}

const toggleLikedPost = (id: string) => {
  const liked = getLikedPosts()
  const updated = liked.includes(id)
    ? liked.filter((p) => p !== id)
    : [...liked, id]
  localStorage.setItem(LIKES_KEY, JSON.stringify(updated))
}

export const isPostLiked = (id: string): boolean => {
  return getLikedPosts().includes(id)
}

export const useLike = () => {
  const queryClient = useQueryClient()

  const updatePostLike = (old: GetPostsResponse | undefined, id: string) => {
    if (!old) return old
    const liked = isPostLiked(id)
    return {
      ...old,
      posts: old.posts.map((post) =>
        String(post.id) === id
          ? {
            ...post,
            isLikedByUser: !liked,
            likesCount: liked ? post.likesCount - 1 : post.likesCount + 1,
          }
          : post
      ),
    }
  }

  return useMutation({
    mutationFn: (id: string) => likePost(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] })
      const snapshot = queryClient.getQueriesData({ queryKey: ['posts'] })
      queryClient.setQueriesData({ queryKey: ['posts'] }, (old: GetPostsResponse | undefined) => updatePostLike(old, id))
      toggleLikedPost(id)
      return { snapshot }
    },

    onError: (_err, _id, context) => {
      context?.snapshot.forEach(([queryKey, data]) => queryClient.setQueryData(queryKey, data))
      toggleLikedPost(_id)
    },
  })
}