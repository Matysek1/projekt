import { UserRegisterSchema } from "../types/user";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import bcrypt from "bcrypt"
import Email from "next-auth/providers/email";
import  getRemotePrismaClient  from "~/lib/prisma-web";
import crypto from "crypto";


export const userRouter = createTRPCRouter({
        register: publicProcedure
        .input(UserRegisterSchema)
        .mutation(async ({input, ctx}) => {
                
                const seed = await bcrypt.genSalt(10);
                const hasedpassword = await bcrypt.hash(input.password, seed);

                const response = await ctx.db.user.create({
                        data:{
                                email: input.email,
                                name: input.name,
                                password: hasedpassword,
                                emailVerified: false
                        }
                })
                if(!response){
                        throw new Error("Nejde to");
                }

                return response;

                



        }),

        getUserInfo: publicProcedure
        .input(
                z.object({
                id: z.string(),
        })
        )
        .query(async ({ ctx, input }) => {
        const response = await ctx.db.user.findMany({
                select: {
                name: true,
                email: true,
                emailVerified: true,
                firma: true,
                phone: true,
                ico     : true,
                dic     : true,
                mesto    : true,
                psc      : true,
                ulice    : true,
                state   : true,
        },
        where: {
          id: input.id,
        },
      });
    
      return response;
    }),

        updateUser: protectedProcedure
        .input(
                z.object({
                id: z.string(),
                name: z.string(),
                email: z.string(),
                firma: z.string(),
                phone: z.string(),
                ico     : z.string().transform((val) => parseInt(val, 10)),
                dic     : z.string(),
                mesto    : z.string(),
                psc      : z.string(),
                ulice    : z.string(),
                state   : z.string(),
        })
        )
        .mutation(async ({ ctx, input }) => {
                const response = await ctx.db.user.update({
                        where: { id: input.id },
                        data: {
                                name: input.name,
                                email: input.email,
                                firma: input.firma,
                                phone: input.phone,
                                ico: input.ico,
                                dic: input.dic,
                                mesto: input.mesto,
                                psc: input.psc,
                                ulice: input.ulice,
                                state: input.state,
                        },
                });

                if (!response) {
                        throw new Error("Update failed");
                }

                return response;
        }),

        updateUserNewsletter: protectedProcedure
        .input(
                z.object({
                email: z.string(),
        })
        )
        
        .mutation(async ({ ctx, input }) => {
                const response = await ctx.db.newsLetter.create({
                        data: {
                                email: input.email,
                        },
                });

                if (!response) {
                        throw new Error("Update failed");
                }

                return response;
        }),

        createRemoteUser: publicProcedure
    .input(z.object({
      name: z.string(),
      email: z.string().email()
    }))
    .mutation(async ({ input, ctx }) => {
      // 1. Najdi volnou stránku v hlavní DB
      const freePage = await ctx.db.pages.findFirst({
        where: { status: true, },
        orderBy: { id: 'asc' },
      });

      if (!freePage) {
        throw new Error('Žádná volná stránka není k dispozici');
      }

      // 2. Označ stránku jako obsazenou
      await ctx.db.pages.update({
        where: { id: freePage.id },
        data: { status: false, userEmail: input.email }, // můžeš přidat userId pokud chceš
      });

      // 3. Připoj se k databázi správného webu podle freePage.name nebo freePage.id
      const prisma = getRemotePrismaClient(freePage.name); // nebo freePage.id

      // 4. Vygeneruj heslo a vytvoř uživatele v DB konkrétního webu
      const plainPassword = crypto.randomBytes(12).toString('base64').replace(/[^a-zA-Z0-9]/g, '').slice(0, 12);
      const hashedPassword = await bcrypt.hash(plainPassword, 10);

      const user = await prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: hashedPassword,
        },
      });

      return {
        userId: user.id,
        plainPassword,
        pageId: freePage.id,
      };
    }),
})