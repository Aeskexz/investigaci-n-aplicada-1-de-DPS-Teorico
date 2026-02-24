import { useTheme } from '@/context/theme-context';
import { ArrowDownRight, ArrowUpRight, Wallet } from 'lucide-react-native';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Animated, { FadeInUp } from 'react-native-reanimated';

const screenWidth = Dimensions.get('window').width;

const data = {
  labels: ["En", "Fb", "Mr", "Ab", "My", "Jn"],
  datasets: [
    {
      data: [2000, 2500, 2100, 3000, 2800, 3500],
      color: (opacity = 1) => `rgba(0, 208, 132, ${opacity})`,
      strokeWidth: 3
    }
  ],
  legend: ["Ingresos 2026"]
};

export default function DashboardScreen() {
  const { isDarkMode } = useTheme();

  const containerBg = isDarkMode ? '#121212' : '#F5F5F5';
  const cardBg = isDarkMode ? '#1E1E1E' : '#FFFFFF';
  const textColor = isDarkMode ? '#FFF' : '#121212';
  const subtextColor = isDarkMode ? '#888' : '#666';
  const chartBg = isDarkMode ? '#1E1E1E' : '#FFFFFF';
  const chartGradFrom = isDarkMode ? '#1E1E1E' : '#F0F0F0';
  const chartGradTo = isDarkMode ? '#121212' : '#E5E5E5';

  return (
    <ScrollView style={[styles.container, { backgroundColor: containerBg }]}>
      <Animated.View entering={FadeInUp.delay(100).springify()} style={[styles.card, { backgroundColor: cardBg }]}>
        <View style={styles.balanceHeader}>
          <Wallet color="#00D084" size={32} />
          <View style={styles.balanceTextContainer}>
            <Text style={[styles.balanceLabel, { color: subtextColor }]}>Balance Actual</Text>
            <Text style={[styles.balanceAmount, { color: textColor }]}>$4,250.00</Text>
          </View>
        </View>
      </Animated.View>

      <View style={styles.statsRow}>
        <Animated.View entering={FadeInUp.delay(200).springify()} style={[styles.statCard, { marginRight: 10, backgroundColor: cardBg }]}>
          <View style={styles.iconContainerIn}>
            <ArrowUpRight color="#00D084" size={20} />
          </View>
          <Text style={[styles.statLabel, { color: subtextColor }]}>Ingresos</Text>
          <Text style={styles.statAmountIn}>+$3,500.00</Text>
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(300).springify()} style={[styles.statCard, { backgroundColor: cardBg }]}>
          <View style={styles.iconContainerOut}>
            <ArrowDownRight color="#FF4B4B" size={20} />
          </View>
          <Text style={[styles.statLabel, { color: subtextColor }]}>Gastos</Text>
          <Text style={styles.statAmountOut}>-$1,250.00</Text>
        </Animated.View>
      </View>

      <Animated.View entering={FadeInUp.delay(400).springify()} style={[styles.chartContainer, { backgroundColor: cardBg }]}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Evolución Anual</Text>
        <LineChart
          data={data}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: chartBg,
            backgroundGradientFrom: chartGradFrom,
            backgroundGradientTo: chartGradTo,
            decimalPlaces: 0,
            color: (opacity = 1) => isDarkMode ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => isDarkMode ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: chartBg
            }
          }}
          bezier
          style={styles.chart}
        />
      </Animated.View>
    </ScrollView>
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
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceTextContainer: {
    marginLeft: 15,
  },
  balanceLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
  },
  iconContainerIn: {
    backgroundColor: 'rgba(0, 208, 132, 0.2)',
    padding: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  iconContainerOut: {
    backgroundColor: 'rgba(255, 75, 75, 0.2)',
    padding: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  statLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
  statAmountIn: {
    color: '#00D084',
    fontSize: 22,
    fontWeight: 'bold',
  },
  statAmountOut: {
    color: '#FF4B4B',
    fontSize: 22,
    fontWeight: 'bold',
  },
  chartContainer: {
    borderRadius: 20,
    padding: 20,
    paddingBottom: 30,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  chart: {
    borderRadius: 16,
    alignSelf: 'center',
  }
});
