import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HistoryScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Historial de Transacciones</Text>
            <Text style={styles.subtext}>
                (Brandon: Aquí se integrará AsyncStorage para cargar el historial de transacciones y los filtros por mes/semana)
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
