"use client"

import { useState } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { api } from "~/utils/api"

import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Undo,
  Redo,
  LinkIcon,
  ImageIcon,
  Code,
  Quote,
  Pilcrow,
  SeparatorVerticalIcon as Separator,
  Check,
} from "lucide-react"

export default function BlogEditor() {
  const [title, setTitle] = useState("Můj nový článek")
  const [content, setContent] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [linkUrl, setLinkUrl] = useState("")
  const [showImageInput, setShowImageInput] = useState(false)
  const [showLinkInput, setShowLinkInput] = useState(false)
    const [uploading, setUploading] = useState(false);
  const [imageUrlImage, setImageUrlImage] = useState<File | null>(null);
    const [imageUrlPreview, setImageUrlPreview] = useState<string | null>(null);


    const { mutate: saveBlog } = api.blog.saveBlog.useMutation();


  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: "Začněte psát svůj článek...",
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML())
    },
  })

  if (!editor) {
    return null
  }

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run()
      setImageUrl("")
      setShowImageInput(false)
    }
  }

  const addLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run()
      setLinkUrl("")
      setShowLinkInput(false)
    }
  }



  const uploadFile = async () => {
    if (!imageUrlImage) {
      alert("Nejdříve vyberte soubor.");
      return;
    }

    const formData = new FormData();
    formData.append("file", imageUrlImage);

    setUploading(true);
    try {
      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload selhal");
      }

      const data = await res.json() as { path: string };

      if (data.path) {
        setImageUrlPreview(data.path); // uložíme cestu do stavu
        alert(imageUrlPreview);
      } else {
        alert("Nepodařilo se získat URL obrázku");
      }
    } catch (e) {
      alert("Chyba při uploadu");
      console.error(e);
    }
    setUploading(false);
  };

    const savePost = () => {
    const post = {
      title,
      content,
      createdAt: new Date().toISOString(),
      published: (document.getElementById("published") as HTMLInputElement | null)?.checked ?? false,
      imageUrl: imageUrlPreview ?? "mrdka",
    }
    saveBlog(post)
    editor.chain().focus().clearContent().run()
    alert("Článek byl úspěšně uložen!")
    setTitle("Můj nový článek")
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl font-bold border-none p-0 focus-visible:ring-0"
              placeholder="Název článku"
            />
          </CardTitle>
        </CardHeader>
      </Card>

      <Tabs defaultValue="editor">
        <TabsList className="mb-4">
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="preview">Náhled</TabsTrigger>
        </TabsList>

        <TabsContent value="editor">
          <Card>
            <CardContent className="pt-6">
              <div className="border rounded-md p-2 mb-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive("bold") ? "bg-slate-200" : ""}
                  >
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive("italic") ? "bg-slate-200" : ""}
                  >
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive("heading", { level: 1 }) ? "bg-slate-200" : ""}
                  >
                    <Heading1 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive("heading", { level: 2 }) ? "bg-slate-200" : ""}
                  >
                    <Heading2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive("bulletList") ? "bg-slate-200" : ""}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive("orderedList") ? "bg-slate-200" : ""}
                  >
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={editor.isActive("codeBlock") ? "bg-slate-200" : ""}
                  >
                    <Code className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive("blockquote") ? "bg-slate-200" : ""}
                  >
                    <Quote className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => setShowLinkInput(!showLinkInput)}>
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => setShowImageInput(!showImageInput)}>
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                  >
                    <Separator className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => editor.chain().focus().setParagraph().run()}>
                    <Pilcrow className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => editor.chain().focus().undo().run()}>
                    <Undo className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => editor.chain().focus().redo().run()}>
                    <Redo className="h-4 w-4" />
                  </Button>
                </div>

                {showImageInput && (
                  <div className="flex items-center gap-2 mb-2">
                    <Input
                      type="text"
                      placeholder="URL obrázku"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                    <Button onClick={addImage} size="sm">
                      <Check className="h-4 w-4 mr-1" /> Vložit
                    </Button>
                  </div>
                )}

                {showLinkInput && (
                  <div className="flex items-center gap-2 mb-2">
                    <Input
                      type="text"
                      placeholder="URL odkazu"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                    />
                    <Button onClick={addLink} size="sm">
                      <Check className="h-4 w-4 mr-1" /> Vložit
                    </Button>
                  </div>
                )}

                <div className="min-h-[300px] border rounded-md p-4 prose prose-sm max-w-none">
                  <EditorContent editor={editor} />
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" className="mr-2" onClick={() => editor.chain().focus().clearContent().run()}>
                  Vyčistit
                </Button>

                <Button onClick={savePost}>Uložit článek</Button>
                <input type="checkbox" className="ml-2" id="published" />
                <label htmlFor="published" className="ml-1 text-sm">Publikovat</label>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div>
      <h2 className="text-2xl font-bold mb-4">Nahrát obrázek</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            setImageUrlImage(e.target.files[0]);
            setImageUrl(""); 
          }
        }}
      />
      <button
        onClick={uploadFile}
        disabled={uploading || !imageUrlImage}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {uploading ? "Nahrávám..." : "Nahrát obrázek"}
      </button>

      {imageUrl && (
        <div className="mt-4">
          <p>Obrázek nahrán:</p>
          <img src={imageUrl} alt="Nahraný obrázek" style={{ maxWidth: 300 }} />
        </div>
      )}
    </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardContent className="pt-6">
              <div className="prose max-w-none">
                <h1>{title}</h1>
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
