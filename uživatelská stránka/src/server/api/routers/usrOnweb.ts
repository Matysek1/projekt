import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import bcrypt from "bcrypt"
import  getRemotePrismaClient  from "~/lib/prisma-web";
import crypto from "crypto";
import { startWebInstance } from "~/lib/startWebInstance";
import  sendEmail  from '../../../server/mail';



export const userOnWebRouter = createTRPCRouter({
    

        createRemoteUser: publicProcedure
    .input(z.object({
      name: z.string(),
      email: z.string().email()
    }))
    .mutation(async ({ input, ctx }) => {
      const freePage = await ctx.db.pages.findFirst({
        where: { status: true, },
        orderBy: { id: 'asc' },
      });

      if (!freePage) {
        throw new Error('Žádná volná stránka není k dispozici');
      }

      await ctx.db.pages.update({
        where: { id: freePage.id },
        data: { status: false, userEmail: input.email }, 
      });

      const prisma = getRemotePrismaClient(freePage.name); 

      const plainPassword = crypto.randomBytes(12).toString('base64').replace(/[^a-zA-Z0-9]/g, '').slice(0, 12);
      const hashedPassword = await bcrypt.hash(plainPassword, 10);

      const user = await prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: hashedPassword,
        },
      });

      await sendEmail({
              to: input.email,
              subject: "Přihlašovací údaje k Vaší webové stránce", 
              text: `Odkaz na váš web: ${freePage.name}.webyhned.eu \n Uživatelské jméno: ${input.email}\nHeslo: ${plainPassword}`,
            });

      return {
        userId: user.id,
        plainPassword,
        pageId: freePage.id,
      };
    }),
})