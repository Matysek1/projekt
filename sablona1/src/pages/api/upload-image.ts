import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import path from "path";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // musí být false, protože formidable sám parsuje data
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads", "images");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  let savedFileName = "";

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    filename: (name, ext, part) => {
      const original = part.originalFilename ?? "image.png";
      const extFromOriginal = path.extname(original).toLowerCase();

      const allowedExts = [".png", ".jpg", ".jpeg", ".gif", ".webp"];
      let extension = ".png";

      if (allowedExts.includes(extFromOriginal)) {
        extension = extFromOriginal === ".jpeg" ? ".jpg" : extFromOriginal;
      }

      savedFileName = `image-${Date.now()}${extension}`;
      return savedFileName;
    },
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error("Upload error:", err);
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

    const filePath = `/uploads/images/${fileName}`;

    return res.status(200).json({ filename: fileName, path: filePath });
  });
}
