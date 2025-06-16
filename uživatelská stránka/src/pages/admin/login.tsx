"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import Link from "next/link"
import { useRouter } from "next/router"
import { signIn } from 'next-auth/react'
import { useSession } from "next-auth/react"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { data: session } = useSession()

  if (session) {
    void router.push("/admin")
    return null
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    if (!email || !password) {
      setError("Prosím vyplňte všechna pole")
      setIsLoading(false)
      return
    }
    const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
    
                    });

    if (result?.ok) {
      await router.push("../admin");
      console.log("ok");
    }
                setEmail("");
                setPassword("");
              
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Vítejte zpět</h1>
          <p className="text-gray-500">Přihlaste se do svého účtu Webyhned</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <p>Email</p>
            <Input
              id="email"
              type="email"
              placeholder="vas@email.cz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p>Heslo</p>
              <Link href="/zapomenute-heslo" className="text-sm text-blue-600 hover:text-blue-800">
                Zapomenuté heslo?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800" disabled={isLoading}>
            {isLoading ? "Přihlašování..." : "Přihlásit se"}
          </Button>
        </form>

        
      </div>
    </div>
  )
}

