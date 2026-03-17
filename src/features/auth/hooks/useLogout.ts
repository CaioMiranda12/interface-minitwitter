import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { logout } from '@/features/auth/services/authService'

export const useLogout = () => {
  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem('token')
      navigate('/')
    },
    onError: () => {
      localStorage.removeItem('token')
      navigate('/')
    }
  })

  return { logout: mutate }
}