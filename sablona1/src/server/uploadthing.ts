import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  blogImage: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(({ file }) => {
    console.log("File uploaded:", file.url);
  }),
};

export type OurFileRouter = typeof ourFileRouter;