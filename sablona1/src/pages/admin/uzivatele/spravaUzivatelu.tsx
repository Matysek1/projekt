import { BarChart3, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Sidebar } from "../../componenty/sidebar"
import { useRouter } from "next/router"
import { api } from "~/utils/api";
import { useSession } from "next-auth/react"


export default function Blogs() {
    const router = useRouter();
      const {data: session, status} = useSession();
    const { data: users, isLoading, refetch } = api.user.getUsers.useQuery();
    const deleteUser = api.user.removeUser.useMutation({
    onSuccess: async () => {
      alert("Uživatel byl smazán");
      await refetch();
    },
    onError: (err) => {
      console.error(err);
      alert("Chyba při mazání uživatele");
    },
  });




  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-white px-4 lg:px-6">
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Blogy</h1>
          </div>
          <Button variant="outline" size="sm">
            Nápověda
          </Button>
          <Button variant="outline" size="sm">
            Zobrazit stránku
          </Button>
        </header>
        <main className="flex-1 p-4 lg:p-6">
        <div className="space-y-4">

          <div className="mt-6">
            <Button onClick={() => router.push("./novyuzivatel")}>Přidat nového uživatele</Button>
          </div>

          <div className="mt-8 border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Jméno
                  </th>
                                    <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>

                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users && users.length > 0 ? (
                  users.map((user: { id: string; name: string; email: string }) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Button variant="ghost" size="sm">
                          Nové heslo
                        </Button>
                        {user.email !== session?.user?.email && (
                        <Button variant="ghost" size="sm" className="text-red-600" onClick={() => {
                          if (confirm("Opravdu chcete uživatele smazat?")) {
                          deleteUser.mutate(user.id);
                          }
                        }}>
                          Smazat
                        </Button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                      {isLoading ? "Načítání..." : "Žádní uživatelé nebyli nalezeni."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      </div>
    </div>
  )
}

