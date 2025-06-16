"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "@radix-ui/react-label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select"
import { UserPlus } from "lucide-react"
import { api } from "~/utils/api"
import { useRouter } from "next/router"
import { Sidebar } from "../../componenty/sidebar"


export default function Component() {
            const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

    const {mutateAsync, isPending} = api.user.register.useMutation();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Nový uživatel:", formData)
    if (!formData.name || !formData.email || !formData.password) {
      alert("Prosím vyplňte všechna povinná pole.")
      return
    }
    try {
      await mutateAsync({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
      alert("Uživatel byl úspěšně vytvořen.")
      setFormData({ name: "", email: "", password: ""})
      await router.push("/../admin/uzivatele/spravaUzivatelu") 
    } catch (error) {
      console.error("Chyba při vytváření uživatele:", error)
      alert("Došlo k chybě při vytváření uživatele. Zkuste to prosím znovu.")
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <Button
        variant="outline"
        className="absolute top-4 left-4"
        onClick={() => router.back()}
    >
        Zpět
    </Button>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <UserPlus className="w-6 h-6 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Přidat nového uživatele</CardTitle>
          <CardDescription>Vyplňte údaje pro vytvoření nového uživatelského účtu</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Jméno *</Label>
              <Input
                id="name"
                type="name"
                placeholder="Jan Novak"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="jan.novak@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Heslo *</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Vytvořit uživatele
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
