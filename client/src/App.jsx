import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BlogsPage from './components/pages/BlogsPage';
import BlogDetail from './components/pages/BlogDetail';
import LoginPage from './components/pages/LoginPage';
import AuthContextProvider from './contexts/authContextProvider';
import ProfilePage from './components/pages/ProfilePage';

function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<BlogsPage />} />
          <Route path='/blogs/:id' element={<BlogDetail />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/me' element={<ProfilePage />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App
