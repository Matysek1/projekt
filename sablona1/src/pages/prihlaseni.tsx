'use client'

import React, { useState } from 'react'
import { api } from '~/utils/api';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react'
import * as yup from 'yup';


export default function AuthPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin')
  const {mutateAsync, isPending} = api.user.register.useMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  const passwordValidate = yup.string()
/*   .min(8, "Heslo musí mít alespoň 8 znaků")
  .required("Heslo nesmí být prázdné")
  .max(20, "Heslo může mít maximálně 20 znaků")
  .matches(/[a-z]/, "Heslo musí obsahovat alespoň jedno malé písmeno")
  .matches(/[A-Z]/, "Heslo musí obsahovat alespoň jedno velké písmeno")
  .matches(/[0-9]/, "Heslo musí obsahovat alespoň jedno číslo") */

  const emailValidate = yup.string()
  .email("Email musí být ve správném formátu")
  .required("Email nesmí být prázdný")



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    if (activeTab === 'signin') {
      const result = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false
      });

      if(result?.ok){
        
      await router.push("../")
      console.log("ok");
    }
    setEmail("");
    setPassword("");
      
    } else {
      emailValidate.validate(email).catch((error) => {
        alert(error.message);
        return;
      })
      
      if(password !== passwordConfirm){
        
        alert("Hesla se neschodují");
        return;
      }
       passwordValidate.validate(password).catch((error) => {
        alert(error.message);
        return;
      })

      const response = await mutateAsync({
        email: email,
        password: password,
        name: name});
  
      if(!response){
        alert("User not created")
      return;
      }

      if(response){
        alert("User created")
        await fetch('../api/email-verification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'emailverification',
            email: email,
            subject: 'Potvrďte svůj email',
          }),
        })
        await router.push("../");


      }
      console.log(response);
      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
    }
    
    setIsLoading(false)
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    // Zde by byla logika pro přihlášení přes Google
    await new Promise(resolve => setTimeout(resolve, 2000)) // Simulace API volání
    setIsLoading(false)
  }

  const handleTabChange = (tab: 'signin' | 'signup') => {
    setActiveTab(tab)
  }

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white relative overflow-hidden">
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path fill="#3B82F6" fillOpacity="0.5" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
      <div className="w-[400px] bg-white/80 backdrop-blur-sm shadow-xl z-10 rounded-lg overflow-hidden">
        <div className="flex text-center border-b border-blue-200">
          <button
            className={`flex-1 py-4 px-6 focus:outline-none transition-colors duration-200 ${
              activeTab === 'signin' ? 'bg-blue-500 text-white' : 'text-blue-600 hover:bg-blue-50'
            }`}
            onClick={() => handleTabChange('signin')}
          >
            Přihlášení
          </button>
          <button
            className={`flex-1 py-4 px-6 focus:outline-none transition-colors duration-200 ${
              activeTab === 'signup' ? 'bg-blue-500 text-white' : 'text-blue-600 hover:bg-blue-50'
            }`}
            onClick={() => handleTabChange('signup')}
          >
            Registrace
          </button>
        </div>
        <div className="p-6">
          {activeTab === 'signin' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="signin-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  onChange={(parametr => setEmail(parametr.target.value))}
                  id="signin-email"
                  type="email"
                  placeholder="vas@email.cz"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="signin-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Heslo
                </label>
                <input
                    onChange={(parametr => setPassword(parametr.target.value))}
                  id="signin-password"
                  type="password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p onClick={()=> router.push("zapomenute-heslo")}>Zapomenuté heslo?</p>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? "Přihlašování..." : "Přihlásit se"}
              </button>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? "Přihlašování..." : "Přihlásit se přes Google"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="signup-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Jméno
                </label>
                <input
                  onChange={(parametr => setName(parametr.target.value))}
                  id="signup-name"
                  type="text"
                  placeholder="Jan Novák"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  onChange={(parametr => setEmail(parametr.target.value))}
                  id="signup-email"
                  type="email"
                  placeholder="vas@email.cz"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Heslo
                </label>
                <input
                  onChange={(parametr => setPassword(parametr.target.value))}
                  id="signup-password"
                  type="password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="signup-password-confirm" className="block text-sm font-medium text-gray-700 mb-1">
                  Potvrzení hesla
                </label>
                <input
                  onChange={(parametr => setPasswordConfirm(parametr.target.value))}
                  id="signup-password-confirm"
                  type="password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? "Registrace..." : "Zaregistrovat se"}
              </button>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? "Přihlašování..." : "Přihlásit se přes Google"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}