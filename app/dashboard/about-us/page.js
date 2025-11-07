import { auth } from "@/auth"
import { AuthorizationCheck } from "@/config/Authorization-check"
import About from "./about-us";

export default async function () {
    const session = await auth();
    return (
        <>
        <AuthorizationCheck/>
        <About userId = {session?.user?.id}/>
        </>
    )
}