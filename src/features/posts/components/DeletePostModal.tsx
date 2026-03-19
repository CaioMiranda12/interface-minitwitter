interface DeletePostModalProps {
  onConfirm: () => void
  onClose: () => void
  isPending: boolean
}

export function DeletePostModal({ onConfirm, onClose, isPending }: DeletePostModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-[400px] p-6 flex flex-col gap-4 dark:bg-[#1D293D]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-[#314158] font-bold text-lg dark:text-white">Excluir post</h2>
        <p className="text-twitterGray text-sm dark:text-[#90A1B9]">
          Tem certeza que deseja excluir este post? Essa ação não pode ser desfeita.
        </p>

        <div className="flex justify-end gap-2 border-t border-[#E2E8F0] pt-4 dark:border-[#62748E4D]">
          <button
            onClick={onClose}
            disabled={isPending}
            className="text-twitterGray font-bold text-sm border border-[#E2E8F0] rounded-full py-2 px-4 dark:text-white dark:border-[#62748E]
            hover:bg-twitterGray transition-colors disabled:opacity-40"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            disabled={isPending}
            className="bg-red-500 text-white font-bold text-sm rounded-full py-2 px-4
            hover:opacity-80 transition-opacity disabled:opacity-40"
          >
            {isPending ? 'Excluindo...' : 'Excluir'}
          </button>
        </div>
      </div>
    </div>
  )
}