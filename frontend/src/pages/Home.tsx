
function Home() {
  return (
    <div className="text-white h-full flex flex-col justify-center items-center gap-6">
        <h2 className="font-bold text-3xl">You are Home</h2>
        <p>user</p>
        <p>Email</p>
        
        <button className="w-80 bg-white text-black p-3 rounded-md">Log out</button>
    </div>
  )
}

export default Home

// import { useAuthStore } from "./store/authStore"
// import type { AuthStore } from "./store/authStore"


// const { checkAuth } = useAuthStore() as AuthStore
