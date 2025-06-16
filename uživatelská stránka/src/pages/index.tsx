import Navbar from "./componenty/navbar"
import Footer from "./componenty/footer"
import Image from "next/image"
import { api } from "~/utils/api";

import { useState, useEffect } from "react";


export default function Home() {
  const [imgPath, setImgPath] = useState<string>("/uploads/banner.png");
    const { data: texts, isLoading } = api.texts.getTexts.useQuery();
  const { data: blogs, } = api.blog.getPublished.useQuery();






  useEffect(() => {
    fetch("/api/upload")
      .then(res => res.json())
      .then((data: { path?: string }) => {
        if (typeof data.path === "string") setImgPath(data.path);
      })
      .catch((error) => {
        console.error("Failed to fetch banner path:", error);
      });
  }, []);

    if (isLoading) return <p>Načítání...</p>;
    if (!texts) return <p>Nenačteny žádné texty.</p>;

    const getText = (key: string) => {
    return texts.find((t) => t.key === key)?.value ?? "";
    };

    

    const getColor = (key: string): string => {
      const found = texts.find((t) => t.key === key) as { settings?: { color?: string } } | undefined;
      const settings = found?.settings;
      return settings?.color ?? "#000000";
    };

    const getSize = (key: string): string => {
      const found = texts.find((t) => t.key === key) as { settings?: { fontSize?: string } } | undefined;
      const settings = found?.settings;
      return settings?.fontSize ?? "text-base"; 
    };



  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="relative h-[50vh] min-h-[400px] w-full">
          <Image
      src={`${imgPath}?v=${Date.now()}`}
      alt="Banner image"
      fill
      style={{ objectFit: "cover" }}
      priority
    />
<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
  <div  className="text-center ">
    <h1 style={{
        color: getColor("homepage_title"),
      }} className={`${getSize("homepage_title")} font-bold mb-4`}>{getText("homepage_title")}</h1>
    <p style={{
        color: getColor("podnadpis"),
        fontSize: getSize("podnadpis"),
      }} className={`${getSize("podnadpis")} mb-4`}>{getText("podnadpis")}</p>
  </div>
</div>
    </div>
    <div className="container mx-auto py-12 px-4 ">
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center ">{getText("o_nas_titulek")}</h2>
        <p className="max-w-2xl mx-auto text-center text-lg">
          {getText("o_nas_text")}
        </p>
      </div>
      <div className="border-t border-gray-200"></div>
      <div>
        <h2 className="text-3xl font-bold mb-6 text-center pt-10">Nejnovější příspěvky</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs?.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={`${post.imageUrl}?height=200&width=400&text=Blog+${post.id}`}
                alt={`Blog post ${post.id}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Název blogu {post.title}</h3>
                <a href={`/blog/${post.id}`} className="text-blue-600 hover:underline">
                  Číst více
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
      <Footer />
    </main>
  )
}
