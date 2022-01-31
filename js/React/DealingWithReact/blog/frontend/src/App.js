import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import PostListPage from './pages/PostListPage'
import PostPage from './pages/PostPage'
import RegisterPage from './pages/RegisterPage'
import WritePage from './pages/WritePage'

function App() {
  return (
    <Routes>
      <Route element={<PostListPage />} path="/" exact />
      <Route element={<PostListPage />} path="/:@username" exact />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<RegisterPage />} path="/register" />
      <Route element={<WritePage />} path="/write" />
      <Route element={<PostPage />} path="/@username/:postId" />
    </Routes>
  )
}

export default App
