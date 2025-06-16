import { BarChart3, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import  Sidebar  from "../componenty/sidebar"
import Header from "../componenty/header"
import { useSession } from "next-auth/react"
import Router from 'next/router'
import { api } from "~/utils/api";

export default function Dashboard() {
  const {data: session, status} = useSession();
    const { data: blogs, isLoading, refetch } = api.blog.getAll.useQuery();



  if (status === 'loading') {
    return <div>Loading...</div>
  }
  if(status === 'unauthenticated'){
    void Router.push('/admin/login')
  }

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header title="Dashboard"></Header>
        <main className="flex-1 p-4 lg:p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Celková návštěvnost</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,254</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Počet článků</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{blogs?.length ?? 0}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Průměrná doba na stránce</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2m 14s</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Míra okamžitého opuštění</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42%</div>
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Poslední články</CardTitle>
                <CardDescription>Přehled nedávno publikovaných článků</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {blogs?.slice(0, 4).map((i) => (
                    <div key={i.id} className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded bg-muted/20 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium">Článek {i.title}</p>
                        <p className="text-sm text-muted-foreground">Publikováno {i.createdAt.toLocaleDateString()} </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

