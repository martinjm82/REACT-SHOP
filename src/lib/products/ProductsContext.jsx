import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";

import { getProducts } from "../api"; // ajustá si tu api.js está en otra ruta

const ProductsContext = createContext(null);

const initialState = {
  products: [],
  loading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "LOAD_START":
      return { ...state, loading: true, error: "" };

    case "LOAD_SUCCESS":
      return { ...state, loading: false, products: action.payload };

    case "LOAD_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload || "Error al cargar productos",
      };

    case "ADD_LOCAL":
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case "UPDATE_LOCAL":
  return {
    ...state,
    products: state.products.map((p) =>
      String(p.id) === String(action.payload.id) ? action.payload : p
    ),
  };

    default:
      return state;
  }
}

export function ProductsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadProducts = async () => {
    dispatch({ type: "LOAD_START" });
    try {
      const data = await getProducts(); // debe devolver un array
      dispatch({ type: "LOAD_SUCCESS", payload: data });
    } catch (e) {
      dispatch({
        type: "LOAD_ERROR",
        payload: e?.message,
      });
    }
  };

  // 🔥 Carga automática al montar el provider
  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addProductLocal = (product) =>
    dispatch({ type: "ADD_LOCAL", payload: product });

  const updateProductLocal = (product) =>
    dispatch({ type: "UPDATE_LOCAL", payload: product });

  const getById = (id) =>
    state.products.find((p) => String(p.id) === String(id));

  return (
    <ProductsContext.Provider
      value={{
        products: state.products,
        loading: state.loading,
        error: state.error,
        loadProducts,
        addProductLocal,
        updateProductLocal,
        getById,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) {
    throw new Error(
      "useProducts debe usarse dentro de ProductsProvider"
    );
  }
  return ctx;
}
