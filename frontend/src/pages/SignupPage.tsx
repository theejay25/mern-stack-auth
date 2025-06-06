
import { Link, useNavigate } from 'react-router-dom'
import signup from '../assets/img/signup.png'
import { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import type { AuthStore } from '../store/authStore'
function SignupPage() {
  
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signUp, isLoading, error, user } = useAuthStore() as AuthStore


  const handleSubmit = async (e: { preventDefault: () => void }) => {

    e.preventDefault()

    console.log(user)
    
    await signUp(name, email, password)

    navigate('/verify-email') 
    
  }
  

  return (
    <>
      <div className="flex h-full items-center justify-center">
          <div className="bg-[#2a2a2a] p-5 flex flex-col gap-0 items-center lg:flex-row lg:gap-9">
            <div>
              <h2 className="text-white font-bold tracking-wider mb-5">Signup</h2>
              <img src={signup} alt="" className='size-70'/>
            </div>
            <div>
              <form action="" className='mt-0' autoComplete='off' onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className='block mb-1 text-gray-300 font-semibold'>Username</label>
                  <input 
                    type="text" 
                    name="name" 
                    id="username"
                    onChange={(e: any) => setName(e.target.value)} 
                    className='w-90 bg-[#3c3c3c] mb-3 p-3 text-white outline-none'
                    placeholder='Enter Username'
                    autoComplete='no'
                    required
                    />
                </div>
                <div>
                  <label htmlFor="email" className='block mb-1 text-gray-300 font-semibold'>Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    onChange={(e: any) => setEmail(e.target.value)} 
                    className='w-90 bg-[#3c3c3c] mb-3 p-3 text-white outline-none'
                    placeholder='Enter Email'
                    autoComplete='no'
                    required
                    />
                </div>
                <div>
                  <label htmlFor="passowrd" className='block mb-1 text-gray-300 font-semibold'>Passowrd</label>
                  <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    onChange={(e: any) => setPassword(e.target.value)} 
                    className='w-90 bg-[#3c3c3c] p-3 text-white outline-none mb-9'
                    placeholder='*******'
                    autoComplete='new-password'
                    required
                    />
                </div>
                {error ? 
                  (
                    <p className='text-red-400'>{error}</p>
                  ) :
                  ''
                }
                <button 
                    disabled={isLoading}
                    className='w-full p-3 font-semibold bg-[#f2f2f2] text-black rounded-md cursor-pointer hover:shadow-md hover:shadow-[#edeaea] duration-150'>
                    {isLoading ? 'Loading...' : 'Sign Up'}
                </button>

                <p className='text-white text-center mt-3'>Already have an Account? <Link to={'/login'}>Signin</Link> </p>

              </form>
            </div>
          </div>
      </div>
    </>
  )
}

export default SignupPage