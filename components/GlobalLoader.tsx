import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface GlobalLoaderProps {
    visible: boolean;
    message?: string;
}

const GlobalLoader: React.FC<GlobalLoaderProps> = ({ visible, message = 'Loading...' }) => {
    const { colors } = useTheme();

    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
            onRequestClose={() => { }} // Block back button close
        >
            <View style={styles.container}>
                <View style={[styles.content, { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }]}>
                    <ActivityIndicator size="large" color={colors.primary} />
                    {message && <Text style={[styles.text, { color: colors.text }]}>{message}</Text>}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        minWidth: 150,
    },
    text: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: '500',
    },
});

export default GlobalLoader;
