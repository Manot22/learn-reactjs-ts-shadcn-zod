import axiosInstance from "@/lib/axios";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  ProductsArraySchema,
  ProductsSchema,
  type ProductsDataSchema,
} from "../schemas/products.schema";

export const useProducts = () => {
  const [products, setProducts] = useState<ProductsDataSchema[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get("/products");

      const validateData = ProductsArraySchema.parse(data);

      setProducts(validateData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message || "Gagal mendapatkan data product"
        );
      } else {
        setError("Terjadi kesalahan yang tidak diketahui");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getProductById = async (id: number) => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get(`/products/${id}`);

      const product = ProductsSchema.parse(data);
      return product;
    } catch (error) {
      console.error("Gagal mengambil produk:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    products,
    isLoading,
    error,
    getProductById,
  };
};
