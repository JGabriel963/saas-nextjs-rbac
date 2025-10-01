import { z } from "zod";

export const billingSubject = z.tuple([
  z.union([
    z.literal("manage"),
    z.literal("get"),
    z.literal("export"),
    z.literal("delete"),
  ]),
  z.literal("Billing"),
]);

export type billingSubject = z.infer<typeof billingSubject>;
