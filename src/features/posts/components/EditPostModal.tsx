import { useRef, useState } from 'react'
import { HiOutlinePhoto } from 'react-icons/hi2'
import { IoCloseCircle } from 'react-icons/io5'
import { useEditPostForm } from '../hooks/useEditPostForm'
import type { Post } from '../services/postsService'

interface EditPostModalProps {
  post: Post
  onClose: () => void
}

export function EditPostModal({ post, onClose }: EditPostModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(post.image ?? null)
  const { register, onSubmit, errors, isPending, isError } = useEditPostForm(post, preview, onClose)
  const { ref: registerRef, onChange, ...imageRegister } = register('image')


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e)
    const file = e.target.files?.[0]
    if (file) setPreview(URL.createObjectURL(file))
  }

  const handleRemoveImage = () => {
    setPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-[520px] p-6 flex flex-col gap-4 dark:bg-[#1D293D]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-primary font-bold text-lg">Editar post</h2>
          <button onClick={onClose} disabled={isPending}>
            <IoCloseCircle size={24} className="text-twitterGray hover:text-red-500 transition-colors" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <div>
            <input
              {...register('title')}
              placeholder="Título"
              className="w-full outline-none border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm dark:bg-[#1D293D] dark:text-white dark:border-[#62748E]"
            />
            {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
          </div>

          <div>
            <textarea
              {...register('content')}
              placeholder="Conteúdo"
              rows={4}
              className="w-full outline-none border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm resize-none dark:bg-[#1D293D] dark:text-white dark:border-[#62748E]"
            />
            {errors.content && <span className="text-red-500 text-xs">{errors.content.message}</span>}
          </div>

          {preview && (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-full max-h-[200px] object-cover rounded-lg"
              />
              {!isPending && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2"
                >
                  <IoCloseCircle size={28} className="text-white drop-shadow-md" />
                </button>
              )}
              {isPending && (
                <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
          )}

          <input
            {...imageRegister}
            ref={(e) => { registerRef(e); fileInputRef.current = e }}
            onChange={handleImageChange}
            type="file"
            accept="image/*"
            className="hidden"
          />

          {isError && <span className="text-red-500 text-xs">Erro ao editar post.</span>}

          <div className="flex items-center justify-between border-t border-[#E2E8F0] pt-3 dark:border-[#62748E4D]">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isPending}
            >
              <HiOutlinePhoto size={28} className="text-primary" />
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isPending}
                className="text-twitterGray font-bold text-sm border border-[#E2E8F0] rounded-full py-2 px-4
                hover:bg-gray-100 transition-colors disabled:opacity-40"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={isPending}
                className="bg-primary text-white font-bold text-sm rounded-full py-2 px-4
                hover:opacity-80 transition-opacity disabled:opacity-40"
              >
                {isPending ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}