import { useAuthContext } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { isAuthenticated } = useAuthContext()
  const { logout } = useLogout()

  const handleNavigate = (path: string) => {
    navigate(path)
    setIsMenuOpen(false)
  }

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  return (
    <>
      <button onClick={() => setIsMenuOpen(true)} className="block md:hidden">
        <IoIosMenu size={24} className="dark:text-white" />
      </button>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex justify-end"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="bg-white dark:bg-[#1D293D] w-[280px] h-full flex flex-col p-6 gap-2 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-primary font-bold text-lg dark:text-white">Menu</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-twitterGray hover:text-primary transition-colors dark:text-[#90A1B9]"
              >
                ✕
              </button>
            </div>

            <button
              onClick={toggleTheme}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-twitterGray
          hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-[#90A1B9] transition-colors"
            >
              {theme === 'light' ? (
                <MdOutlineDarkMode size={20} />
              ) : (
                <MdOutlineLightMode size={20} />
              )}
              <span className="font-medium text-sm">
                {theme === 'light' ? 'Modo escuro' : 'Modo claro'}
              </span>
            </button>

            <div className="border-t border-[#E2E8F0] dark:border-gray-700 my-2" />

            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => handleNavigate('/login')}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg
              text-twitterGray hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-[#90A1B9] transition-colors"
                >
                  <span className="font-medium text-sm">Login</span>
                </button>

                <button
                  onClick={() => handleNavigate('/register')}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg
              text-twitterGray hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-[#90A1B9] transition-colors"
                >
                  <span className="font-medium text-sm">Criar conta</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg
            text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
              >
                <RiLogoutBoxLine size={20} />
                <span className="font-medium text-sm">Sair</span>
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}