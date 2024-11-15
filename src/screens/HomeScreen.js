import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import TransactionCard from '../components/TransactionCard';
import useTransactions from '../hooks/useTransactions';

const HomeScreen = ({ navigation, toggleTheme }) => {
  const { transactions, deleteTransaction } = useTransactions();
  const totalBalance = transactions.reduce(
    (acc, t) => (t.type === 'Income' ? acc + t.amount : acc - t.amount),
    0
  );

  return (
    <Container>
      <Header>
        <Title>Balance: ${totalBalance.toFixed(2)}</Title>
        <TouchableOpacity onPress={toggleTheme}>
          <ThemeToggle>Switch Theme</ThemeToggle>
        </TouchableOpacity>
      </Header>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionCard
            transaction={item}
            onDelete={() => deleteTransaction(item.id)}
          />
        )}
      />
      <AddButton onPress={() => navigation.navigate('AddTransaction')}>
        <AddButtonText>+ Add Transaction</AddButtonText>
      </AddButton>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${({ theme }) => theme.background};
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

const ThemeToggle = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.accent};
`;

const AddButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.accent};
  padding: 15px;
  border-radius: 10px;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const AddButtonText = styled.Text`
  color: white;
  font-size: 18px;
`;

export default HomeScreen;
