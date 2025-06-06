import axios from "axios"
import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import SignupPage from "./pages/SignupPage"
import SigninPage from "./pages/SigninPage"
import VerifyEmailPage from "./pages/VerifyEmailPage"
import Home from "./pages/Home"
import { useAuthStore } from "./store/authStore"
import type { AuthStore } from "./store/authStore"




interface props{
  children?: React.ReactNode
}


const ProtectedRoute: any = ({ children }: props) => {

  const { isAuthenticated, user} = useAuthStore() as AuthStore

  if(!user && !isAuthenticated) {
    return <Navigate to={'/login'} replace />
  }

  return {children }
  
}


function App() {

  const { checkAuth, isCheckingAuth, user } = useAuthStore() as AuthStore
  
  console.log(checkAuth, isCheckingAuth, user)

  useEffect(() => {
    
    const tryHard = async () => {

      try {
        
        const response = await axios.get('/')

        console.log(response)

      } catch (error) {
        console.log(error)
        throw error 
      }

    } 
      tryHard()

  }, [])

  

  return (
    <>
      <Routes>
        <Route path="/" element={'Home'} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<SigninPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
      </Routes>
    </>
  )
}

export default App
