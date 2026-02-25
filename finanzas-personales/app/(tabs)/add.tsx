import { useTheme } from '@/context/theme-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ArrowDownCircle, ArrowUpCircle, Calendar, Tag, Type } from 'lucide-react-native';
import React, { useState } from 'react';
import { 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  View
} from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useTransactions } from '@/context/transaction-context';

type TransactionType = 'income' | 'expense';

export default function AddTransactionScreen() {
  const { isDarkMode } = useTheme();
  const [type, setType] = useState<TransactionType>('income');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString('es-ES'));
  const { addTransaction } = useTransactions();
  

  const containerBg = isDarkMode ? '#121212' : '#F5F5F5';
  const cardBg = isDarkMode ? '#1E1E1E' : '#FFFFFF';
  const textColor = isDarkMode ? '#FFF' : '#121212';
  const subtextColor = isDarkMode ? '#888' : '#666';
  const inputBg = isDarkMode ? '#2A2A2A' : '#F0F0F0';
  const incomeActiveBg = isDarkMode ? 'rgba(0, 208, 132, 0.2)' : 'rgba(0, 208, 132, 0.1)';
  const expenseActiveBg = isDarkMode ? 'rgba(255, 75, 75, 0.2)' : 'rgba(255, 75, 75, 0.1)';

 const handleSave = () => {
  if (!title.trim()) {
    Alert.alert('Error', 'Por favor ingresa un título');
    return;
  }

  if (!amount.trim() || isNaN(Number(amount)) || Number(amount) <= 0) {
    Alert.alert('Error', 'Por favor ingresa un monto válido');
    return;
  }

  const newTransaction = {
    id: Date.now().toString(),
    title,
    amount: Number(amount),
    type,
    date,
  };

  addTransaction(newTransaction);

  Alert.alert('Éxito', 'Transacción guardada correctamente');

  setTitle('');
  setAmount('');
  setCategory('');
  setType('income');
};

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        style={[styles.container, { backgroundColor: containerBg }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInUp.delay(100).springify()}>
          <ThemedView 
            style={[styles.card, { backgroundColor: cardBg }]}
            lightColor={cardBg}
            darkColor={cardBg}
          >
            <ThemedText type="title" style={styles.cardTitle}>
              Nueva Transacción
            </ThemedText>

            {/* Selector de tipo */}
            <ThemedText type="defaultSemiBold" style={[styles.label, { color: subtextColor }]}>
              Tipo
            </ThemedText>
            <View style={styles.typeContainer}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  { 
                    backgroundColor: type === 'income' ? incomeActiveBg : 'transparent',
                    borderColor: type === 'income' ? '#00D084' : subtextColor,
                  }
                ]}
                onPress={() => setType('income')}
              >
                <ArrowUpCircle color={type === 'income' ? '#00D084' : subtextColor} size={24} />
                <ThemedText 
                  style={[
                    styles.typeText,
                    { color: type === 'income' ? '#00D084' : subtextColor }
                  ]}
                >
                  Ingreso
                </ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.typeButton,
                  { 
                    backgroundColor: type === 'expense' ? expenseActiveBg : 'transparent',
                    borderColor: type === 'expense' ? '#FF4B4B' : subtextColor,
                  }
                ]}
                onPress={() => setType('expense')}
              >
                <ArrowDownCircle color={type === 'expense' ? '#FF4B4B' : subtextColor} size={24} />
                <ThemedText 
                  style={[
                    styles.typeText,
                    { color: type === 'expense' ? '#FF4B4B' : subtextColor }
                  ]}
                >
                  Gasto
                </ThemedText>
              </TouchableOpacity>
            </View>

            {/* Título */}
            <ThemedText type="defaultSemiBold" style={[styles.label, { color: subtextColor }]}>
              Título
            </ThemedText>
            <View style={[styles.inputContainer, { backgroundColor: inputBg }]}>
              <Type color={subtextColor} size={20} />
              <TextInput
                style={[styles.input, { color: textColor }]}
                placeholder="Agrege el concepto de la transacción..."
                placeholderTextColor={subtextColor}
                value={title}
                onChangeText={setTitle}
              />
            </View>

            {/* Monto */}
            <ThemedText type="defaultSemiBold" style={[styles.label, { color: subtextColor }]}>
              Monto
            </ThemedText>
            <View style={[styles.inputContainer, { backgroundColor: inputBg }]}>
              <ThemedText style={{ color: subtextColor, fontSize: 18 }}>$</ThemedText>
              <TextInput
                style={[styles.input, { color: textColor }]}
                placeholder="0.00"
                placeholderTextColor={subtextColor}
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
              />
            </View>

            {/* Destinatario */}
            <ThemedText type="defaultSemiBold" style={[styles.label, { color: subtextColor }]}>
              Destinatario
            </ThemedText>
            <View style={[styles.inputContainer, { backgroundColor: inputBg }]}>
              <Tag color={subtextColor} size={20} />
              <TextInput
                style={[styles.input, { color: textColor }]}
                placeholder="Agrege el nombre del destinatario..."
                placeholderTextColor={subtextColor}
                value={category}
                onChangeText={setCategory}
              />
            </View>

            {/* Fecha */}
            <ThemedText type="defaultSemiBold" style={[styles.label, { color: subtextColor }]}>
              Fecha
            </ThemedText>
            <View style={[styles.inputContainer, { backgroundColor: inputBg }]}>
              <Calendar color={subtextColor} size={20} />
              <TextInput
                style={[styles.input, { color: textColor }]}
                placeholder="DD/MM/AAAA"
                placeholderTextColor={subtextColor}
                value={date}
                onChangeText={setDate}
              />
            </View>

            {/* Botón Guardar */}
            <TouchableOpacity
              style={[
                styles.saveButton,
                { backgroundColor: type === 'income' ? '#00D084' : '#FF4B4B' }
              ]}
              onPress={handleSave}
              activeOpacity={0.8}
            >
              <ThemedText style={styles.saveButtonText}>
                Guardar Transacción
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 28,
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    marginTop: 16,
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 8,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  typeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  saveButton: {
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
