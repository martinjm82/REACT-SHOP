import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  price: z.coerce.number().positive("El precio debe ser mayor a 0"),
  image: z.string().url("La URL de la imagen no es válida"),
});
