import { create } from 'zustand';
import { fetchProductService } from '../services/apiService';
interface Product {
    id?: number;
    title?: string;
    price: number;
    category: any;
    description:string;
    creationAt:string;
    updatedAt:string;
    images:any;
}
interface ProductListResponse {
    limit: number;
    skip: number;
    total: number;
    products: any[];  // Array of products
}
interface ProductStore {
    product: Product | null;
    productList: ProductListResponse;
    isLoading: boolean;
    error: string | null;
    fetchProductList: () => Promise<void>;
}
export const useProductStore = create<ProductStore>((set) => ({
    product: null,
    productList: { limit: 0, skip: 0, total: 0, products: [] },
    isLoading: false,
    error: null,
    fetchProductList: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetchProductService();
              set({ productList: response, isLoading: false });
        } catch (err: any) {
            set({ error: err.message || 'Fetching products failed', isLoading: false });
        }
    }
}));
