import { usePosts } from '@/features/posts/hooks/usePosts'
import { PostCard } from './PostCard'
import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'

export const Timeline = () => {
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search') ?? ''
  const bottomRef = useRef<HTMLDivElement>(null)

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePosts({ search })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 1.0 }
    )

    if (bottomRef.current) observer.observe(bottomRef.current)
    return () => observer.disconnect()
  }, [hasNextPage, fetchNextPage])

  if (isLoading) return <p>Carregando posts...</p>
  if (isError) return <p>Erro ao carregar posts.</p>

  const posts = data?.pages.flatMap((page) => page.posts) ?? []

  return (
    <div className="flex flex-col gap-8">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      <div ref={bottomRef} className="py-2">
        {isFetchingNextPage && (
          <div className="flex justify-center">
            <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {!hasNextPage && posts.length > 0 && (
          <p className="text-center text-twitterGray text-sm">Você chegou ao fim!</p>
        )}
      </div>


    </div>
  )
}