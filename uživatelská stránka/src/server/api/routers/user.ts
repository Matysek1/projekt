import { UserRegisterSchema } from "../types/user";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

import bcrypt from "bcrypt"

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
                        }
                })
                if(!response){
                        throw new Error("Nejde to");
                }
                else{
                }

                return response;

                



        }),
          getUsers: publicProcedure.query(async ({ ctx }) => {
                 return await ctx.db.user.findMany({
                 });
        }),
        removeUser: publicProcedure
        .input(z.string())
        .mutation(async ({ input, ctx }) => {
                const userId = input;

                const response = await ctx.db.user.delete({
                        where: { id: userId },
                });

                if (!response) {
                        throw new Error("User not found");
                }

                return response;
        }
        ),

        newPassword: publicProcedure
        .input(z.object({
                userId: z.string(),
                password: z.string(),
        }))
        .mutation(async ({ input, ctx }) => {
                const { userId, password } = input;

                const seed = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, seed);

                const response = await ctx.db.user.update({
                        where: { id: userId },
                        data: { password: hashedPassword },
                });

                if (!response) {
                        throw new Error("User not found");
                }

                return response;
        }),
})