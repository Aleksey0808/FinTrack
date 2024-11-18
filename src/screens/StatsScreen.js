import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VictoryPie } from 'victory-native';
import { useTransactions } from '../hooks/TransactionsContext';

const StatsScreen = () => {
  const { transactions } = useTransactions();

  const calculateCategoryTotals = () => {
    const categoryTotals = transactions.reduce((acc, t) => {
      if (!acc[t.category]) acc[t.category] = 0;
      acc[t.category] += t.amount;
      return acc;
    }, {});

    return Object.keys(categoryTotals).map((category) => ({
      x: category,
      y: categoryTotals[category],
    }));
  };

  const data = calculateCategoryTotals();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Expenses by Category</Text>
      <VictoryPie
        data={data}
        colorScale={['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']}
        labelRadius={50}
        style={{
          labels: { fill: 'black', fontSize: 14, fontWeight: 'bold' },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});

export default StatsScreen;
