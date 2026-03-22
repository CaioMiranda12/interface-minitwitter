import { useState } from "react"
import { CiSearch } from "react-icons/ci"
import { useSearchParams } from "react-router-dom"

interface SearchInputProps {
  className?: string
}

export function SearchInput({ className }: SearchInputProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search') ?? ''
  const [inputValue, setInputValue] = useState(search)

  const handleSearch = () => {
    if (inputValue) {
      setSearchParams({ search: inputValue })
    } else {
      setSearchParams({})
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className={`flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-lg px-4 py-2 dark:bg-[#1D293D] dark:border-none ${className}`}>
      <button onClick={handleSearch}>
        <CiSearch size={18} color="#62748E" />
      </button>
      <input
        type="text"
        placeholder="Buscar por post..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="placeholder:text-twitterGray outline-none w-full bg-transparent dark:text-white"
      />
    </div>
  )
}