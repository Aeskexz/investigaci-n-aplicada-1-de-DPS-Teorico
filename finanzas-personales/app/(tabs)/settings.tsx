import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SettingsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Configuración y Apariencia</Text>
            <Text style={styles.subtext}>
                (Iván: Aquí debes implementar el toggle para el Modo Oscuro/Claro y añadir las micro-animaciones con Reanimated para la transición)
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
