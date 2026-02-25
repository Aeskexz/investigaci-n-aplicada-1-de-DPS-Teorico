
import { Stack } from 'expo-router';
import { TransactionProvider } from '@/context/transaction-context';
import { ThemeProvider } from '@/context/theme-context';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <TransactionProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </TransactionProvider>
    </ThemeProvider>
  );
}