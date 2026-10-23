import { useCallback, useEffect, useState } from "react";
import { ApiError } from "@/lib/api-client";
import { getProductById, getProducts } from "../services/product-service";
import type { Product } from "../types/product";

function errorMessage(error: unknown) {
  if (error instanceof ApiError && error.status === 404)
    return "Product not found.";
  if (error instanceof Error) return error.message;
  return "Something went wrong while loading products.";
}

export function useProducts() {
  const [state, setState] = useState<{
    products: Product[];
    loading: boolean;
    error: string | null;
  }>({ products: [], loading: true, error: null });
  const [request, setRequest] = useState(0);
  const retry = useCallback(() => {
    setState((current) => ({ ...current, loading: true, error: null }));
    setRequest((value) => value + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    getProducts(controller.signal)
      .then((products) => setState({ products, loading: false, error: null }))
      .catch((reason: unknown) => {
        if (!controller.signal.aborted) {
          setState({
            products: [],
            loading: false,
            error: errorMessage(reason),
          });
        }
      });
    return () => controller.abort();
  }, [request]);

  return { ...state, retry };
}

export function useProduct(id?: number) {
  const [state, setState] = useState<{
    id?: number;
    product?: Product;
    error: string | null;
    loading: boolean;
  }>({ error: null, loading: false });
  const [request, setRequest] = useState(0);
  const retry = useCallback(() => {
    setState((current) => ({ ...current, error: null, loading: true }));
    setRequest((value) => value + 1);
  }, []);

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();
    getProductById(id, controller.signal)
      .then((product) => setState({ id, product, error: null, loading: false }))
      .catch((reason: unknown) => {
        if (!controller.signal.aborted) {
          setState({
            id,
            product: undefined,
            error: errorMessage(reason),
            loading: false,
          });
        }
      });
    return () => controller.abort();
  }, [id, request]);

  const pending = Boolean(id) && state.id !== id;
  return {
    product: pending ? undefined : state.product,
    loading: pending || state.loading,
    error: pending ? null : state.error,
    retry,
  };
}
