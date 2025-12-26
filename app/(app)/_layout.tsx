import { Ionicons } from '@expo/vector-icons';
import { Redirect, Stack } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

export default function AppLayout() {
    const { userToken } = useAuth();
    const { logout } = useAuth();
    const { colors, toggleTheme, theme } = useTheme();

    if (!userToken) {
        return <Redirect href="/login" />;
    }

    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.card,
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerRight: () => (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 15 }}>
                            <Ionicons name={theme === 'dark' ? 'sunny' : 'moon'} size={24} color={colors.text} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={logout} style={{ marginRight: 10 }}>
                            <Ionicons name="log-out-outline" size={24} color={colors.primary} />
                        </TouchableOpacity>
                    </View>
                ),
            }}
        >
            <Stack.Screen name="index" options={{ title: 'Products' }} />
            <Stack.Screen name="product/[id]" options={{ title: 'Product Details' }} />
        </Stack>
    );
}
