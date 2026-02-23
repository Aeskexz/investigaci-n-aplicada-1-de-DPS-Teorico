import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AddTransactionScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Pantalla de Agregar Transacción</Text>
            <Text style={styles.subtext}>
                (Javier: Aquí irá el formulario con validaciones complejas de entrada, selector de categoría y cálculo reactivo)
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtext: {
        color: '#888',
        fontSize: 16,
        textAlign: 'center',
    }
});
