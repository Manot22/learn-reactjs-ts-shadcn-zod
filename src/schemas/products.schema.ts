import { z } from "zod";

export const ProductsSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  image: z.string().url(),
  price: z.number(),
  rating: z.object({
    count: z.number(),
    rate: z.number(),
  }),
});

export const ProductsArraySchema = z.array(ProductsSchema);

export type ProductsDataSchema = z.infer<typeof ProductsSchema>;
