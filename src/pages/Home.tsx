import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router";

export function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <header className="bg-[#FAFAFA] h-[65px] flex items-center justify-between px-10">
        <h1 className="text-primary text-lg font-bold">Mini Twitter</h1>

        <div className="flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-lg px-4 py-2 w-[478px]">
          <CiSearch size={18} color="#62748E" />

          <input
            type="text"
            placeholder="Buscar por post..."
            className="placeholder:text-twitterGray outline-none w-full"
          />
        </div>

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
      </header>
    </div>
  )
}