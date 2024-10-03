// // import { ResponseMessages } from "app/servers/domain/enums/ResponseMessages"
// import { z } from "zod"

// const couponSchema = z.object({
//   name: z.string().min(1, ResponseMessages.STATE_REQUIRED_AND_NON_EMPTY),
//   percentage: z.number(),
//   kindOf: z.number()
// })

// export type Coupon = z.infer<typeof couponSchema>
