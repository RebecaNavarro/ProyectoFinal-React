import jsonInstance from "../api/jsonInstance";
import type { Product } from "../interfaces/productInterface";

const PRODUCT_URL = 'products';

export const getProductService = async () => {
    try {
        const response = await jsonInstance.get(PRODUCT_URL);
        return response.data;
    } catch (error) {
        console.error("Error getting products", error);
        throw error;
    }
};

export const getProductById = async (id: string) => {
    try {
        const response = await jsonInstance.get(`${PRODUCT_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error getting product by ID", error);
        throw error;
    }
};

export const registerProduct = async (
    title: string,
    description: string,
    image: string,
    price: number,
    duration: number,
    status: string
) => {
    try {
        const response = await jsonInstance.post(PRODUCT_URL, {
            title,
            description,
            image,
            price,
            duration,
            status
        });
        return response.data;
    } catch (error) {
        console.error("Error registering product", error);
        throw error;
    }
};

export const updateProduct = async (product: Product) => {
    try {
        const response = await jsonInstance.put(`${PRODUCT_URL}/${product.id}`, product);
        return response.data;
    } catch (error) {
        console.error("Error updating product", error);
        throw error;
    }
};

export const deleteProduct = async (id: string) => {
    try {
        const response = await jsonInstance.delete(`${PRODUCT_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting product", error);
        throw error;
    }
};