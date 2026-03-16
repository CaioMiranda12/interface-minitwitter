import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { register } from '@/features/auth/services/authService'
import type { RegisterFormData } from '@/features/auth/schemas/authSchemas'

export const useRegister = () => {
  const navigate = useNavigate()

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (data: RegisterFormData) => register(data),
    onSuccess: (response) => {
      localStorage.setItem('token', response.token)
      navigate('/feed')
    },
  })

  return { mutate, isPending, isError, error }
}