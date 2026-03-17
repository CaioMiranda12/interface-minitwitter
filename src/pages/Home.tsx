import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { CiHeart, CiSearch } from "react-icons/ci";
import { HiOutlinePhoto } from "react-icons/hi2";
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
        <div className="mt-9 w-[640px] bg-blue-200">
          <div className="bg-white shadow-md border border-[#E2E8F0] rounded-lg p-4">
            <textarea placeholder="O que está acontecendo?"
              className="w-full resize-none outline-none h-[72px]"
            />

            <div className="flex items-center justify-between border-t border-[#E2E8F0] pt-4">
              <button>
                <HiOutlinePhoto size={32} className="text-primary" />
              </button>

              <button
                className="bg-primary text-white font-bold text-base rounded-full py-2 px-4
            shadow-[0px_4px_6px_-4px_rgba(13,147,242,0.2),0px_10px_15px_-3px_rgba(13,147,242,0.2)]
            hover:opacity-80 transition-opacity duration-300 active:opacity-60
            "
              >
                Postar
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-8">
            <div className="bg-white shadow-md border border-[#E2E8F0] rounded-lg p-4 flex flex-col gap-3">
              <header className="flex items-center gap-1.5">
                <h3 className="text-[#314158] font-bold text-base">Lucas Costa</h3>
                <span className="text-twitterGray font-normal text-sm">@lucascosta</span>
                <span className="text-twitterGray font-normal text-sm">.</span>
                <span className="text-twitterGray font-normal text-sm">15/02/2026</span>
              </header>

              <main>
                <p className="mb-1 text-[#314158] font-bold text-lg">Iniciando um novo processo seletivo!</p>
                <p className="text-[#314158] font-normal text-base">
                  Really excited to share what we've been working on. The team has put in
                  countless hours to make this seamless. Check out the screenshot below!
                  #product #launch
                </p>

                <div className="w-full h-[200px] bg-gray-700 my-3 rounded-lg"></div>

                <button>
                  <CiHeart size={24} color="red" />
                </button>
              </main>
            </div>
          </div>



        </div>
      </main>
    </div>
  )
}