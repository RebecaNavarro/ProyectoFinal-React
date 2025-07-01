import { create } from 'zustand';
import type { Product } from '../interfaces/productInterface';
import { deleteProduct, getProductService, updateProduct } from '../services/ProductService';

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  deleteProduct: (productId: string) => void;
  editProduct: (product: Product) => void;
  fetchProducts: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    try {
      set({ isLoading: true });
      const productsData = await getProductService();
      set({ products: productsData });
    } catch (err) {
      console.error('Error:', err);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteProduct: async (userId: string) => {
    try {
      await deleteProduct(userId);
      set((state) => ({
        products: state.products.filter((product) => product.id !== userId),
      }));
    } catch (err) {
      console.error('Error deleting product:', err);
    } finally {
      set({ isLoading: false });
    }
  },

  editProduct: async (product: Product) => {
    try {
      await updateProduct(product);
      set((state) => ({
        products: state.products.map((p) => (p.id === product.id ? product : p)),
      }));
    } catch (err) {
      console.error("Error updating product:", err);
    } finally {
      set({ isLoading: false });
    }
  },

}));