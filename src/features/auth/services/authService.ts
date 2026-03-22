import api from '@/lib/api'
export interface RegisterData {
  name: string
  email: string
  password: string
}

export interface LoginData {
  email: string
  password: string
}

export interface RegisterResponse {
  user: {
    id: number
    name: string
    email: string
  }
}

export interface LoginResponse {
  token: string
  user: {
    id: number
    name: string
    email: string
  }
}

export const register = async (data: RegisterData): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>('/auth/register', data)
  return response.data
}

export const login = async (data: LoginData): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', data)
  return response.data
}

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout')
}