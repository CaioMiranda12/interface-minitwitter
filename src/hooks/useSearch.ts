import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const useSearch = () => {
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

  return { inputValue, setInputValue, handleSearch, handleKeyDown }
}