"use client"

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {

  const { data: session} = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  
  useEffect(() => {
    const setUpProviders = async () => {
        const response = await getProviders();
        setProviders(response);
    }
    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 flex-center">
            <Image 
                src="/assets/icons/logo.jpg"
                alt="Loan Shark Logo"
                width={50}
                height={50}
                className="object-contain"
            />
            <p className="logo_text">Loan $hark</p>
        </Link>

        {/*Desktop Navigation*/}
        <div className="sm:flex hidden">
            {session?.user ? (
                <div className="flex gap-3 md:gap-5">
                    <Link href="/loan-apply" className="black_btn">Apply for a Loan</Link>
                    <button 
                        type="button" 
                        className="outline_btn" 
                        onClick={() =>{
                            signOut({
                                callbackUrl: "/"
                            }); 
                        }}
                    >
                        Sign Out
                    </button>
                    <p>{session?.user.name}</p>
                </div>
            ) : (
                <>
                    {providers && 
                        Object.values(providers).map((provider) => (
                            <button type="button" onClick={() => signIn(provider.id)} className="black_btn">
                                Sign In
                            </button>
                        ))
                    }
                </>    
            )}
        </div>

        {/*Mobile Navigation*/}

        <div className="sm:hidden flex relative">
            {session?.user ? (
                <div className="flex">
                    <button 
                        id="dropdownDividerButton" 
                        data-dropdown-toggle="dropdownDivider" 
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
                        type="button"
                        onClick={() => setToggleDropdown((prev) => !prev)}>
                            {session?.user.name} 
                        <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/></svg>
                    </button>
                    {toggleDropdown && (
                        <div className="dropdown">
                            <Link 
                              href="/loan-apply"
                              className="dropdown_link"
                              onClick={() => {
                                setToggleDropdown(false);
                            }}
                            >
                                Apply for a Loan
                            </Link>
                            <Link 
                              href="/"
                              className="dropdown_link"
                              onClick={() => {
                                setToggleDropdown(false);
                                signOut();
                            }}
                            >
                                Sign Out
                            </Link>
                        </div>   
                    )}

                </div>
            ) : (
                <>
                    {providers && 
                        Object.values(providers).map((provider) => (
                            <button type="button" onClick={() => signIn(provider.id)} className="black_btn">
                                Sign In
                            </button>
                        ))
                    }
                </>
            )}
        </div>
    </nav>
  )
}

export default Nav;