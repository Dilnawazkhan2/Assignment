import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import ProductCard from '../../components/ProductCard';
import SearchBar from '../../components/SearchBar';
import { Product, useApi } from '../../contexts/ApiContext';
import { useTheme } from '../../contexts/ThemeContext';

export default function ProductListScreen() {
    const { products, isLoading, error, fetchProducts, searchProducts, loadMore, hasMore } = useApi();
    const { colors } = useTheme();
    const [refreshing, setRefreshing] = React.useState(false);
    const [search, setSearch] = React.useState('');

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchProducts(true);
        setRefreshing(false);
    };

    const handleSearch = (text: string) => {
        setSearch(text);
        searchProducts(text);
    };

    const renderItem = ({ item }: { item: Product }) => (
        <ProductCard product={item} onPress={(p) => console.log('Pressed', p.title)} />
    );

    const renderFooter = () => {
        if (!isLoading) return null;
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="small" color={colors.primary} />
            </View>
        );
    };

    const { width } = useWindowDimensions();
    const numColumns = width < 768 ? 3 : 6;

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <SearchBar value={search} onChangeText={handleSearch} />

            {error && (
                <View style={styles.errorContainer}>
                    <Text style={[styles.errorText, { color: 'red' }]}>{error}</Text>
                    <TouchableOpacity onPress={() => fetchProducts(true)} style={styles.retryButton}>
                        <Text style={{ color: colors.primary }}>Retry</Text>
                    </TouchableOpacity>
                </View>
            )}

            <FlatList
                key={`product-grid-${numColumns}`}
                data={products}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
                numColumns={numColumns}
                columnWrapperStyle={styles.columnWrapper}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
                }
                onEndReached={() => {
                    if (hasMore && !isLoading && !search) {
                        loadMore();
                    }
                }}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
                ListEmptyComponent={!isLoading ? <Text style={[styles.empty, { color: colors.text }]}>No products found</Text> : null}
            />

            {/* Floating Theme Toggle (optional, just for demo purposes if not in settings) */}
            {/* We could add it to header, but Context handles it. Let's rely on System preferences or add a switch in Header later. 
          Actually user asked for "ThemeContext (light/dark)". Usually implies a toggle. 
          I'll add a toggle to the header in _layout.tsx instead of floating here.
       */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    list: {
        paddingBottom: 20,
    },
    columnWrapper: {
        gap: 10,
    },
    card: {
        // Removed old card styles
    },
    thumbnail: {
        // Removed old thumbnail styles
    },
    info: {
        // Removed old info styles
    },
    title: {
        // Removed old title styles
    },
    price: {
        // Removed old price styles
    },
    category: {
        // Removed old category styles
    },
    loader: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    errorContainer: {
        padding: 20,
        alignItems: 'center',
    },
    retryButton: {
        marginTop: 10,
        padding: 10,
    },
    errorText: {
        textAlign: 'center',
    },
    empty: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
    },
});
