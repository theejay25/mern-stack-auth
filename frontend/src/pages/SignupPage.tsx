
import { Link, useNavigate } from 'react-router-dom'
import signup from '../assets/img/signup.png'
import { useState } from 'react'
import axios from 'axios'

function SignupPage() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate() 

  const handleSubmit = async (e: any) => {

    e.preventDefault()
    try {
      
      const poster = await axios.post('http://localhost:5050/api/auth/signup', {name, email, password})

      if(!poster.data.success) {
        alert('Problem signing up')
      } else {
        alert('A verification OTP has been sent to your email')
        navigate('/verify-email')
      }

    } catch (error) {
      console.log('error in signin', error)
    }

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
                    className='w-90 bg-[#3c3c3c] mb-3 p-3 text-white text-white outline-none'
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

                <button 
                    className='w-full p-3 font-semibold bg-[#f2f2f2] text-black rounded-md cursor-pointer hover:shadow-md hover:shadow-[#edeaea] duration-150'>
                    Signup
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