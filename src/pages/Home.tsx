import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { PostForm } from "@/features/posts/components/PostForm";
import { Timeline } from "@/features/posts/components/Timeline";
import { CiSearch } from "react-icons/ci";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router";

export function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { logout } = useLogout();

  return (
    <div>
      <header className="bg-[#FAFAFA] h-[65px] flex items-center justify-between px-10 border-b border-[#E2E8F0]">
        <h1 className="text-primary text-lg font-bold">Mini Twitter</h1>

        <div className="flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-lg px-4 py-2 w-[478px]">
          <CiSearch size={18} color="#62748E" />

          <input
            type="text"
            placeholder="Buscar por post..."
            className="placeholder:text-twitterGray outline-none w-full"
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
            className="bg-primary p-2.5 rounded-full
        shadow-[0px_4px_6px_-4px_rgba(13,147,242,0.2),0px_10px_15px_-3px_rgba(13,147,242,0.2)]
        hover:opacity-80 transition-opacity duration-300 active:opacity-60
        ">
            <RiLogoutBoxLine size={20} color='white' />
          </button>
        )}
      </header>

      <main className="bg-[#FAFAFA] min-h-[calc(100vh-65px)] flex justify-center">
        <div className="mt-9 w-[640px]">
          <PostForm />

          <div className="mt-8 flex flex-col gap-8">
            <Timeline />
          </div>


        </div>
      </main>

      <footer className="py-4 px-10 pt-[80px] bg-[#FAFAFA]">
        <h2 className="text-primary text-lg font-bold">Mini Twitter</h2>
      </footer>
    </div>
  )
}