import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const pageContentRouter = createTRPCRouter({
  updateText: publicProcedure
    .input(z.object({ 
      key: z.string(),
      value: z.string(),
      headtext: z.string().optional(),
    settings: z.object({
    color: z.string().optional(),
    fontSize: z.string().optional(),
    }).optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const { key, value } = input;

      const response = await ctx.db.pageContent.upsert({
        where: { key },
        update: {
          value ,
          updatedBy: "system",
          settings: input.settings,
        },
        create: {
          key,
          value,
          headtext : input.headtext?? "",
          updatedBy: "system",
          settings: input.settings ?? { color: "#000000" },
        },
      });

      return response;
    }),

  getTexts: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.pageContent.findMany({
    });
  }),

});
