import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { House } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import SignOut from "./user-account-nav";

export default async function Navbar() {
    const session = await getServerSession(authOptions);

    return <div className="bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
        <div className="container flex items-center justify-between">
            <Link href='/'><House/></Link>
            {session?.user ? <SignOut/> : <Link href='/sign-in' className={buttonVariants()}>Sign in</Link>}
        </div>
    </div>
}