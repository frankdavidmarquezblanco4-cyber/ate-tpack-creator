import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { saveATE, getATEByAccessCode, getUserATEs, addRating, getATERatings, createNotification, getUserNotifications, createLMSExport } from "./db";

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

    addRating: protectedProcedure
      .input(z.object({
        ateId: z.number(),
        score: z.number().min(1).max(5),
        comment: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const rating = await addRating(ctx.user.id, input.ateId, input.score, input.comment);
        return { success: true, rating };
      }),

    getRatings: publicProcedure
      .input(z.object({
        ateId: z.number(),
      }))
      .query(async ({ input }) => {
        return await getATERatings(input.ateId);
      }),
  }),

  notifications: router({
    create: protectedProcedure
      .input(z.object({
        type: z.enum(["download", "share", "rating", "comment"]),
        ateId: z.number(),
        message: z.string(),
        fromUserId: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const notification = await createNotification(
          ctx.user.id,
          input.type,
          input.ateId,
          input.message,
          input.fromUserId
        );
        return { success: true, notification };
      }),

    list: protectedProcedure
      .query(async ({ ctx }) => {
        return await getUserNotifications(ctx.user.id);
      }),
  }),

  lms: router({
    export: protectedProcedure
      .input(z.object({
        ateId: z.number(),
        lmsType: z.enum(["moodle", "canvas", "blackboard"]),
        lmsUrl: z.string().url(),
        courseId: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        const lmsExport = await createLMSExport(
          ctx.user.id,
          input.ateId,
          input.lmsType,
          input.lmsUrl,
          input.courseId
        );
        return { success: true, lmsExport };
      }),
  }),
});

export type AppRouter = typeof appRouter;
