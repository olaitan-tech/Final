import { auth } from "@/auth"
import { AuthorizationCheck } from "@/config/Authorization-check"
import NewOrder from "./new-order";

export default async function () {
    const session = await auth();
    return (
        <>
        <AuthorizationCheck/>
        <NewOrder userId = {session?.user?.id}/>
        </>
    )
}