import React from "react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../lib/products/productSchema";
import { useProducts } from "../lib/products/ProductsContext";

export default function ProductForm({ productToEdit, onDone }) {
  const { addProductLocal, updateProductLocal } = useProducts();
  const [globalError, setGlobalError] = useState("");

  const isEdit = !!productToEdit;

  const defaultValues = useMemo(
    () => ({
      title: productToEdit?.title ?? "",
      price: productToEdit?.price ?? "",
      image: productToEdit?.image ?? "",
    }),
    [productToEdit]
  );

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues,
    mode: "onBlur",
  });

  // Preview en vivo
  const imageValue = watch("image");

  useEffect(() => {
    reset(defaultValues);
    setGlobalError("");
  }, [defaultValues, reset]);

  const onSubmit = async (data) => {
    setGlobalError("");

    try {
      const payload = isEdit
        ? { ...productToEdit, ...data }
        : { id: crypto.randomUUID(), ...data };

      if (isEdit) updateProductLocal(payload);
      else addProductLocal(payload);

      onDone?.();

      if (!isEdit) reset({ title: "", price: "", image: "" });
    } catch (e) {
      setGlobalError("No se pudo guardar el producto. Probá de nuevo.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card shadow-sm">
      <div className="card-body">
        <h2 className="h5 fw-bold mb-3">
          {isEdit ? "Editar producto" : "Agregar producto"}
        </h2>

        {globalError && (
          <div className="alert alert-danger" role="alert">
            {globalError}
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Título</label>
          <input className="form-control" {...register("title")} />
          {errors.title && (
            <div className="text-danger small mt-1">{errors.title.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input
            className="form-control"
            type="number"
            step="0.01"
            {...register("price")}
          />
          {errors.price && (
            <div className="text-danger small mt-1">{errors.price.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Imagen (URL)</label>
          <input className="form-control" {...register("image")} />
          {errors.image && (
            <div className="text-danger small mt-1">{errors.image.message}</div>
          )}
        </div>

        {/* Preview sin requests externos si no hay imagen */}
        <div className="mb-3">
          <div className="ratio ratio-1x1 bg-light d-flex align-items-center justify-content-center">
            {imageValue ? (
              <img
                src={imageValue}
                alt="preview"
                className="p-4"
                style={{ objectFit: "contain" }}
                onError={(e) => {
                  // Si la URL no carga, ocultamos la imagen y mostramos texto
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement?.classList.add("text-muted");
                  e.currentTarget.parentElement?.classList.add("small");
                  e.currentTarget.parentElement?.setAttribute(
                    "data-preview-error",
                    "1"
                  );
                }}
              />
            ) : (
              <span className="text-muted">Preview</span>
            )}

            {/* Mensaje cuando la imagen falla */}
            {imageValue && (
              <span
                className="text-muted small"
                style={{ position: "absolute" }}
              >
                {/* si el img se oculta por onError, este texto queda visible */}
              </span>
            )}
          </div>
          <small className="text-muted">Pegá una URL válida para ver la imagen.</small>
        </div>

        <button className="btn btn-dark" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Guardando..." : isEdit ? "Guardar cambios" : "Agregar"}
        </button>
      </div>
    </form>
  );
}
