import api from '@/lib/api'

export interface RegisterData {
  name: string
  email: string
  password: string
}

export interface RegisterResponse {
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}

export const register = async (data: RegisterData): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>('/auth/register', data)
  return response.data
}