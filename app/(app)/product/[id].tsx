import axios from 'axios';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Product } from '../../../contexts/ApiContext';
import { useTheme } from '../../../contexts/ThemeContext';

export default function ProductDetailScreen() {
    const { id } = useLocalSearchParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const { colors } = useTheme();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://dummyjson.com/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Failed to fetch product details', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    if (loading) {
        return (
            <View style={[styles.center, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    if (!product) {
        return (
            <View style={[styles.center, { backgroundColor: colors.background }]}>
                <Text style={{ color: colors.text }}>Product not found</Text>
            </View>
        );
    }

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <Stack.Screen options={{ title: product.title }} />

            <Image source={{ uri: product.thumbnail }} style={styles.image} />

            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={[styles.title, { color: colors.text }]}>{product.title}</Text>
                    <Text style={[styles.rating, { color: colors.primary }]}>★ {product.rating}</Text>
                </View>

                <Text style={[styles.price, { color: colors.primary }]}>${product.price}</Text>
                <Text style={[styles.category, { color: colors.text }]}>{product.category.toUpperCase()}</Text>

                <View style={[styles.divider, { backgroundColor: colors.border }]} />

                <Text style={[styles.description, { color: colors.text }]}>{product.description}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        backgroundColor: '#f0f0f0',
    },
    content: {
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        flex: 1,
        marginRight: 10,
    },
    rating: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
    },
    category: {
        fontSize: 14,
        opacity: 0.6,
        marginTop: 5,
    },
    divider: {
        height: 1,
        marginVertical: 20,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
    },
});
