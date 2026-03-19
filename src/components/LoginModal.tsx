import { useNavigate } from 'react-router-dom'

interface LoginModalProps {
  onClose: () => void
}

export function LoginModal({ onClose }: LoginModalProps) {
  const navigate = useNavigate()

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-[400px] p-6 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-1">
          <h2 className="text-[#314158] font-bold text-lg">Faça login para postar</h2>
          <p className="text-twitterGray text-sm">
            Você precisa estar logado para criar um post e interagir com a comunidade.
          </p>
        </div>

        <div className="flex flex-col gap-2 border-t border-[#E2E8F0] pt-4">
          <button
            onClick={() => navigate('/login')}
            className="bg-primary text-white font-bold text-sm rounded-full py-2.5 w-full
            shadow-[0px_4px_6px_-4px_rgba(13,147,242,0.2),0px_10px_15px_-3px_rgba(13,147,242,0.2)]
            hover:opacity-80 transition-opacity"
          >
            Entrar
          </button>

          <button
            onClick={() => navigate('/register')}
            className="text-twitterGray font-bold text-sm border border-[#E2E8F0] rounded-full py-2.5 w-full
            hover:bg-gray-100 transition-colors"
          >
            Criar conta
          </button>

          <button
            onClick={onClose}
            className="text-twitterGray text-sm hover:underline transition-all mt-5"
          >
            Agora não
          </button>
        </div>
      </div>
    </div>
  )
}