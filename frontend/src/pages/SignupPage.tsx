
import { Link } from 'react-router-dom'
import signup from '../assets/img/signup.png'

function SignupPage() {
  return (
    <>
      <div className="flex h-full items-center justify-center">
          <div className="bg-[#2a2a2a] p-5 flex flex-row gap-9 icen">
            <div>
              <h2 className="text-white font-bold tracking-wider mb-5">Signup</h2>
              <img src={signup} alt="" className='size-70'/>
            </div>
            <div>
              <form action="" className='mt-0' autoComplete='off'>
                <div>
                  <label htmlFor="name" className='block mb-1 text-gray-300 font-semibold'>Username</label>
                  <input 
                    type="text" 
                    name="name" 
                    id="username" 
                    className='w-90 bg-[#3c3c3c] mb-3 p-3 text-white outline-none'
                    placeholder='Enter Username'
                    autoComplete='no'
                    />
                </div>
                <div>
                  <label htmlFor="email" className='block mb-1 text-gray-300 font-semibold'>Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    className='w-90 bg-[#3c3c3c] mb-3 p-3 text-white outline-none'
                    placeholder='Enter Email'
                    autoComplete='no'
                    />
                </div>
                <div>
                  <label htmlFor="passowrd" className='block mb-1 text-gray-300 font-semibold'>Passowrd</label>
                  <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    className='w-90 bg-[#3c3c3c] p-3 text-white outline-none mb-9'
                    placeholder='*******'
                    autoComplete='no-password'
                    />
                </div>

                <button 
                    className='w-full p-3 font-semibold bg-[#fff] text-black rounded-md cursor-pointer hover:shadow-md hover:shadow-[#edeaea] duration-150'>
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