import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const strankarouter = createTRPCRouter({
  poststranka: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        userId: z.string(),
        idtemplate: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const response = await ctx.db.stranka.create({
        data: {
          name: input.name,
          userId: input.userId,
          idtemplate: input.idtemplate,
        }
        })
        if(!response){
                throw new Error("Nejde to");
        }

          return response;
    }),

    getStranky: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const response = await ctx.db.stranka.findMany({
        select: {
          id: true,
          userId: true,
          name: true,
          idtemplate: true,
        },
        where: {
          userId: input.id,
        },
      });
    
      return response;
    }),
});