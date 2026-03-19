import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { logout } from '@/features/auth/services/authService'
import { useAuthContext } from '@/context/AuthContext'

export const useLogout = () => {
  const navigate = useNavigate()
  const { signOut } = useAuthContext()

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      signOut()
      navigate('/')
    },
    onError: () => {
      localStorage.removeItem('token')
      navigate('/')
    }
  })

  return { logout: mutate }
}