import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema, type LoginFormData } from '@/features/auth/schemas/authSchemas'
import { useLogin } from './useLogin'

export const useLoginForm = () => {
  const { mutate, isPending } = useLogin()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const onSubmit = handleSubmit((data) => mutate(data))

  return { onSubmit, errors, isPending, control }
}