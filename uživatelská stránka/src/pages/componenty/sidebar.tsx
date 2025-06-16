"use client"

import { useState, useEffect } from "react"
import { FileText, Home, LayoutGrid, Menu, Settings, X, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  // Handle responsive behavior
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setIsOpen(false)
      } else {
        setIsOpen(true)
      }
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, path: "/admin" },
    { id: "blogs", label: "Blogy", icon: FileText, path: "/admin/blogy" },
    { id: "appearance", label: "Vzhled stránky", icon: LayoutGrid, path: "/admin/nastavenistranky" },
    { id: "settings", label: "DNS", icon: Settings, path: "/admin/dns" },
    { id: "uzivatele", label: "Uživatelé", icon: User, path: "/admin/uzivatele/spravaUzivatelu" },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={`
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          ${isMobile ? "fixed inset-y-0 left-0 z-50" : "relative"} 
          w-64 h-screen bg-white border-r transition-transform duration-300 ease-in-out flex flex-col
        `}
      >
        {/* Sidebar header */}
        <div className="h-14 flex items-center justify-between border-b px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <LayoutGrid className="h-5 w-5" />
            <span>Webyhned Admin</span>
          </Link>
          {isMobile && (
            <button onClick={toggleSidebar} className="p-1">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Sidebar content */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.path

              return (
                <Link
                  key={item.id}
                  href={item.path}
                  onClick={() => {
                    if (isMobile) setIsOpen(false)
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md
                    ${isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Sidebar footer */}
        <div className="border-t p-4">
          <div className="text-xs text-gray-500">Webyhned CMS © 2025</div>
        </div>
      </aside>

      {/* Toggle button for mobile */}
      {isMobile && !isOpen && (
        <button onClick={toggleSidebar} className="fixed top-3 left-3 z-30 p-2 rounded-md bg-white shadow-md">
          <Menu className="h-5 w-5" />
        </button>
      )}
    </>
  )
}

