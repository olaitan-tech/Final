   "use client"
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";

export function Navbar () {
    const [menuOpen,setMenuOpen] = useState(false);
    const toggleMenu = () =>(
        setMenuOpen(!menuOpen)
    )

    return (
        <main className="bg-gray-100 shadow-gray-300 w-full sticky top-0 z-10">
            <div className="flex justify-between h-[50px] pt-3 px-5">
                <h1 className="font-bold text-2xl text-orange-500">Aldo's</h1>
                <ul className="hidden md:flex gap-10 md:font-semibold md:cursor-pointer">
                    <li>Menu</li>
                    <li>About Us</li>
                    <li>Order</li>
                    <li></li>
                </ul>
                <div className="hidden md:flex gap-3">
                    <Link href="/auth/login">  <button className="w-[60px] h-[30px] text-white bg-blue-500 rounded cursor-pointer">Login</button></Link>
                    <CgProfile className="text-2xl cursor-pointer" />
                </div>
                <div className="block md:hidden">
                    <RxHamburgerMenu onClick={toggleMenu} className="text-2xl text-blue-500 mt-2" />
                </div>
            </div>
            {menuOpen &&(
            <div className="px-5 pb-1 flex flex-col gap-2 md:hidden">
                <ul>
                    <li>Home</li>
                    <li>Order</li>
                    <li>OrderList</li>
                </ul>
                <Link href="/auth/login">    <button className="w-[60px] h-[30px] text-white bg-blue-500 rounded cursor-pointer">Login</button></Link>
                <CgProfile className="text-2xl cursor-pointer" />
            </div>
            )}
        </main>
    )
}