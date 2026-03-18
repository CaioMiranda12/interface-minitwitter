import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { login } from '@/features/auth/services/authService'
import type { LoginFormData } from '@/features/auth/schemas/authSchemas'
import { toast } from 'react-toastify'

export const useLogin = () => {
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginFormData) => login(data),
    onSuccess: (response) => {
      if (!response.token) {
        toast.error('Erro ao autenticar')
        return
      }

      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))

      toast.success('Seja bem-vindo ao Mini-Twitter!')
      navigate('/')
    },

    onError: (error: any) => {
      const message = error.response?.data?.message || 'Erro ao fazer login.'
      toast.error(message)
    }
  })

  return { mutate, isPending }
}