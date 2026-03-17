import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { register } from '@/features/auth/services/authService'
import type { RegisterFormData } from '@/features/auth/schemas/authSchemas'
import { toast } from 'react-toastify'

export const useRegister = () => {
  const navigate = useNavigate()

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (data: RegisterFormData) => register(data),
    onSuccess: () => {
      toast.success('Conta criada com sucesso!')

      setTimeout(() => {
        navigate('/login')
      }, 1500)

    },
  })

  return { mutate, isPending, isError, error }
}