
import { Link, useNavigate } from 'react-router-dom'
import login from '../assets/img/login.png'
import { useAuthStore } from '../store/authStore'
import type { AuthStore } from '../store/authStore'
import { useState } from 'react'

function SigninPage() {

  const navigate = useNavigate()
  const {LoginHandler, isLoading } = useAuthStore() as AuthStore
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: { preventDefault: () => void }) => {

    e.preventDefault()

    await LoginHandler(email, password)

    navigate('/home')


  }

  return (
    <>
      <div className="flex h-full items-center justify-center">
          <div className="bg-[#2a2a2a] p-5 flex flex-col gap-0 items-center lg:flex-row lg:gap-9 ">
            <div>
              <h2 className="text-white font-bold tracking-wider mb-5 text-2xl">Signin</h2>
              <img src={login} alt="" className='size-70'/>
            </div>
            <div>
              <form action="" className='mt-6' autoComplete='off' onSubmit={handleSubmit}>
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
                    className='w-90 bg-[#3c3c3c] p-3 text-white outline-none mb-6'
                    placeholder='*******'
                    autoComplete='new-password'
                    required
                    />
                </div>


                <button
                  disabled={isLoading} 
                    className='w-full p-3 font-semibold bg-[#f2f2f2] text-black rounded-md cursor-pointer hover:shadow-md hover:shadow-[#edeaea] duration-150'>
                    {isLoading ? 'Loading...' : 'Sign In'}
                </button>

                <p className='text-white text-center mt-3'>Already have an Account? <Link to={'/signup'}>Signup</Link> </p>

              </form>
            </div>
          </div>
      </div>
    </>
  )
}

export default SigninPage