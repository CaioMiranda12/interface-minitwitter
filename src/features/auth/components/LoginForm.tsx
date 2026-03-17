import Input from '@/components/Input'
import { MdOutlineEmail } from "react-icons/md";
import { IoEyeOutline } from 'react-icons/io5';
import type { LoginFormData } from '../schemas/authSchemas';
import { useLoginForm } from '../hooks/useLoginForm';

export const LoginForm = () => {
  const { onSubmit, errors, isPending, control } = useLoginForm()

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-5'>
      <Input<LoginFormData>
        name='email'
        control={control}
        errors={errors}
        label="E-mail"
        typeInput='email'
        placeholderText='Insira o seu e-mail'
        icon={MdOutlineEmail}
      />

      <Input<LoginFormData>
        name='password'
        control={control}
        errors={errors}
        label="Senha"
        typeInput='password'
        placeholderText='Insira a sua senha'
        icon={IoEyeOutline}
      />

      <button
        type="submit"
        disabled={isPending}
        className='bg-primary text-white p-4 font-bold rounded-full disabled:cursor-not-allowed disabled:bg-gray-400
        shadow-[0px_4px_6px_-4px_rgba(13,147,242,0.2),0px_10px_15px_-3px_rgba(13,147,242,0.2)]
        hover:opacity-80 transition-opacity duration-300 active:opacity-60
        '
      >
        {isPending ? 'Criando conta...' : 'Continuar'}
      </button>

      <div className='flex justify-center'>
        <p className='w-80 text-center text-[#02274F] text-xs font-normal'>
          Ao clicar em continuar, você concorda com nossos <span className='underline'>Termos de Serviço</span> e <span className='underline'>Política de Privacidade</span>.
        </p>
      </div>
    </form>
  )
}