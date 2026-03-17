import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RegisterPage } from '@/pages/RegisterPage'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<div>Login (em breve)</div>} />
        <Route path="/feed" element={<div>Feed (em breve)</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes