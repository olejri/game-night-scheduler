import { createTRPCRouter, publicProcedure } from "npm/server/api/trpc";
import { nextGameNight } from "npm/server/helpers/schedulerHelper";

export const scheduleRouter = createTRPCRouter({
  getPlannedGameNights: publicProcedure
    .query( ({ ctx, input }) => {

      const nextGameNightDay = nextGameNight();

      return {
        data: nextGameNightDay
      };
    }),
});