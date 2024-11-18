import React, { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styled, { useTheme } from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient'; // Импортируем LinearGradient
import { useTransactions } from '../hooks/TransactionsContext';

const categories = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Other'];

const AddTransactionScreen = ({ navigation, route }) => {
  const { addTransaction, updateTransaction } = useTransactions();
  const transaction = route.params?.transaction || null;

  const [amount, setAmount] = useState(transaction?.amount.toString() || '');
  const [type, setType] = useState(transaction?.type || 'Expense');
  const [category, setCategory] = useState(transaction?.category || categories[0]);
  const [date, setDate] = useState(transaction?.date || new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState(transaction?.note || '');
  const [customCategory, setCustomCategory] = useState('');
  const theme = useTheme();

  const handleSaveTransaction = () => {
    if (!amount || isNaN(amount)) {
      Alert.alert('Invalid Input', 'Please enter a valid amount.');
      return;
    }
  
    const newTransaction = {
      id: transaction ? transaction.id : Date.now().toString(),
      amount: parseFloat(amount),
      type,
      category: customCategory || category,
      date,
      note,
    };
  
    if (transaction) {
      updateTransaction(newTransaction);
    } else {
      addTransaction(newTransaction);
    }
  
    navigation.goBack();
  };
  

  const handleAddTransaction = () => {
    if (!amount || isNaN(amount)) {
      Alert.alert('Invalid Input', 'Please enter a valid amount.');
      return;
    }

    const newTransaction = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      type,
      category: customCategory || category, 
      date,
      note,
    };

    addTransaction(newTransaction);
    navigation.goBack();
  };

  return (
    <GradientContainer
      colors={theme.gradientColors} // Используем градиентные цвета из темы
    >
      <Title>Add Transaction</Title>

      <Label>Amount</Label>
      <Input
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        placeholder="Enter amount"
        placeholderTextColor={theme.placeholderText} // Устанавливаем цвет плейсхолдера
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
          onValueChange={(itemValue) => {
            setCategory(itemValue);
            if (itemValue !== 'Other') {
              setCustomCategory('');
            }
          }}
          style={{
            color: theme.text, // Цвет текста в Picker
          }}
        >
          {categories.map((cat) => (
            <Picker.Item 
              key={cat} 
              label={cat} 
              value={cat} 
              color={theme.text} // Устанавливаем цвет для каждого элемента
            />
          ))}
        </Picker>
      </PickerContainer>

      {category === 'Other' && (
        <>
          <Label>Custom Category</Label>
          <Input
            value={customCategory}
            onChangeText={setCustomCategory}
            placeholder="Enter custom category"
            placeholderTextColor={theme.placeholderText} // Устанавливаем цвет плейсхолдера
          />
        </>
      )}

      <Label>Date</Label>
      <Input
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
        placeholderTextColor={theme.placeholderText} // Устанавливаем цвет плейсхолдера
      />

      <Label>Note</Label>
      <Input
        value={note}
        onChangeText={setNote}
        placeholder="Optional note"
        placeholderTextColor={theme.placeholderText} // Устанавливаем цвет плейсхолдера
      />

      <AddButton onPress={handleSaveTransaction}>
        <AddButtonText>{transaction ? 'Update Transaction' : 'Add Transaction'}</AddButtonText>
      </AddButton>

    </GradientContainer>
  );
};

const GradientContainer = styled(LinearGradient)`
  flex: 1;
  padding: 20px;
  justify-content: flex-start;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.background}; /* Фон должен быть из темы */
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

export default AddTransactionScreen;
