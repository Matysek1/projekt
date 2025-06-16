import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const blogRouter = createTRPCRouter({
  // Získání všech publikovaných blogů
  getPublished: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
  }),
    getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.blog.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),
  
  updatePublication: protectedProcedure
    .input(z.object({ id: z.string(), published: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
        const { id, published } = input;
        return ctx.db.blog.update({
            where: { id },
            data: { published },
        });
        }
    ),

  // Uložení (vytvoření nebo úprava) blogu
  saveBlog: protectedProcedure
  .input(
    z.object({
      id: z.string().optional(),
      title: z.string(),
      content: z.string(),
      published: z.boolean().optional(),
      imageUrl: z.string().optional(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    console.log(input.imageUrl);
    const { id, title, content, published = false, imageUrl } = input;
    const userId = ctx.session.user.id;

    if (id) {

      return ctx.db.blog.update({
        where: { id },
        data: { title, content, published, imageUrl },
      });
    } else {
      return ctx.db.blog.create({
        data: { title, content, published, userId, imageUrl },
      });
    }
  }),


  // Získání jednoho blogu podle ID
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.blog.findUnique({
        where: { id: input.id },
      });
    }),

  // Smazání blogu
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.blog.delete({
        where: { id: input.id },
      });
    }),
});