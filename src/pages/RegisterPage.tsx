import { RegisterForm } from "@/features/auth/components/RegisterForm"
import { NavLink } from "react-router-dom"

export const RegisterPage = () => {

  return (
    <div className="flex justify-center items-center h-[100vh] bg-[#FAFAFA] p-16 sm:p-0">
      <div className="w-full max-w-[480px]">
        <header>
          <h1 className="text-primary font-bold text-4xl text-center">Mini Twitter</h1>
        </header>

        <nav className="mt-[56px] flex">
          <NavLink to="/login" className={({ isActive }) => `font-bold text-base flex-1 text-center pb-1
          ${isActive ? 'text-primary border-b-primary border-b-[3px]' : 'text-twitterGray border-b-twitterGray border-b'}
          `
          }>
            Login
          </NavLink>

          <NavLink to="/register" className={({ isActive }) => `font-bold text-base flex-1 text-center pb-1
          ${isActive ? 'text-primary border-b-primary border-b-[3px]' : 'text-twitterGray border-b-twitterGray border-b'}
          `
          }>
            Cadastrar
          </NavLink>
        </nav>

        <main className="mt-6">
          <h2 className="text-primary text-3xl font-semibold">Olá, vamos começar!</h2>
          <p className="text-twitterGray text-base font-normal">Por favor, insira os dados solicitados para fazer cadastro.</p>

          <div className="mt-6">
            <RegisterForm />
          </div>
        </main>
      </div>
    </div >
  )
}