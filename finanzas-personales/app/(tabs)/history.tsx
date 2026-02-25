import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/context/theme-context';
import { useTransactions } from '@/context/transaction-context';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HistoryScreen() {
  const { isDarkMode } = useTheme();
  const { transactions, deleteTransaction } = useTransactions();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const containerBg = isDarkMode ? '#121212' : '#F5F5F5';
  const cardBg = isDarkMode ? '#1E1E1E' : '#FFFFFF';
  const textColor = isDarkMode ? '#FFF' : '#121212';
  const subtextColor = isDarkMode ? '#888' : '#666';
  const buttonBg = isDarkMode ? '#2A2A2A' : '#F0F0F0';

  return (
    <ThemedView style={[styles.container, { backgroundColor: containerBg }]}>
      <ThemedText style={[styles.header, { color: textColor }]}>
        Historial
      </ThemedText>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <ThemedText style={{ color: subtextColor, textAlign: 'center' }}>
            No hay transacciones todavía
          </ThemedText>
        }
        renderItem={({ item }) => (
          <ThemedView style={[styles.card, { backgroundColor: cardBg }]}>
            <View style={styles.row}>
              {item.type === 'income' ? (
                <ArrowUpCircle color="#00D084" size={28} />
              ) : (
                <ArrowDownCircle color="#FF4B4B" size={28} />
              )}

              <View style={{ flex: 1 }}>
                <ThemedText style={[styles.title, { color: textColor }]}>
                  {item.title}
                </ThemedText>
                <ThemedText style={{ color: subtextColor, fontSize: 14 }}>
                  {item.date}
                </ThemedText>
              </View>

              <ThemedText
                style={[
                  styles.amount,
                  {
                    color:
                      item.type === 'income' ? '#00D084' : '#FF4B4B',
                  },
                ]}
              >
                {item.type === 'income' ? '+' : '-'}${item.amount}
              </ThemedText>

              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    'Eliminar',
                    '¿Estás seguro que deseas eliminar esta transacción?',
                    [
                      { text: 'Cancelar' },
                      {
                        text: 'Eliminar',
                        style: 'destructive',
                        onPress: () => deleteTransaction(item.id),
                      },
                    ]
                  )
                }
              >
                <ThemedText
                  style={{ color: '#FF4B4B', fontWeight: 'bold' }}
                >
                  X
                </ThemedText>
              </TouchableOpacity>
            </View>

            {expandedId === item.id && (
              <View style={[styles.detailsContainer, { borderTopColor: subtextColor }]}>
                <View style={styles.detailRow}>
                  <ThemedText style={[styles.detailLabel, { color: subtextColor }]}>
                    Hora:
                  </ThemedText>
                  <ThemedText style={[styles.detailValue, { color: textColor }]}>
                    {item.time}
                  </ThemedText>
                </View>

                <View style={styles.detailRow}>
                  <ThemedText style={[styles.detailLabel, { color: subtextColor }]}>
                    Tipo:
                  </ThemedText>
                  <ThemedText style={[styles.detailValue, { color: textColor }]}>
                    {item.type === 'income' ? 'Ingreso' : 'Gasto'}
                  </ThemedText>
                </View>

                <View style={styles.detailRow}>
                  <ThemedText style={[styles.detailLabel, { color: subtextColor }]}>
                    Monto:
                  </ThemedText>
                  <ThemedText
                    style={[
                      styles.detailValue,
                      {
                        color: item.type === 'income' ? '#00D084' : '#FF4B4B',
                        fontWeight: 'bold',
                      },
                    ]}
                  >
                    {item.type === 'income' ? '+' : '-'}${item.amount}
                  </ThemedText>
                </View>

                <View style={styles.detailRow}>
                  <ThemedText style={[styles.detailLabel, { color: subtextColor }]}>
                    Destinatario:
                  </ThemedText>
                  <ThemedText style={[styles.detailValue, { color: textColor }]}>
                    {item.recipient}
                  </ThemedText>
                </View>
              </View>
            )}

            <TouchableOpacity
              onPress={() =>
                setExpandedId(expandedId === item.id ? null : item.id)
              }
              style={[styles.detailsButton, { backgroundColor: buttonBg }]}
            >
              <ThemedText style={[styles.detailsButtonText, { color: textColor }]}>
                {expandedId === item.id ? 'Ocultar detalles' : 'Ver detalles'}
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 15,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailsButton: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  detailsButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  detailsContainer: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    gap: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 14,
  },
});