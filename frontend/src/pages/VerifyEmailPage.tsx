
import { useState } from 'react'
import verifybg from '../assets/img/verify.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function VerifyEmailPage() {

    const navigate = useNavigate()
    const [code, setCode] = useState('')

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        try{
            const poster = await axios.post('http://localhost:5050/api/auth/verify-email', {code})

            if(poster.data.success) {
                alert("welcome to our Services")
                navigate('/login')
            }

        } catch (err) {
            console.log(err)
        }
    } 

  return (
    <>
        <div className="flex h-full justify-center items-center">
            <div className="bg-[#2c2c2c] p-5 flex flex-col gap-7 items-center">
                <div>
                    <h2 className="font-bold text-center text-2xl text-white">Verify Your Email Account</h2>
                    <img src={verifybg} alt="" className='w-full'/>
                </div>
                <div>
                    <h4 className='text-white text-center text-lg mb-4'>Please Verify your email with otp sent to you</h4>
                    <form action="" autoComplete='off' onSubmit={handleSubmit}>
                        <label htmlFor="otp" className='block font-semibold text-gray-300 mb-1'>OTP</label>
                        <input 
                            type="text" 
                            name="otp" 
                            id=""
                            className='bg-[#3c3c3c] p-3 w-full mb-9'
                            placeholder='Enter OTP'
                            required
                            onChange={(e: any) => setCode(e.target.value)}
                            autoComplete='no' 
                        />
                        <button 
                            className='w-full p-3 font-semibold bg-[#f2f2f2] text-black rounded-md cursor-pointer hover:shadow-md hover:shadow-[#edeaea] duration-150'>
                            Verify
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default VerifyEmailPage