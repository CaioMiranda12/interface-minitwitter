import { CiHeart } from "react-icons/ci";
import { deletePost, type Post } from "../services/postsService";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const { title, content, image, authorName, createdAt, likesCount, authorId, id } = post

  const { isAuthenticated, user } = useAuth()

  const isOwner = isAuthenticated && user.id === authorId

  return (
    <div className="bg-white shadow-md border border-[#E2E8F0] rounded-lg p-4 flex flex-col gap-3">
      <header className="flex items-center gap-1.5">
        <h3 className="text-[#314158] font-bold text-base">{authorName}</h3>
        <span className="text-twitterGray font-normal text-sm">@{authorName.toLowerCase().replace(' ', '')}</span>
        <span className="text-twitterGray font-normal text-sm">.</span>
        <span className="text-twitterGray font-normal text-sm">{createdAt}</span>

        {isOwner && (
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => console.log('editar', user.id)}
              className="text-twitterGray hover:text-primary transition-colors"
            >
              <FiEdit2 size={16} />
            </button>

            <button
              onClick={() => deletePost(id)}
              className="text-twitterGray hover:text-red-500 transition-colors"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        )}
      </header>

      <main>
        <p className="mb-1 text-[#314158] font-bold text-lg">{title}</p>
        <p className="text-[#314158] font-normal text-base">
          {content}
        </p>

        {image &&
          <img
            src={image}
            alt={title}
            className="w-full h-[200px] bg-gray-700 my-3 rounded-lg object-cover"
          />
        }

        <div className="flex items-center gap-1">
          <CiHeart size={24} color="red" />
          <span>{likesCount}</span>
        </div>
      </main>
    </div>
  )
}