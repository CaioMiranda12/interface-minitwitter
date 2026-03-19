import { useRef, useState } from "react";
import { HiOutlinePhoto } from "react-icons/hi2";
import { useCreatePostForm } from "../hooks/useCreatePostForm";
import { IoCloseCircle } from "react-icons/io5";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { LoginModal } from "@/components/LoginModal";

export function PostForm() {
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const { isAuthenticated } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)

  const { register, onSubmit, errors, isPending } = useCreatePostForm(() => {
    setPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  })

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isAuthenticated) {
      setShowLoginModal(true)
      return
    }

    onSubmit()
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white shadow-md border border-[#E2E8F0] rounded-lg p-4 dark:bg-[#1D293D] dark:border-[#62748E]">
        {isExpanded && (
          <input
            {...register('title')}
            placeholder="Título do post"
            className="w-full outline-none font-bold text-lg mb-2 bg-transparent dark:text-white"
            autoFocus
          />
        )}
        {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}

        <textarea
          {...register('content')}
          onFocus={() => setIsExpanded(true)}
          placeholder="O que está acontecendo?"
          className="w-full resize-none outline-none h-[72px] bg-transparent dark:text-white"
        />

        {preview && (
          <div className="relative mt-2">
            <img
              src={preview}
              alt="Preview"
              className="w-full max-h-[300px] object-cover rounded-lg"
            />

            {isPending && (
              <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                  <span className="text-white text-sm font-medium">Enviando imagem...</span>
                </div>
              </div>
            )}

            {!isPending && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2"
              >
                <IoCloseCircle size={28} className="text-white drop-shadow-md" />
              </button>
            )}
          </div>
        )}

        <input
          {...imageRegister}
          ref={(e) => {
            registerRef(e)
            fileInputRef.current = e
          }}
          onChange={handleImageChange}
          type="file"
          accept="image/*"
          className="hidden"
        />

        <div className="flex items-center justify-between border-t border-[#E2E8F0] pt-4 dark:border-[#62748E4D]">
          <button
            type="button"
            disabled={isPending}
            onClick={() => !isAuthenticated ? setShowLoginModal(true) : fileInputRef.current?.click()}
          >
            <HiOutlinePhoto size={32} className="text-primary" />
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="bg-primary text-white font-bold text-base rounded-full py-2 px-4
            shadow-[0px_4px_6px_-4px_rgba(13,147,242,0.2),0px_10px_15px_-3px_rgba(13,147,242,0.2)]
            hover:opacity-80 transition-opacity duration-300 active:opacity-60
            disabled:bg-gray-300
    disabled:text-gray-500
    disabled:shadow-none
    disabled:cursor-not-allowed"
          >
            {isPending ? 'Postando...' : 'Postar'}
          </button>
        </div>
      </form>

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </>
  )
}