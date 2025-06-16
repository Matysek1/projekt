"use client";
import { Menu, X, User } from 'lucide-react'
import { useState } from 'react'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

const Navbar: React.FC = () => {

  const router = useRouter();
  const {data: session, status} = useSession();

  const loading = status === "loading";



  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="relative bg-white shadow-sm">
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-8 text-blue-100"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">



{/*         <button onClick={() => console.log(session)}>Button</button>
 */}



        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <span className="text-3xl font-bold text-blue-600">WebyHned.eu</span>
          </div>
          <div className="hidden md:flex md:items-center md:justify-center md:flex-1">
            <div className="flex items-baseline space-x-6">
              <a href="#" onClick={() => router.push('../')} className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-lg font-medium transition duration-150 ease-in-out">Domů</a>
              <a href="#" onClick={()=> router.push('../oNas')} className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-lg font-medium transition duration-150 ease-in-out">O nás</a>
              <a href="#" onClick={() => router.push('../sluzby')} className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-lg font-medium transition duration-150 ease-in-out">Služby</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-lg font-medium transition duration-150 ease-in-out">Kontakt</a>
            </div>
          </div>
          <div className="hidden md:block">
            <button 
            className="inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out">
              <User className="mr-2 h-5 w-5" />
              {loading ? (
              <span>Loading...</span>
              ) : session ? (
              <>
                <button onClick={() => router.push('../myaccount')} className="ml-2">Můj účet</button>
              </>
              ) : (
              <>
                <button onClick={() => router.push('../prihlaseni')} className="ml-2">Přihlásit se</button>
              </>
            )}
            </button>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Otevřít hlavní menu</span>
              {isOpen ? (
                <X className="block h-8 w-8" aria-hidden="true" />
              ) : (
                <Menu className="block h-8 w-8" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden relative" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="text-gray-600 hover:text-blue-600 block px-3 py-2 rounded-md text-lg font-medium transition duration-150 ease-in-out">Domů</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 block px-3 py-2 rounded-md text-lg font-medium transition duration-150 ease-in-out">O nás</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 block px-3 py-2 rounded-md text-lg font-medium transition duration-150 ease-in-out">Služby</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 block px-3 py-2 rounded-md text-lg font-medium transition duration-150 ease-in-out">Kontakt</a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <button className="mt-1 ml-2 inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out">
              <User className="mr-2 h-5 w-5" />
              {loading ? (
              <span>Loading...</span>
              ) : session ? (
              <>
                <button onClick={() => router.push('../myaccount')} className="ml-2">Můj účet</button>
              </>
              ) : (
              <>
                <button onClick={() => router.push('../signup/prihlaseni')} className="ml-2">Přihlásit se</button>
              </>
            )}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar;