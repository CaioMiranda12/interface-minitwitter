import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md'
import { useTheme } from '@/context/ThemeContext'

export function ThemeButton() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-full border border-[#E2E8F0] dark:border-gray-700
      hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      {theme === 'light' ? (
        <MdOutlineDarkMode size={20} className="text-twitterGray" />
      ) : (
        <MdOutlineLightMode size={20} className="text-white" />
      )}
    </button>
  )
}