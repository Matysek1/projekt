import Link from "next/link"
import React from "react"
import { api } from "~/utils/api"

const Navbar : React.FC = () => {
const { mutate: updateText } = api.texts.updateText.useMutation();
const { data: texts, isLoading } = api.texts.getTexts.useQuery();

    if (isLoading) return <p>Načítání...</p>;
    if (!texts) return <p>Nenačteny žádné texty.</p>;


      const getText = (key: string) => {
    return texts.find((t) => t.key === key)?.value ?? "";
    };

    

    const getColor = (key: string): string => {
      const found = texts.find((t) => t.key === key) as { settings?: { color?: string } } | undefined;
      const settings = found?.settings;
      return settings?.color ?? "#000000"; //
    };

    const getSize = (key: string): string => {
      const found = texts.find((t) => t.key === key) as { settings?: { fontSize?: string } } | undefined;
      const settings = found?.settings;
      return settings?.fontSize ?? "text-base"; // výchozí velikost textu
    };

        const fontSizes = [
    { label: "Malý", value: "text-sm" },
    { label: "Normální", value: "text-base" },
    { label: "Velký", value: "text-lg" },
    { label: "Extra velký", value: "text-xl" },
    { label: "Obrovský", value: "text-2xl" },
    { label: "Gigantický", value: "text-3xl" },
    { label: "Obří", value: "text-4xl" },
    { label: "Mamutí", value: "text-5xl" },
    { label: "Kolosální", value: "text-6xl" },
    ];


  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            {getText("nazev_stranky")}
          </Link>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="text-gray-600 hover:text-gray-800">
                Domů
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-gray-600 hover:text-gray-800">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/onas" className="text-gray-600 hover:text-gray-800">
                O nás
              </Link>
            </li>
            <li>
              <Link href="/kontakt" className="text-gray-600 hover:text-gray-800">
                Kontakt
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
