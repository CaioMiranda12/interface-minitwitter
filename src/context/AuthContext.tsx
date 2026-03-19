import { createContext, useContext, useState, type ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextData {
  user: User | null
  token: string | null
  signIn: (token: string, user: User) => void
  signOut: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token')
  })

  const signIn = (token: string, user: User) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    setToken(token)
    setUser(user)
  }

  const signOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('userId')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)