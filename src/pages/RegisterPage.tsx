import { RegisterForm } from "@/features/auth/components/RegisterForm"

export const RegisterPage = () => {

  return (
    <div className="flex justify-center items-center h-[100vh] bg-[#FAFAFA] p-16 sm:p-0">
      <div>
        <header>
          <h1 className="text-primary font-bold text-4xl text-center">Mini Twitter</h1>
        </header>

        <nav className="mt-[56px] flex">
          <a href="/login" className="text-primary font-bold text-base flex-grow text-center border-b-2 border-b-primary">
            Login
          </a>

          <a href="/register" className="text-twitterGray font-bold text-base flex-grow text-center border-b-2 border-b-twitterGray">
            Cadastrar
          </a>
        </nav>

        <main className="mt-6">
          <h2 className="text-primary text-3xl font-semibold">Olá, vamos começar!</h2>
          <p className="text-twitterGray text-base font-normal">Por favor, insira os dados solicitados para fazer cadastro.</p>

          <div className="mt-6">
            <RegisterForm />
          </div>
        </main>
      </div>
    </div>
  )
}