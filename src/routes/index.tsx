import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RegisterPage } from '@/pages/RegisterPage'
import { LoginPage } from '@/pages/LoginPage'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<div>Feed (em breve)</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes