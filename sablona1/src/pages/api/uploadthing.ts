// pages/api/uploadthing.ts
import { createRouteHandler } from "uploadthing/server";
import { ourFileRouter } from "../../server/uploadthing";
export const runtime = "edge"; // <=== přidej toto


export default createRouteHandler({
  router: ourFileRouter,
});