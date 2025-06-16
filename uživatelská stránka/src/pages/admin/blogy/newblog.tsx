import dynamic from "next/dynamic"
import { Button } from "~/components/ui/button"
import { useRouter } from "next/router"

const BlogEditor = dynamic(() => import("../../componenty/blog-editor"), { ssr: false })

export default function BlogEditorPage() {
  const router = useRouter()

  return (
    <div className="container mx-auto py-8">
      <Button
        variant="outline"
        className="absolute top-4 left-4"
        onClick={() => router.back()}
      >
        Zpět
      </Button>
      <h1 className="text-3xl font-bold mb-6 text-center">Editor blogu</h1>
      <BlogEditor />
    </div>
  )
}