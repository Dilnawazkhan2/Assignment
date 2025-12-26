import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Product } from '../contexts/ApiContext';
import { useTheme } from '../contexts/ThemeContext';

interface ProductCardProps {
    product: Product;
    onPress?: (product: Product) => void;
}

export default function ProductCard({ product, onPress }: ProductCardProps) {
    const { colors } = useTheme();

    return (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: colors.card, shadowColor: colors.text }]}
            onPress={() => onPress?.(product)}
            activeOpacity={0.9}
        >
            <View style={styles.imageContainer}>
                <Image source={{ uri: product.thumbnail }} style={styles.thumbnail} />
                <View style={[styles.badge, { backgroundColor: colors.primary }]}>
                    <Text style={styles.badgeText}>{product.category}</Text>
                </View>
            </View>

            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
                        {product.title}
                    </Text>
                    <View style={styles.ratingContainer}>
                        <Text style={[styles.star, { color: '#FFD700' }]}>★</Text>
                        <Text style={[styles.rating, { color: colors.text }]}>{product.rating}</Text>
                    </View>
                </View>

                <Text style={[styles.description, { color: colors.text }]} numberOfLines={2}>
                    {product.description}
                </Text>

                <View style={styles.footer}>
                    <Text style={[styles.price, { color: colors.primary }]}>
                        ${product.price.toFixed(2)}
                    </Text>
                    {/* Placeholder for an action button or icon could go here */}
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1, // Allow card to fill available column width
        borderRadius: 16,
        marginBottom: 16,
        elevation: 4,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        overflow: 'visible',
    },
    imageContainer: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0', // Light gray background for product images
        alignItems: 'center',       // Center the image if it doesn't cover width
        justifyContent: 'center',
    },
    thumbnail: {
        width: '100%',
        height: 200,                // Slightly taller
        resizeMode: 'contain',      // Ensure whole product is visible
    },
    badge: {
        position: 'absolute',
        top: 12,
        left: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    content: {
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        marginRight: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.05)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    star: {
        fontSize: 12,
        marginRight: 2,
    },
    rating: {
        fontSize: 12,
        fontWeight: '600',
    },
    description: {
        fontSize: 14,
        opacity: 0.7,
        marginBottom: 12,
        lineHeight: 20,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 20,
        fontWeight: '800',
    },
});
