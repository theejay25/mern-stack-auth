
import { useState } from 'react'
import verifybg from '../assets/img/verify.png'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import type { AuthStore } from '../store/authStore'

function VerifyEmailPage() {

    const navigate = useNavigate()
    const [code, setCode] = useState('')
    const { verifyEmail, isLoading, error } = useAuthStore() as AuthStore

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()

        await verifyEmail(code)
        if(!error && !isLoading) {   
            navigate('/login')
        }

      
    } 

  return (
    <>
        <div className="flex h-full justify-center items-center">
            <div className="bg-[#2c2c2c] p-5 flex flex-col gap-7 items-center">
                <div>
                    <h2 className="font-bold text-center text-2xl text-white">Verify Your Email Account</h2>
                    <img src={verifybg} alt="" className='w-80'/>
                </div>
                <div>
                    <h4 className='text-white text-center text-lg mb-4'>Please Verify your email with otp sent to you</h4>
                    <form action="" autoComplete='off' onSubmit={handleSubmit}>
                        <label htmlFor="otp" className='block font-semibold text-gray-300 mb-1'>OTP</label>
                        <input 
                            type="text" 
                            name="otp" 
                            id=""
                            className='bg-[#3c3c3c] p-3 w-full mb-9 text-white'
                            placeholder='Enter OTP'
                            required
                            onChange={(e: any) => setCode(e.target.value)}
                            autoComplete='no' 
                        />
                        {error && <p className='text-red-500'>{error}</p>}
                        <button 
                            disabled={isLoading}
                            className='w-full p-3 font-semibold bg-[#f2f2f2] text-black rounded-md cursor-pointer hover:shadow-md hover:shadow-[#edeaea] duration-150'>
                            {isLoading ? "Loading..." : 'Verify'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default VerifyEmailPage