interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getPages = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)

    if (currentPage <= 4) return [1, 2, 3, 4, 5, '...', totalPages]
    if (currentPage >= totalPages - 3) return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
  }

  const btnClass = (active: boolean, disabled: boolean) =>
    `w-9 h-9 rounded-full text-sm font-medium transition-colors
    ${active ? 'bg-primary text-white' : 'border border-[#E2E8F0] text-twitterGray hover:bg-gray-100'}
    ${disabled ? 'opacity-40 cursor-default pointer-events-none' : 'cursor-pointer'}`

  return (
    <div className="flex items-center justify-center gap-1.5 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={btnClass(false, currentPage === 1)}
      >
        ‹
      </button>

      {getPages().map((page, i) =>
        page === '...' ? (
          <span key={`dots-${i}`} className="w-9 h-9 flex items-center justify-center text-twitterGray text-sm">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={btnClass(page === currentPage, false)}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={btnClass(false, currentPage === totalPages)}
      >
        ›
      </button>
    </div>
  )
}