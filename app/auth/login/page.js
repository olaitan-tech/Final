import { auth, signIn } from "@/auth";
import { TextField } from "@mui/material"
import { FcGoogle } from "react-icons/fc";

export default  async function Login () {
    const session = await auth()
    return (
        <main className="min-h-screen flex justify-center px-2 md:px-12 md:py-6 lg:py-12 lg:px-16">
            <div className="w-full md:w-[450px] max-h-[350px] flex flex-col gap-3 rounded md:shadow-md md:px-3 md:py-4">
                <div>
                    <h1 className="text-2xl font-semibol text-center">Log In</h1>
                    <p className="text-orange-300 text-center">Create an Account or sign in</p>
                </div>
                <form className="justify-items-center">
                    <div className="w-full mb-4">
                        <TextField 
                        placeholder="olaitankns@gmail.com"
                        type="email"
                        className="w-full"/>
                        <button type="submit" className="text-white bg-violet-500 rounded-md w-full hover:opacity-40 p-3 mt-2">Continue</button>
                    </div>
                </form>
                <p className="text-center text-gray-900">Or sign in with</p>
                <form action={async()=>{
                                "use server"
                        await signIn("google")
    
                }
                }>
                    <button type="submit" className="w-full h-[45px] rounded-md shadow-md hover:opacity-50 cursor-pointer flex justify-center items-center gap-3 md:w-full md:shadow-md md:rounded-md">
                    <FcGoogle className="text-2xl"/>
                    <span className="text-gray-800 font-semibold">Sign in with Google</span>
                    </button>
                </form> 

            </div>

        </main>
    )
}














// import { Button, TextField } from "@mui/material";
// import { FaFacebookF } from "react-icons/fa6";
// import { FaTiktok } from "react-icons/fa6";



// export default function Login () {
//     return (
//         <main className="flex flex-col justify-center items-center">
//             <FaFacebookF className="text-5xl text-blue-500" />
//             <FaTiktok className="text-4xl text-violet-500" />
//             <Button variant="contained">Click</Button>
//             <TextField
//               variant="standard"
//               />
//         </main>
//     )
// }



//   "use client"
// import { useEffect, useState } from "react"

// export default function Login () {
//     const [count,setCount] = useState(0)

//     useEffect(()=>{
//         const handleFetch = async()=>{
//             const response = await fetch("https://dummyjson.com/products");
//             const data = response.json();
//             console.log(data);
//         }
//         handleFetch();
//     })

//     return (
//         <main>
//             <div className="flex flex-col justify-center items-center">
//             <p className="text-xl font-bold">Count: {count}</p>
//             <button onClick={()=>(setCount(count + 1))} className="w-[100px] h-[50px] bg-blue-500 rounded">increment</button>
//             <button onClick={()=>(setCount(count - 1))} className="w-[100px] h-[50px] bg-blue-400 rounded mt-3">decrement</button>
//             </div>
//         </main>
//     )
// }