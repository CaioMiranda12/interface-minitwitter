import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router";
import { ThemeButton } from "./ThemeButton";
import { Menu } from "./Menu";
import { SearchInput } from "./SearchInput";

export function Header() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { logout } = useLogout();

  return (
    <header className="bg-[#FAFAFA] h-[65px] flex items-center justify-between px-3 md:px-10 border-b border-[#E2E8F0]  dark:bg-[#070B14] dark:border-[#62748E]">
      <div className="flex-1">
        <h1 className="text-primary text-lg font-bold dark:text-white">Mini Twitter</h1>
      </div>

      <SearchInput className="hidden 2xl:flex w-[640px]" />

      <div className="flex-1 flex justify-end gap-2">
        <div className="hidden md:flex gap-2">
          {!isAuthenticated ? (
            <nav className="flex gap-2">
              <button onClick={() => navigate('/register')}
                className="text-twitterGray font-bold text-base border border-[#E2E8F0] rounded-full py-2 w-[156px] dark:text-white dark:border-[#62748E]
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
        hover:opacity-80 transition-opacity duration-300 active:opacity-60"
            >
              <RiLogoutBoxLine size={20} color='white' />
            </button>
          )}

          <ThemeButton />
        </div>

        <Menu />
      </div>
    </header>
  )
}