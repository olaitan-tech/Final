import Image from "next/image";
import { auth, signOut } from "@/auth";
import { Button } from "@mui/material";
import { AuthorizationCheck } from "@/config/Authorization-check";

export default async function Profile () {
    const session = await auth();
    return (
        <>
        <AuthorizationCheck/>
        <main className="min-h-screen flex justify-center ">
            <div className="w-full md:w-[380px] flex flex-col gap-3 shadow-lg rounded-md">
                <div className="flex justify-center">
                    <Image
                    width={70}
                    height={70}
                    src={session?.user?.image}
                    alt="my-profile"
                    className="w-[70px] h-[70px] rounded-full"
                    />
                </div>
                <p className="text-center py-4 border-b border-gray-400">{session?.user?.name.toLocaleLowerCase()}</p>
                <p className="text-center py-4 border-b border-gray-400">{session?.user?.email}</p>
                <form action={async()=>{
                       "use server"
                    await signOut()
                }}
                >
                    <Button type="submit" variant="contained" className="w-full" color="error">Log Out</Button>
                </form>
            </div>
        </main>
        </>
    )
}