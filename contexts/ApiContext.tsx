import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';

// Using dummyjson for better product data
const API_URL = 'https://dummyjson.com/products';

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    category: string;
    rating: number;
}

interface ApiContextType {
    products: Product[];
    isLoading: boolean;
    error: string | null;
    fetchProducts: (refresh?: boolean) => Promise<void>;
    searchProducts: (query: string) => void;
    loadMore: () => void;
    hasMore: boolean;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // Debounce search could be handled here or in UI, simplifying for context

    const limit = 10;

    const fetchProducts = async (refresh = false) => {
        if (isLoading) return;

        // If refreshing, reset everything
        if (refresh) {
            setPage(0);
            setHasMore(true);
            // We don't clear products here immediately to avoid flash, but we could
        } else if (!hasMore) {
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const currentPage = refresh ? 0 : page;
            const skip = currentPage * limit;

            // Always fetch standard list, no search API
            const url = `${API_URL}?limit=${limit}&skip=${skip}`;

            const response = await axios.get(url);
            const newProducts = response.data.products;
            const total = response.data.total;

            setProducts(prev => {
                if (refresh) return newProducts;
                // Avoid duplicates if any (simple safety)
                const textIds = new Set(prev.map(p => p.id));
                const uniqueNew = newProducts.filter((p: Product) => !textIds.has(p.id));
                return [...prev, ...uniqueNew];
            });

            setPage(prev => (refresh ? 1 : prev + 1));
            setHasMore(skip + limit < total);

        } catch (err: any) {
            setError(err.message || 'Failed to fetch products');
        } finally {
            setIsLoading(false);
        }
    };

    // Simple client-side filtering
    const filteredProducts = products.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const searchProducts = (query: string) => {
        setSearchQuery(query);
    };

    const loadMore = () => {
        fetchProducts(false);
    };

    return (
        <ApiContext.Provider value={{ products: filteredProducts, isLoading, error, fetchProducts, searchProducts, loadMore, hasMore }}>
            {children}
        </ApiContext.Provider>
    );
};

export const useApi = () => {
    const context = useContext(ApiContext);
    if (!context) {
        throw new Error('useApi must be used within an ApiProvider');
    }
    return context;
};
