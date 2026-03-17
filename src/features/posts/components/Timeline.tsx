import { usePosts } from '@/features/posts/hooks/usePosts'
import { PostCard } from './PostCard'

export const Timeline = () => {
  const { data, isLoading, isError } = usePosts()

  console.log(data)

  if (isLoading) return <p>Carregando posts...</p>
  if (isError) return <p>Erro ao carregar posts.</p>

  return (
    <div className="flex flex-col gap-8">
      {data?.posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      <div>
        Botoes de de paginação
      </div>
    </div>
  )
}