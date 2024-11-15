import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styled from 'styled-components/native';
import useTransactions from '../hooks/useTransactions';

const categories = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Other'];

const AddTransactionScreen = ({ navigation }) => {
  const { addTransaction } = useTransactions();

  const PickerContainer = styled.View`
  background-color: ${({ theme }) => theme.card};
  border-radius: 8px;
  margin-bottom: 15px;
  overflow: visible; 
`;

  const [amount, setAmount] = useState('');
  const [type, setType] = useState('Expense');
  const [category, setCategory] = useState(categories[0]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');

  const handleAddTransaction = () => {
    if (!amount || isNaN(amount)) {
      Alert.alert('Invalid Input', 'Please enter a valid amount.');
      return;
    }

    const newTransaction = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      type,
      category,
      date,
      note,
    };

    addTransaction(newTransaction);
    navigation.goBack();
  };

  return (
    <Container>
      <Title>Add Transaction</Title>

      <Label>Amount</Label>
      <Input
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        placeholder="Enter amount"
      />

      <Label>Type</Label>
      <TypeSwitcher>
        <TypeButton
          selected={type === 'Income'}
          onPress={() => setType('Income')}
        >
          <TypeButtonText selected={type === 'Income'}>Income</TypeButtonText>
        </TypeButton>
        <TypeButton
          selected={type === 'Expense'}
          onPress={() => setType('Expense')}
        >
          <TypeButtonText selected={type === 'Expense'}>Expense</TypeButtonText>
        </TypeButton>
      </TypeSwitcher>

      <Label>Category</Label>
      <PickerContainer>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          {categories.map((cat) => (
            <Picker.Item key={cat} label={cat} value={cat} />
          ))}
        </Picker>
      </PickerContainer>

      <Label>Date</Label>
      <Input
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
      />

      <Label>Note</Label>
      <Input
        value={note}
        onChangeText={setNote}
        placeholder="Optional note"
      />

      <AddButton onPress={handleAddTransaction}>
        <AddButtonText>Add Transaction</AddButtonText>
      </AddButton>
    </Container>
  );
};

const Container = styled.ScrollView`
  flex: 1;
  padding: 20px;
  background-color: ${({ theme }) => theme.background};
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  margin-top: 40px;
  margin-bottom: 20px;
`;

const Label = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  margin-top: 15px;
  margin-bottom: 5px;
`;

const Input = styled.TextInput`
  background-color: ${({ theme }) => theme.card};
  padding: 10px;
  border-radius: 8px;
  color: ${({ theme }) => theme.text};
  margin-bottom: 15px;
`;

const TypeSwitcher = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 15px;
`;

const TypeButton = styled.TouchableOpacity`
  padding: 10px 20px;
  border-radius: 8px;
  background-color: ${({ selected, theme }) =>
    selected ? theme.accent : theme.card};
`;

const TypeButtonText = styled.Text`
  color: ${({ selected, theme }) =>
  selected ? theme.text : theme.accent};
  font-size: 16px;
`;

const PickerContainer = styled.View`
  background-color: ${({ theme }) => theme.card};
  border-radius: 8px;
  margin-bottom: 15px;
  overflow: hidden;
`;

const AddButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.accent};
  padding: 15px;
  border-radius: 10px;
  align-items: center;
  margin-top: auto;
  margin-bottom: 10px;
`;

const AddButtonText = styled.Text`
  color: white;
  font-size: 18px;
`;

const styles = StyleSheet.create({
  picker: {
    height: 50,
    color: '#000',
  },
});

export default AddTransactionScreen;
