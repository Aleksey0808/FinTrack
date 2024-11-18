import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

const TransactionCard = ({ transaction, onDelete, onEdit }) => {
  const theme = useTheme();  

  return (
    <Card style={{ backgroundColor: theme.card }}>
      <View>
        <CategoryText style={{ color: theme.text }}>
          {transaction.category}
        </CategoryText>
        <DateText style={{ color: theme.text }}>
          {transaction.date}
        </DateText>
      </View>
      <View>
        <AmountText
          style={[
            { color: theme.text }, 
            transaction.type === 'Income' ? styles.income : styles.expense,
          ]}
        >
          ${transaction.amount}
        </AmountText>
        <TouchableOpacity onPress={onEdit}>
          <EditText style={{ color: theme.text }}>Edit</EditText>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <DeleteText style={{ color: theme.text }}>
            Delete
          </DeleteText>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const Card = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const CategoryText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const DateText = styled.Text`
  font-size: 14px;
  color: #666;
`;

const AmountText = styled.Text`
  font-size: 18px;
`;

const DeleteText = styled.Text`
  color: red;
  margin-top: 5px;
  font-size: 14px;
`;

const styles = {
  income: { color: 'green' },
  expense: { color: 'red' },
};

const EditText = styled.Text`
  color: blue;
  margin-top: 5px;
  font-size: 14px;
`;


export default TransactionCard;
