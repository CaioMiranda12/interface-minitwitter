import { usePosts } from '@/features/posts/hooks/usePosts'
import { PostCard } from './PostCard'
import { useState } from 'react'
import { Pagination } from '@/components/Pagination'

export const Timeline = () => {
  const [page, setPage] = useState(1)

  const { data, isLoading, isError, totalPages } = usePosts({ page })

  if (isLoading) return <p>Carregando posts...</p>
  if (isError) return <p>Erro ao carregar posts.</p>

  return (
    <div className="flex flex-col gap-8">
      {data?.posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  )
}