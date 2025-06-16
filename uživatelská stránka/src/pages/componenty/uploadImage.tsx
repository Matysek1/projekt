"use client";

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "../../server/uploadthing";

export default function ImageUpload({ onUpload }: { onUpload: (url: string) => void }) {
  return (
    <UploadButton<OurFileRouter, "blogImage">
      endpoint="blogImage"
      onClientUploadComplete={(res) => {
        if (res?.[0]?.url) {
          onUpload(res[0].url);
        }
      }}
      onUploadError={(error) => {
        console.error(error);
        alert(`Chyba při nahrávání: ${error.message}`);
      }}
    />
  );
}
