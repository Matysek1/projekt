import { Button } from "../../components/ui/button"
import { Sidebar } from "../componenty/sidebar"
import React, { useState } from "react";
import { api } from "~/utils/api";
import Header from "../componenty/header";


export default function Dashboard() {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
    const [imgPath, setImgPath] = useState<string>("/uploads/banner.png");

  const [fontSize] = useState("text-base");
    const [localTexts, setLocalTexts] = useState<Record<string, TextItem>>({});



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


const { mutate: updateText } = api.texts.updateText.useMutation();
const { data: texts } = api.texts.getTexts.useQuery();


const [existingTexts, setExistingTexts] = useState<{ key: string; value: string }[]>([]);




type TextItem = {
  key: string;
  headtext: string;
  value: string;
  settings: {
    color: string;
    fontSize: string;
  };
};





React.useEffect(() => {
    const initial = texts?.reduce((acc, item) => {
      acc[item.key] = {
        ...item,
        value: item.value ?? "",
        settings: {
          color: typeof item.settings === "object" && item.settings !== null && "color" in item.settings
            ? (item.settings as { color?: string }).color ?? "#000000"
            : "#000000",
          fontSize: typeof item.settings === "object" && item.settings !== null && "fontSize" in item.settings
            ? (item.settings as { fontSize?: string }).fontSize ?? "16px"
            : "16px",
        },
      };
      return acc;
    }, {} as Record<string, TextItem>);
    setLocalTexts(initial ?? {});
  }, [texts]);


    const handleChange = (key: string, field: "value" | "color" | "fontSize", val: string) => {
    setLocalTexts((prev) => {
      const current = prev[key] ?? {
        key,
        headtext: "",
        value: "",
        settings: { color: "#000000", fontSize: "text-base" }
      };
      return {
        ...prev,
        [key]: {
          ...current,
          ...(field === "value" ? { value: val } : {}),
          settings: {
            ...current.settings,
            ...(field === "color" ? { color: val } : {}),
            ...(field === "fontSize" ? { fontSize: val } : {}),
          },
        },
      };
    });
  };

React.useEffect(() => {
    const fetchTexts = async () => {
      try {
        const res = await fetch("/api/pageContent");
        if (!res.ok) throw new Error("Failed to fetch texts");
        const data = (await res.json()) as { key: string; value: string }[];
        setExistingTexts(data);
      } catch (err) {
        setExistingTexts([]);
      }
    };
    void fetchTexts();
  }, []);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Soubor nahrán.");
    } else {
      alert("Chyba při nahrávání.");
    }

    setUploading(false);
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
                <Header title="Upráva stránky"></Header>
        
        <main className="flex-1 p-4 lg:p-6">
        <div className="space-y-4">
          <p className="text-muted-foreground">Zde můžete upravit vzhled vašeho webu.</p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">


            <div className="border rounded-lg p-6 bg-white">
              <h3 className="text-lg font-medium mb-4">Banner</h3>
              <div>
                <input type="file" accept="image/*" onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFile(e.target.files[0]);
                  } else {
                    setFile(null);
                  }
                }} />
                  <div className="my-4">
                    <img
                      src={file ? URL.createObjectURL(file) : imgPath}
                      alt="Náhled banneru"
                      className="max-h-48 rounded shadow border"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                <Button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleUpload} disabled={uploading}>
                  {uploading ? "Nahrávám..." : "Nahrát banner"}
                </Button>
              </div>
            </div>

            <div className="border rounded-lg p-6 bg-white">
              <h3 className="text-lg font-medium mb-4">Barevné schéma</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Primární barva</label>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500"></div>
                    <input type="text" value="#3B82F6" className="border rounded px-2 py-1 text-sm" readOnly />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sekundární barva</label>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-800"></div>
                    <input type="text" value="#1F2937" className="border rounded px-2 py-1 text-sm" readOnly />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Barva pozadí</label>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white border"></div>
                    <input type="text" value="#FFFFFF" className="border rounded px-2 py-1 text-sm" readOnly />
                  </div>
                </div>
              </div>
              <button

          className="bg-blue-600 text-white mt-9 px-4 py-2 rounded hover:bg-blue-700"
          >Uložit</button>
            </div>
          </div>

          <div className="border rounded-lg p-6 bg-white shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Texty</h3>
        <h1 className="text-2xl font-bold text-gray-900">Úprava textů</h1>
      </div>

      <div className="space-y-6">
        {Object.values(localTexts).map((item) => (
          <div key={item.key} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3">{item.headtext}</h4>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-end">
              <div className="lg:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Obsah textu</label>
                <input
                  value={item.value}
                  onChange={(e) => handleChange(item.key, "value", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Zadejte text..."
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Barva textu</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={item.settings.color}
                    onChange={(e) => handleChange(item.key, "color", e.target.value)}
                    className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <span className="text-xs text-gray-500">{item.settings.color}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Velikost písma</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={fontSize}
                  onChange={(e) => handleChange(item.key, "fontSize", e.target.value)}
                >
                  {fontSizes.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-600 mb-1">Náhled</label>
                <div
                  className="p-2 bg-white border border-gray-200 rounded text-sm"
                  style={{ color: item.settings.color, fontSize: item.settings.fontSize }}
                >
                  {item.value || "Náhled textu..."}
                </div>
              </div>

              <button
                onClick={() => updateText(item)}
                className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Uložit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

        

         
        </div>

      </main>
      </div>
    </div>
  )
}

