import axios from "axios"
import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import SignupPage from "./pages/SignupPage"
import SigninPage from "./pages/SigninPage"


function App() {

  useEffect(() => {
    
    const tryHard = async () => {

      try {
        
        const response = await axios.get('/')

        console.log(response)

      } catch (error) {
        
      }

    }
      tryHard()

  }, [])

  

  return (
    <>
      <Routes>
        <Route path="/" element={"Home"} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<SigninPage />} />
      </Routes>
    </>
  )
}

export default App
