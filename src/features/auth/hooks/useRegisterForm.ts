import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterFormData } from '@/features/auth/schemas/authSchemas'
import { useRegister } from './useRegister'

export const useRegisterForm = () => {
  const { mutate, isPending, isError, error } = useRegister()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    }
  })

  const onSubmit = handleSubmit((data) => mutate(data))

  return { onSubmit, errors, isPending, isError, error, control }
}