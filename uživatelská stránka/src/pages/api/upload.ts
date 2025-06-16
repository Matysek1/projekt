import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import path from "path";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const uploadDir = path.join(process.cwd(), "public", "uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  let savedFileName = ""; // uložíme název s příponou

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    filename: (name, ext, part) => {
      // zkusíme zjistit příponu z originálního souboru
      const original = part.originalFilename ?? "banner.png";
      const extFromOriginal = path.extname(original).toLowerCase();

      // povolené přípony
      const allowedExts = [".png", ".jpg", ".jpeg"];

      let extension = ".png"; // default

      if (allowedExts.includes(extFromOriginal)) {
        extension = extFromOriginal === ".jpeg" ? ".jpg" : extFromOriginal; // .jpeg nahradíme .jpg
      }

      savedFileName = `banner${extension}`;
      return savedFileName;
    },
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error("Upload error", err);
      return res.status(500).json({ error: "Upload failed" });
    }

    const fileField = files.file;
    if (!fileField) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const file = Array.isArray(fileField) ? fileField[0] : fileField;
    if (!file) {
      return res.status(400).json({ error: "File upload missing file data" });
    }
    const fileName = file.newFilename;

    if (!fileName) {
      return res.status(400).json({ error: "File upload missing filename" });
    }

    return res.status(200).json({ filename: fileName, path: `/uploads/${fileName}` });
  });
}
