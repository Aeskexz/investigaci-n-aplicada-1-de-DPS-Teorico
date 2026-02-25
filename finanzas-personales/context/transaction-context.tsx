import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Transaction = {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
  time: string;
  recipient: string;
};

type TransactionContextType = {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
};

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider = ({ children }: { children: React.ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // 🔥 Cargar datos guardados al iniciar
  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const data = await AsyncStorage.getItem('transactions');
      if (data) {
        setTransactions(JSON.parse(data));
      }
    } catch (error) {
      console.log('Error cargando transacciones', error);
    }
  };

  const saveTransactions = async (newTransactions: Transaction[]) => {
    try {
      await AsyncStorage.setItem('transactions', JSON.stringify(newTransactions));
    } catch (error) {
      console.log('Error guardando transacciones', error);
    }
  };

  const addTransaction = (transaction: Transaction) => {
  setTransactions(prev => {
    const updated = [transaction, ...prev];
    saveTransactions(updated);
    return updated;
  });
};

const deleteTransaction = (id: string) => {
  setTransactions(prev => {
    const updated = prev.filter(t => t.id !== id);
    saveTransactions(updated);
    return updated;
  });
};

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, deleteTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions debe usarse dentro de TransactionProvider');
  }
  return context;
};