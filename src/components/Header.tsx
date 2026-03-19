import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useNavigate, useSearchParams } from "react-router";

export function Header() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { logout } = useLogout();

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
    <header className="bg-[#FAFAFA] h-[65px] flex items-center justify-between px-10 border-b border-[#E2E8F0] dark:bg-[#070B14] dark:border-[#62748E]">
      <h1 className="text-primary text-lg font-bold dark:text-white">Mini Twitter</h1>

      <div className="flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-lg px-4 py-2 w-[478px] dark:bg-[#1D293D] dark:border-none dark:text-white">
        <button onClick={handleSearch}>
          <CiSearch size={18} color="#62748E" />
        </button>

        <input
          type="text"
          placeholder="Buscar por post..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="placeholder:text-twitterGray outline-none w-full bg-transparent"
        />
      </div>

      {!isAuthenticated ? (
        <nav>
          <button onClick={() => navigate('/register')}
            className="text-twitterGray font-bold text-base border border-[#E2E8F0] rounded-full py-2 w-[156px]
          hover:bg-twitterGray hover:text-white transition-colors duration-300 active:bg-twitterGray/80 active:text-white
          ">
            Registrar-se
          </button>

          <button
            onClick={() => navigate('/login')}
            className="text-white font-bold text-base bg-primary rounded-full py-2 w-[156px]
          shadow-[0px_4px_6px_-4px_rgba(13,147,242,0.2),0px_10px_15px_-3px_rgba(13,147,242,0.2)]
          hover:opacity-80 transition-opacity duration-300 active:opacity-60
          ">
            Login
          </button>
        </nav>
      ) : (
        <button
          onClick={() => logout()}
          className="bg-primary p-2.5 rounded-full dark:bg-[#1D293D]
        shadow-[0px_4px_6px_-4px_rgba(13,147,242,0.2),0px_10px_15px_-3px_rgba(13,147,242,0.2)]
        hover:opacity-80 transition-opacity duration-300 active:opacity-60
        ">
          <RiLogoutBoxLine size={20} color='white' />
        </button>
      )}
    </header>
  )
}