import { Button } from "../../../components/ui/button"
import  Sidebar  from "../../componenty/sidebar"
import { useRouter } from "next/router"
import { api } from "~/utils/api";

export default function Blogs() {
    const router = useRouter();
  const { data: blogs, isLoading, refetch } = api.blog.getAll.useQuery();
  const updatePublication = api.blog.updatePublication.useMutation();

  const deleteBlog = api.blog.delete.useMutation({
    onSuccess: async () => {
      alert("Blog byl smazán");
      await refetch();
    },
    onError: (err) => {
      console.error(err);
      alert("Chyba při mazání blogu");
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
            <Button onClick={() => router.push("./blogy/newblog")}>Přidat nový blog</Button>
          </div>

          <div className="mt-8 border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Název
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Datum publikace
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Stav
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Akce
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogs?.map((i) => (
                  <tr key={i.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">Blog {i.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{new Date(i.createdAt).toLocaleDateString()}</div>
                    </td>
                    {i.published ? (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Publikováno
                        </span>
                      </td>
                    ) : (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Koncept
                        </span>
                      </td>
                    )}

                
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Button variant="ghost" size="sm">
                        Upravit
                      </Button>
                      <Button onClick={() => deleteBlog.mutate({ id: i.id })} variant="ghost" size="sm" className="text-red-600">
                        Smazat
                      </Button>
                      {!i.published ? (
                        <Button
                          onClick={async () => {
                          await updatePublication.mutateAsync({ id: i.id, published: true });
                          await refetch();
                          }}
                          variant="ghost"
                          size="sm"
                          className="text-blue-600"
                        >
                          Publikovat
                        </Button>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      </div>
    </div>
  )
}

