import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TransactionCard = ({ transaction, onDelete }) => (
  <View style={styles.card}>
    <View>
      <Text style={styles.category}>{transaction.category}</Text>
      <Text style={styles.date}>{transaction.date}</Text>
    </View>
    <View>
      <Text
        style={[
          styles.amount,
          transaction.type === 'Income' ? styles.income : styles.expense,
        ]}
      >
        ${transaction.amount}
      </Text>
      <TouchableOpacity onPress={onDelete}>
        <Text style={styles.delete}>Delete</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 10,
  },
  category: { fontSize: 16, fontWeight: 'bold' },
  date: { fontSize: 14, color: '#666' },
  amount: { fontSize: 18 },
  income: { color: 'green' },
  expense: { color: 'red' },
  delete: { color: 'red', marginTop: 5, fontSize: 14 },
});

export default TransactionCard;
