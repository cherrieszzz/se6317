import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BlogsPage from './components/pages/BlogsPage';
import BlogDetail from './components/pages/BlogDetail';
import LoginPage from './components/pages/LoginPage';
import AuthContextProvider from './contexts/authContextProvider';
import ProfilePage from './components/pages/ProfilePage';
import AddBlogPage from './components/pages/AddBlogPage';
import SignUpPage from './components/pages/SignUpPage';
import AdminLogin from './components/pages/AdminLogin';
import AdminPage from './components/pages/AdminPage';
import Envir from './components/pages/Envir';
import About from './components/pages/About';

function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<BlogsPage />} />
          <Route path='/blogs/:id' element={<BlogDetail />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/me' element={<ProfilePage />} />
          <Route path='/addblog' element={<AddBlogPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/envirment' element={<Envir />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App
