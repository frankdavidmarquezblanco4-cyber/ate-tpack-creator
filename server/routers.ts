import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { saveATE, getATEByAccessCode, getUserATEs } from "./db";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  ate: router({
    save: protectedProcedure
      .input(z.object({
        accessCode: z.string(),
        data: z.record(z.string(), z.unknown()),
      }))
      .mutation(async ({ ctx, input }) => {
        const result = await saveATE(ctx.user.id, input.accessCode, input.data);
        return {
          success: true,
          accessCode: result.accessCode,
        };
      }),

    getByCode: publicProcedure
      .input(z.object({
        accessCode: z.string(),
      }))
      .query(async ({ input }) => {
        const ate = await getATEByAccessCode(input.accessCode);
        if (!ate) {
          return null;
        }
        return {
          accessCode: ate.accessCode,
          data: JSON.parse(ate.data as string),
        };
      }),

    list: protectedProcedure
      .query(async ({ ctx }) => {
        const ates = await getUserATEs(ctx.user.id);
        return ates.map(ate => ({
          accessCode: ate.accessCode,
          createdAt: ate.createdAt,
          updatedAt: ate.updatedAt,
          data: JSON.parse(ate.data as string),
        }));
      }),
  }),
});

export type AppRouter = typeof appRouter;
