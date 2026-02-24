import { useTheme } from '@/context/theme-context';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function AddTransactionScreen() {
    const { isDarkMode } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F5F5F5' }]}>
            <Text style={[styles.text, { color: isDarkMode ? '#FFF' : '#121212' }]}>Pantalla de Agregar Transacción</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtext: {
        fontSize: 16,
        textAlign: 'center',
    }
});
