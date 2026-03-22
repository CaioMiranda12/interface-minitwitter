import { type Post } from "../services/postsService";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import { EditPostModal } from "./EditPostModal";
import { useDeletePost } from "../hooks/useDeletePost";
import { DeletePostModal } from "./DeletePostModal";
import { useLike } from "../hooks/useLike";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { LoginModal } from "@/components/LoginModal";
interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const { title, content, image, authorName, createdAt, likesCount, authorId, id } = post


  const { isAuthenticated, user } = useAuth()
  const { mutate: deletePost, isPending } = useDeletePost()

  const isOwner = isAuthenticated && user?.id === authorId
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  const { mutate: toggleLike } = useLike()

  const handleLike = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true)
      return
    }

    toggleLike(id)
  }

  const handleConfirmDelete = () => {
    deletePost(id, {
      onSuccess: () => setIsDeleting(false)
    })
  }

  return (
    <div className="bg-white shadow-md border border-[#E2E8F0] rounded-lg p-4 flex flex-col gap-3 dark:bg-[#1D293D] dark:border-[#62748E]">
      <header className="flex items-center gap-1.5">
        <h3 className="text-[#314158] font-bold text-base dark:text-white">{authorName}</h3>
        <span className="text-twitterGray font-normal text-sm">@{authorName.toLowerCase().replace(' ', '')}</span>
        <span className="text-twitterGray font-normal text-sm">.</span>
        <span className="text-twitterGray font-normal text-sm">{createdAt}</span>

        {isOwner && (
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-twitterGray hover:text-primary transition-colors"
            >
              <FiEdit2 size={16} />
            </button>

            <button
              onClick={() => setIsDeleting(true)}
              className="text-twitterGray hover:text-red-500 transition-colors"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        )}
      </header>

      <main>
        <p className="mb-1 text-[#314158] font-bold text-lg dark:text-white">{title}</p>
        <p className="text-[#314158] font-normal text-base dark:text-[#CBD5E1]">
          {content}
        </p>

        {image &&
          <img
            src={image}
            alt={title}
            className="w-full h-[200px] bg-gray-700 my-3 rounded-lg object-cover"
          />
        }

        <button
          onClick={handleLike}
          className="flex items-center gap-1 mt-3">
          {post.isLikedByUser ? (
            <AiFillHeart data-testid="liked-icon" size={24} color="red" />
          ) : (
            <AiOutlineHeart data-testid="unliked-icon" size={24} color="red" />
          )}
          <span className="text-black dark:text-white">{likesCount}</span>
        </button>
      </main>

      {isEditing && (
        <EditPostModal
          post={post}
          onClose={() => setIsEditing(false)}
        />
      )}

      {isDeleting && (
        <DeletePostModal
          onConfirm={handleConfirmDelete}
          onClose={() => setIsDeleting(false)}
          isPending={isPending}
        />
      )}

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  )
}